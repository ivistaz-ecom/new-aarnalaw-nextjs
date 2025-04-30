"use client";
import React, { useState, useEffect, useCallback, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import configData from "../../config.json";
import { LanguageContext } from "../../app/context/LanguageContext";

function PracticeLists() {
  // Get selected language
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(100);
  const { language, translations } = useContext(LanguageContext);

  const domain = typeof window !== "undefined" ? window.location.hostname : "";

  const fetchContent = useCallback(async () => {
    setLoading(true);
    try {
      let server;
      if (domain === `${configData.LIVE_SITE_URL}`) {
        server = `${configData.LIVE_PRODUCTION_SERVER_ID}`;
      } else if (domain === `${configData.STAGING_SITE_URL}`) {
        server = `${configData.STAG_PRODUCTION_SERVER_ID}`;
      } else {
        server = `${configData.STAG_PRODUCTION_SERVER_ID}`;
      }

      const response = await fetch(
        `${configData.SERVER_URL}practice-areas?_embed&status[]=publish&production_mode[]=${server}&per_page=${page}`
      );

      const practiceAreaData = await response.json();

      if (practiceAreaData.length === 0) {
        setHasMore(false);
      } else {
        const sortedData = practiceAreaData.sort((a, b) =>
          a.title.rendered.localeCompare(b.title.rendered)
        );
        setData(sortedData);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  }, [page, domain]);

  useEffect(() => {
    fetchContent();
  }, [page, fetchContent]);

  return (
    <div>
      <div className="mx-auto w-11/12 py-12">
        <p className="py-4 text-center font-bold text-gray-500">{translations.practiceAreasTitle.practiceAreas}</p>
        <p className="mx-auto text-center text-3xl lg:w-8/12">
          {translations.practiceAreaHeading.practiceAreaHeading}
        </p>
        <p className="py-5 text-justify">
          {translations.practiceAreaPara1.practiceAreaPara1}
        </p>
        <p className=" text-justify">
          {translations.practiceAreaPara2.practiceAreaPara2}
        </p>

        <div className="grid gap-4 pt-12 lg:grid-cols-4 ">
          {loading

            ? [...Array(12)].map((_, index) => (

              <div key={index} className="animate-pulse">
                <div className="h-[200px] w-full bg-gray-300"></div>
                <div className="h-[65px] bg-[#233876]"></div>
              </div>
            ))

            : data.map((item, index) => {
              // Choose title & description based on language selection
              const title =
                language === "ta" && item.acf.tamil_title
                  ? item.acf.tamil_title
                  : language === "kn" && item.acf.kannada_title
                    ? item.acf.kannada_title
                    : language === "te" && item.acf.telugu_title
                      ? item.acf.telugu_title
                      : language === "hi" && item.acf.hindi_title
                      ? item.acf.hindi_title
                      : item.title.rendered;

              const description =
                language === "ta" && item.acf.tamil_description
                  ? item.acf.tamil_description
                  : language === "kn" && item.acf.kannada_description
                    ? item.acf.kannada_description
                    : language === "te" && item.acf.telugu_description
                      ? item.acf.telugu_description
                    : language === "hi" && item.acf.hindi_description
                      ? item.acf.hindi_description
                      : item.acf.description;


              return (
                <Link href={`/practice-areas/${item.slug}`} key={index} className="group block">
                  <div className="overflow-hidden">
                    <Image
                      src={item.acf.banner_image.url}
                      width={400}
                      height={400}
                      className="h-[200px] w-full transition-transform duration-500 ease-in-out group-hover:scale-110"
                      alt={title}
                      loading="lazy"
                    />
                  </div>
                  <div className="flex h-[65px] items-center justify-center bg-[#233876] p-1 text-center font-semibold text-white">
                    <p dangerouslySetInnerHTML={{ __html: title }} />
                  </div>
                </Link>

              );
            })}

        </div>
      </div>
    </div>
  );
}

export default PracticeLists;
