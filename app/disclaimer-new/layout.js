export const metadata = {
  title: "Disclaimer | Aarna Law - Law Firm in India",
  description:
    "Read the disclaimer for Aarna Law, an internationally recognised law firm in India. Learn about the limitations of information provided on our website.",
  metadataBase: new URL("https://www.aarnalaw.com"),
  alternates: {
    canonical: "/disclaimer",
  },
  robots: {
    index: false,   // prevents indexing
    follow: false,  // prevents following links
  },
  openGraph: {
    title: "Disclaimer | Aarna Law - Law Firm in India",
    description:
      "Read the disclaimer for Aarna Law, an internationally recognised law firm in India. Learn about the limitations of information provided on our website.",
    url: "/disclaimer",
    images: "/aarnalaw_new_banner.jpg",
  },
};

export default function RootLayout({ children }) {
  return <>{children}</>;
}
