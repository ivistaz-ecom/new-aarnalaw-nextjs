"use client"
import React, { useContext } from 'react';
import { LanguageContext } from "../../app/context/LanguageContext";

export default function Banner() {
  const { language, translations } = useContext(LanguageContext);

  return (
    <div className="relative h-[550px] md:bg-[url('/Careers/career_banner_new.jpg')] bg-[url('/Careers/CareersMobileBanner.jpg')] bg-cover bg-center">
      <div className="absolute bottom-0 flex h-[50vh] w-full items-center justify-center">
        <h1 className="md:text-3xl text-2xl font-bold text-white bg-black/50 px-4 py-2">{translations.careersTitle.careers}</h1>
      </div>
    </div>
  );
}
