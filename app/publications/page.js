// app/publications/page.js

import PublicationsClient from "./PublicationsClient";
import configData from "../../config.json";

// Enable ISR (revalidate every 60 seconds)
export const revalidate = 60;

export const metadata = {
  title: "Legal Publications and Research",
  description:
    "Access a comprehensive collection of legal publications and research papers authored by Aarna Law's experts. Stay up-to-date with cutting-edge legal scholarship.",
  metadataBase: new URL("https://www.aarnalaw.com"),
  alternates: {
    canonical: "/publications",
  },
  openGraph: {
    title: "Legal Publications and Research",
    description:
      "Access a comprehensive collection of legal publications and research papers authored by Aarna Law's experts. Stay up-to-date with cutting-edge legal scholarship.",
    url: "/publications",
    images: "/insights/InsightsBanner.jpg",
  },
};

async function fetchInitialPublications() {
  try {
    // Determine server based on environment
    const isProduction = process.env.NODE_ENV === "production";
    const server = isProduction
      ? configData.LIVE_PRODUCTION_SERVER_ID
      : configData.STAG_PRODUCTION_SERVER_ID;

    const url = `${configData.SERVER_URL}publications?_embed&status[]=publish&production_mode[]=${server}`;
    const res = await fetch(url, {
      next: { revalidate: 60 }, // Use ISR
    });

    const data = await res.json();
    return data.sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (error) {
    console.error("Publications fetch error:", error);
    return [];
  }
}

export default async function AarnaPublicationsPage() {
  const initialData = await fetchInitialPublications();
  return <PublicationsClient initialData={initialData} />;
}
