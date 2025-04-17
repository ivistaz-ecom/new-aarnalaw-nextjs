"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { homeBanner } from "../../utils/homebanner-data"; // Ensure the path is correct

export default function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Set the interval to change the banner every 5 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % homeBanner.length);
    }, 5000); // Change banner every 5 seconds

    return () => clearInterval(interval); // Clear the interval on unmount
  }, []);

  return (
    <div
      id="default-carousel"
      className="relative h-[70vh] w-full lg:h-screen"
      data-carousel="slide"
    >
      <div className="relative h-screen overflow-hidden">
        {/* Ensure homeBanner is not empty */}
        {homeBanner && homeBanner.length > 0 ? (
          homeBanner.map((banner, index) => (
            <div
              key={index}
              className={`relative w-full ${index === currentIndex ? "block" : "hidden"}`}
              data-carousel-item
            >
              {/* Mobile Banner */}
              <Image
                src={banner.mobileBannerUrl}
                className="absolute left-1/2 top-1/2 h-[70vh] w-full -translate-x-1/2 lg:hidden"
                alt={banner.bannerText}
                width={600}
                height={500}
                loading="eager"
                priority

                placeholder="blur"
                blurDataURL={banner.mobileBannerUrl}

              />
              {/* Desktop Banner */}
              <Image
                src={banner.bannerUrl}
                className="absolute left-1/2 top-1/2 hidden h-screen w-full -translate-x-1/2 lg:block"
                alt={banner.bannerText}
                width={600}
                height={500}
                loading="eager"
                priority
                placeholder="blur"
                blurDataURL={banner.bannerUrl}
              />

              <div className="absolute flex h-screen w-full flex-col items-center justify-center p-4 text-center text-white">
                <h2 className="text-4xl font-bold lg:text-5xl">{banner.bannerText}</h2>
                <p className="py-8 text-xl lg:w-7/12">{banner.bannerPara}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No banners available.</p> // Fallback message if the array is empty
        )}
      </div>
    </div>
  );
}
