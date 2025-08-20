"use client";
import React, { useEffect } from "react";
import Banner from "../../components/DisclaimerTest/Banner";
import DisclaimerTest from "../../components/DisclaimerTest/disclaimer";
import { initFlowbite } from "flowbite";

export default function Careers() {
  useEffect(() => {
    initFlowbite(); // Initialize Flowbite after the data is loaded
  }, []);

  return (
    <>
      <Banner />
      <DisclaimerTest />
    </>
  );
}