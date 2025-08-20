"use client";
import React, { useEffect } from "react";
import Banner from "../../components/PrivacyPolicyTest/Banner";
import PrivacyPolicyTest from "../../components/PrivacyPolicyTest/privacy-policy";
import { initFlowbite } from "flowbite";

export default function Careers() {
  useEffect(() => {
    initFlowbite(); // Initialize Flowbite after the data is loaded
  }, []);

  return (
    <>
      <Banner />
      <PrivacyPolicyTest />
    </>
  );
}