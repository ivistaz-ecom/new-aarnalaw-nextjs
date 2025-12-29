export async function generateMetadata({ params }) {
  // console.log("Fetching data for slug:", params.slug);

  try {
    const response = await fetch(
      `https://docs.aarnalaw.com/wp-json/wp/v2/publications?embed&slug=${params.slug}`,
    );

    if (!response.ok) {
      console.error("Failed to fetch post data:", response.statusText);
      return {
        title: "Publications| Aarna Law",
        description: "Publications| Aarna Law",
        metadataBase: new URL("https://www.aarnalaw.com/"),
        openGraph: {
          url: `https://www.aarnalaw.com/publications/${params.slug}`,
          title: "Publications| Aarna Law",
          description: "Publications| Aarna Law",
          images: [
            {
              url: "/aarnalaw_new_banner.jpg",
              width: 800,
              height: 600,
              alt: "Publications| Aarna Law",
            },
          ],
        },
      };
    }

    const postData = await response.json();

    // Ensure postData has data
    const post = postData?.[0];

    // console.log("Fetched post data:", post);

    const metaTitle = post?.acf?.meta_title
      ? `${post.acf.meta_title} - Publications| Aarna Law`
      : "Publications| Aarna Law";
    const metaDescription = post?.acf?.meta_description || "Publications| Aarna Law";

    const metadata = {
      title: metaTitle,
      description: metaDescription,
      metadataBase: new URL("https://www.aarnalaw.com/publications/"),
      openGraph: {
        url: `https://www.aarnalaw.com/publications/${params.slug}`,
        title: metaTitle,
        description: metaDescription,
        images: [
          {
            url: "/aarnalaw_new_banner.jpg",
            width: 800,
            height: 600,
            alt: "Publications| Aarna Law",
          },
        ],
      },
    };

    // Use mobile_banner if available
    if (post?.acf?.mobile_banner?.url) {
      metadata.openGraph.images = [
        {
          url: post.acf.mobile_banner.url,
          width: 800,
          height: 600,
          alt: post?.acf?.meta_title || "Publications| Aarna Law",
        },
      ];
    }

    return metadata;
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Publications| Aarna Law",
      description: "Publications| Aarna Law",
      metadataBase: new URL("https://www.aarnalaw.com/"),
      openGraph: {
        url: `https://www.aarnalaw.com/publications/${params.slug}`,
        title: "Publications| Aarna Law",
        description: "Publications| Aarna Law",
        images: [
          {
            url: "/aarnalaw_new_banner.jpg",
            width: 800,
            height: 600,
            alt: "Publications| Aarna Law",
          },
        ],
      },
    };
  }
}

export default function RootLayout({ children }) {
  return <>{children}</>;
}
