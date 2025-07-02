import { ThemeModeScript } from "flowbite-react";
import "./globals.css";
import Header from "../components/Header/NavBar";
import Footer from "../components/Footer/Footer";
import Script from "next/script";
import { headers } from "next/headers";
import { LanguageProvider } from "../app/context/LanguageContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = headers();
  const host = headersList.get("host") || "";
  const isStaging = host.includes("website.aarnalaw.com");

  return (
    <html lang="en">
      <head>
        <meta
          name="robots"
          content={isStaging ? "noindex, nofollow" : "index, follow"}
        />
        <link rel="icon" href="/favicon.png" sizes="any" />
        <ThemeModeScript />
        <meta
          name="msvalidate.01"
          content="A827D56A91561DA21E2E94273F4D52D5"
        />
      </head>
      <body>
        <LanguageProvider>
          <Header />
          {children}
          <Footer />
        </LanguageProvider>

        {/* ✅ Pretty-formatted JSON-LD for Schema */}
        <Script
          id="legal-service-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              {
                "@context": "https://schema.org",
                "@type": "LegalService",
                name: "Aarna Law",
                url: "https://aarnalaw.com/",
                logo: "https://aarnalaw.com/logo/aarna-logo.png",
                image: "https://aarnalaw.com/whatWeDo/What_we_do.jpg",
                description:
                  "Aarna Law is a leading Indian law firm specializing in arbitration, litigation, and corporate advisory services with a global perspective.",
                telephone: "+91-8023566792",
                address: {
                  "@type": "PostalAddress",
                  streetAddress:
                    "No.5, Adhokshaja, 2nd Main Rd, Vyalikaval, Guttahalli, Bengaluru, Karnataka 560003",
                  addressLocality: "BENGALURU",
                  addressRegion: "Karnataka",
                  postalCode: "560003",
                  addressCountry: "IN",
                },
                sameAs: [
                  "https://www.linkedin.com/company/aarna-law1/",
                ],
                areaServed: "India",
                founder: [
                  {
                    "@type": "Person",
                    name: "Shreyas Jayasimha",
                  },
                  {
                    "@type": "Person",
                    name: "Kamala Naganand",
                  },
                ],
                employee: [
                  {
                    "@type": "Person",
                    name: "Evneet Kaur Uppal",
                    jobTitle: "Partner",
                  },
                  {
                    "@type": "Person",
                    name: "Meghna Talwar",
                    jobTitle: "Partner - Litigation and Securities Law",
                  },
                  {
                    "@type": "Person",
                    name: "Spandana Ashwath",
                    jobTitle: "Partner",
                  },
                  {
                    "@type": "Person",
                    name: "Apoorva Guruprasad",
                    jobTitle: "Partner",
                  },
                ],
                review: [
                  {
                    "@type": "Review",
                    author: "Naveen Reddy",
                    datePublished: "2025-01-01",
                    reviewBody:
                      "Aarna law has supported me in all my legal needs from drafting employee agreement to commercial agreements. All business-related issues were addressed and resolved by them with ease and attention to detail. They are the people I turn to for all my legal requirements.",
                    reviewRating: {
                      "@type": "Rating",
                      ratingValue: "5",
                      bestRating: "5",
                    },
                  },
                  {
                    "@type": "Review",
                    author: "Pawan Jain",
                    datePublished: "2025-01-01",
                    reviewBody:
                      "Ms Kamala and her entire team is uber professional in their approach and open to feedback at all times. They showed a high degree of commitment to the work and respectful of deadlines and expectations. It was indeed a pleasure to work with them and we look forward to work with them in future.",
                    reviewRating: {
                      "@type": "Rating",
                      ratingValue: "5",
                      bestRating: "5",
                    },
                  },
                  {
                    "@type": "Review",
                    author: "Tony Hales",
                    datePublished: "2025-01-01",
                    reviewBody:
                      "Thank you, Shreyas and the team, at Aarna Law for your initial counsel and subsequent delivery of legal services. Not the run of the mill case, Aarna Law was able to cater to our specific needs on time and within budget - truly a professional firm with knowledge, experience and network across many domains.",
                    reviewRating: {
                      "@type": "Rating",
                      ratingValue: "5",
                      bestRating: "5",
                    },
                  },
                  {
                    "@type": "Review",
                    author: "Vinay Bhagwan",
                    datePublished: "2025-01-01",
                    reviewBody:
                      "My experience with Aarna Law has been nothing short of exceptional. Shreyas and Kamala manage the firm with remarkable vision and dedication. Their leadership, strategic acumen, and forward-thinking use of technology make Aarna Law a standout. They are ethical, innovative, and truly client-focused.",
                    reviewRating: {
                      "@type": "Rating",
                      ratingValue: "5",
                      bestRating: "5",
                    },
                  },
                  {
                    "@type": "Review",
                    author: "Pallavi Rao and Arun Kiezpadathil",
                    datePublished: "2025-01-01",
                    reviewBody:
                      "We have been on the hunt for a law firm that was personable, capable, responsive and understood our business and Aarna law has been all of those things and more for us. We found Aarna law after a global search and are thrilled that we did.",
                    reviewRating: {
                      "@type": "Rating",
                      ratingValue: "5",
                      bestRating: "5",
                    },
                  },
                  {
                    "@type": "Review",
                    author: "Pranav Nahar",
                    datePublished: "2025-01-01",
                    reviewBody:
                      "Manjushree and the team at Aarna Law handled our fintech legal structure with clarity and attention to detail. They addressed all our questions with patience and professionalism. It was a pleasure working with them.",
                    reviewRating: {
                      "@type": "Rating",
                      ratingValue: "5",
                      bestRating: "5",
                    },
                  },
                  {
                    "@type": "Review",
                    author: "Aashika Abraham",
                    datePublished: "2025-01-01",
                    reviewBody:
                      "I have thoroughly enjoyed working with Shreyas & Kamala and their team. Their legal opinion always comes with wisdom, perspective, and social-political context. Their commitment to justice shows in everything they do.",
                    reviewRating: {
                      "@type": "Rating",
                      ratingValue: "5",
                      bestRating: "5",
                    },
                  },
                  {
                    "@type": "Review",
                    author: "Mukesh Shah",
                    datePublished: "2025-01-01",
                    reviewBody:
                      "We had the pleasure of working with Aarna Law, especially Shreyas Jayasimha, on several complex matters. Their holistic legal approach and business-aligned advice were exceptional. They were true partners in our business journey.",
                    reviewRating: {
                      "@type": "Rating",
                      ratingValue: "5",
                      bestRating: "5",
                    },
                  },
                  {
                    "@type": "Review",
                    author: "Kunal Shah",
                    datePublished: "2025-01-01",
                    reviewBody:
                      "OnePaper is entirely satisfied with the services provided by Aarna Law. Vidhisha, Punti, and team demonstrated exceptional skill and helped us secure a favorable order. Their commitment and support are much appreciated.",
                    reviewRating: {
                      "@type": "Rating",
                      ratingValue: "5",
                      bestRating: "5",
                    },
                  },
                ],
              },
              null,
              2 // 👈 This is what makes it readable & line-wrap friendly
            ),
          }}
          strategy="afterInteractive"
        />

        {/* GTM noscript fallback */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WJW9WNHQ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        {/* External scripts */}
        <Script src="/tracking.js" strategy="afterInteractive" />
        <Script
          src="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YWL8EWE9MB"
          strategy="afterInteractive"
          async
        />
      </body>
    </html>
  );
}
