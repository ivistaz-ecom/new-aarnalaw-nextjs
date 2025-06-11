// app/practice-area/page.tsx
import Banner from "@/components/PracticeArea/Banner";
import PracticeLists from "@/components/PracticeArea/PracticeLists";
import configData from "@/config.json";

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

async function getPracticeAreas() {
  try {
    const server = configData.LIVE_PRODUCTION_SERVER_ID; // default to live
    const res = await fetch(
      `${configData.SERVER_URL}practice-areas?_embed&status[]=publish&production_mode[]=${server}&per_page=100`,
      { next: { revalidate: 60 } }
    );

    const data = await res.json();
    return data.sort((a, b) => a.title.rendered.localeCompare(b.title.rendered));
  } catch (error) {
    console.error("Practice Areas fetch error:", error);
    return [];
  }
}

export default async function PracticeAreaPage() {
  const practiceAreas = await getPracticeAreas();

  return (
    <>
      <Banner />
      <PracticeLists data={practiceAreas} loading={false} />
    </>
  );
}
