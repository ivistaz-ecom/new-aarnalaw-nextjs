"use client";
import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import ContactModal from "@/components/ModalContact/page";
import { initFlowbite } from "flowbite";
import { LanguageContext } from "../../../app/context/LanguageContext"; // Import LanguageContext

function PostDetails({ details, partnersData, slug, title }) {
  const { language, translations } = useContext(LanguageContext); // Get selected language
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://docs.aarnalaw.com/wp-json/wp/v2/industries?_embed&per_page=100`
        );
        const result = await response.json();

        if (Array.isArray(result)) {
          // Sort the data alphabetically by title
          const sortedData = result.sort((a, b) =>
            a.title.rendered.localeCompare(b.title.rendered)
          );
          setData(sortedData);
        } else {
          console.error("Expected an array but got:", result);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    initFlowbite();
  }, []);

  // Check if there is any valid partner data
  const hasValidPartnerData =
    partnersData?.partnerNames?.some((name) => name) ||
    partnersData?.partnerImages?.some((image) => image) ||
    partnersData?.partnerDesignations?.some((designation) => designation);

  return (
    <div className="flex w-full flex-col lg:flex-row">
      <div className="inner-content lg:w-9/12 lg:p-14">
        {/* Select description based on selected language */}
        <div className="prose px-6 pt-8 lg:px-20 lg:pt-0 [&_ol]:ml-8 [&_li]:ml-8">
          <div
            dangerouslySetInnerHTML={{
              __html:
                language === "ta" && details?.acf?.tamil_description
                  ? details.acf.tamil_description
                  : language === "kn" && details?.acf?.kannada_description
                    ? details.acf.kannada_description
                    : language === "te" && details?.acf?.telugu_description
                      ? details.acf.telugu_description
                      : language === "hi" && details?.acf?.hindi_description
                        ? details.acf.hindi_description
                        : language === "ml" && details?.acf?.malayalam_description
                          ? details.acf.malayalam_description
                          : language === "mr" && details?.acf?.marathi_description
                            ? details.acf.marathi_description
                            : language === "gu" && details?.acf?.gujarati_description
                              ? details.acf.gujarati_description
                              : details?.acf?.description, // Default to English
            }}
          />
        </div>

        <div className="flex w-full justify-center lg:justify-start lg:px-20">
          <ContactModal
            btnName={translations.contactOurExpertsTitle.contactOurExperts}
            textColor="text-black"
            modalTitle={title}
            btnType="contactPartner"
            id="contactPartner"
          />
        </div>
      </div>

      {/* Sidebar */}
      <div className="bg-gray-50 lg:w-3/12">
        {partnersData?.partnerNames?.map((name, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-start p-14 text-center"
          >
            {partnersData.partnerImages?.[index] && (
              <Image
                src={partnersData.partnerImages[index]}
                alt={name}
                className="mb-4 size-[200px] rounded-full bg-[#0e1333]"
                width={200}
                height={200}
                loading="lazy"
              />
            )}
            {name && (
              <p className="text-lg font-bold text-custom-red">{name}</p>
            )}
            {partnersData.partnerDesignations?.[index] && (
              <p className="text-sm font-semibold">
                {partnersData.partnerDesignations[index]}
              </p>
            )}
          </div>
        ))}

        {/* Show 'CONTACT PARTNER' only if there is partner data */}
        {hasValidPartnerData && (
          <div className="flex w-full justify-center">
            <ContactModal
              btnName="CONTACT PARTNER"
              textColor="text-black"
              modalTitle={title}
              btnType="contactPartner"
              id="contactPartner"
            />
          </div>
        )}

        {/* Quick Links */}
        <div className="w-full md:p-2 md:pt-10 p-6">
          <h2 className="font-bold">Quick Links</h2>
          <hr className="my-4 border-t-2 border-red-500" />
          <ul className="space-y-4 pr-10 text-left text-gray-500 dark:text-gray-400">
            {data.map((item, index) => {
              // Select title based on language
              const title =
                language === "ta" && item.acf.tamil_title
                  ? item.acf.tamil_title
                  : language === "kn" && item.acf.kannada_title
                    ? item.acf.kannada_title
                    : language === "te" && item.acf.telugu_title
                      ? item.acf.telugu_title
                      : language === "hi" && item.acf.hindi_title
                        ? item.acf.hindi_title
                        : language === "ml" && item.acf.malayalam_title
                          ? item.acf.malayalam_title
                          : language === "mr" && item.acf.marathi_title
                            ? item.acf.marathi_title
                            : language === "gu" && item.acf.gujarati_title
                              ? item.acf.gujarati_title
                              : item.title.rendered; // Default to English title

              return (
                <Link
                  href={`/industries/${item.slug}`}
                  className={`flex border-b border-custom-red p-1 hover:text-custom-red ${item.slug === slug ? "font-semibold text-custom-red" : "text-black"
                    }`}
                  key={index}
                >
                  <p dangerouslySetInnerHTML={{ __html: title }} />
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PostDetails;
