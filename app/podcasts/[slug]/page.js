"use client";

import React, { useEffect, useState, useRef } from "react";
import Banner from "@/components/Insights/InsidePage/Banner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ErrorPage from "@/components/404/page";
import { play, pause, sound, mute } from "@/utils/icons";
import FloatingAudioPlayer from "@/components/Podcasts/FloatingAudioPlayer";

export default function PodcastPost({ params }) {
  const { slug } = params;
  const router = useRouter();

  const [title, setTitle] = useState(null);
  const [date, setDate] = useState(null);
  const [featureImage, setFeatureImage] = useState(null);
  const [content, setContent] = useState(null);
  const [playerLink, setPlayerLink] = useState(null);
  const [error, setError] = useState(false);

  // 🔑 For prev / next
  const [allPodcasts, setAllPodcasts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);

  // 🎵 Audio states
  const [currentPodcastIndex, setCurrentPodcastIndex] = useState(null);
  const [volume, setVolume] = useState(1.0);
  const [mutedStatus, setMutedStatus] = useState({});
  const [progress, setProgress] = useState({});
  const [currentTime, setCurrentTime] = useState({});
  const [duration, setDuration] = useState({});

  const audioRefs = useRef({});

  // 🎵 Play / Pause
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

  // 🎵 Mute / Unmute
  const handleVolumeToggle = (index) => {
    const audio = audioRefs.current[index];
    setMutedStatus((prev) => {
      const newMutedStatus = { ...prev, [index]: !prev[index] };
      audio.volume = newMutedStatus[index] ? 0 : volume;
      return newMutedStatus;
    });
  };

  // 🎵 Seek
  const handleSeek = (index, newTime, newProgress) => {
    setCurrentTime((prev) => ({ ...prev, [index]: newTime }));
    setProgress((prev) => ({ ...prev, [index]: newProgress }));
    const audioElement = audioRefs.current[index];
    if (audioElement) {
      audioElement.currentTime = newTime;
    }
  };

  // 🎵 Format time
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // ✅ Fetch all podcasts for navigation
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await fetch(
          `https://docs.aarnalaw.com/wp-json/wp/v2/podcast?_embed&per_page=100`
        );
        const data = await res.json();
        setAllPodcasts(data);

        const index = data.findIndex((p) => p.slug === slug);
        setCurrentIndex(index);

        if (index !== -1) {
          const post = data[index];
          setTitle(post.title?.rendered || post.slug);
          setDate(post.date);
          setContent(
            post.content?.rendered ||
              post.excerpt?.rendered ||
              post.acf?.description ||
              "<p>No description available.</p>"
          );
          setFeatureImage(
            post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null
          );
          setPlayerLink(post.player_link || null);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(true);
      }
    };
    fetchAll();
  }, [slug]);

  // Setup audio refs
  useEffect(() => {
    if (!playerLink) return;

    audioRefs.current[0] = new Audio();
    audioRefs.current[0].addEventListener("timeupdate", () => {
      setCurrentTime((prev) => ({
        ...prev,
        0: audioRefs.current[0].currentTime,
      }));
      setProgress((prev) => ({
        ...prev,
        0:
          (audioRefs.current[0].currentTime / audioRefs.current[0].duration) *
          100,
      }));
    });
    audioRefs.current[0].addEventListener("loadedmetadata", () => {
      setDuration((prev) => ({
        ...prev,
        0: audioRefs.current[0].duration,
      }));
    });

    return () => {
      audioRefs.current[0]?.pause();
      audioRefs.current[0].src = "";
    };
  }, [playerLink]);

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const monthAbbreviations = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
    return `${date.getDate()} ${
      monthAbbreviations[date.getMonth()]
    } ${date.getFullYear()}`;
  };

  if (error) return <ErrorPage />;
  if (!title || !content) return <p className="py-8 text-center">Loading...</p>;

  return (
    <>
      <div className="px-4 md:w-[70%] w-full mx-auto">
        <div className="">
          <div className="h-[200px]" />
          <h1
            className="py-4 lg:text-4xl text-2xl font-bold tracking-wide text-black"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <p className="py-4">Published: {formatDateString(date)}</p>
          {featureImage && <Banner backgroundImage={featureImage} />}
        </div>

        <div className=" pt-5">
          <div
            dangerouslySetInnerHTML={{ __html: content }}
            className="insight-blog "
          />
        </div>

        {/* 🎵 Audio Player */}
        {playerLink && (
          <div className="my-6 rounded-lg border p-4 shadow">
            <div className="flex items-center space-x-4">
              {/* Play / Pause */}
              <button
                className="rounded-full bg-custom-blue p-3 text-white hover:bg-custom-red"
                onClick={() => handlePlayPause(0, playerLink)}
              >
                {currentPodcastIndex === 0 ? pause : play}
              </button>

              {/* Progress bar */}
              <div className="flex-1">
                <span>
                  {formatTime(currentTime[0] || 0)} /{" "}
                  {formatTime(duration[0] || 0)}
                </span>
                <div
                  className="relative mt-2 h-2 w-full cursor-pointer rounded-full bg-gray-200"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickPosition = e.clientX - rect.left;
                    const newTime =
                      (clickPosition / e.currentTarget.offsetWidth) *
                      (duration[0] || 0);
                    handleSeek(0, newTime, progress[0]);
                  }}
                >
                  <div
                    className="h-2 rounded-full bg-red-500"
                    style={{ width: `${progress[0] || 0}%` }}
                  />
                </div>
              </div>

              {/* Volume */}
              <button
                className="rounded-full bg-custom-blue p-3 text-white hover:bg-custom-red"
                onClick={() => handleVolumeToggle(0)}
              >
                {mutedStatus[0] ? mute : sound}
              </button>
            </div>
          </div>
        )}

        <FloatingAudioPlayer
          currentPodcastIndex={currentPodcastIndex}
          podcasts={[
            {
              title: { rendered: title },
              player_link: playerLink,
            },
          ]}
          handlePlayPause={handlePlayPause}
          handleVolumeToggle={handleVolumeToggle}
          handleSeek={handleSeek}
          progress={progress}
          currentTime={currentTime}
          duration={duration}
          mutedStatus={mutedStatus}
          volume={volume}
          handleNext={() => {}}
          handlePrevious={() => {}}
          formatTime={formatTime}
        />

        {/* ✅ Prev / Next buttons */}
        <div className="mt-6 flex justify-between">
          {currentIndex > 0 && (
            <button
              onClick={() => router.push(`/podcasts/${allPodcasts[currentIndex - 1].slug}`)}
              className="bg-custom-red px-4 py-2 text-white transition hover:bg-red-700"
            >
              ← Previous Podcast
            </button>
          )}
          {currentIndex < allPodcasts.length - 1 && (
            <button
              onClick={() => router.push(`/podcasts/${allPodcasts[currentIndex + 1].slug}`)}
              className="bg-custom-red px-4 py-2 text-white transition hover:bg-red-700 ml-auto"
            >
              Next Podcast →
            </button>
          )}
        </div>
      </div>
    </>
  );
}
