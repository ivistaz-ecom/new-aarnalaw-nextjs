// app/aarna-news/page.js
import { headers } from "next/headers";
import NewsClient from "./NewsClient";
import configData from "../../config.json";

export const metadata = {
  title: "Aarna Law News and Updates",
  description:
    "Stay updated with the latest news and developments from Aarna Law. Follow our journey and achievements in the legal landscape.",
  metadataBase: new URL("https://www.aarnalaw.com"),
  alternates: {
    canonical: "/aarna-news",
  },
  openGraph: {
    title: "Aarna Law News and Updates",
    description:
      "Stay updated with the latest news and developments from Aarna Law. Follow our journey and achievements in the legal landscape.",
    url: "https://www.aarnalaw.com/aarna-news",
    images: "/insights/NewsInsights.jpeg",
  },
};

async function fetchInitialNews() {
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

    const url = `${configData.SERVER_URL}posts?_embed&categories[]=9&status[]=publish&production_mode[]=${server}&per_page=6`;
    const res = await fetch(url, { cache: "no-store" });
    return await res.json();
  } catch (error) {
    console.error("News fetch error:", error);
    return [];
  }
}

export default async function AarnaNewsPage() {
  const initialData = await fetchInitialNews();
  return <NewsClient initialData={initialData} />;
}
