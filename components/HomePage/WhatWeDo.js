"use client"
import React, { useContext } from "react";
import Image from "next/image";
import { LanguageContext } from "../../app/context/LanguageContext";
import Link from "next/link";

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
            alt="Our Legacy"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col items-start justify-center lg:px-8">
          <h1 className="pb-1 text-2xl font-bold text-custom-red mt-6 lg:mt-0">
            {translations.whatWeDo.title}
          </h1>
          <h2 className="lg:mt-4 md:py-8 py-4 text-2xl font-semibold text-custom-blue md:mt-0 lg:text-4xl">
            {translations.whatWeDo.headline}
          </h2>
          <p className=" text-custom-gray md:mt-0 ">

            {translations.whatWeDo.para1}
          </p>
          <p className="mt-4 md:py-8 text-custom-gray md:mt-0">
            {translations.whatWeDo.para2}
          </p>
          <Link
            href="/practice-areas"
            className="mx-auto mt-4 block border border-custom-red px-6 py-2 text-custom-red hover:bg-custom-red hover:text-white md:mx-0"
          >
            {translations.ourServicesTitle.ourServices}
          </Link>
        </div>
      </div>

      <div className="mx-auto  grid w-11/12 lg:grid-cols-2">
        <div className="order-2 flex flex-col items-start justify-center lg:order-1 lg:p-12">
          <h1 className="text-2xl font-bold text-custom-blue mt-4 lg:mt-0">
            {translations.ourLegacy1.legacyTitle1}
          </h1>
          <h2 className="lg:mt-4 md:py-12 py-4 text-2xl font-semibold text-custom-blue md:mt-0 lg:text-4xl">
            {translations.ourLegacy1.legacyHeadline1}
          </h2>
          <p className=" text-custom-gray md:mt-0 ">
            {translations.ourLegacy1.legacyPara1}
          </p>
          <p className="mt-4 md:py-8 text-custom-gray md:mt-0">
            {translations.ourLegacy1.legacyPara2}
          </p>
          <Link
            href="/about-us"
            className="mx-auto mt-10 border border-custom-blue px-4 py-2 text-custom-blue hover:bg-custom-blue hover:text-white md:mx-0 md:mt-0"
          >
            {translations.ourFirmTitle.ourFirm}
          </Link>
        </div>
        <div className="order-1">
          <Image
            src="/whatWeDo/Our_legacy.jpg"
            width={500}
            height={500}
            className="w-full"
            alt="Our Legacy"
            loading="lazy"
          />
        </div>
      </div>
    </>
  );
};

export default WhatWeDo;
