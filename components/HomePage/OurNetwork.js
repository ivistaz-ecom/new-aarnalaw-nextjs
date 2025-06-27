"use client";
import React, { useContext } from "react";
import { LanguageContext } from "../../app/context/LanguageContext";

function OurNetwork() {
  const { language, translations } = useContext(LanguageContext);
  return (
    <>
      <style>
        {
          `
 .qqvbed-p83tee-V1ur5d {
    text-transform: capitalize !important;
} 
`
        }
      </style>
      <div className="mx-auto w-11/12">
        <h1 className="pb-8 pt-12 text-center text-xl font-semibold text-custom-blue md:text-2xl">

          {translations.network.networkTitle}
        </h1>
        <div className="w-full bg-gray-800 py-1 text-white">
          <p className="p-4 font-semibold">Aarna Law - Our Networks</p>
          <div className="w-full overflow-hidden">
            <div className="w-full overflow-hidden">
              <iframe
                src="https://www.google.com/maps/d/embed?mid=1VcQJ5rncecjuzGEyGAVCekUkRYoLUpQ&ehbc=2E312F"
                width="100%"
                height="600"
                className="mt-[-61px] border-0"
                title="Aarna Law Office Network Map"
              ></iframe> 
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OurNetwork;
