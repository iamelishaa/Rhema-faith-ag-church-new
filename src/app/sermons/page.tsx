"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { SermonHero } from "../../components/sermons/SermonHero";
import { SermonCard, type Sermon } from "../../components/sermons/SermonCard";
import { getLatestSermons } from "@/lib/youtube";

// This will be replaced with API data
const mockSermons: Sermon[] = [];

export default function SermonsPage() {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [pageToken, setPageToken] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastSermonRef = useCallback((node: HTMLDivElement | null) => {
    if (loading || loadingMore) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreSermons();
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, loadingMore, hasMore]);

  const loadMoreSermons = async () => {
    if (loading || loadingMore) return;
    
    try {
      setLoadingMore(true);
      const { items, nextPageToken } = await getLatestSermons(pageToken || undefined);
      
      setSermons(prev => [...prev, ...items]);
      setPageToken(nextPageToken || null);
      setHasMore(!!nextPageToken);
    } catch (err) {
      console.error("Failed to fetch more sermons:", err);
      setError("Failed to load more sermons. Please try again later.");
    } finally {
      setLoadingMore(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    const fetchSermons = async () => {
      try {
        setLoading(true);
        const { items, nextPageToken } = await getLatestSermons();
        setSermons(items);
        setPageToken(nextPageToken || null);
        setHasMore(!!nextPageToken);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch sermons:", err);
        setError("Failed to load sermons. Please try again later.");
        // Fallback to mock data if API fails
        setSermons(mockSermons);
      } finally {
        setLoading(false);
      }
    };

    fetchSermons();
  }, []);

  // Get latest sermon for hero section
  const latestSermon = sermons[0] || null;

  // Sort sermons by newest first
  const sortedSermons = [...sermons].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  const recentSermons = sortedSermons.slice(1); // All sermons except the first one

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }


  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section with Latest Sermon */}
      {latestSermon && <SermonHero latestSermon={latestSermon} />}

      {/* Page Title */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Sermons
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Watch and listen to our latest messages
          </p>

          {error && (
            <div
              className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6"
              role="alert"
            >
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
          )}

          {sermons.length === 0 && !loading && !error && (
            <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 mb-6">
              <p>No sermons found. Please check back later.</p>
            </div>
          )}
        </div>

      </div>

      {/* Sermons Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {recentSermons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentSermons.map((sermon, index) => {
              if (recentSermons.length === index + 1) {
                return (
                  <div ref={lastSermonRef} key={sermon.id}>
                    <SermonCard sermon={sermon} />
                  </div>
                );
              }
              return <SermonCard key={sermon.id} sermon={sermon} />;
            })}
            {loadingMore && (
              <div className="col-span-full flex justify-center my-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">
              No sermons found matching your criteria.
            </p>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="py-12 text-center bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Want to see more sermons?
          </h2>
          <a
            href="https://www.youtube.com/channel/UCfGHCtW5XlkY78l97_Rwu4Q"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors"
          >
            View More on YouTube
          </a>
        </div>
      </div>
    </main>
  );
}
