import React, { useState, useContext, useRef, useEffect } from "react";
import { LanguageContext } from "../../app/context/LanguageContext";
import { FaCaretDown } from "react-icons/fa"; // Import the dropdown icon

const LanguageDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useContext(LanguageContext);
  const dropdownRef = useRef(null);

  const languages = [
    { code: "en", label: "English" },
    { code: "kn", label: "ಕನ್ನಡ (Kannada)" },
    { code: "ta", label: "தமிழ் (Tamil)" },
    { code: "te", label: "తెలుగు (Telugu)" },
    { code: "hi", label: "हिंदी (Hindi)" },
    { code: "ml", label: "മലയാളം (Malayalam)" },
    { code: "mr", label: "मराठी (Marathi)" },
    { code: "gu", label: "ગુજરાતી (Gujarati)" },
    { code: "fr", label: "Français (French)" },
    // { code: "ur", label: "اردو (Urdu)" },
    // { code: "pa", label: "ਪੰਜਾਬੀ (Punjabi)" },
    // { code: "bn", label: "বাংলা (Bengali)" },
    // { code: "or", label: "ଓଡିଆ (Odia)" },
    // { code: "as", label: "অসমীয়া (Assamese)" },
    // { code: "ne", label: "नेपाली (Nepali)" },
  ];

  // Find the selected language label
  const selectedLanguage = languages.find((lang) => lang.code === language)?.label || "Language";

  // Handle click outside dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-custom-red text-white rounded-sm"
      >
        {selectedLanguage}
        <FaCaretDown className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-[100]">
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className="block px-4 py-2 w-full text-left text-sm hover:bg-custom-red hover:text-white"
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;
