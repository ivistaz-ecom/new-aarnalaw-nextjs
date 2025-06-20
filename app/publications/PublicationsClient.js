"use client";
import { useState } from "react";
import Banner from "@/components/Publication/Banner";
import AllInsights from "@/components/Publication/AllInsights";
import Navigation from "@/components/InsightsNavigation/Navigation";

export default function PublicationsClient({ initialData }) {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div>
            <Banner title="publication" />
            <Navigation searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <AllInsights searchTerm={searchTerm} initialData={initialData} />
        </div>
    );
} 