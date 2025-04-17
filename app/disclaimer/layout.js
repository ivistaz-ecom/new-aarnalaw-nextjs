export const metadata = {
    title: "Contact Us | Law Firm in India - Aarna Law",
    description:
      "Get in touch with the internationally recognised law firm in India - Aarna Law. Contact us now for professional legal assistance.",
    metadataBase: new URL("https://www.aarnalaw.com"),
    alternates: {
      canonical: "/disclaimer",
    },
    openGraph: {
      title: "Contact Us | Law Firm in India - Aarna Law",
      description:
        "Get in touch with the internationally recognised law firm in India - Aarna Law. Contact us now for professional legal assistance.",
      url: "/disclaimer",
      images: "/aarnalaw_new_banner.jpg",
    },
  };
  
  export default function RootLayout({ children }) {
    return <>{children}</>;
  }
  
  // we need to change title and description