export const metadata = {
  title: "Privacy Policy | Law Firm in India - Aarna Law",
  description:
    "Read Aarna Law's privacy policy to understand how we collect, use, and protect your personal data. Learn about your rights and our commitment to safeguarding your privacy.",
  metadataBase: new URL("https://www.aarnalaw.com"),
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | Law Firm in India - Aarna Law",
    description:
      "Read Aarna Law's privacy policy to understand how we collect, use, and protect your personal data. Learn about your rights and our commitment to safeguarding your privacy.",
    url: "/privacy-policy",
    images: "/aarnalaw_new_banner.jpg",
  },
};

export default function RootLayout({ children }) {
  return <>{children}</>;
}
