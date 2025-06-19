// File: app/insights/page.jsx
import InsightsClient from "./InsightsClient";

export const metadata = {
  title: "Legal Insights and Expertise",
  description:
    "Stay informed with the latest legal insights and expert analyses across diverse practice areas. Explore Aarna Law's thought leadership and stay ahead in the legal landscape.",
  metadataBase: new URL("https://www.aarnalaw.com"),
  alternates: {
    canonical: "/insights",
  },
  openGraph: {
    title: "Legal Insights and Expertise",
    description:
      "Stay informed with the latest legal insights and expert analyses across diverse practice areas. Explore Aarna Law's thought leadership and stay ahead in the legal landscape.",
    url: "https://www.aarnalaw.com/insights",
    images: "/insights/InsightsBanner.jpg",
  },
};

async function fetchArchives() {
  const res = await fetch("https://docs.aarnalaw.com/wp-json/wp/v2/archives", { cache: "no-store" });
  const archives = await res.json();
  return archives.sort((a, b) => parseInt(b.name, 10) - parseInt(a.name, 10));
}

async function fetchInsights(year, page = 1) {
  const cat1 = 12;
  const cat2 = 13;
  const after = `${year}-01-01T00:00:00`;
  const before = `${year}-12-31T23:59:59`;
  const url = `https://docs.aarnalaw.com/wp-json/wp/v2/posts?_embed&per_page=6&page=${page}&categories=${cat1},${cat2}&after=${after}&before=${before}&status[]=publish`;
  const res = await fetch(url, { cache: "no-store" });
  return await res.json();
}

export default async function AarnaInsightsPage() {
  const archives = await fetchArchives();
  const initialYear = archives[0]?.name || new Date().getFullYear().toString();
  const initialData = await fetchInsights(initialYear);
  return <InsightsClient initialData={initialData} initialArchives={archives} initialYear={initialYear} />;
}
