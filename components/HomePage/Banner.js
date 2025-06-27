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
              <div className="relative w-full h-[70vh] aspect-[414/500] lg:hidden">
                <Image
                  src={banner.mobileBannerUrl}
                  alt={banner.bannerText}
                  fill
                  style={{ objectFit: 'cover' }}
                  loading="eager"
                  priority
                  placeholder="blur"
                  blurDataURL={banner.mobileBannerUrl}
                />
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4 text-center text-white mt-40 ">
                  <h2 className="text-4xl font-bold lg:text-5xl">{banner.bannerText}</h2>
                  <p className="py-8 text-xl lg:w-7/12">{banner.bannerPara}</p>
                </div>
              </div>
              {/* Desktop Banner */}
              <div className="relative w-full h-screen aspect-[1335/940] hidden lg:block">
                <Image
                  src={banner.bannerUrl}
                  alt={banner.bannerText}
                  fill
                  style={{ objectFit: 'cover' }}
                  loading="eager"
                  priority
                  placeholder="blur"
                  blurDataURL={banner.bannerUrl}
                />
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4 text-center text-white">
                  <h2 className="text-4xl font-bold lg:text-5xl">{banner.bannerText}</h2>
                  <p className="py-8 text-xl lg:w-7/12">{banner.bannerPara}</p>
                </div>
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