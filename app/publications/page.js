// app/publications/page.js
import { headers } from "next/headers";
import PublicationsClient from "./PublicationsClient";
import configData from "../../config.json";

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

    const url = `${configData.SERVER_URL}publications?_embed&status[]=publish&production_mode[]=${server}`;
    const res = await fetch(url, { cache: "no-store" });
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
