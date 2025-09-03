export const metadata = {
  title: "Learn About Aarna Law | Boutique Legal Services in India",
  description:
    "Tailored Legal Solutions at Aarna Law | Trusted Advisors Offering International Legal Solutions from India",
  metadataBase: new URL("https://www.aarnalaw.com"),
  alternates: {
    canonical: "/about-us",
  },
  openGraph: {
    title: "Learn About Aarna Law | Boutique Legal Services in India",
    description:
      "Tailored Legal Solutions at Aarna Law | Trusted Advisors Offering International Legal Solutions from India",
    url: "/about-us",
    images: "/aboutUs/aboutusbanner.png",
  },
};

export default function RootLayout({ children }) {
  return <>{children}</>;
}
