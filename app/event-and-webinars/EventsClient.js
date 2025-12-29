"use client";
import { useState } from "react";
import Banner from "@/components/EventAndWebinars/Banner";
import AllEvents from "@/components/EventAndWebinars/AllEvents";
import Navigation from "@/components/InsightsNavigation/Navigation";

export default function EventsClient({ initialData }) {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div>
            <Banner title="Event & Webinars" />
            <Navigation searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <AllEvents searchTerm={searchTerm} initialData={initialData} />
            
        </div>

    );
}

