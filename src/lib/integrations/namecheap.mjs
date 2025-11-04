
// src/lib/integrations/namecheap.mjs
import { parseStringPromise as parseXML } from "xml2js";

const API_USER = "joaofonseca";
const API_KEY = "588db1d7421c4bc38291e8a05d673e60";
const CLIENT_IP = "37.189.31.189";
const API_BASE = "https://api.namecheap.com/xml.response";

function buildUrl(command, extra = {}) {
  const url = new URL(API_BASE);
  url.searchParams.set("ApiUser", API_USER);
  url.searchParams.set("ApiKey", API_KEY);
  url.searchParams.set("UserName", API_USER);
  url.searchParams.set("ClientIp", CLIENT_IP);
  url.searchParams.set("Command", command);
  for (const [k, v] of Object.entries(extra)) url.searchParams.set(k, v);
  return url.toString();
}

async function callNamecheap(command, params = {}) {
  const res = await fetch(buildUrl(command, params));
  const text = await res.text();
  const xml = await parseXML(text, { explicitArray: false });
  const status = xml?.ApiResponse?.$?.Status;
  if (status !== "OK") {
    const err = xml?.ApiResponse?.Errors?.Error?._ || JSON.stringify(xml);
    throw new Error(`Namecheap error: ${err}`);
  }
  return xml.ApiResponse.CommandResponse;
}

export async function checkDomain(domain) {
  const data = await callNamecheap("namecheap.domains.check", { DomainList: domain });
  const r = data.DomainCheckResult?.$;
  return {
    domain: r.Domain,
    available: r.Available === "true",
    premium: r.IsPremiumName === "true",
  };
}

// CLI local
const [,, cmd, arg] = process.argv;
if (cmd === "check" && arg) {
  checkDomain(arg)
    .then(r => console.log(r))
    .catch(e => console.error("❌", e.message));
}
