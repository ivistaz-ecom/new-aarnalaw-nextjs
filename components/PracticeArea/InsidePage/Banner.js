import { useEffect, useState, useContext } from "react";
import { LanguageContext } from "../../../app/context/LanguageContext"; 
import Image from "next/image";

export default function PracticeAreaBanner({
  backgroundImage,
  mobileBackgroundImage,
  titleText,
}) {
  const [bgImage, setBgImage] = useState(backgroundImage?.url || backgroundImage);
  const [navHeight, setNavHeight] = useState(0);
  const { language } = useContext(LanguageContext);

  // Detect background image based on screen size
  useEffect(() => {
    const handleResize = () => {
      const img = window.innerWidth <= 768
        ? (mobileBackgroundImage?.url || mobileBackgroundImage)
        : (backgroundImage?.url || backgroundImage);
      setBgImage(img);
    };

    if (backgroundImage || mobileBackgroundImage) {
      handleResize();
      window.addEventListener("resize", handleResize);
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [backgroundImage, mobileBackgroundImage]);

  // Detect navbar height for proper text centering
  useEffect(() => {
    const nav = document.querySelector("nav"); // adjust selector if your navbar element is different
    if (nav) {
      setNavHeight(nav.offsetHeight);
    }
  }, []);

  // Get correct title based on language
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
                  : titleText?.title?.rendered || titleText?.rendered || '';

  return (
    <div className="relative" style={{ height: "550px" }}>
      <div
        className="absolute inset-0 bg-cover bg-center bg-gray-100"
        style={bgImage ? { backgroundImage: `url(${bgImage})` } : {}}
      />
      <div
        className="absolute flex w-full items-center justify-center"
        style={{
          top: navHeight ? `${(550 - navHeight) / 1.8 + navHeight}px` : "50%",
          transform: "translateY(-50%)"
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
