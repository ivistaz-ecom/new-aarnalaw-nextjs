import Banner from "../components/HomePage/Banner";
import Insights from "../components/HomePage/HomeInsights";
import Podcast from "../components/HomePage/PodCast";
import WhatWeDo from "../components/HomePage/WhatWeDo";
import TrackRecords from "../components/HomePage/Trackrecords";
import Testimonials from "../components/HomePage/Testimonials";
import KindOfDispute from "../components/HomePage/KindOfDisputesWeDo";
import OurCredentials from "../components/HomePage/OurCredentials";
import OurNetwork from "../components/HomePage/OurNetwork";

export const metadata = {
  title: "Aarna Law - Top Litigation, Dispute & Corporate Law Firm in India",
  description:
    "Leading corporate law firm in India offering legal services in business law, litigation, arbitration, and compliance for Indian and international companies.",
  alternates: {
    canonical: "https://www.aarnalaw.com/",
  },
  openGraph: {
    title: "Aarna Law - Top Litigation, Dispute & Corporate Law Firm in India",
    description:
      "Leading corporate law firm in India offering legal services in business law, litigation, arbitration, and compliance for Indian and international companies.",
    url: "https://www.aarnalaw.com/",
    images: "/banner/desktop_home_banner_2.jpg",
  },
};

export default function Home() {
  return (
    <>
      <Banner />
      <Insights />
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
