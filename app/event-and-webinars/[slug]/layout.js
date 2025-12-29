import DisclaimerModal from "@/components/DisclaimerModel/DisclaimerModal";

export async function generateMetadata({ params }) {
  const { slug } = params;

  const res = await fetch(
    `https://docs.aarnalaw.com/wp-json/wp/v2/webinars_and_events?_embed&slug=${slug}`
  );
  const data = await res.json();

  if (!data || data.length === 0) {
    return {
      title: "Event Not Found | Aarna Law",
      description: "The event you are looking for is not available.",
    };
  }

  const event = data[0];

  // Get the featured image URL safely
  const imageUrl = event._embedded?.["wp:featuredmedia"]?.[0]?.source_url?.startsWith("http")
    ? event._embedded["wp:featuredmedia"][0].source_url
    : `https://docs.aarnalaw.com${event._embedded?.["wp:featuredmedia"]?.[0]?.source_url || ""}`;

  return {
    title: event.acf?.meta_title || event.title.rendered,
    description: event.acf?.meta_description || "Read more about this event.",
    openGraph: {
      title: event.acf?.meta_title || event.title.rendered,
      description: event.acf?.meta_description || "Read more about this event.",
      url: `https://www.aarnalaw.com/event-and-webinars/${slug}`,
      type: "article",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: event.title.rendered,
        },

        
      ],
    },
  };
}

// Default export - A React component (needed for Next.js to work)
export default function EventPostLayout({ children }) {
  return (
    <>
      <DisclaimerModal />
      {children}
    </>
  );
}
