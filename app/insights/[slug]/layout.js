// app/insights/[slug]/layout.js
export async function generateMetadata({ params }) {
  const { slug } = params;

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

  const metaTitle = blog.acf?.meta_title || blog.title.rendered;
  const metaDescription = blog.acf?.meta_description || "Read more about this topic.";
  const imageUrl = blog._embedded?.["wp:featuredmedia"]?.[0]?.source_url?.startsWith("http")
    ? blog._embedded["wp:featuredmedia"][0].source_url
    : `https://docs.aarnalaw.com${blog._embedded["wp:featuredmedia"][0].source_url}`;

  // ✅ Extract FAQs from ACF
  const faqs = [];
  for (let i = 1; i <= 10; i++) {
    const question = blog.acf?.[`faq_${i}`];
    const answer = blog.acf?.[`faqs_description_${i}`];
    if (question && answer) {
      faqs.push({ question, answer });
    }
  }

  // ✅ Generate JSON-LD for FAQ schema
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

  return {
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
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: blog.title.rendered,
        },
      ],
    },
    // ✅ Pass JSON-LD in metadata
    other: {
      faqJsonLd: faqSchema ? JSON.stringify(faqSchema) : "",
    },
  };
}

export const revalidate = 10;

// ✅ Export layout wrapper
export default function InsightPostLayout({ children }) {
  return <>{children}</>;
}
