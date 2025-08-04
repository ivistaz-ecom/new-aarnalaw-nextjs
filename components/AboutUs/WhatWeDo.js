"use client"
import React, { useContext } from "react";
import Image from "next/image";
import { LanguageContext } from "../../app/context/LanguageContext";

const WhatWeDo = () => {
  const { translations } = useContext(LanguageContext);

  return (
    <div className="mx-auto grid container py-12 lg:grid-cols-2 gap-8 px-4 md:px-0">
      {/* Image Section */}
      <div className="flex items-center justify-center min-h-[400px] lg:min-h-[500px]">
        <Image
          src="/whatWeDo/What_we_do.jpg"
          width={500}
          height={500}
          className="w-full h-full max-h-[600px] object-cover"
          alt="What We Do"
          loading="lazy"
        />
      </div>

      {/* Text Section */}
      <div className="flex flex-col justify-center min-h-[400px] lg:min-h-[500px] p-2 lg:pl-5">
        <h1 className="text-2xl font-bold uppercase text-custom-red mt-4 lg:mt-0">
          {translations.whatWeDo.title}
        </h1>
        <h2 className="py-4 text-2xl lg:text-[32px] md:leading-10 font-semibold text-custom-blue md:mt-0">
          {translations.whatWeDo.headline}
        </h2>
        <p className="text-custom-gray md:mt-0">
          {translations.whatWeDo.para1}
        </p>
        <p className="py-2 text-custom-gray md:mt-0">
          {translations.whatWeDo.para2}
        </p>
      </div>
    </div>
  );
};

export default WhatWeDo;
