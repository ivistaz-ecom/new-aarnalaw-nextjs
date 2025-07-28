"use client";

import React, { useRef, useState, useContext } from "react";
import InsightSlider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { leftArrow, rightArrow } from "../../utils/icons";
import Image from "next/image";
import Link from "next/link";
import { LanguageContext } from "../../app/context/LanguageContext";

const Testimonials = () => {
  const sliderRef = useRef(null);
  const { language, translations } = useContext(LanguageContext);

  const NextArrow = () => (
    <div
      className="cursor-pointer rounded-full bg-custom-blue p-2 md:p-3 text-white hover:bg-custom-red"
      onClick={() => sliderRef.current?.slickNext()}
    >
      {rightArrow}
    </div>
  );

  const PrevArrow = () => (
    <div
      className="cursor-pointer rounded-full bg-custom-blue p-2 md:p-3 text-white hover:bg-custom-red"
      onClick={() => sliderRef.current?.slickPrev()}
    >
      {leftArrow}
    </div>
  );

  const settings = {
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    dots: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="relative mx-auto w-[95%] max-w-7xl mb-14 px-2 sm:px-4">
      {/* Mobile heading */}
      <p className="block py-5 text-center text-xl font-semibold text-custom-blue md:hidden">
        Client’s Testimonials
      </p>

      {/* Quote image */}
      <div className="flex justify-end">
        <Image
          src="/images/quotes.svg"
          className="hidden md:block"
          width={276}
          height={215}
          alt="testimonials"
          loading="lazy"
        />
      </div>

      {/* Background + Header + Arrows */}
      <div className="mt-2 flex justify-between md:-mt-36">
        <div className="h-96 w-[260px] bg-custom-blue md:h-[437px] md:w-[559px]"></div>
        <div className="mr-1 space-y-6 self-end text-right md:mr-54">
          <p className="hidden p-2 text-xl font-semibold text-custom-blue md:block md:text-2xl">
            Client’s <br /> Testimonials
          </p>
          <div className="flex justify-end gap-2">
            <PrevArrow />
            <NextArrow />
          </div>
        </div>
      </div>

      {/* Slider */}
      <div className="absolute bottom-24 w-full md:bottom-24 md:right-[200px] md:w-3/4">
        <InsightSlider ref={sliderRef} {...settings}>
          {translations.testimonialDetails.map((item, index) => (
            <div key={index} className="px-2">
              <div className="flex flex-col h-auto md:h-[260px] bg-white p-4 shadow-lg">
                <div className="flex items-start md:items-center gap-4">
                  <div className="flex-1">
                    <div className="min-h-28">
                      <h3 className="text-lg md:text-xl font-semibold text-custom-blue">
                        {item.name}
                      </h3>
                      <p className="text-sm md:text-lg text-custom-gray">
                        {item.post}
                      </p>
                      <p className="text-sm md:text-lg text-custom-gray">
                        {item.desingnation}
                      </p>
                    </div>
                  </div>
                  <div className="shrink-0">
                    <Image
                      src={item.imageUrl}
                      width={80}
                      height={80}
                      className="rounded-full object-cover"
                      alt={item.name}
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <p className="line-clamp-2 text-sm md:text-base text-custom-gray">
                    {item.desc}
                  </p>
                </div>
                <Link href="/testimonials" className="mt-2 text-sm text-custom-blue">
                  Read more
                </Link>
              </div>
            </div>
          ))}
        </InsightSlider>
      </div>
    </div>
  );
};

export default Testimonials;
