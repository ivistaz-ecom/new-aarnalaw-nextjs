import { useEffect, useState, useContext } from "react";
import { LanguageContext } from "../../../app/context/LanguageContext";

export default function IndustriesBanner({
  backgroundImage,
  mobileBackgroundImage,
  titleText,
}) {
  const [bgImage, setBgImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    const updateBgImage = () => {
      const selectedImage = window.innerWidth <= 768 ? mobileBackgroundImage : backgroundImage;
      setBgImage(selectedImage);

      const img = new Image();
      img.src = selectedImage;
      img.onload = () => {
        setIsLoading(false);
      };
    };

    updateBgImage();
    window.addEventListener("resize", updateBgImage);

    return () => window.removeEventListener("resize", updateBgImage);
  }, [backgroundImage, mobileBackgroundImage]);

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
                  : titleText?.rendered;

  return (
    <div className="relative lg:h-screen">
      {isLoading ? (
        <div className="relative h-screen animate-pulse bg-gray-300">
          <div className="absolute bottom-0 flex h-screen w-full items-center justify-center">
            <div className="flex h-12 w-48 animate-pulse items-center justify-center bg-gray-500 text-white">
              Loading
            </div>
          </div>
        </div>
      ) : (
        <div
          className="h-[500px] bg-cover bg-center lg:h-screen"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <div className="absolute bottom-0 flex h-[500px] w-full items-center justify-center lg:h-screen">
            <h1
              className="rounded bg-black/50 lg:p-5 p-3 text-center text-4xl font-bold text-white lg:text-start lg:text-5xl"
              dangerouslySetInnerHTML={{ __html: title }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
