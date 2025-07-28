"use client"
import React, { useState, useEffect, useRef, useContext } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { LanguageContext } from "../../app/context/LanguageContext";

const KindOfDisputes = () => {
  const sliderRef = useRef(null);
  const { language, translations } = useContext(LanguageContext);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="py-8 md:mx-auto container">
      <h2 className="text-center text-2xl font-semibold text-custom-red mb-6">
        {translations.disputes.disputesTitle}
      </h2>
      <Carousel
        responsive={responsive}
        ref={sliderRef}
        infinite={true}
        showDots={false}
        arrows={false}
        autoPlay={true}
        autoPlaySpeed={3000}
      >
        {translations.disputesDetails.flat().map((item, index) => (
          <div
            key={index}
            className="border border-red-400 py-5 px-4 text-center rounded-lg shadow-md flex flex-col justify-center h-full min-h-[120px] mx-4"
          >
            <h3 className="text-blue-900 font-medium text-lg">
              {item.name}
            </h3>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default KindOfDisputes;
