"use client";

import { useEffect, useState } from "react";
import { VideoItem, fetchLatestVideos } from "@/lib/youtubeRSS";
import { SermonListSkeleton } from "@/components/SermonSkeleton";

function cleanTitle(title: string): string {
  return title
    .replace(/^\s*LIVE\s*\|?\s*/i, "")
    .replace(/\s*\|\s*WORSHIP & WORD OF GOD BY.*$/i, "")
    .replace(/\|/g, "")
    .trim()
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
    .trim();
}

const CHANNEL_ID = "UCfGHCtW5XlkY78l97_Rwu4Q";

export default function SermonsPage() {
  const [currentVideoId, setCurrentVideoId] = useState<string>("");
  const [currentTitle, setCurrentTitle] = useState<string>("Live Now");
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadVideos = async () => {
      try {
        if (isMounted) setIsLoading(true);
        const latestVideos = await fetchLatestVideos(CHANNEL_ID, 6);
        if (isMounted) {
          setVideos(latestVideos);

          if (latestVideos.length > 0) {
            setCurrentVideoId(latestVideos[0].id);
            setCurrentTitle(latestVideos[0].title);
          }
        }
      } catch (err) {
        console.error("Failed to load videos:", err);
        if (isMounted)
          setError("Failed to load videos. Please try again later.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadVideos();

    // 🔄 Auto-refresh every 5 minutes
    const interval = setInterval(loadVideos, 5 * 60 * 1000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const handleVideoClick = (video: VideoItem) => {
    setCurrentVideoId(video.id);
    setCurrentTitle(cleanTitle(video.title));
  };

  const cleanedVideos = videos.map((video) => ({
    ...video,
    title: cleanTitle(video.title),
  }));

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Video */}
        <div className="flex flex-col lg:flex-row gap-8">
          <div
            className="flex-1 relative bg-black rounded-xl overflow-hidden shadow-2xl"
            style={{ paddingTop: "56.25%" }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${
                currentVideoId || `live_stream?channel=${CHANNEL_ID}`
              }?autoplay=0&mute=1&rel=0`}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={currentTitle}
            />
          </div>
        </div>

        {/* Recent Sermons */}
        <section className="py-8">
          <h2 className="text-3xl font-bold text-white mb-8">Recent Sermons</h2>
          {isLoading ? (
            <SermonListSkeleton count={6} />
          ) : error ? (
            <div className="text-center text-red-400">{error}</div>
          ) : videos.length === 0 ? (
            <div className="text-center text-gray-400">
              No sermons available at the moment.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cleanedVideos.map((video) => (
                <div
                  key={video.id}
                  className="group flex flex-col cursor-pointer rounded-lg overflow-hidden bg-gray-800/50 hover:bg-gray-800/80 transition-colors"
                  onClick={() => handleVideoClick(video)}
                >
                  <div className="relative w-full aspect-video">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-black ml-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                      {video.title}
                    </h3>
                    <div className="text-gray-400 text-sm">
                      {new Date(video.published).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
