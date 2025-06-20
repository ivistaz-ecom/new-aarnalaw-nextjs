import PublicationsClient from "./PublicationsClient";
import configData from "../../config.json";

export const metadata = {
  title: "Legal Publications and Research",
  description: "Access a comprehensive collection of legal publications and research papers authored by Aarna Law's experts. Stay up-to-date with cutting-edge legal scholarship.",
  metadataBase: new URL("https://www.aarnalaw.com"),
  alternates: {
    canonical: "/publications",
  },
  openGraph: {
    title: "Legal Publications and Research",
    description: "Access a comprehensive collection of legal publications and research papers authored by Aarna Law's experts. Stay up-to-date with cutting-edge legal scholarship.",
    url: "/publications",
    images: "/insights/InsightsBanner.jpg",
  },
};

async function fetchInitialPublications() {
  const server = configData.STAG_PRODUCTION_SERVER_ID;
  const url = `${configData.SERVER_URL}publications?_embed&status[]=publish&production_mode[]=${server}`;
  const res = await fetch(url, { cache: "no-store" });
  const data = await res.json();
  return data.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export default async function AarnaPublicationsPage() {
  const initialData = await fetchInitialPublications();
  return <PublicationsClient initialData={initialData} />;
}





// import React from "react";

// import InsightsClient from "./InsightsClient";




// export const metadata = {
//   title: "Legal Publications and Research",
//     description:
//       "Access a comprehensive collection of legal publications and research papers authored by Aarna Law's experts. Stay up-to-date with cutting-edge legal scholarship.",
//     metadataBase: new URL("https://www.aarnalaw.com"),
//     alternates: {
//       canonical: "/publications",
//     },
//     openGraph: {
//       title: "Legal Publications and Research",
//       description:
//         "Access a comprehensive collection of legal publications and research papers authored by Aarna Law's experts. Stay up-to-date with cutting-edge legal scholarship.",
//       url: "/publications",
//        images: "/insights/InsightsBanner.jpg",
//     },
// };

// export default function AarnaInsightsPage() {
//   return <InsightsClient />;
// }

// import Seo from '@/components/SeoComponents/Seo'

// const AarnaInsightsPage = () => {
//   const title = "Legal Publications and Research"
//   const description = "Access a comprehensive collection of legal publications and research papers authored by Aarna Law's experts. Stay up-to-date with cutting-edge legal scholarship."
//   const path = '/publications'
//   const metaImage = '/insights/InsightsBanner.jpg'
//   return (
//     <div>
//       <Seo 
//       title={title}
//       description={description}
//       path={path}
//       metaImage={metaImage}
//       />
//       <InsightsClient />
//     </div>
//   )
// }

// export default AarnaInsightsPage



