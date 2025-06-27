// app/practice-area/page.js

import Banner from "@/components/PracticeArea/Banner";
import PracticeLists from "@/components/PracticeArea/PracticeLists";
import configData from "@/config.json";

// Optional: use static rendering (ISR)
export const revalidate = 60; // Revalidate every 60 seconds

export const metadata = {
  title: "India's leading law firm offering legal counsel in practice areas",
  description:
    "We offer legal services for a range of practice areas including corporate advisory, arbitration, mediation, litigation, IP, risk assessment, and compliance",
  metadataBase: new URL("https://www.aarnalaw.com"),
  alternates: {
    canonical: "/practice-area",
  },
  openGraph: {
    title: "India's leading law firm offering legal counsel in practice areas",
    description:
      "We offer legal services for a range of practice areas including corporate advisory, arbitration, mediation, litigation, IP, risk assessment, and compliance",
    url: "/practice-area",
    images: "/PracticeArea/PracticeAreas.png",
  },
};

async function getPracticeAreas(page = 1, perPage = 20) {
  try {
    // Determine environment and use appropriate server ID
    const isProduction = process.env.NODE_ENV === "production";
    const server = isProduction
      ? configData.LIVE_PRODUCTION_SERVER_ID
      : configData.STAG_PRODUCTION_SERVER_ID;

    const res = await fetch(
      `${configData.SERVER_URL}practice-areas?status[]=publish&production_mode[]=${server}&per_page=${perPage}&page=${page}`,
      {
        next: { revalidate: 60 }, // ISR (optional)
      }
    );

    const data = await res.json();
    return data.sort((a, b) =>
      a.title.rendered.localeCompare(b.title.rendered)
    );
  } catch (error) {
    console.error("Practice Areas fetch error:", error);
    return [];
  }
}

export default async function PracticeAreaPage() {
  const practiceAreas = await getPracticeAreas(1, 13);

  return (
    <>
      <Banner />
      <PracticeLists data={practiceAreas} loading={false} />
    </>
  );
}
