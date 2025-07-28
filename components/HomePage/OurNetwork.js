"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { LanguageContext } from "../../app/context/LanguageContext";

function OurNetwork() {
  const { language, translations } = useContext(LanguageContext);
  const mapRef = useRef(null);
  const [showMap, setShowMap] = useState(false);
  const [mapInteractive, setMapInteractive] = useState(false);

  // Show map when in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowMap(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (mapRef.current) {
      observer.observe(mapRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const enableMapInteraction = () => {
    setMapInteractive(true);
  };

  const disableMapInteraction = () => {
    setMapInteractive(false);
  };

  return (
    <>
      <style>
        {
          `.qqvbed-p83tee-V1ur5d {
            text-transform: capitalize !important;
          }`
        }
      </style>

      <div className="mx-auto container px-4 md:px-0">
        <p className="pb-8 pt-12 text-center text-xl font-semibold text-custom-blue md:text-2xl">
          {translations.network.networkTitle}
        </p>

        <div className="w-full bg-gray-800 py-1 text-white">
          <p className="p-4 font-semibold">Aarna Law - Our Networks</p>

          <div className="relative w-full overflow-hidden" ref={mapRef}>
            {showMap ? (
              <div
                className="relative h-[600px] w-full"
                onClick={enableMapInteraction}
                onMouseLeave={disableMapInteraction}
              >
                <iframe
                  src="https://www.google.com/maps/d/embed?mid=1VcQJ5rncecjuzGEyGAVCekUkRYoLUpQ&ehbc=2E312F"
                  width="100%"
                  height="600"
                  className="border-0 mt-[-61px]"
                  title="Aarna Law Office Network Map"
                  loading="lazy"
                  style={{
                    pointerEvents: mapInteractive ? "auto" : "none",
                  }}
                ></iframe>

                {!mapInteractive && (
                  <>
                    <div className="absolute inset-0 z-10 cursor-pointer bg-transparent" />
                    <div className="absolute text-center bottom-14 left-1/2 z-20 -translate-x-1/2 rounded-md bg-black/30 md:px-4 py-2 px-2 text-sm text-white shadow-md border">
                      🖱️ Click to interact with map
                    </div>
                  </>
                )}
              </div>
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
