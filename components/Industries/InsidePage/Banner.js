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
    <div className="relative h-[550px]">
      <div
        className="absolute inset-0 bg-cover bg-center bg-gray-100"
        style={currentBanner ? { backgroundImage: `url(${currentBanner})` } : {}}
      />
      <div className="absolute bottom-0 flex h-[50vh] w-full items-center justify-center">
        {title && (
          <h1
            className="max-w-4xl text-center text-2xl font-bold text-white md:text-3xl bg-black/50 px-4 py-2"
            dangerouslySetInnerHTML={{ __html: title }}
          />
        )}
      </div>
    </div>
  );
}
