export async function generateMetadata({ params }) {
  const { slug } = params;

  try {
    const res = await fetch(
      `https://docs.aarnalaw.com/wp-json/wp/v2/posts?_embed&slug=${slug}`
    );
    const data = await res.json();

    if (!data || data.length === 0) {
      return {
        title: "Blog Not Found | Aarna Law",
        description: "The blog you are looking for is not available.",
      };
    }

    const blog = data[0];

    // Get the featured image URL safely
    let imageUrl = null;
    const featuredMedia = blog._embedded?.["wp:featuredmedia"]?.[0];
    if (featuredMedia?.source_url) {
      imageUrl = featuredMedia.source_url.startsWith("http")
        ? featuredMedia.source_url
        : `https://docs.aarnalaw.com${featuredMedia.source_url}`;
    }

    const metadata = {
      title: blog.acf?.meta_title || blog.title?.rendered || "Aarna News | Aarna Law",
      description: blog.acf?.meta_description || "Read more about this topic.",
      openGraph: {
        title: blog.acf?.meta_title || blog.title?.rendered || "Aarna News | Aarna Law",
        description: blog.acf?.meta_description || "Read more about this topic.",
        url: `https://www.aarnalaw.com/aarna-news/${slug}`,
        type: "article",
      },
    };

    // Only add images if we have a valid imageUrl
    if (imageUrl) {
      metadata.openGraph.images = [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: blog.title?.rendered || "Aarna News",
        },
      ];
    }

    return metadata;
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Aarna News | Aarna Law",
      description: "Read more about this topic.",
    };
  }
}

// ✅ Default export - A React component (needed for Next.js to work)
export default function InsightPostLayout({ children }) {
  return <>{children}</>;
}
