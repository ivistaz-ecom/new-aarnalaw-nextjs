"use client";
import React, { useEffect } from "react";
import Banner from "../../components/TermsOfUse/Banner";
import TermsOfUse from "../../components/TermsOfUse/terms-of-use";
import { initFlowbite } from "flowbite";

export default function Careers() {
  useEffect(() => {
    initFlowbite(); // Initialize Flowbite after the data is loaded
  }, []);

  return (
    <>
      <Banner />
      <TermsOfUse />
    </>
  );
}