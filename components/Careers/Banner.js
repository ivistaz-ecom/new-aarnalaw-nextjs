"use client"
import React, { useContext, useEffect, useState } from 'react';
import { LanguageContext } from "../../app/context/LanguageContext";

export default function Banner() {
  const { translations } = useContext(LanguageContext);
  const [navHeight, setNavHeight] = useState(0);

  useEffect(() => {
    const nav = document.querySelector("nav"); // adjust selector if your navbar element is different
    if (nav) {
      setNavHeight(nav.offsetHeight);
    }
  }, []);

  return (
    <div
      className="relative md:bg-[url('/Careers/career_banner_new.jpg')] bg-[url('/Careers/CareersMobileBanner.jpg')] bg-cover bg-center"
      style={{ height: "550px" }}
    >
      <div
        className="absolute flex w-full items-center justify-center"
        style={{
          top: navHeight ? `${(550 - navHeight) / 1.8 + navHeight}px` : "50%",
          transform: "translateY(-50%)"
        }}
      >
        <h1 className="md:text-3xl text-2xl font-bold text-white bg-black/50 px-4 py-2">
          {translations.careersTitle.careers}
        </h1>
      </div>
    </div>
  );
}
