"use client";
import React, { useContext, useEffect, useRef, useState } from 'react';
import CountUp from "react-countup";
import { LanguageContext } from "../../app/context/LanguageContext";

export default function TrackRecords() {
  const { language, translations } = useContext(LanguageContext);
  const sectionRef = useRef(null);
  const [startCount, setStartCount] = useState(false);

  // Observe when the section enters the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCount(true);
          observer.disconnect(); // run only once
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="py-12" ref={sectionRef}>
      <div className="mx-auto container">
        <p className="text-center text-2xl font-semibold text-custom-red">
          {translations.trackRecord.trackRecordTitle}
        </p>
        <div className="grid gap-12 py-12 lg:grid-cols-3 lg:gap-0">
          <div className="text-center text-5xl text-custom-blue">
            {startCount && (
              <CountUp start={0} end={100} duration={2.75} suffix="+" />
            )}
            <p className="text-center text-xl text-custom-gray py-2">
              Years of Our Legacy
            </p>
          </div>

          <div className="text-center text-5xl text-custom-blue">
            {startCount && (
              <CountUp start={0} end={1500} duration={2.75} suffix="+" />
            )}
            <p className="text-center text-xl text-custom-gray py-2">
              Clients Served
            </p>
          </div>

          <div className="text-center text-5xl text-custom-blue">
            {startCount && (
              <CountUp
                start={0}
                end={6}
                duration={2.75}
                decimal=","
                prefix="$"
                suffix=" billion+"
              />
            )}
            <p className="text-center text-xl text-custom-gray py-2">
              Disputes Resolved
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
