"use client";
import React, { useState, useEffect, useCallback, useContext } from "react";
import Link from "next/link";
import configData from "../../config.json";
import { LanguageContext } from "../../app/context/LanguageContext";

export default function PracticeArea() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(100);

  const domain = typeof window !== "undefined" ? window.location.hostname : "";
  const { translations, language } = useContext(LanguageContext);

  const fetchContent = useCallback(async () => {
    setLoading(true);
    try {
      let server;
      if (domain === configData.LIVE_SITE_URL) {
        server = configData.LIVE_PRODUCTION_SERVER_ID;
      } else {
        server = configData.STAG_PRODUCTION_SERVER_ID;
      }

      const response = await fetch(
        `${configData.SERVER_URL}practice-areas?_embed&status[]=publish&production_mode[]=${server}&per_page=${page}`
      );
      const result = await response.json();

      if (Array.isArray(result)) {
        const sortedData = result.sort((a, b) =>
          a.title.rendered.toLowerCase().localeCompare(b.title.rendered.toLowerCase())
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
  }, [page, domain]);

  useEffect(() => {
    fetchContent();
  }, [page, fetchContent]);

  // Split data into three columns
  const columns = [[], [], []];
  data.forEach((item, index) => {
    columns[index % 3].push(item);
  });

  return (
    <div className="bg-[#151C4A] py-12">
      <div className="mx-auto md:w-10/12">
        <h2 className="mb-12 text-center text-3xl font-bold text-white">
          {translations.aboutPracticeAreaTitle.aboutPracticeAreaName}
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {columns.map((column, colIndex) => (
            <div key={colIndex} className={`space-y-4 px-6 ${colIndex < 2 ? "md:border-r md:border-gray-500" : ""}`}>
              {column.map((item, index) => {
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
                                : item.title.rendered;

                return (
                  <div key={index} className="group relative overflow-hidden md:p-4 py-2 text-white hover:text-white lg:p-1">
                    <Link href={`/practice-areas/${item.slug}`}>
                      <p
                        dangerouslySetInnerHTML={{ __html: title }}
                        className="relative z-10 font-semibold lg:font-normal"
                      ></p>
                    </Link>
                    <div className="absolute inset-0 z-0 origin-left scale-x-0 transform bg-gradient-to-r from-custom-red to-transparent transition-transform duration-300 group-hover:scale-x-100"></div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
