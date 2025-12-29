"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { initFlowbite } from "flowbite";
import configData from "../../config.json";

// Extract hostname from URL (removes protocol and port)
const getHostnameFromUrl = (url) => {
  try {
    return new URL(url).hostname;
  } catch {
    return url.replace(/^https?:\/\//, "").split(":")[0].split("/")[0];
  }
};

// Get production mode based on domain
const getProductionMode = () => {
  if (typeof window === "undefined") return configData.STAG_PRODUCTION_SERVER_ID;
  
  const hostname = window.location.hostname;
  const liveHostname = getHostnameFromUrl(configData.LIVE_SITE_URL);
  const liveHostnameWww = getHostnameFromUrl(configData.LIVE_SITE_URL_WWW);
  
  const isLiveDomain = hostname === liveHostname || hostname === liveHostnameWww;
  
  return isLiveDomain 
    ? configData.LIVE_PRODUCTION_SERVER_ID 
    : configData.STAG_PRODUCTION_SERVER_ID;
};

function LoadingDots() {
  return (
    <div className="inline-flex items-center text-black">
      Loading
      <span className="loading-dots">
        <span className="dot">.</span>
        <span className="dot">.</span>
        <span className="dot">.</span>
      </span>
      <style jsx>{`
        .loading-dots {
          display: inline-flex;
        }
        .dot {
          animation: dotFade 1.4s infinite;
          opacity: 0;
          margin-left: 2px;
        }
        .dot:nth-child(2) {
          animation-delay: 0.2s;
        }
        .dot:nth-child(3) {
          animation-delay: 0.4s;
        }
        @keyframes dotFade {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function AllEvents({ searchTerm = "", initialData = [] }) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const cat1=481;
  const cat2=12;

  const fetchContent = async (pageNum = 1, append = false) => {
    if (append) {
      setIsLoadingMore(true);
    } else {
      setLoading(true);
    }

    try {
      const productionMode = getProductionMode();
      
      // Fetch Webinars (category 481) and Events (category 12) separately
      const webinarsUrl = `${configData.SERVER_URL}webinars_and_events?_embed&categories[]=${cat1},${cat2}&status[]=publish&production_mode[]=${productionMode}&per_page=6&page=${pageNum}`;
      // const eventsUrl = `${configData.SERVER_URL}webinars_and_events?_embed&categories[]=12&status[]=publish&production_mode[]=${productionMode}&per_page=6&page=${pageNum}`;

      // Fetch both categories in parallel
      const [webinarsResponse, eventsResponse] = await Promise.all([
        fetch(webinarsUrl),
        fetch(eventsUrl)
      ]);
      
      const [webinarsData, eventsData] = await Promise.all([
        webinarsResponse.json(),
        eventsResponse.json()
      ]);
      
      // Combine both arrays and add category type for badge display
      let combinedData = [];
      
      if (Array.isArray(webinarsData)) {
        const webinarsWithType = webinarsData.map(item => ({ ...item, categoryType: 'WEBINARS' }));
        combinedData = [...combinedData, ...webinarsWithType];
      }
      
      if (Array.isArray(eventsData)) {
        const eventsWithType = eventsData.map(item => ({ ...item, categoryType: 'EVENTS' }));
        combinedData = [...combinedData, ...eventsWithType];
      }

      if (combinedData.length > 0) {
        // Sort by date (newest first)
        const sortedData = combinedData.sort((a, b) => new Date(b.date) - new Date(a.date));
        if (append) {
          const newData = [...data, ...sortedData];
          setData(newData);
        } else {
          setData(sortedData);
        }
        // Check if either category has more data
        const webinarsHasMore = Array.isArray(webinarsData) && webinarsData.length === 6;
        const eventsHasMore = Array.isArray(eventsData) && eventsData.length === 6;
        setHasMore(webinarsHasMore || eventsHasMore);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setHasMore(false);
    }

    if (append) {
      setIsLoadingMore(false);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      initFlowbite();
    }
    // Fetch data on mount if no initial data was provided
    if (initialData.length === 0) {
      fetchContent(1, false);
    }
  }, []);

  const loadMore = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    await fetchContent(nextPage, true);
  };

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const stripHTMLAndLimit = (htmlContent) => {
    const text = htmlContent.replace(/<\/?[^>]+(>|$)/g, "");
    return text.length > 300 ? text.substring(0, 300) + "..." : text;
  };

  const filteredEvents = data.filter((item) =>
    item.title.rendered.toLowerCase().includes(searchTerm.toLowerCase())
  );
  


  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <LoadingDots />
      </div>
    );
  }

  return (
    <div className="px-4 md:p-8 lg:p-12">
      <div className="mx-auto container grid grid-cols-1 gap-4 px-4 lg:grid-cols-2 lg:p-0">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((items) => (
            <div
              className="relative rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800 overflow-hidden"
              key={items.id}
            >
              {/* Category Badge - Shows EVENTS (red) or WEBINARS (blue) */}
              <div className="absolute top-0 left-0 z-10">
                <div 
                  className="text-white text-base md:text-lg font-semibold px-8 py-3 rounded-br-2xl"
                  style={{ 
                    backgroundColor: (items.categoryType === 'WEBINARS' || items.categories?.includes(481)) 
                      ? '#1D3A6A' 
                      : '#ED1C24' 
                  }}
                >
                  {items.categoryType || (items.categories?.includes(12) ? 'EVENTS' : 'WEBINARS')}
                </div>
              </div>
              
              <Image
                src={items._embedded?.["wp:featuredmedia"]?.[0]?.source_url}
                alt={items.title.rendered}
                className="h-[200px] w-full md:h-[300px] object-cover"
                width={500}
                height={300}
                priority={true}
              />
              <div className="p-5">
                <p
                  className="mb-2 min-h-20 text-lg font-bold text-[16px]tracking-tight text-gray-900 dark:text-white md:text-xl"
                  dangerouslySetInnerHTML={{ __html: items.title.rendered }}
                ></p>

                <p className="pb-4 text-gray-600 text-base md:text-lg text-[14px] md:text-[16px] tracking-wide">
                  {formatDateString(items.date)}
                </p>
                <Link
                  href={`/event-and-webinars/${items.slug}`}
                  className="text-red-600 text-[16px] md:text-lg font-semibold hover:text-red-700 transition-colors"
                >
                  Read more
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-1 mt-4 text-center text-gray-500 md:col-span-2">
            No Events found
          </div>
        )}

        {/* Load More Button */}
        {hasMore && filteredEvents.length >= 6 && (
          <div className="col-span-1 mt-6 text-center sm:col-span-2">
            {isLoadingMore ? (
              <div className="inline-block px-4 py-2">
                <LoadingDots />
              </div>
            ) : (
              <button
                onClick={loadMore}
                className="bg-custom-red px-4 py-2 text-white hover:bg-red-600 active:bg-red-700"
                disabled={isLoadingMore}
              >
                Load More
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AllEvents;

