"use client"
import React, {useContext } from "react";
import Image from "next/image";
import { LanguageContext } from "../../app/context/LanguageContext";

const WhatWeDo = () => {

  const { translations } = useContext(LanguageContext);

  return (
    <>
      <div className="mx-auto grid w-11/12 py-12 lg:grid-cols-2">
        <div className="">
          <Image
            src="/whatWeDo/What_we_do.jpg"
            width={500}
            height={500}
            className="w-full"
            alt="What We Do"
             loading="lazy"
          />
        </div>
        <div className="flex flex-col items-start justify-center p-2 lg:pl-12">
          <h1 className="pb-4 text-2xl font-bold uppercase text-custom-red mt-4 lg:mt-0">
          {translations.whatWeDo.title}
          </h1>
          <h2 className="py-4 text-4xl font-semibold text-custom-blue md:mt-0">
          {translations.whatWeDo.headline} 
          </h2>
          <p className="mt-4 text-custom-gray md:mt-0 ">
          {translations.whatWeDo.para1}
          </p>
          <p className="mt-4 py-2 text-custom-gray md:mt-0">
          {translations.whatWeDo.para2}
          </p>
        </div> 
      </div>
    </>
  );
};

export default WhatWeDo;
