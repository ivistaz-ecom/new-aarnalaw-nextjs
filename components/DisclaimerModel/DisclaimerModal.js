'use client';

import { useState, useEffect } from 'react';
import Model from './model';

const DisclaimerModal = () => {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const hasAgreed = localStorage.getItem('disclaimerAgreed');
        if (!hasAgreed) {
            setTimeout(() => setShowModal(true), 500);
        }
    }, []);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [showModal]);

    const handleAgree = () => {
        localStorage.setItem('disclaimerAgreed', 'true');
        setShowModal(false);
    };

    const handleDisagree = () => {
        window.location.href = 'https://www.google.com';
    };

    if (!showModal) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

            {/* Modal Content */}
            <div className="relative bg-white rounded-2xl shadow-2xl dark:bg-gray-700 w-full max-w-7xl max-h-[90vh] overflow-hidden flex flex-col transform transition-all duration-300 ease-out">
                {/* Modal Header */}
                <div className="flex items-center justify-center px-6 pt-6 pb-4 border-b dark:border-gray-600">
                    <h3 className="text-2xl font-semibold text-custom-red dark:text-custom-red">
                        Disclaimer
                    </h3>
                </div>

                {/* Modal Body */}
                <div
                    className="overflow-y-auto p-6 text-gray-700 dark:text-gray-300"
                    style={{ maxHeight: 'calc(90vh - 200px)' }}
                >
                    <Model />
                </div>

                {/* Modal Footer */}
                <div className="flex items-center justify-end gap-4 px-6 py-4 border-t dark:border-gray-600 bg-gray-50 dark:bg-gray-800">
                    <button
                        onClick={handleDisagree}
                        className="px-6 py-2.5 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:bg-gray-600 dark:focus:ring-gray-700 transition-colors duration-200"
                    >
                        Disagree
                    </button>
                    <button
                        onClick={handleAgree}
                        className="px-6 py-2.5 text-base font-medium text-white bg-custom-red border border-transparent rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 transition-colors duration-200"
                    >
                        I Agree
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DisclaimerModal;
