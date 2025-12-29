// app/event-and-webinars/page.js

import EventsClient from "./EventsClient";
import config from "../../config.json";
import { headers } from "next/headers";

export const revalidate = 60;

export const metadata = {
  title: "Events & Webinars | Aarna Law",
  description:
    "Discover upcoming events, webinars, and seminars hosted by Aarna Law. Stay informed about legal developments and industry insights.",
  metadataBase: new URL("https://www.aarnalaw.com"),
  alternates: {
    canonical: "/event-and-webinars",
  },
  openGraph: {
    title: "Events & Webinars | Aarna Law",
    description:
      "Discover upcoming events, webinars, and seminars hosted by Aarna Law. Stay informed about legal developments and industry insights.",
    url: "https://www.aarnalaw.com/event-and-webinars",
    images: "/insights/InsightsBanner.jpg",
  },
};

// Extract hostname from URL (removes protocol and port)
function getHostnameFromUrl(url) {
  try {
    return new URL(url).hostname;
  } catch {
    return url.replace(/^https?:\/\//, "").split(":")[0].split("/")[0];
  }
}

// Get production mode based on hostname
function getProductionMode(hostname) {
  const liveHostname = getHostnameFromUrl(config.LIVE_SITE_URL);
  const liveHostnameWww = getHostnameFromUrl(config.LIVE_SITE_URL_WWW);
  
  const isLiveDomain = hostname === liveHostname || hostname === liveHostnameWww;
  return isLiveDomain 
    ? config.LIVE_PRODUCTION_SERVER_ID 
    : config.STAG_PRODUCTION_SERVER_ID;
}

// Fetch initial events data from both categories
async function fetchInitialEvents(productionMode) {
  // Custom post type: webinars_and_events
  // categories[]=481 for Webinars, categories[]=12 for Events
  const webinarsUrl = `${config.SERVER_URL}webinars_and_events?_embed&categories[]=481&status[]=publish&production_mode[]=${productionMode}&per_page=6`;
  const eventsUrl = `${config.SERVER_URL}webinars_and_events?_embed&categories[]=12&status[]=publish&production_mode[]=${productionMode}&per_page=6`;

  try {
    // Fetch both categories in parallel
    const [webinarsRes, eventsRes] = await Promise.all([
      fetch(webinarsUrl, { next: { revalidate: 60 } }),
      fetch(eventsUrl, { next: { revalidate: 60 } })
    ]);

    const [webinarsData, eventsData] = await Promise.all([
      webinarsRes.json(),
      eventsRes.json()
    ]);

    // Combine both arrays and add category type for badge display
    let combinedData = [];

    if (Array.isArray(webinarsData)) {
      const webinarsWithType = webinarsData.map(item => ({ ...item, categoryType: 'WEBINARS' }));
      combinedData = [...combinedData, ...webinarsWithType];
    }

    if (Array.isArray(eventsData)) {
      const eventsWithType = eventsData.map(item => ({ ...item, categoryType: 'EVENTS' }));
      combinedData = [...combinedData, ...eventsWithType];
    }

    // Sort by date (newest first)
    return combinedData.sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (error) {
    console.error("Events fetch error:", error);
    return [];
  }
}

export default async function EventAndWebinarsPage() {
  const headersList = headers();
  const hostname = headersList.get("host")?.replace(/^www\./, "").split(":")[0] ?? "";
  const productionMode = getProductionMode(hostname);
  
  const initialData = await fetchInitialEvents(productionMode);

  return <EventsClient initialData={initialData} />;
}
