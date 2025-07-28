import React, { useContext } from "react";
import Image from "next/image";
import { LanguageContext } from "../../app/context/LanguageContext";

export default function OurLegacy() {
  const { translations } = useContext(LanguageContext);

  return (
    <div className="mx-auto grid container lg:grid-cols-2 py-12 px-4 md:px-0">
      {/* Text Section */}
      <div className="order-2 flex items-center justify-center lg:order-1">
        <div className="flex flex-col items-start justify-center p-2 lg:pe-12">
          <h2 className=" text-2xl font-bold uppercase text-custom-blue lg:mt-0 mt-4">
            {translations.ourLegacy.legacyTitle}
          </h2>
          <h3 className="py-2 text-2xl lg:text-[32px] md:leading-10 font-semibold text-custom-red md:mt-0">
            {translations.ourLegacy.legacyHeadline}
          </h3>
          <p className="py-2 text-custom-gray md:mt-0">
            {translations.ourLegacy.legacyPara}
          </p>
        </div>
      </div>

      {/* Image Section */}
      <div className="order-1 flex items-center justify-center lg:order-2">
        <Image
          src="/aboutUs/OurLegacy.png"
          width={500}
          height={500}
          className="w-full h-auto max-h-[600px] object-contain"
          alt=""
          loading="lazy"
        />
      </div>
    </div>
  );
}
