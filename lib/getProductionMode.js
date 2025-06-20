// lib/getProductionMode.js
import config from "../config.json";

export function getProductionMode(hostname) {
  if (!hostname) return config.STAG_PRODUCTION_SERVER_ID;

  const domain = hostname.replace(/^https?:\/\//, "").replace(/^www\./, "").toLowerCase();

  if (
    domain === config.LIVE_SITE_URL ||
    domain === config.LIVE_SITE_URL_WWW
  ) {
    return config.LIVE_PRODUCTION_SERVER_ID;
  } else if (domain === config.STAGING_SITE_URL) {
    return config.STAG_PRODUCTION_SERVER_ID;
  } else {
    return config.STAG_PRODUCTION_SERVER_ID;
  }
}
