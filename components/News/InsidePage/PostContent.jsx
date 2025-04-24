"use client";

import React, { useEffect, useState } from "react";
import Banner from "@/components/Insights/InsidePage/Banner";
import Link from "next/link";
import ErrorPage from "@/components/404/page";

export default function PostContent({ slug }) {
    const [title, setTitle] = useState(null);
    const [date, setDate] = useState(null);
    const [featureImage, setFeatureImage] = useState(null);
    const [content, setContent] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://docs.aarnalaw.com/wp-json/wp/v2/posts?_embed&slug=${slug}`);
                const data = await response.json();

                if (data && data.length > 0) {
                    const post = data[0];
                    setTitle(post.title.rendered);
                    setDate(post.date);
                    setContent(post.content.rendered);

                    // Check ACF field: desktop_banner_image
                    const desktopBanner = post.acf?.desktop_banner_image;

                    if (desktopBanner && typeof desktopBanner === "object") {
                        setFeatureImage(desktopBanner.url || null);
                    } else {
                        setFeatureImage(desktopBanner || null);
                    }

                } else {
                    setError(true);
                }
            } catch (err) {
                console.error("Fetch error:", err);
                setError(true);
            }
        };

        fetchData();
    }, [slug]);

    const formatDateString = (dateString) => {
        const date = new Date(dateString);
        const monthAbbreviations = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        return `${date.getDate()}\n${monthAbbreviations[date.getMonth()]}\n${date.getFullYear()}`;
    };

    if (error) return <ErrorPage />;
    if (!title || !content) return <p className="text-center py-8">Loading...</p>;

    return (
        <>
            <div className="mx-auto w-11/12">
                <div className="h-[200px]" />
                <h1
                    className="py-4 text-4xl font-bold tracking-wide text-black"
                    dangerouslySetInnerHTML={{ __html: title }}
                />
                <p className="py-4">Published:- {formatDateString(date)}</p>
                {featureImage && <Banner backgroundImage={featureImage} />}
            </div>

            <div className="py-12 mx-auto w-11/12">
                <p
                    dangerouslySetInnerHTML={{ __html: content }}
                    className="insight-blog py-5"
                />
            </div>

            <div className="mx-auto w-11/12">
                <Link
                    href="/aarna-news/"
                    className="mt-6 bg-custom-red px-4 py-2 text-white"
                >
                    Back to Aarna News
                </Link>
            </div>
        </>
    );
}
