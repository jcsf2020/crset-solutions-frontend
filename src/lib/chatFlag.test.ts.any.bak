import { describe, it, expect, beforeEach } from 'vitest';
import { ChatFlag } from './chatFlag';

describe('ChatFlag', () => {
  beforeEach(() => {
    // Reset any state if needed
  });

  describe('createToken', () => {
    it('should create a valid token', () => {
      const token = ChatFlag.createToken();
      
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.length).toBeGreaterThan(0);
    });

    it('should create tokens with correct format', () => {
      const token = ChatFlag.createToken();
      
      // Token should be base64-encoded JSON
      const decoded = Buffer.from(token, 'base64').toString('utf-8');
      const parsed = JSON.parse(decoded);
      
      expect(parsed).toHaveProperty('v');
      expect(parsed).toHaveProperty('exp');
      expect(parsed).toHaveProperty('sig');
    });

    it('should create tokens that expire in the future', () => {
      const token = ChatFlag.createToken();
      const decoded = Buffer.from(token, 'base64').toString('utf-8');
      const parsed = JSON.parse(decoded);
      
      const now = Date.now();
      expect(parsed.exp).toBeGreaterThan(now);
    });
  });

  describe('verifyToken', () => {
    it('should verify a valid token', () => {
      const token = ChatFlag.createToken();
      const result = ChatFlag.verifyToken(token);
      
      expect(result.ok).toBe(true);
    });

    it('should reject an invalid token format', () => {
      const result = ChatFlag.verifyToken('invalid-token');
      
      expect(result.ok).toBe(false);
      expect(result.reason).toBeDefined();
    });

    it('should reject an expired token', () => {
      // Create a token that's already expired
      const expiredPayload = {
        v: ChatFlag.VERSION,
        exp: Date.now() - 1000, // 1 second ago
        sig: 'fake-signature'
      };
      const expiredToken = Buffer.from(JSON.stringify(expiredPayload)).toString('base64');
      
      const result = ChatFlag.verifyToken(expiredToken);
      
      expect(result.ok).toBe(false);
      expect(result.reason).toBe('expired');
    });

    it('should reject a token with wrong version', () => {
      const wrongVersionPayload = {
        v: 999, // Wrong version
        exp: Date.now() + 86400000,
        sig: 'fake-signature'
      };
      const wrongVersionToken = Buffer.from(JSON.stringify(wrongVersionPayload)).toString('base64');
      
      const result = ChatFlag.verifyToken(wrongVersionToken);
      
      expect(result.ok).toBe(false);
      expect(result.reason).toBe('version');
    });
  });

  describe('COOKIE_NAME', () => {
    it('should have a defined cookie name', () => {
      expect(ChatFlag.COOKIE_NAME).toBeDefined();
      expect(typeof ChatFlag.COOKIE_NAME).toBe('string');
      expect(ChatFlag.COOKIE_NAME.length).toBeGreaterThan(0);
    });
  });
});
