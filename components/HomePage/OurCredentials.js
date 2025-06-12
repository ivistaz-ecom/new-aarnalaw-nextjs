"use client";
import React, { useRef, useState, useEffect, useContext } from "react";
import Link from "next/link";
import Credentials from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { credentials } from "../../utils/data";
import Image from "next/image";
import { LanguageContext } from "../../app/context/LanguageContext";

const Podcasts = () => {
  const { language, translations } = useContext(LanguageContext);
  const sliderRef = useRef(null);

  // State to track screen size
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Update screen size state on component mount
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024); // Adjust 1024px for desktop threshold
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="bg-[#EFEFEF] py-12">
      <div className="mx-auto w-11/12 ">
        <h1 className="mb-10 text-center text-2xl font-semibold text-custom-red">
          {translations.awards.awardsTitle}
        </h1>

        <Credentials
          ref={sliderRef}
          responsive={responsive}
          showDots={false}
          infinite={true}
          autoPlaySpeed={isDesktop ? 1500 : 3000} // Faster autoplay on desktop
          autoPlay={true}
          itemClass="p-1"
          keyBoardControl={true}
          removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
        >
          {credentials.map((item, index) => (
            <div
              className="inset-0 flex h-[200px] flex-col items-center justify-start"
              key={index}
            >
              <Image
                src={item.imageUrl}
                width={500}
                height={500}
                className="h-[100px] w-[200px]"
                alt={item.title}
                loading="lazy"
              />
              <h2 className="font-bold mt-3">{item.title}</h2>
              <p className="text-center text-sm">{item.desc}</p>
            </div>
          ))}
        </Credentials>
      </div>
    </div>
  );
};

export default Podcasts;
