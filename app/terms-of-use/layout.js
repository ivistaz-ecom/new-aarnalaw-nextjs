export const metadata = {
    title: "Terms of use | Law Firm in India - Aarna Law",
    description:
      "Get in touch with the internationally recognised law firm in India - Aarna Law. Terms of use now for professional legal assistance.",
    metadataBase: new URL("https://www.aarnalaw.com"),
    alternates: {
      canonical: "/terms of use",
    },
    openGraph: {
      title: "Terms of use | Law Firm in India - Aarna Law",
      description:
        "Get in touch with the internationally recognised law firm in India - Aarna Law. Terms of use now for professional legal assistance.",
      url: "/terms of use",
      images: "/aarnalaw_new_banner.jpg",
    },
  };
  
  export default function RootLayout({ children }) {
    return <>{children}</>;
  }
  
  // we need to change title and description