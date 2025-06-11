"use client";

import React, { useRef, useState } from "react";
import InsightSlider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import Image from "next/image";
import { leftArrow, rightArrow } from "../../utils/icons";

export default function HomeInsights({ insights = [] }) {
  const sliderRef = useRef(null);
  const [loadedImages, setLoadedImages] = useState({}); // Track loaded image indices

  const NextArrow = () => (
    <div
      className="cursor-pointer rounded-full bg-custom-blue p-3 text-xl text-white hover:bg-custom-red"
      onClick={() => sliderRef.current?.slickNext()}
    >
      {rightArrow}
    </div>
  );

  const PrevArrow = () => (
    <div
      className="cursor-pointer rounded-full bg-custom-blue p-3 text-xl text-white hover:bg-custom-red"
      onClick={() => sliderRef.current?.slickPrev()}
    >
      {leftArrow}
    </div>
  );

  const settings = {
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const handleImageLoad = (index) => {
    setLoadedImages((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <div className="">
      <div className="z-10 flex h-auto flex-col bg-white lg:mt-10 lg:w-11/12 lg:flex-row">
        <div className="flex justify-between lg:w-2/12">
          <div className="flex w-full items-center justify-evenly gap-7 lg:flex-col">
            <h2 className="m-0 py-5 text-2xl font-bold text-custom-red md:p-0 md:text-[80px] lg:-rotate-90">
              Insights
            </h2>
            <div className="hidden gap-4 md:flex">
              <PrevArrow />
              <NextArrow />
            </div>
          </div>
        </div>

        <div className="mx-auto w-11/12 lg:w-10/12">
          <InsightSlider ref={sliderRef} {...settings}>
            {insights.map((item, index) => (
              <div key={index} className="w-full">
                <div className="lg:ms-5 lg:p-4">
                  <div className="group relative my-auto h-[450px] w-full flex-col border border-gray-200 bg-white shadow transition-colors duration-300 dark:border-gray-700 dark:bg-gray-800 md:hover:bg-custom-red md:hover:text-white lg:flex lg:h-[620px]">
                    {/* Image */}
                    <div className="relative h-[200px] w-full overflow-hidden bg-gray-200 md:h-[280px]">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        width={600}
                        height={400}
                        className={`size-full object-cover transition-opacity duration-500 ${loadedImages[index] ? "opacity-100" : "opacity-0"
                          }`}
                        onLoadingComplete={() => handleImageLoad(index)}
                        loading="lazy"
                      />
                    </div>

                    {/* Text shown only after image load */}
                    {loadedImages[index] && (
                      <div className="flex grow flex-col items-start p-5 text-black transition-colors duration-300 md:group-hover:text-white">
                        <h5
                          className="mb-3 line-clamp-2 max-h-[4.5rem] min-h-12 overflow-hidden text-lg font-semibold text-custom-blue transition-colors duration-300 md:text-2xl md:group-hover:text-white"
                          dangerouslySetInnerHTML={{ __html: item.title }}
                        />
                        {item.desc && (
                          <p
                            className="mb-5 line-clamp-3 text-left text-sm font-normal text-custom-gray transition-colors duration-300 md:text-base md:group-hover:text-white lg:mt-10"
                            dangerouslySetInnerHTML={{ __html: item.desc }}
                          />
                        )}
                        <Link
                          href={`/insights/${item.slug}`}
                          className="absolute bottom-0 left-[35%] m-5 mx-auto block border border-custom-red p-2 text-custom-red transition-colors duration-300 hover:bg-white hover:text-black md:left-5 md:mx-0 md:px-6 md:group-hover:bg-white md:group-hover:text-black"
                        >
                          View Article
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </InsightSlider>

          {/* View All */}
          <div className="mt-6 flex justify-center md:ms-3">
            <Link
              href="/insights"
              className="border border-custom-blue px-6 py-2 text-custom-blue md:hover:bg-custom-blue md:hover:text-white"
            >
              View all
            </Link>
          </div>
        </div>

        {/* Arrows for mobile */}
        <div className="flex items-center justify-center gap-4 pt-8 lg:hidden">
          <PrevArrow />
          <NextArrow />
        </div>
      </div>
    </div>
  );
}
