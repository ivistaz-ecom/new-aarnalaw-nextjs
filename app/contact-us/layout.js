export const metadata = {
  title: "Get in Touch with Aarna Law | Boutique Law Firm",
  description:
    "Contact us, a Bangalore-based law firm, for legal assistance and guidance.",
  metadataBase: new URL("https://www.aarnalaw.com"),
  alternates: {
    canonical: "/contact-us",
  },
  openGraph: {
    title: "Get in Touch with Aarna Law | Boutique Law Firm",
    description:
      "Contact us, a Bangalore-based law firm, for legal assistance and guidance.",
    url: "/contact-us",
    images: "/aarnalaw_new_banner.jpg ",
  },
};

export default function RootLayout({ children }) {
  return <>{children}</>;
}
