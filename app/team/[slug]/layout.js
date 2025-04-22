export async function generateMetadata({ params }) {
    const { slug } = params;
  
    // Fetch data with cache disabled to ensure fresh data
    const res = await fetch(
      `https://docs.aarnalaw.com/wp-json/wp/v2/team?_embed&slug=${slug}`,
      { cache: "no-store" } // Prevent caching issues
    );
  
    const data = await res.json();
  
    // Handle case where post is not found
    if (!data || data.length === 0) {
      return {
        title: "Blog Not Found | Aarna Law",
        description: "The blog you are looking for is not available.",
        alternates: {
          canonical: "https://www.aarnalaw.com/team/",
        },
      };
    }
  
    const blog = data[0];
    const metaDescription = blog.acf?.meta_description || "Read more about this topic.";
  
    // Get featured image URL
    const imageUrl = blog._embedded?.["wp:featuredmedia"]?.[0]?.source_url?.startsWith("http")
      ? blog._embedded["wp:featuredmedia"][0].source_url
      : `https://docs.aarnalaw.com${blog._embedded["wp:featuredmedia"][0].source_url}`;
  
    return {
      title: blog.acf?.meta_title || blog.title.rendered,
      description: metaDescription,
      alternates: {
        canonical: `https://www.aarnalaw.com/team/${slug}`,
      },
      openGraph: {
        title: blog.acf?.meta_title || blog.title.rendered,
        description: metaDescription,
        url: `https://www.aarnalaw.com/team/${slug}`,
        type: "article",
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: blog.title.rendered,
          },
        ],
      },
    };
  }
  
  // Force revalidation every 10 seconds to get the latest data
  export const revalidate = 10;
  
  // ✅ Default export - A React component (needed for Next.js to work)
  export default function InsightPostLayout({ children }) {
    return <>{children}</>;
  }
  