"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { homeBanner } from "../../utils/homebanner-data";

// Base64 blur placeholder for better performance
const BLUR_DATA_URL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==";

export default function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(new Set());

  useEffect(() => {
    // Preload all banner images for better performance
    const preloadImages = () => {
      homeBanner.forEach((banner, index) => {
        const img = new window.Image();
        img.onload = () => {
          setImagesLoaded(prev => new Set([...prev, index]));
        };
        img.src = banner.bannerUrl;

        // Also preload mobile images
        const mobileImg = new window.Image();
        mobileImg.src = banner.mobileBannerUrl;
      });
    };

    preloadImages();

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % homeBanner.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const banner = homeBanner[currentIndex];
  const isFirstBanner = currentIndex === 0;
  const isImageLoaded = imagesLoaded.has(currentIndex);

  return (
    <div className="relative w-full">
      <h1 className="sr-only">Client-Centric Problem Solving</h1>

      {/* Mobile */}
      <div className="relative lg:hidden">
        <Image
          src={banner.mobileBannerUrl}
          alt={banner.bannerText}
          width={768}
          height={1024}
          sizes="(max-width: 768px) 100vw, 768px"
          style={{ width: '100%', height: 'auto' }}
          loading={isFirstBanner ? "eager" : "lazy"}
          priority={isFirstBanner}
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          quality={85}
        />
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4 text-center text-white mt-40">
          <p className="text-4xl font-bold">{banner.bannerText}</p>
          <p className="py-8 text-xl">{banner.bannerPara}</p>
        </div>
      </div>

      {/* Desktop */}
      <div className="relative hidden lg:block">
        <Image
          src={banner.bannerUrl}
          alt={banner.bannerText}
          width={1920}
          height={1080}
          sizes="(max-width: 1920px) 100vw, 1920px"
          style={{ width: '100%', height: 'auto' }}
          loading={isFirstBanner ? "eager" : "lazy"}
          priority={isFirstBanner}
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          quality={85}
        />
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4 text-center text-white pt-[200px]">
          <p className="text-4xl font-bold lg:text-4xl">{banner.bannerText}</p>
          <p className="py-8 text-xl lg:w-7/12">{banner.bannerPara}</p>
        </div>
      </div>
    </div>
  );
}
