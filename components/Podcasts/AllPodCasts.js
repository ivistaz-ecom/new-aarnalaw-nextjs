"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import configData from "../../config.json";

function AllPodCasts({ searchTerm, initialData = [] }) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const audioRefs = useRef({});
  const domain = typeof window !== "undefined" ? window.location.hostname : "";

  const fetchContent = async (pageNum = 1, append = false) => {
    if (append) setLoading(true);

    try {
      let server;
      if (
        domain === `${configData.LIVE_SITE_URL}` ||
        domain === `${configData.LIVE_SITE_URL_WWW}`
      ) {
        server = `${configData.LIVE_PRODUCTION_SERVER_ID}`;
      } else if (domain === `${configData.STAGING_SITE_URL}`) {
        server = `${configData.STAG_PRODUCTION_SERVER_ID}`;
      } else {
        server = `${configData.STAG_PRODUCTION_SERVER_ID}`;
      }

      const response = await fetch(
        `${configData.SERVER_URL}podcast?_embed&status[]=publish&production_mode[]=${server}&per_page=6&page=${pageNum}`,
      );

      if (!response.ok) throw new Error("Failed to fetch data");

      const result = await response.json();

      if (Array.isArray(result)) {
        const transformedData = result.map((item) => ({
          ...item,
          featured_image_url: item.episode_featured_image || "",
        }));

        if (append) setData((prev) => [...prev, ...transformedData]);
        else setData(transformedData);

        setHasMore(result.length === 6);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  const loadMore = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    await fetchContent(nextPage, true);
  };

  const filteredInsights = data.filter((d) =>
    d.title.rendered.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex flex-col md:pt-10">
      <div className="container mx-auto grid w-full gap-4 p-4 md:grid-cols-2 md:p-0">
        {filteredInsights.length > 0 ? (
          filteredInsights.map((item) => (
            <div
              key={item.id}
              className="rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="relative">
                {item.featured_image_url && (
                  <Image
                    src={item.featured_image_url}
                    alt={item.title?.rendered || "Podcast Image"}
                    className="w-full rounded-t-lg lg:h-[300px]"
                    width={500}
                    height={300}
                  />
                )}
              </div>
              <div className="p-5">
                <p
                  className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white"
                  dangerouslySetInnerHTML={{ __html: item.title?.rendered }}
                />
                <p
                  className="text-gray-700 dark:text-gray-300"
                  dangerouslySetInnerHTML={{
                    __html: item.excerpt.rendered.slice(0, 100) + "...",
                  }}
                />
                {/* ✅ Fixed Read More button */}
                <Link
                  href={`/podcasts/${item.slug}`}
                  className="mt-3 inline-block rounded   py-2 font-semibold text-[#E6331C]"
                >
                  Listen more
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-1 mt-4 text-center text-gray-500 md:col-span-2">
            No related post found
          </div>
        )}
      </div>

    
    </div>
  );
}

export default AllPodCasts;
