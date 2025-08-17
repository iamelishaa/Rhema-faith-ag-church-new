"use client";

import { useEffect, useState, useRef, useCallback } from "react";
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
const PAGE_SIZE = 6;

export default function SermonsPage() {
  const [currentVideoId, setCurrentVideoId] = useState<string>("");
  const [currentTitle, setCurrentTitle] = useState<string>("Live Now");
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const loadVideos = useCallback(
    async (pageNum: number, isInitialLoad = false) => {
      try {
        if (isInitialLoad) {
          setIsLoading(true);
        } else {
          setIsLoadingMore(true);
        }

        const response = await fetchLatestVideos(
          CHANNEL_ID,
          PAGE_SIZE,
          String((pageNum - 1) * PAGE_SIZE)
        );

        const newVideos = response.videos || [];

        setVideos((prevVideos) =>
          isInitialLoad ? newVideos : [...prevVideos, ...newVideos]
        );

        setHasMore(newVideos.length === PAGE_SIZE);

        if (isInitialLoad && newVideos.length > 0) {
          setCurrentVideoId(newVideos[0].id);
          setCurrentTitle(cleanTitle(newVideos[0].title));
        }

        if (!isInitialLoad) {
          setPage(pageNum);
        }
      } catch (err) {
        console.error("Failed to load videos:", err);
        setError("Failed to load videos. Please try again later.");
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    },
    []
  );

  // Initial load
  useEffect(() => {
    loadVideos(1, true);
  }, [loadVideos]);

  // Infinite scroll setup
  useEffect(() => {
    if (isLoading || isLoadingMore || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          loadVideos(page + 1, false);
        }
      },
      { root: null, rootMargin: "20px", threshold: 0.1 }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [isLoading, isLoadingMore, hasMore, loadVideos, page]);

  const handleVideoClick = (video: VideoItem) => {
    setCurrentVideoId(video.id);
    setCurrentTitle(cleanTitle(video.title));
  };

  const cleanedVideos = videos.map((video) => ({
    ...video,
    title: cleanTitle(video.title || ""),
  }));

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          Sermons
        </h1>

        <section className="mb-12">
          <div className="aspect-video w-full mx-auto mb-8 rounded-lg overflow-hidden shadow-2xl">
            <iframe
              src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1&mute=1`}
              title={currentTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>

          <h2 className="text-2xl font-semibold mb-6">Latest Sermons</h2>

          {isLoading ? (
            <SermonListSkeleton count={6} />
          ) : error ? (
            <div className="text-center text-red-400">{error}</div>
          ) : videos.length === 0 ? (
            <div className="text-center text-gray-400">
              No sermons available at the moment.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {cleanedVideos.map((video, index) => (
                <div
                  key={`${video.id}-${index}`}
                  className={`transition-opacity duration-300 ${
                    isLoadingMore ? "opacity-50" : "opacity-100"
                  }`}
                >
                  {/* Thumbnail card */}
                  <div
                    className="group cursor-pointer rounded-lg overflow-hidden bg-gray-800/40 hover:bg-gray-800/70 transition-colors"
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
                  </div>

                  {/* Title + Date outside the card */}
                  <div className="mt-3">
                    <h3 className="text-md font-medium text-white mb-1 line-clamp-2">
                      {video.title}
                    </h3>
                    <div className="text-gray-400 text-xs">
                      {new Date(video.published).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                </div>
              ))}

              {/* Load more trigger */}
              <div
                ref={loadMoreRef}
                className="h-10 w-full col-span-1 md:col-span-2 lg:col-span-3 flex justify-center items-center"
              >
                {isLoadingMore && (
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                )}
                {!hasMore && videos.length > 0 && (
                  <div className="text-gray-400">No more sermons to load</div>
                )}
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
