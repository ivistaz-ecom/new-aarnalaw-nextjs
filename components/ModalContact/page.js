import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import HubSpotCareer from "@/utils/HubSpotForm/CareerForm";
import InternShip from "@/utils/HubSpotForm/Internships";
import Subscribe from "@/utils/HubSpotForm/Subscribe";
import ContactPartner from "@/utils/HubSpotForm/ContactPartner";

function ModalContact({ btnName, textColor, modalTitle, btnType, id }) {
  const [openModal, setOpenModal] = useState(false);

  const componentMap = {
    career: HubSpotCareer,
    internships: InternShip,
    subscribe: Subscribe,
    contactPartner: ContactPartner,
  };

  const SelectedComponent = componentMap[btnType] || null;

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
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        {/* Custom header with HTML rendering */}
        <div className="px-6 pt-6 text-xl font-semibold text-gray-900 dark:text-white">
          <div dangerouslySetInnerHTML={{ __html: modalTitle }} />
        </div>
        <Modal.Body>
          {SelectedComponent ? (
            <SelectedComponent id={id} />
          ) : (
            <p>Component not found</p>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalContact;



