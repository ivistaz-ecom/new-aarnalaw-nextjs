"use client";
import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../../../app/context/LanguageContext";

export default function IndustriesBanner({
  backgroundImage,
  mobileBackgroundImage,
  titleText,
}) {
  const { language } = useContext(LanguageContext);
  const [navHeight, setNavHeight] = useState(0);
  const [currentBanner, setCurrentBanner] = useState("");

  // Detect navbar height
  useEffect(() => {
    const nav = document.querySelector("nav"); // adjust if your navbar selector is different
    if (nav) {
      setNavHeight(nav.offsetHeight);
    }
  }, []);

  // Handle responsive background switching
  useEffect(() => {
    const updateBanner = () => {
      const desktopBanner = backgroundImage?.url || backgroundImage;
      const mobileBanner =
        mobileBackgroundImage?.url || mobileBackgroundImage || desktopBanner;
      setCurrentBanner(window.innerWidth <= 768 ? mobileBanner : desktopBanner);
    };

    updateBanner();
    window.addEventListener("resize", updateBanner);
    return () => window.removeEventListener("resize", updateBanner);
  }, [backgroundImage, mobileBackgroundImage]);

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

  return (
    <div className="relative" style={{ height: "550px" }}>
      <div
        className="absolute inset-0 bg-cover bg-center bg-gray-100"
        style={currentBanner ? { backgroundImage: `url(${currentBanner})` } : {}}
      />
      <div
        className="absolute flex w-full items-center justify-center"
        style={{
          top: navHeight ? `${(550 - navHeight) / 1.8 + navHeight}px` : "50%",
          transform: "translateY(-50%)",
        }}
      >
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
