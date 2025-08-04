"use client"
import React, { useContext } from 'react';
import Image from 'next/image';
import { LanguageContext } from "../../app/context/LanguageContext";

export default function Banner() {
  const { language, translations } = useContext(LanguageContext);

  return (
    <div className="relative h-[550px]">
      <div className="relative h-full w-full">
        {/* Desktop banner */}
        <Image
          src="/PracticeArea/PracticeAreas.png"
          fill
          priority
          className="hidden md:block object-cover"
          alt=""
          quality={90}
        />
        {/* Mobile banner */}
        <Image
          src="/PracticeArea/PracticeAreaMobileBanner.jpg"
          fill
          priority
          className="block md:hidden object-cover"
          alt=""
          quality={90}
        />
      </div>
      <div className="absolute bottom-0 flex h-[50vh] w-full items-center justify-center">
        <h1 className="md:text-3xl text-2xl font-bold text-white bg-black/50 px-4 py-2"> {translations.practiceAreasTitle.practiceAreas}</h1>
      </div>
    </div>
  );
}

