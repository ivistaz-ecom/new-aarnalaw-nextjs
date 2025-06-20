"use client";
import { useState } from "react";
import Banner from "@/components/News/Banner";
import AllInsights from "@/components/News/AllInsights";
import Navigation from "@/components/InsightsNavigation/Navigation";

export default function NewsClient({ initialData }) {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div>
            <Banner title="insight" />
            <Navigation searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <AllInsights searchTerm={searchTerm} initialData={initialData} />
        </div>
    );
} 