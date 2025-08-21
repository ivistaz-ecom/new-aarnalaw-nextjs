import React from "react";
import PodcastPost from "./page";

export async function generateMetadata({ params }) {
  const { slug } = params;

  try {
    const res = await fetch(
      `https://docs.aarnalaw.com/wp-json/wp/v2/podcast?_embed&slug=${slug}&per_page=1`,
      { next: { revalidate: 60 } },
    );

    const data = await res.json();

    if (!data || data.length === 0) {
      return {
        title: "Podcast | Aarna Law",
        description:
          "Explore our podcasts on law, business, and sustainability.",
      };
    }



    const post = data[0];
    const acf = post.acf || {};
    const fallbackDesc =
      post.excerpt?.rendered?.replace(/<[^>]+>/g, "") ||
      "Explore our podcasts on law, business, and sustainability.";
    const fallbackImg =
      post.episode_featured_image ||
      post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
      "/default-og.png";

    return {
      title: acf.meta_title || post.title?.rendered || "Podcast | Aarna Law",
      description: acf.meta_description || fallbackDesc,
      openGraph: {
        title: acf.meta_title || post.title?.rendered,
        description: acf.meta_description || fallbackDesc,
        images: [fallbackImg],
      },
      twitter: {
        card: "summary_large_image",
        title: acf.meta_title || post.title?.rendered,
        description: acf.meta_description || fallbackDesc,
        images: [fallbackImg],
      },
    };
  } catch (err) {
    console.error("SEO metadata fetch error:", err);
    return {
      title: "Podcast | Aarna Law",
      description: "Explore our podcasts on law, business, and sustainability.",
    };
  }
}
// page
export default function Page({ params }) {
  return <PodcastPost params={params} />;
}
