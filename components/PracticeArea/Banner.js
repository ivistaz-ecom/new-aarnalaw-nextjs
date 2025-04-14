"use client"
import React, { useContext } from 'react';
import { LanguageContext } from "../../app/context/LanguageContext";


export default function Banner() {
  const { language, translations } = useContext(LanguageContext);
  return (
  <div className="relative h-[600px] md:bg-[url('/PracticeArea/PracticeAreas.png')] bg-[url('/PracticeArea/PracticeAreaMobileBanner.jpg')] bg-cover bg-center">
      <div className="absolute bottom-0 flex h-[50vh] w-full items-center justify-center">
        <h1 className="md:text-5xl text-2xl font-bold text-white bg-black/50 p-4"> {translations.practiceAreasTitle.practiceAreas}</h1>
      </div>
    </div>
  );
}

