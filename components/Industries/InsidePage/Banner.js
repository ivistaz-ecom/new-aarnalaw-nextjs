"use client";
import { useContext } from "react";
import { LanguageContext } from "../../../app/context/LanguageContext";

export default function IndustriesBanner({
  backgroundImage,
  mobileBackgroundImage,
  titleText,
}) {
  const { language } = useContext(LanguageContext);

  // Get the correct title based on language
  const title =
    language === "ta" && titleText?.acf?.tamil_title
      ? titleText.acf.tamil_title
      : language === "kn" && titleText?.acf?.kannada_title
        ? titleText.acf.kannada_title
        : language === "te" && titleText?.acf?.telugu_title
          ? titleText.acf.telugu_title
          : language === "hi" && titleText?.acf?.hindi_title
            ? titleText.acf.hindi_title
            : language === "ml" && titleText?.acf?.malayalam_title
              ? titleText.acf.malayalam_title
              : language === "mr" && titleText?.acf?.marathi_title
                ? titleText.acf.marathi_title
                : language === "gu" && titleText?.acf?.gujarati_title
                  ? titleText.acf.gujarati_title
                  : titleText?.title?.rendered;

  // Get banner images with fallback
  const desktopBanner = backgroundImage?.url || backgroundImage;
  const mobileBanner = mobileBackgroundImage?.url || mobileBackgroundImage || desktopBanner;
  const currentBanner = typeof window !== 'undefined' && window.innerWidth <= 768 ? mobileBanner : desktopBanner;

  return (
    <div className="relative h-[500px] lg:h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center bg-gray-100"
        style={currentBanner ? { backgroundImage: `url(${currentBanner})` } : {}}
      />
      <div className="relative flex h-full items-center justify-center px-4">
        {title && (
          <h1
            className="max-w-4xl text-center text-3xl font-bold text-white md:text-4xl lg:text-5xl bg-black/50 p-4"
            dangerouslySetInnerHTML={{ __html: title }}
          />
        )}
      </div>
    </div>
  );
}
