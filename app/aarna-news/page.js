// app/aarna-news/page.js

import NewsClient from "./NewsClient";
import configData from "../../config.json";

// Enable ISR (Incremental Static Regeneration)
export const revalidate = 60;

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
    // Determine server mode based on environment
    const isProd = process.env.NODE_ENV === "production";
    const server = isProd
      ? configData.LIVE_PRODUCTION_SERVER_ID
      : configData.STAG_PRODUCTION_SERVER_ID;

    const url = `${configData.SERVER_URL}posts?_embed&categories[]=9&status[]=publish&production_mode[]=${server}&per_page=6`;

    const res = await fetch(url, {
      next: { revalidate: 60 }, // ISR
    });

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
