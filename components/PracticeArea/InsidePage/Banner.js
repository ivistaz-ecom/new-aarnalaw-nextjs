import { useEffect, useState, useContext } from "react";
import { LanguageContext } from "../../../app/context/LanguageContext"; // Import LanguageContext

export default function PracticeAreaBanner({
  backgroundImage,
  mobileBackgroundImage,
  titleText,
}) {
  const [bgImage, setBgImage] = useState(null); // For setting the correct image based on screen size
  const [imageLoaded, setImageLoaded] = useState(false); // Track if image is loaded
  const { language } = useContext(LanguageContext); // Get selected language

  useEffect(() => {
    // Set initial background image based on screen size
    const handleResize = () => {
      const img = window.innerWidth <= 768 ? mobileBackgroundImage : backgroundImage;
      setBgImage(img);
      setImageLoaded(false); // Reset loader when image changes
      // Preload image
      const preloadImg = new window.Image();
      preloadImg.src = img;
      preloadImg.onload = () => setImageLoaded(true);
    };

    handleResize(); // Initial image load
    window.addEventListener("resize", handleResize); // Adjust on resize

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [backgroundImage, mobileBackgroundImage]);

  // Select title based on language
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
  // Default to the English title 

  return (
    <div className="relative lg:h-screen">
      {!imageLoaded ? (
        <div className="relative h-[500px] lg:h-screen animate-pulse bg-gray-300">
          <div className="absolute bottom-0 flex h-[500px] w-full items-center justify-center lg:h-screen">
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
