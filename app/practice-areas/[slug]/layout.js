// app/practice-areas/[slug]/layout.js

export async function generateMetadata({ params }) {
  try {
    const response = await fetch(
      `https://docs.aarnalaw.com/wp-json/wp/v2/practice-areas?_embed&slug=${params.slug}`
    );

    if (!response.ok) {
      return {
        title: "India's leading law firm offering legal counsel in practice areas",
        description:
          "We offer legal services for a range of practice areas including corporate advisory, arbitration, mediation, litigation, IP, risk assessment, and compliance",
        metadataBase: new URL("https://www.aarnalaw.com/"),
        openGraph: {
          url: `https://www.aarnalaw.com/practice-area/${params.slug}`,
          title: "India's leading law firm offering legal counsel in practice areas",
          description:
            "We offer legal services for a range of practice areas including corporate advisory, arbitration, mediation, litigation, IP, risk assessment, and compliance",
          images: [
            {
              url: "/aarnalaw_new_banner.jpg",
              width: 800,
              height: 600,
              alt: "India's leading law firm offering legal counsel in practice areas",
            },
          ],
        },
      };
    }

    const postData = await response.json();
    const post = postData?.[0];

    if (!post) {
      return {
        title: "India's leading law firm offering legal counsel in practice areas",
        description:
          "We offer legal services for a range of practice areas including corporate advisory, arbitration, mediation, litigation, IP, risk assessment, and compliance",
        metadataBase: new URL("https://www.aarnalaw.com/"),
        openGraph: {
          url: `https://www.aarnalaw.com/practice-area/${params.slug}`,
          title: "India's leading law firm offering legal counsel in practice areas",
          description:
            "We offer legal services for a range of practice areas including corporate advisory, arbitration, mediation, litigation, IP, risk assessment, and compliance",
          images: [
            {
              url: "/aarnalaw_new_banner.jpg",
              width: 800,
              height: 600,
              alt: "India's leading law firm offering legal counsel in practice areas",
            },
          ],
        },
      };
    }

    const faqs = [];
    for (let i = 1; i <= 10; i++) {
      const question = post?.acf?.[`faq_${i}`];
      const answer = post?.acf?.[`faqs_description_${i}`];
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
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
        : null;

    const metaTitle = post?.acf?.meta_title || "India's leading law firm offering legal counsel in practice areas";
    const metaDescription = post?.acf?.meta_description || "";

    const metadata = {
      title: metaTitle,
      description: metaDescription,
      metadataBase: new URL("https://www.aarnalaw.com/"),
      openGraph: {
        url: `https://www.aarnalaw.com/practice-area/${params.slug}`,
        title: metaTitle,
        description: metaDescription,
        images: [
          {
            url: "/aarnalaw_new_banner.jpg",
            width: 800,
            height: 600,
            alt: "Practice Area",
          },
        ],
      },
      // Optional: expose FAQ JSON as a string if needed elsewhere
      other: {
        faqJsonLd: faqSchema ? JSON.stringify(faqSchema) : "",
      },
    };

    // Use mobile_banner if available
    if (post?.acf?.mobile_banner?.url) {
      metadata.openGraph.images = [
        {
          url: post.acf.mobile_banner.url,
          width: 800,
          height: 600,
          alt: post?.acf?.meta_title || "Practice Area",
        },
      ];
    }

    return metadata;
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "India's leading law firm offering legal counsel in practice areas",
      description:
        "We offer legal services for a range of practice areas including corporate advisory, arbitration, mediation, litigation, IP, risk assessment, and compliance",
      metadataBase: new URL("https://www.aarnalaw.com/"),
      openGraph: {
        url: `https://www.aarnalaw.com/practice-area/${params.slug}`,
        title: "India's leading law firm offering legal counsel in practice areas",
        description:
          "We offer legal services for a range of practice areas including corporate advisory, arbitration, mediation, litigation, IP, risk assessment, and compliance",
        images: [
          {
            url: "/aarnalaw_new_banner.jpg",
            width: 800,
            height: 600,
            alt: "India's leading law firm offering legal counsel in practice areas",
          },
        ],
      },
    };
  }
}

export default async function RootLayout({ children, params }) {
  try {
    const response = await fetch(
      `https://docs.aarnalaw.com/wp-json/wp/v2/practice-areas?_embed&slug=${params.slug}`
    );
    const postData = await response.json();
    const post = postData?.[0];

    if (!post) {
      return <>{children}</>;
    }

    const faqs = [];
    for (let i = 1; i <= 10; i++) {
      const question = post?.acf?.[`faq_${i}`];
      const answer = post?.acf?.[`faqs_description_${i}`];
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
              __html: JSON.stringify(faqSchema, null, 2), // pretty format for dev/readability
            }}
          />
        )}
        {children}
      </>
    );
  } catch (error) {
    console.error("Error in RootLayout:", error);
    return <>{children}</>;
  }
}
