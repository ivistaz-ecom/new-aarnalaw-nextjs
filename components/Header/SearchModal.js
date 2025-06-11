"use client";
import { useState, useEffect } from "react";
import { search } from "@/utils/icons";
import Link from "next/link";
import configData from "../../config.json";

function SearchModal() {
  const [openModal, setOpenModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!searchQuery) {
        setResults([]);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const domain = typeof window !== "undefined" ? window.location.hostname : "";
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
          `https://docs.aarnalaw.com/wp-json/custom/v1/search?search=${searchQuery}&production_mode=${server}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch search results');
        }

        const data = await response.json();

        // Only set results if we have valid data
        if (Array.isArray(data)) {
          setResults(data);
        } else {
          setResults([]);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
        setError("Failed to fetch search results. Please try again.");
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchResults();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  return (
    <div className="text-black">
      <button
        className="block cursor-pointer text-center text-2xl text-black focus:outline-none"
        onClick={() => setOpenModal(true)}
      >
        {search}
      </button>

      {/* Modal */}
      <div
        id="default-modal"
        tabIndex="-1"
        aria-hidden={!openModal}
        className={`fixed inset-x-0 top-0 z-50 max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden md:inset-0 ${openModal ? "flex h-screen bg-black/80" : "hidden"
          }`}
      >
        <div className="relative max-h-full w-full max-w-2xl p-4">
          <button
            type="button"
            className="absolute -top-6 right-4 ms-auto inline-flex size-8 items-center justify-center rounded-lg bg-gray-200 text-sm text-custom-red hover:bg-custom-red hover:text-white"
            onClick={() => setOpenModal(false)}
          >
            <svg
              className="size-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>

          {/* Modal content */}
          <div className="relative rounded-lg bg-white shadow">
            {/* Modal header */}
            <div className="flex items-center justify-between rounded-t border-b p-4">
              <input
                type="text"
                id="search"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                required
              />
            </div>

            {/* Modal body */}
            <div className="space-y-4 p-4">
              {loading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="animate-pulse">
                      <div className="h-12 rounded bg-gray-200"></div>
                    </div>
                  ))}
                </div>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <>
                  {searchQuery && (
                    <>
                      {results && results.length > 0 ? (
                        <>
                          <p className="mb-6 mt-2 border-b-0">
                            Results for{" "}
                            <span className="italic">"{searchQuery}"</span>
                          </p>
                          <ul className="h-[200px] overflow-scroll">
                            {results.map((result, index) => {
                              const isJob = result.post_type === "jobs";
                              const dynamicUrl = isJob
                                ? "/careers"
                                : `/${result.post_type}/${result.slug}`;

                              return (
                                <li key={index}>
                                  <Link
                                    href={dynamicUrl}
                                    className="flex justify-between border-b p-2 hover:bg-gray-50"
                                    onClick={() => setOpenModal(false)}
                                  >
                                    <span
                                      dangerouslySetInnerHTML={{
                                        __html: result.title,
                                      }}
                                    ></span>
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </>
                      ) : (
                        <p className="text-center text-gray-500">
                          No results found for{" "}
                          <span className="italic">"{searchQuery}"</span>
                        </p>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchModal;
