// app/insights/[slug]/layout.js

export async function generateMetadata({ params }) {
  const { slug } = params;

  try {
    const res = await fetch(
      `https://docs.aarnalaw.com/wp-json/wp/v2/posts?_embed&slug=${slug}`,
      { cache: "no-store" }
    );

    const data = await res.json();

    if (!data || data.length === 0) {
      return {
        title: "Blog Not Found | Aarna Law",
        description: "The blog you are looking for is not available.",
        alternates: {
          canonical: "https://www.aarnalaw.com/insights/",
        },
      };
    }

    const blog = data[0];

    const metaTitle = blog.acf?.meta_title || blog.title?.rendered || "Insights | Aarna Law";
    const metaDescription = blog.acf?.meta_description || "Read more about this topic.";

    // Get the featured image URL safely
    let imageUrl = null;
    const featuredMedia = blog._embedded?.["wp:featuredmedia"]?.[0];
    if (featuredMedia?.source_url) {
      imageUrl = featuredMedia.source_url.startsWith("http")
        ? featuredMedia.source_url
        : `https://docs.aarnalaw.com${featuredMedia.source_url}`;
    }

    // FAQs from ACF
    const faqs = [];
    for (let i = 1; i <= 10; i++) {
      const question = blog.acf?.[`faq_${i}`];
      const answer = blog.acf?.[`faqs_description_${i}`];
      if (question && answer) {
        faqs.push({ question, answer });
      }
    }

    // Generate FAQ JSON-LD
    const faqSchema =
      faqs.length > 0
        ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map((faq) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer,
            },
          })),
        }
        : null;

    const metadata = {
      title: metaTitle,
      description: metaDescription,
      alternates: {
        canonical: `https://www.aarnalaw.com/insights/${slug}`,
      },
      openGraph: {
        title: metaTitle,
        description: metaDescription,
        url: `https://www.aarnalaw.com/insights/${slug}`,
        type: "article",
      },
      // Optionally pass FAQ schema as JSON string if needed elsewhere
      other: {
        faqJsonLd: faqSchema ? JSON.stringify(faqSchema) : "",
      },
    };

    // Only add images if we have a valid imageUrl
    if (imageUrl) {
      metadata.openGraph.images = [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: blog.title?.rendered || "Insights",
        },
      ];
    }

    return metadata;
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Insights | Aarna Law",
      description: "Read more about this topic.",
      alternates: {
        canonical: `https://www.aarnalaw.com/insights/${slug}`,
      },
    };
  }
}

export const revalidate = 10;

export default async function InsightPostLayout({ children, params }) {
  const { slug } = params;

  try {
    const res = await fetch(
      `https://docs.aarnalaw.com/wp-json/wp/v2/posts?_embed&slug=${slug}`,
      { cache: "no-store" }
    );
    const data = await res.json();
    const blog = data?.[0];

    if (!blog) {
      return <>{children}</>;
    }

    const faqs = [];
    for (let i = 1; i <= 10; i++) {
      const question = blog?.acf?.[`faq_${i}`];
      const answer = blog?.acf?.[`faqs_description_${i}`];
      if (question && answer) {
        faqs.push({ question, answer });
      }
    }

    const faqSchema =
      faqs.length > 0
        ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map((faq) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer,
            },
          })),
        }
        : null;

    return (
      <>
        {faqSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(faqSchema, null, 2), // <- pretty-print with 2-space indentation
            }}
          />
        )}
        {children}
      </>
    );
  } catch (error) {
    console.error("Error in InsightPostLayout:", error);
    return <>{children}</>;
  }
}
