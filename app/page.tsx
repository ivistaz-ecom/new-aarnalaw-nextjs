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
  title: "Expert Legal Representation | Aarna Law - Advocates & Consultants",
  description:
    "Discover award-winning legal services in Bangalore. Aarna Law offers full-service representation with expertise and dedication.",
  alternates: {
    canonical: "https://aarnalaw.com/",
  },
  openGraph: {
    title: "Expert Legal Representation | Aarna Law - Advocates & Consultants",
    description:
      "Discover award-winning legal services in Bangalore. Aarna Law offers full-service representation with expertise and dedication.",
    url: "https://aarnalaw.com/",
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
