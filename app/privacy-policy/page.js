"use client";
import React, { useEffect } from "react";
import Banner from "../../components/PrivacyPolicy/Banner";
import PrivacyPolicy from "../../components/PrivacyPolicy/privacy-policy";
import { initFlowbite } from "flowbite";

export default function Careers() {
  useEffect(() => {
    initFlowbite(); // Initialize Flowbite after the data is loaded
  }, []);

  return (
    <>
      <Banner />
      <PrivacyPolicy />
    </>
  );
}