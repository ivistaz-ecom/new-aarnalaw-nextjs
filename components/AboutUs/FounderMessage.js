import React, { useContext } from "react";
import Image from "next/image";
import { LanguageContext } from "../../app/context/LanguageContext";

function FounderMessage() {
  const { translations } = useContext(LanguageContext);
  return (
    <div className="mx-auto grid w-11/12 pb-12 lg:grid-cols-2">
      <div className="flex flex-col items-start justify-center p-2 lg:hidden lg:pl-12">
        <div className="mb-3">
          <Image
            src="/images/quote-png.png"
            width={100}
            height={100}
            className="h-[30px] w-full lg:-mt-10"
            alt="MESSAGE FROM OUR FOUNDERS"
            loading="lazy"
          />
        </div>
        <h1 className="pb-4 text-xl font-bold text-custom-blue lg:text-2xl">
          {translations.founderMessage.founderTitle}
        </h1>
      </div>
      <div className="">
        <Image
          src="/aboutUs/founders.png"
          width={500}
          height={500}
          className="w-full"
          alt="MESSAGE FROM OUR FOUNDERS"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col items-start justify-center p-2 lg:pl-12">
        <div className="hidden lg:block">
          <Image
            src="/images/quote-png.png"
            width={100}
            height={100}
            className="h-[30px] w-full lg:-mt-10"
            alt="MESSAGE FROM OUR FOUNDERS"
            loading="lazy"
          />
        </div>
        <h1 className="hidden pb-4 text-xl font-bold text-custom-blue lg:block lg:text-2xl">
          {translations.founderMessage.founderTitle}
        </h1>

        <p className="mt-4 text-custom-gray md:mt-0 ">
          {translations.founderMessage.founderPara}
        </p>
        <div className="flex w-full justify-between py-8">
          <div>
            <p className="font-bold text-custom-blue"> {translations.founderMessage.founderName1} </p>{" "}
            <p> {translations.founderMessage.founderDescription1}</p>
          </div>
          <div>
            <p className="font-bold text-custom-blue">{translations.founderMessage.founderName2}</p>{" "}
            <p>{translations.founderMessage.founderDescription2}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FounderMessage;
