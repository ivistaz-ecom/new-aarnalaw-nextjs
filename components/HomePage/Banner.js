"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { homeBanner } from "../../utils/homebanner-data";

export default function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % homeBanner.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const banner = homeBanner[currentIndex];
  const isFirstBanner = currentIndex === 0;

  return (
    <div className="relative h-[70vh] w-full lg:h-screen">
      <h1 className="sr-only">Client-Centric Problem Solving</h1>

      {/* Mobile */}
      <div className="relative w-full h-[70vh] aspect-[414/500] lg:hidden">
        <Image
          src={banner.mobileBannerUrl}
          alt={banner.bannerText}
          fill
          style={{ objectFit: 'cover' }}
          loading={isFirstBanner ? "eager" : "lazy"}
          priority={isFirstBanner}
          placeholder="blur"
          blurDataURL={banner.mobileBannerUrl}
        />
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4 text-center text-white mt-40">
          <p className="text-4xl font-bold">{banner.bannerText}</p>
          <p className="py-8 text-xl">{banner.bannerPara}</p>
        </div>
      </div>

      {/* Desktop */}
      <div className="relative w-full h-screen aspect-[1335/940] hidden lg:block">
        <Image
          src={banner.bannerUrl}
          alt={banner.bannerText}
          fill
          style={{ objectFit: 'cover' }}
          loading={isFirstBanner ? "eager" : "lazy"}
          priority={isFirstBanner}
          placeholder="blur"
          blurDataURL={banner.bannerUrl}
        />
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4 text-center text-white">
          <p className="text-4xl font-bold lg:text-5xl">{banner.bannerText}</p>
          <p className="py-8 text-xl lg:w-7/12">{banner.bannerPara}</p>
        </div>
      </div>
    </div>
  );
}
