import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Rate limiters for different endpoints
export const rateLimiters = {
  // RAG endpoints: 10 requests per minute per IP
  rag: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, "1 m"),
    analytics: true,
    prefix: "ratelimit:rag",
  }),

  // Contact form: 5 requests per hour per IP
  contact: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "1 h"),
    analytics: true,
    prefix: "ratelimit:contact",
  }),

  // General API: 60 requests per minute per IP
  api: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(60, "1 m"),
    analytics: true,
    prefix: "ratelimit:api",
  }),
};

/**
 * Get client identifier from request (IP + User-Agent)
 */
export function getClientId(req: Request): string {
  // Try to get real IP from headers (Vercel provides this)
  const forwardedFor = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");
  const ip = forwardedFor?.split(",")[0] || realIp || "unknown";
  
  // Add user agent for better identification
  const ua = req.headers.get("user-agent") || "unknown";
  const uaHash = hashString(ua);
  
  return `${ip}:${uaHash}`;
}

/**
 * Simple hash function for user agent
 */
function hashString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36).substring(0, 8);
}

/**
 * Check rate limit and return appropriate response
 */
export async function checkRateLimit(
  req: Request,
  limiter: Ratelimit
): Promise<{ success: boolean; limit: number; remaining: number; reset: number } | null> {
  try {
    const identifier = getClientId(req);
    const { success, limit, remaining, reset } = await limiter.limit(identifier);
    
    return { success, limit, remaining, reset };
  } catch (error) {
    console.error("Rate limit check failed:", error);
    // On error, allow the request (fail open)
    return null;
  }
}

/**
 * Create rate limit headers for response
 */
export function createRateLimitHeaders(result: {
  limit: number;
  remaining: number;
  reset: number;
}): Record<string, string> {
  return {
    "X-RateLimit-Limit": result.limit.toString(),
    "X-RateLimit-Remaining": result.remaining.toString(),
    "X-RateLimit-Reset": new Date(result.reset).toISOString(),
    "Retry-After": Math.ceil((result.reset - Date.now()) / 1000).toString(),
  };
}

// In-memory rate limiting fallback (for when Upstash is not available)
interface Bucket {
  count: number;
  resetAt: number;
}

const inMemoryStore = new Map<string, Bucket>();

/**
 * Get client key from request with optional fallback
 */
export function getClientKey(req: Request, fallback?: string): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");
  const ip = forwardedFor?.split(",")[0] || realIp || fallback || "unknown";
  return ip;
}

/**
 * In-memory rate limiting function
 * @param key - Unique identifier for the client (usually IP address)
 * @param limit - Maximum number of requests allowed (default: 20)
 * @param windowMs - Time window in milliseconds (default: 60000ms = 1 minute)
 */
export async function rateLimit(
  key: string,
  options?: { limit?: number; window?: number }
): Promise<{ success: boolean; limit: number; remaining: number; reset: number }> {
  const limit = options?.limit || 20;
  const windowMs = (options?.window || 60) * 1000; // Convert seconds to ms
  const now = Date.now();
  
  // Get or create bucket
  let bucket = inMemoryStore.get(key);
  
  // Reset bucket if window expired
  if (!bucket || now >= bucket.resetAt) {
    bucket = {
      count: 0,
      resetAt: now + windowMs,
    };
    inMemoryStore.set(key, bucket);
  }
  
  // Increment counter
  bucket.count++;
  
  const remaining = Math.max(0, limit - bucket.count);
  const success = bucket.count <= limit;
  
  // Cleanup old entries periodically (every 1000 requests)
  if (Math.random() < 0.001) {
    for (const [k, v] of inMemoryStore.entries()) {
      if (now >= v.resetAt) {
        inMemoryStore.delete(k);
      }
    }
  }
  
  return {
    success,
    limit,
    remaining,
    reset: bucket.resetAt,
  };
}

// Export as default as well
export default rateLimit;

