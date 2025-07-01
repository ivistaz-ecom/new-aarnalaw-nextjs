"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { LanguageContext } from "../../app/context/LanguageContext";

function OurNetwork() {
  const { language, translations } = useContext(LanguageContext);
  const mapRef = useRef(null);
  const [showMap, setShowMap] = useState(false);

  // Load map only when in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowMap(true);
          observer.disconnect(); // only load once
        }
      },
      { threshold: 0.1 }
    );

    if (mapRef.current) {
      observer.observe(mapRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>
        {
          `.qqvbed-p83tee-V1ur5d {
            text-transform: capitalize !important;
          }`
        }
      </style>

      <div className="mx-auto w-11/12">
        <p className="pb-8 pt-12 text-center text-xl font-semibold text-custom-blue md:text-2xl">
          {translations.network.networkTitle}
        </p>

        <div className="w-full bg-gray-800 py-1 text-white">
          <p className="p-4 font-semibold">Aarna Law - Our Networks</p>

          <div className="w-full overflow-hidden" ref={mapRef}>
            {showMap ? (
              <iframe
                src="https://www.google.com/maps/d/embed?mid=1VcQJ5rncecjuzGEyGAVCekUkRYoLUpQ&ehbc=2E312F"
                width="100%"
                height="600"
                className="mt-[-61px] border-0"
                title="Aarna Law Office Network Map"
                loading="lazy"
              ></iframe>
            ) : (
              <div className="h-[600px] w-full flex items-center justify-center bg-gray-300 text-gray-600">
                Loading map...
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default OurNetwork;
