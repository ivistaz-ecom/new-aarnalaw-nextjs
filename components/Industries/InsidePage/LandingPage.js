"use client";
import React, { useState, useEffect } from "react";
import Banner from "./Banner";
import PostDetails from "./PostDetails";

function LandingPage({ slug, initialData = [], initialIndustry = null }) {
  const [data, setData] = useState(initialIndustry);

  useEffect(() => {
    if (!initialIndustry) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `https://docs.aarnalaw.com/wp-json/wp/v2/industries?_embed&slug=${slug}`
          );
          if (!response.ok) {
            throw new Error('Failed to fetch industry details');
          }
          const result = await response.json();
          if (Array.isArray(result) && result.length > 0) {
            setData(result[0]);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
      }, [slug, initialIndustry]);

  const partnersData = {
    partnerNames: [
      data?.acf?.partner_name,
      data?.acf?.partner_name_2,
      data?.acf?.partner_name_3,
      data?.acf?.partner_name_4,
    ].filter(Boolean),
    partnerImages: [
      data?.acf?.partner_image?.url,
      data?.acf?.partner_image_2?.url,
      data?.acf?.partner_image_3?.url,
      data?.acf?.partner_image_4?.url,
    ].filter(Boolean),
    partnerDesignations: [
      data?.acf?.partner_designation,
      data?.acf?.partner_designation_2,
      data?.acf?.partner_designation_3,
      data?.acf?.partner_designation_4,
    ].filter(Boolean),
  };

  // Get banner images with fallback
  const bannerImage = data?.acf?.banner_image?.url || data?.acf?.banner_image;
  const mobileBannerImage = data?.acf?.mobile_banner_image?.url || data?.acf?.mobile_banner?.url || bannerImage;

  return (
    <div>
      <Banner
        backgroundImage={bannerImage}
        mobileBackgroundImage={mobileBannerImage}
        titleText={data || {}}
      />
      <PostDetails
        details={data || {}}
        partnersData={partnersData}
        slug={slug}
        titleText={data?.title?.rendered || ''}
        initialData={initialData}
      />
    </div>
  );
}

export default LandingPage;
