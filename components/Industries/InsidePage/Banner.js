import { useEffect, useState, useContext } from "react";
import { LanguageContext } from "../../../app/context/LanguageContext"; // Import LanguageContext

export default function IndustriesBanner({
  backgroundImage,
  mobileBackgroundImage,
  titleText,
}) {
  const [bgImage, setBgImage] = useState(null); // For setting the correct image based on screen size
  const [isLoading, setIsLoading] = useState(true); // For loader
  const [timer, setTimer] = useState(3); // Countdown timer (in seconds)
  const { language } = useContext(LanguageContext); // Get selected language

  useEffect(() => {
    // Set initial background image based on screen size
    const handleResize = () => {
      setBgImage(
        window.innerWidth <= 768 ? mobileBackgroundImage : backgroundImage
      );
    };

    handleResize(); // Initial image load
    window.addEventListener("resize", handleResize); // Adjust on resize

    // Start a countdown for timer
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev > 1) return prev - 1;
        clearInterval(countdown);
        setIsLoading(false); // Hide loader after countdown finishes
        return 0;
      });
    }, 1000);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(countdown);
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
              : titleText?.rendered; // Default to the English title

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
