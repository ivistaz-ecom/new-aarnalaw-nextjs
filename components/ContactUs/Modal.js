"use client";
import { Modal } from "flowbite-react";
import { useEffect, useRef } from "react";

function ModalTestimonial({ data, onClose }) {
  const modalRef = useRef();

  // Detect click outside modal content
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose(); // Close modal when clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <Modal
      show={!!data}
      onClose={onClose}
      dismissible={false}
      className="flex items-center justify-center pt-40 md:pt-0" // center modal on all screens
    >
      <div
        ref={modalRef}
        className="max-h-[60vh] overflow-y-auto bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl "
      >
        <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 rounded-t-lg">
          <Modal.Header>
            <div>
              <h3 className="text-lg font-semibold">{data?.name}</h3>
              <p className="text-sm text-gray-500">{data?.post}</p>
              <p className="text-sm text-gray-500">{data?.desingnation}</p>
            </div>
          </Modal.Header>
        </div>
        <Modal.Body>
          <div className="space-y-4">
            {data?.fullTestimonial.split("\n").map((line, index) => (
              <p
                key={index}
                className="text-base leading-relaxed text-gray-700 dark:text-gray-300"
              >
                {line}
              </p>
            ))}
          </div>
        </Modal.Body>
      </div>
    </Modal>
  );
}

export default ModalTestimonial;
