// app/podcasts/page.js
import { headers } from "next/headers";
import PodcastsClient from "./PodcastsClient";
import configData from "../../config.json";

export const metadata = {
  title: "Legal Podcasts and Audio Content",
  description:
    "Listen to insightful legal discussions and expert commentary through Aarna Law's podcast series. Stay informed with our audio content on various legal topics.",
  metadataBase: new URL("https://www.aarnalaw.com"),
  alternates: {
    canonical: "/podcasts",
  },
  openGraph: {
    title: "Legal Podcasts and Audio Content",
    description:
      "Listen to insightful legal discussions and expert commentary through Aarna Law's podcast series. Stay informed with our audio content on various legal topics.",
    url: "/podcasts",
    images: "/insights/InsightsBanner.jpg",
  },
};

async function fetchInitialPodcasts() {
  try {
    const headersList = headers();
    const host = headersList.get("host") || "";

    // Default to live server
    let server = configData.LIVE_PRODUCTION_SERVER_ID;

    // Use staging server if host matches
    if (
      host.includes(configData.STAGING_SITE_URL) ||
      host.includes("localhost")
    ) {
      server = configData.STAG_PRODUCTION_SERVER_ID;
    }

    const url = `${configData.SERVER_URL}podcast?_embed&status[]=publish&production_mode[]=${server}&per_page=6`;
    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();

    return data.map((item) => ({
      ...item,
      featured_image_url: item.episode_featured_image || "",
    }));
  } catch (error) {
    console.error("Podcasts fetch error:", error);
    return [];
  }
}

export default async function AarnaPodcastPage() {
  const initialData = await fetchInitialPodcasts();
  return <PodcastsClient initialData={initialData} />;
}
