"use client";
import React, { useState } from "react";
import Banner from "@/components/Insights/Banner";
import AllInsights from "@/components/Insights/AllInsights";
import Navigation from "@/components/InsightsNavigation/Navigation";

export default function InsightsClient({ initialData, initialArchives, initialYear, productionMode }) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <Banner title="Insight" />
      <Navigation searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <AllInsights
        searchTerm={searchTerm}
        initialData={initialData}
        initialArchives={initialArchives}
        initialYear={initialYear}
        productionMode={productionMode}
      />
    </div>
  );
}
