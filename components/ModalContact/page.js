import { Modal } from "flowbite-react";
import { useState, useEffect, useRef } from "react";
import HubSpotCareer from "@/utils/HubSpotForm/CareerForm";
import InternShip from "@/utils/HubSpotForm/Internships";
import Subscribe from "@/utils/HubSpotForm/Subscribe";
import ContactPartner from "@/utils/HubSpotForm/ContactPartner";
import { HiX } from "react-icons/hi";

function ModalContact({ btnName, textColor, modalTitle, btnType, id }) {
  const [openModal, setOpenModal] = useState(false);
  const modalRef = useRef(null); // ✅ Declare modalRef

  const componentMap = {
    career: HubSpotCareer,
    internships: InternShip,
    subscribe: Subscribe,
    contactPartner: ContactPartner,
  };

  const SelectedComponent = componentMap[btnType] || null;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOpenModal(false); // ✅ Close modal when clicking outside
      }
    };

    if (openModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openModal]);

  return (
    <>
      <button
        className={`border border-custom-red bg-transparent p-2 text-lg text-custom-blue font-semibold 
          hover:bg-custom-blue hover:text-white transition-colors duration-300
          md:px-6 md:text-base`}
        onClick={() => setOpenModal(true)}
      >
        {btnName}
      </button>
      <Modal show={openModal} onClose={() => setOpenModal(false)} className="pt-10 md:pt-0">
        <div ref={modalRef}>
          <div className="flex items-center justify-between px-6 pt-6 pb-2 border-b">
            <div
              className="text-xl font-semibold text-gray-900 dark:text-white"
              dangerouslySetInnerHTML={{ __html: modalTitle }}
            />
            <button
              onClick={() => setOpenModal(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
            >
              <HiX className="w-6 h-6" />
            </button>
          </div>
          <Modal.Body>
            {SelectedComponent ? (
              <SelectedComponent id={id} />
            ) : (
              <p>Component not found</p>
            )}
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
}

export default ModalContact;

