export const metadata = {
  title: "Explore Career Opportunities | Aarna Law - Premier Law Firm in India",
  description:
    "Join us, a dynamic law practice firm based in Bangalore, India,  and be part of our success story. Explore rewarding careers and internship opportunities with us now",
  metadataBase: new URL("https://www.aarnalaw.com"),
  alternates: {
    canonical: "/careers",
  },
  openGraph: {
    title: "Explore Career Opportunities | Aarna Law - Premier Law Firm in India",
    description:
      "Join us, a dynamic law practice firm based in Bangalore, India,  and be part of our success story. Explore rewarding careers and internship opportunities with us now",
    url: "/careers",
    images: "/Careers/CareersBanner.jpg",
  },
};

export default function RootLayout({ children }) {
  return <>{children}</>;
}
