export const metadata = {
    title: "Customer Testimonials | Aarna Law",
    description:
      "Discover why clients choose Aarna Law as their legal advisors. Read customer testimonials and reviews of our lawyer's firm in Bangalore.",
    metadataBase: new URL("https://www.aarnalaw.com"),
    alternates: {
      canonical: "/testimonials",
    },
    openGraph: {
      title: "Customer Testimonials | Aarna Law",
      description:
        "Discover why clients choose Aarna Law as their legal advisors. Read customer testimonials and reviews of our lawyer's firm in Bangalore.",
      url: "/testimonials",
      images: "/aarnalaw_new_banner.jpg",
    },
  };
  
  export default function RootLayout({ children }) {
    return <>{children}</>;
  }
  