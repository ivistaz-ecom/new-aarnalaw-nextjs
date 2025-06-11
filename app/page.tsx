// app/page.tsx
import Banner from "../components/HomePage/Banner";
import HomeInsights from "../components/HomePage/HomeInsights";
import Podcast from "../components/HomePage/PodCast";
import WhatWeDo from "../components/HomePage/WhatWeDo";
import TrackRecords from "../components/HomePage/Trackrecords";
import Testimonials from "../components/HomePage/Testimonials";
import KindOfDispute from "../components/HomePage/KindOfDisputesWeDo";
import OurCredentials from "../components/HomePage/OurCredentials";
import OurNetwork from "../components/HomePage/OurNetwork";

// Example metadata
export const metadata = {
  title: "Aarna Law - Top Litigation, Dispute & Corporate Law Firm in India",
  description:
    "Leading corporate law firm in India offering legal services in business law, litigation, arbitration, and compliance for Indian and international companies.",
  alternates: {
    canonical: "https://aarnalaw.com/",
  },
  openGraph: {
    title: "Aarna Law - Top Litigation, Dispute & Corporate Law Firm in India",
    description:
      "Leading corporate law firm in India offering legal services in business law, litigation, arbitration, and compliance for Indian and international companies.",
    url: "https://aarnalaw.com/",
    images: "/banner/desktop_home_banner_2.jpg",
  },
};

// Server-side fetch
async function getInsights() {
  const res = await fetch(
    `https://docs.aarnalaw.com/wp-json/wp/v2/posts?_embed&categories[]=13&status[]=publish&per_page=6`,
    {
      next: { revalidate: 60 }, // Optional ISR (caching)
    },
  );

  const posts = await res.json();

  return posts.map((item: any) => ({
    id: item.id,
    slug: item.slug,
    title: item.title.rendered,
    desc: item.excerpt.rendered,
    imageUrl: item._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "",
  }));
}

export default async function Home() {
  const insights = await getInsights();

  return (
    <>
      <Banner />
      <HomeInsights insights={insights} />
      {/* <Podcast /> */}
      <WhatWeDo />
      <KindOfDispute />
      <TrackRecords />
      <Testimonials />
      <OurCredentials />
      <OurNetwork />
    </>
  );
}
