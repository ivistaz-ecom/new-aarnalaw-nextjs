import React, { useContext } from "react";
import Image from "next/image";
import { LanguageContext } from "../../app/context/LanguageContext";

export default function JayasimhaFoundation() {
    const { translations } = useContext(LanguageContext);
  
  return (
    <div className="bg-[#151c4a]">
      <div className="mx-auto  grid w-11/12 py-12 lg:grid-cols-2">
        <div className="order-2 flex flex-col items-start justify-center lg:order-1 lg:p-12">
          <h1 className="hidden pb-2 text-2xl font-bold text-gray-300 md:block">
          {translations.jayasimhaFoundation.jayasimhaTitle}
          </h1>
          <p className="mt-4 py-2 text-white md:mt-0">
          {translations.jayasimhaFoundation.jayasimhaPara1}
          </p>
          <p className="mt-4 py-2 text-white md:mt-0">
          {translations.jayasimhaFoundation.jayasimhaPara2}
          </p>
          <p className="mt-4 py-2 text-white md:mt-0">
          {translations.jayasimhaFoundation.jayasimhaPara3}
          </p>
          <p className="mt-4 py-2 text-white md:mt-0">
          {translations.jayasimhaFoundation.jayasimhaPara4}
          </p>
        </div>
        <div className="order-1 lg:order-2">
          <Image
            src="/aboutUs/Jayasimha-Foundation.png"
            width={500}
            height={500}
            className="w-full"
            alt=""
             loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
