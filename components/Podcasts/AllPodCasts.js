"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { play, pause, sound, mute, nextIcon, prevIcon } from "@/utils/icons";
import FloatingAudioPlayer from "./FloatingAudioPlayer";
import { initFlowbite } from "flowbite";
import configData from "../../config.json";

function AllPodCasts({ searchTerm, initialData = [] }) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [currentPodcastIndex, setCurrentPodcastIndex] = useState(null);
  const [volume, setVolume] = useState(1.0);
  const [mutedStatus, setMutedStatus] = useState({});
  const [progress, setProgress] = useState({});
  const [currentTime, setCurrentTime] = useState({});
  const [duration, setDuration] = useState({});
  const [expandedExcerpt, setExpandedExcerpt] = useState({});
  const [error, setError] = useState(null);

  const audioRefs = useRef({});

  const domain = typeof window !== "undefined" ? window.location.hostname : "";

  const handlePlayPause = (index, playerLink) => {
    const audio = audioRefs.current[index];
    if (currentPodcastIndex === index) {
      audio.pause();
      setCurrentPodcastIndex(null);
    } else {
      if (currentPodcastIndex !== null) {
        audioRefs.current[currentPodcastIndex].pause();
      }
      audio.src = playerLink;
      audio.volume = mutedStatus[index] ? 0 : volume;
      audio.play();
      setCurrentPodcastIndex(index);
    }
  };

  const handleVolumeToggle = (index) => {
    const audio = audioRefs.current[index];
    setMutedStatus((prev) => {
      const newMutedStatus = { ...prev, [index]: !prev[index] };
      audio.volume = newMutedStatus[index] ? 0 : volume;
      return newMutedStatus;
    });
  };

  const handleNext = () => {
    const nextIndex = (currentPodcastIndex + 1) % data.length;
    handlePlayPause(nextIndex, data[nextIndex].player_link);
  };

  const handlePrevious = () => {
    const prevIndex = (currentPodcastIndex - 1 + data.length) % data.length;
    handlePlayPause(prevIndex, data[prevIndex].player_link);
  };

  const handleSeek = (index, newTime, newProgress) => {
    setCurrentTime((prev) => ({ ...prev, [index]: newTime }));
    setProgress((prev) => ({ ...prev, [index]: newProgress }));

    const audioElement = audioRefs.current[index];
    if (audioElement) {
      audioElement.currentTime = newTime;
    }
  };

  const fetchContent = async (pageNum = 1, append = false) => {
    if (append) {
      setLoading(true);
    }
    setError(null);

    try {
      let server;
      if (domain === `${configData.LIVE_SITE_URL}` || domain === `${configData.LIVE_SITE_URL_WWW}`) {
        server = `${configData.LIVE_PRODUCTION_SERVER_ID}`;
      } else if (domain === `${configData.STAGING_SITE_URL}`) {
        server = `${configData.STAG_PRODUCTION_SERVER_ID}`;
      } else {
        server = `${configData.STAG_PRODUCTION_SERVER_ID}`;
      }

      const response = await fetch(
        `${configData.SERVER_URL}podcast?_embed&status[]=publish&production_mode[]=${server}&per_page=6&page=${pageNum}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await response.json();

      if (Array.isArray(result)) {
        const transformedData = result.map((item) => ({
          ...item,
          featured_image_url: item.episode_featured_image || "",
        }));

        if (append) {
          setData(prevData => [...prevData, ...transformedData]);
        } else {
          setData(transformedData);
        }
        setHasMore(result.length === 6);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Something went wrong. Please try again later.");
    }
    setLoading(false);
  };

  useEffect(() => {
    const currentAudioRefs = audioRefs.current;
    data.forEach((_, index) => {
      currentAudioRefs[index] = new Audio();
      currentAudioRefs[index].addEventListener("timeupdate", () => {
        setCurrentTime((prev) => ({
          ...prev,
          [index]: currentAudioRefs[index].currentTime,
        }));
        setProgress((prev) => ({
          ...prev,
          [index]:
            (currentAudioRefs[index].currentTime /
              currentAudioRefs[index].duration) *
            100,
        }));
      });
      currentAudioRefs[index].addEventListener("loadedmetadata", () => {
        setDuration((prev) => ({
          ...prev,
          [index]: currentAudioRefs[index].duration,
        }));
      });
    });
    return () => {
      Object.values(currentAudioRefs).forEach((audio) => {
        audio.pause();
        audio.src = "";
      });
    };
  }, [data]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const loadMore = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    await fetchContent(nextPage, true);
  };

  const filteredInsights = data.filter((data) =>
    data.title.rendered.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const toggleExcerpt = (id) => {
    setExpandedExcerpt((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="flex flex-col md:pt-10">
      <div className="mx-auto container grid w-full gap-4 p-4 md:grid-cols-2 md:p-0">
        {filteredInsights.length > 0 ? (
          filteredInsights.map((item, index) => (
            <div
              className={`rounded-lg border ${currentPodcastIndex === index
                ? "border-red-500"
                : "border-gray-200"
                } bg-white shadow dark:border-gray-700 dark:bg-gray-800`}
              key={item.id}
            >
              <div className="relative">
                {item.featured_image_url && (
                  <Image
                    src={item.featured_image_url}
                    alt={item.title?.rendered || "Podcast Image"}
                    className="w-full rounded-t-lg lg:h-[300px]"
                    width={500}
                    height={500}
                    priority={true}
                  />
                )}
              </div>
              <div className="p-5">
                <p
                  className="mb-2 min-h-16 text-xl font-bold tracking-tight text-gray-900 dark:text-white"
                  dangerouslySetInnerHTML={{ __html: item.title?.rendered }}
                />
                <p
                  className="text-gray-700 dark:text-gray-300"
                  dangerouslySetInnerHTML={{
                    __html: expandedExcerpt[item.id]
                      ? item.excerpt.rendered
                      : item.excerpt.rendered.slice(0, 100),
                  }}
                ></p>
                {item.excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, "").length >
                  100 && (
                    <button
                      onClick={() => toggleExcerpt(item.id)}
                      className="text-custom-red"
                    >
                      {expandedExcerpt[item.id] ? "Read Less" : "Read More"}
                    </button>
                  )}
              </div>

              {item.player_link && (
                <div className="flex items-center justify-between px-4 pb-4">
                  <button
                    className="rounded-full bg-custom-blue p-2 text-xl text-white hover:bg-custom-red"
                    onClick={() => handlePlayPause(index, item.player_link)}
                  >
                    {currentPodcastIndex === index ? pause : play}
                  </button>
                  <div className="mx-4 flex-1 rounded-lg border border-gray-200 p-2">
                    <span>
                      {formatTime(currentTime[index] || 0)} /{" "}
                      {formatTime(duration[index] || 0)}
                    </span>
                    <div
                      className="relative mb-1 h-2.5 w-full cursor-pointer rounded-full bg-gray-200"
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const clickPosition = e.clientX - rect.left;
                        const newTime =
                          (clickPosition / e.currentTarget.offsetWidth) *
                          (duration[index] || 0);
                        const audio = audioRefs.current[index];
                        audio.currentTime = newTime;
                      }}
                    >
                      <div
                        className="h-2.5 rounded-full bg-red-500"
                        style={{ width: `${progress[index] || 0}%` }}
                      />
                    </div>
                  </div>
                  <button
                    className="rounded-full bg-custom-blue p-2 text-xl text-white hover:bg-custom-red"
                    onClick={() => handleVolumeToggle(index)}
                  >
                    {mutedStatus[index] ? mute : sound}
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="col-span-1 mt-4 text-center text-gray-500 md:col-span-2">
            No related post found
          </div>
        )}
      </div>

      {hasMore && filteredInsights.length >= 6 && (
        <div className="col-span-1 mt-6 flex justify-center md:col-span-2">
          <button
            onClick={loadMore}
            className="bg-custom-red px-4 py-2 text-white hover:bg-red-600 active:bg-red-700"
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}

      <FloatingAudioPlayer
        currentPodcastIndex={currentPodcastIndex}
        podcasts={data}
        handlePlayPause={handlePlayPause}
        handleVolumeToggle={handleVolumeToggle}
        handleSeek={handleSeek}
        progress={progress}
        currentTime={currentTime}
        duration={duration}
        mutedStatus={mutedStatus}
        volume={volume}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        formatTime={formatTime}
      />
    </div>
  );
}

export default AllPodCasts;
