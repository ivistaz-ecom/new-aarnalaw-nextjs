import InsightsClient from "./InsightsClient";
import config from "../../config.json";
import { getProductionMode } from "@/lib/getProductionMode";

export const metadata = {
  title: "Legal Insights and Expertise",
  description:
    "Stay informed with the latest legal insights and expert analyses...",
  metadataBase: new URL("https://www.aarnalaw.com"),
  alternates: { canonical: "/insights" },
  openGraph: {
    title: "Legal Insights and Expertise",
    description: "Stay informed with the latest legal insights...",
    url: "https://www.aarnalaw.com/insights",
    images: "/insights/InsightsBanner.jpg",
  },
};

async function fetchArchives() {
  const res = await fetch(config.SERVER_URL + "archives", { cache: "no-store" });
  const archives = await res.json();
  return archives.sort((a, b) => parseInt(b.name, 10) - parseInt(a.name, 10));
}

async function fetchInsights(year, productionMode, page = 1) {
  const after = `${year}-01-01T00:00:00`;
  const before = `${year}-12-31T23:59:59`;
  const url = `${config.SERVER_URL}posts?_embed&per_page=6&page=${page}&categories=12,13&after=${after}&before=${before}&status[]=publish&production_mode[]=${productionMode}`;
  const res = await fetch(url, { cache: "no-store" });
  return await res.json();
}

export default async function AarnaInsightsPage() {
  const hostname = process.env.NEXT_PUBLIC_HOSTNAME || "localhost";
  const productionMode = getProductionMode(hostname);
  const archives = await fetchArchives();
  const initialYear = archives[0]?.name || new Date().getFullYear().toString();
  const initialData = await fetchInsights(initialYear, productionMode);

  return (
    <InsightsClient
      initialData={initialData}
      initialArchives={archives}
      initialYear={initialYear}
      productionMode={productionMode}
    />
  );
}
