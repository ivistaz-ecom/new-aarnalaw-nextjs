// app/industries/page.js
import { headers } from "next/headers";
import React from "react";
import Banner from "@/components/Industries/Banner";
import Industries from "@/components/Industries/IndustryLists";
import configData from "@/config.json";

export const metadata = {
  title: "Industry-Specific Legal Solutions | Aarna Law",
  description:
    "We offer tailored legal services for diverse industries, addressing unique needs across sectors with specialized expertise.",
  metadataBase: new URL("https://www.aarnalaw.com"),
  alternates: {
    canonical: "/industries",
  },
  openGraph: {
    title: "Industry-Specific Legal Solutions | Aarna Law",
    description:
      "We offer tailored legal services for diverse industries, addressing unique needs across sectors with specialized expertise.",
    url: "/industries",
    images: "/Industries/IndutriesBanner.jpg",
  },
};

async function getIndustries() {
  try {
    const headersList = headers();
    const host = headersList.get("host") || "";

    // Default to live server
    let server = configData.LIVE_PRODUCTION_SERVER_ID;

    // Switch to staging if host matches staging domain or local
    if (
      host.includes(configData.STAGING_SITE_URL) ||
      host.includes("localhost")
    ) {
      server = configData.STAG_PRODUCTION_SERVER_ID;
    }

    const res = await fetch(
      `${configData.SERVER_URL}industries?_embed&status[]=publish&production_mode[]=${server}&per_page=100`,
      { next: { revalidate: 60 } }
    );

    const data = await res.json();
    return data.sort((a, b) =>
      a.title.rendered.localeCompare(b.title.rendered)
    );
  } catch (error) {
    console.error("Industries fetch error:", error);
    return [];
  }
}

export default async function IndustriesPage() {
  const industries = await getIndustries();

  return (
    <>
      <Banner />
      <Industries data={industries} loading={false} />
    </>
  );
}
