"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { VideoItem, fetchLatestVideos } from "@/lib/youtubeRSS";

function cleanTitle(title: string): string {
  // Remove common patterns and clean up the title
  return (
    title
      // Remove LIVE and any following |
      .replace(/^\s*LIVE\s*\|?\s*/i, "")
      // Remove everything after the last | if it contains 'WORSHIP & WORD OF GOD BY'
      .replace(/\s*\|\s*WORSHIP & WORD OF GOD BY.*$/i, "")
      // Remove any remaining | and trim whitespace
      .replace(/\|/g, "")
      .trim()
      // Capitalize first letter of each word
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
      // Limit length to 50 characters
      .substring(0, 50)
      .trim()
  );
}
import { Button } from "@/components/ui/button";
import { IMAGES } from "@/lib/images";
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Mail,
  Video as VideoIcon,
  Play,
  Users,
  Music,
  BookOpen,
  MapPin,
} from "lucide-react";


export default function Home() {
  console.log('Rendering Home component');
  const [sermons, setSermons] = useState<VideoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSermons = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const result = await fetchLatestVideos(
          process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID || '',
          3
        );
        
        console.log('Sermons loaded:', result);
        
        // If there was an error in fetching, show it to the user
        if (result.error) {
          console.warn('Warning from YouTube API:', result.error);
          setError(`Unable to load latest videos: ${result.error}. Showing sample content.`);
        }
        
        console.log('Number of videos received:', result.videos.length);
        console.log('Video IDs:', result.videos.map(v => v.id));
        
        // Filter out any duplicate videos
        const uniqueVideos = result.videos.filter((video, index, self) => 
          index === self.findIndex((v) => v.id === video.id)
        );
        
        console.log('After deduplication:', uniqueVideos.length, 'videos');
        
        setSermons(uniqueVideos);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        console.error('Error in loadSermons:', errorMessage, err);
        setError(`Failed to load sermons: ${errorMessage}. Showing sample content.`);
      } finally {
        setIsLoading(false);
      }
    };

    loadSermons();
  }, [sermons.length, error]);

  console.log('Render state:', { isLoading, error, sermonCount: sermons.length });
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading content...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex flex-col items-center text-center">
            <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Oops! Something went wrong</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {error} Don&apos;t worry, we&apos;re showing sample content for now.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <button
                onClick={() => window.location.reload()}
                className="flex-1 px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Try Again
              </button>
              <a
                href="https://www.youtube.com/@RhemaFaithAGChurch"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-medium rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-center"
              >
                Visit YouTube Channel
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Add a subtle background pattern */}
      <div className="absolute inset-0 bg-grid-gray-100 dark:bg-grid-gray-800 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.8))] dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"></div>
      <section className="relative bg-gray-900 text-white overflow-hidden min-h-screen">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={IMAGES.pastor}
            alt="Pastor"
            fill
            priority
            unoptimized={true}
            className="object-cover object-center sm:object-right opacity-90"
            style={{
              objectFit: "cover",
            }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = IMAGES.placeholder;
              target.onerror = null;
            }}
          />
        </div>

        <div className="container mx-auto px-6 sm:px-8 lg:px-12 min-h-screen flex flex-col md:flex-row items-center justify-between relative z-10">
          {/* Left side - text */}
          <div className="relative h-[90vh] flex flex-col justify-end px-6 lg:px-12">
            {/* move the text to the bottom */}
            <div className="">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Rhema Faith AG Church
              </h1>
              <p className="text-xl md:text-2xl text-indigo-100 mb-8 max-w-2xl">
                A place where faith, hope, and love come together to transform
                lives.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/about"
                  className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg bg-transparent hover:bg-white hover:text-black transition duration-300 inline-flex items-center justify-center gap-2"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/sermons"
                  className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg bg-transparent hover:bg-white hover:text-black transition duration-300 inline-flex items-center justify-center gap-2"
                >
                  Watch Sermons
                  <Play className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Background overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-transparent z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-0"></div>
      </section>

      {/* Ministry Callout */}
      <section className="py-20 bg-white dark:bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8">
            Find your place at Rhema Faith AG Church
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Discover a ministry that matches your calling and make a lasting
            difference in our community.
          </p>
        </div>

        {/* Ministry Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Row */}
          <div className="grid grid-cols-1 md:grid-cols-10 gap-8 mb-8">
            {/* Worship Team - 70% */}
            <Link
              href="/ministries/worship"
              className="md:col-span-7 bg-white rounded-xl p-10 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col h-[400px]"
            >
              <div className="mb-6">
                <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800 mb-4">
                  Worship Ministry
                </span>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  Worship Team
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Join our passionate team of worship leaders and musicians who
                  help create an atmosphere of praise and worship that draws
                  people closer to God.
                </p>
              </div>
              <div className="mt-auto">
                <Button
                  variant="link"
                  className="p-0 h-auto text-gray-600 hover:text-gray-800 text-lg font-medium group flex items-center gap-1"
                >
                  Learn more about Worship Ministry
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </Link>

            {/* Children's Ministry - 30% */}
            <Link
              href="/ministries/children"
              className="md:col-span-3 bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col h-[400px]"
            >
              <div className="mb-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mb-4">
                  Children&apos;s Ministry
                </span>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Children&apos;s Ministry
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Nurturing young hearts and minds in the love of Christ through
                  engaging activities, biblical teaching, and a safe, fun
                  environment.
                </p>
              </div>
              <div className="mt-auto">
                <Button
                  variant="link"
                  className="p-0 h-auto text-gray-600 hover:text-gray-800 text-lg font-medium group flex items-center gap-1"
                >
                  Explore Children&apos;s Ministry
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </Link>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Youth Group */}
            <Link
              href="/ministries/youth"
              className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col h-[320px]"
            >
              <div className="mb-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mb-4">
                  Youth Ministry
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Youth Group
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  A dynamic community for teenagers to grow in faith, build
                  authentic relationships, and discover their God-given purpose.
                </p>
              </div>
              <div className="mt-auto">
                <Button
                  variant="link"
                  className="p-0 h-auto text-gray-600 hover:text-gray-800 text-lg font-medium group flex items-center gap-1"
                >
                  Join Youth Group
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </Link>

            {/* Outreach */}
            <Link
              href="/ministries/outreach"
              className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col h-[320px]"
            >
              <div className="mb-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mb-4">
                  Outreach
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Community Outreach
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Serving our community and sharing God&apos;s love through
                  practical acts of service, compassion, and intentional
                  relationships.
                </p>
              </div>
              <div className="mt-auto">
                <Button
                  variant="link"
                  className="p-0 h-auto text-gray-600 hover:text-gray-800 text-lg font-medium group flex items-center gap-1"
                >
                  Get Involved
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </Link>

            {/* Women's Ministry */}
            <Link
              href="/ministries/women"
              className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col h-[320px]"
            >
              <div className="mb-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mb-4">
                  Women&apos;s Ministry
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Women&apos;s Ministry
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Empowering women of all ages to grow in faith, build authentic
                  relationships, and serve together in community.
                </p>
              </div>
              <div className="mt-auto">
                <Button
                  variant="link"
                  className="p-0 h-auto text-gray-600 hover:text-gray-800 text-lg font-medium group flex items-center gap-1"
                >
                  Connect with Us
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Sermons */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Featured Sermons
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-300">
              Watch our latest messages and be inspired
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500">{error}</p>
              <Button
                onClick={() => window.location.reload()}
                className="mt-4"
                variant="outline"
              >
                Retry
              </Button>
            </div>
          ) : (
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {sermons.map((sermon) => (
                <div
                  key={sermon.id}
                  className="bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative h-56 w-full bg-gray-100">
                    <Image
                      src={sermon.thumbnail}
                      alt={sermon.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
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
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {cleanTitle(sermon.title)}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <Calendar className="w-4 h-4 mr-1.5" />
                      {new Date(sermon.published).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                    <a
                      href={`https://www.youtube.com/watch?v=${sermon.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium gap-1 transition-colors duration-200"
                    >
                      Watch on YouTube
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-10 text-center">
            <Button
              variant="outline"
              asChild
              className="group px-6 py-6 text-base border-black text-black hover:bg-white transition duration-300"
            >
              <Link
                href="/sermons"
                className="inline-flex items-center gap-2 group-hover:text-black"
              >
                View All Sermons
                <ArrowRight className="w-5 h-5 group-hover:text-black" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Volunteer Opportunities */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center">
            <span className="text-[#5b5da6] dark:text-[#8d8fe0] font-semibold tracking-wide uppercase">
              Get Involved
            </span>

            <h2 className="mt-3 text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
              Volunteer Opportunities
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              Use your gifts to serve and make a difference in our church family
            </p>
          </div>

          {/* Cards */}
          <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Ushers",
                desc: "Welcome and assist attendees, distribute bulletins, and help maintain a smooth service flow.",
                icon: "Ushers",
              },
              {
                title: "Worship Team",
                desc: "Use your musical gifts to lead the congregation in worship through vocals or instruments.",
                icon: "Worship",
              },
              {
                title: "Kids Ministry",
                desc: "Help nurture the faith of our youngest members through teaching, crafts, and activities.",
                icon: "Kids",
              },
              {
                title: "Tech/Media",
                desc: "Operate sound, lighting, or video equipment to enhance our worship experience.",
                icon: "Tech",
              },
            ].map((role, i) => (
              <div
                key={i}
                className="group relative bg-white/70 dark:bg-gray-800/60 backdrop-blur-md rounded-2xl shadow-md transition-transform transform  duration-300 p-8 flex flex-col"
              >
                {/* Icon */}
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[#5b5da5] text-white mx-auto -mt-14 shadow-lg">
                  {role.icon === "Ushers" && <Users className="w-8 h-8" />}
                  {role.icon === "Worship" && <Music className="w-8 h-8" />}
                  {role.icon === "Kids" && <BookOpen className="w-8 h-8" />}
                  {role.icon === "Tech" && <VideoIcon className="w-8 h-8" />}
                </div>

                {/* Content */}
                <div className="mt-8 flex-1 flex flex-col text-center">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {role.title}
                  </h3>
                  <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {role.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <Button
              variant="outline"
              asChild
              className="px-8 py-6 text-lg border-[#282828] dark:border-[#282828] text-[#282828] dark:text-[#282828] hover:bg-[#5b5da6]/10 
               dark:border-[#7d7fcc] dark:text-[#7d7fcc] dark:hover:bg-[#7d7fcc]/10 "
            >
              <Link
                href="/volunteer/signup"
                className="inline-flex items-center gap-2"
              >
                Serve Now
                <ArrowRight className="w-6 h-6" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#282828] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Section */}
          <div>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              You belong here.
            </h2>
            <p className="mt-4 text-2xl sm:text-3xl font-semibold text-gray-200">
              This is more than a visit &#8212; it&#39;s a divine appointment.
            </p>
            <p className="mt-6 text-lg text-gray-200 max-w-xl">
              Whether you&#39;re new to faith, looking for a church family, or
              just curious &#8212; you are welcome. Join us this Sunday and
              experience uplifting worship, biblical teaching, and a community
              that feels like home.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/services"
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-[#3b375e] bg-white hover:bg-gray-200 transition-colors duration-300"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Service Times
              </Link>
              <Link
                href="/directions"
                className="inline-flex items-center px-8 py-3 border-2 border-white text-white rounded-md bg-transparent hover:bg-white hover:text-black transition-colors duration-300"
              >
                <MapPin className="w-5 h-5 mr-2" />
                Get Directions
              </Link>
            </div>
          </div>

          {/* Image Section */}
          <div className="flex justify-center lg:justify-end">
            <Image
              src={IMAGES.pastorFamily}
              alt="Pastor and family"
              width={500}
              height={500}
              unoptimized={true}
              className="rounded-2xl shadow-lg object-cover"
              priority
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = IMAGES.placeholder;
                target.onerror = null;
              }}
            />
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="relative overflow-hidden bg-[#282828] text-white rounded-3xl shadow-xl px-6 py-16 sm:px-12 lg:flex lg:items-center lg:gap-12">
            {/* Left Text Section */}
            <div className="lg:w-1/2">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Stay Connected
              </h2>
              <p className="mt-4 text-lg text-white-100">
                Subscribe to our newsletter and never miss updates about
                services, events, and community news.
              </p>
            </div>

            {/* Right Form Section */}
            <div className="mt-8 lg:mt-0 lg:flex-1">
              <form className="flex flex-col sm:flex-row sm:items-center gap-3">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full sm:max-w-xs px-5 py-3 rounded-xl 
                       bg-white text-gray-900 placeholder-gray-500 
                       focus:ring-2 focus:ring-[#7d7fcc] focus:outline-none 
                       shadow-sm"
                  placeholder="Enter your email"
                />
                <button
                  type="submit"
                  className="flex-shrink-0 px-6 py-3 rounded-xl 
                       bg-white text-[#5b5da6] font-semibold 
                       hover:bg-indigo-50 
                       focus:outline-none focus:ring-2 focus:ring-[#7d7fcc] 
                       shadow-md flex items-center gap-2"
                >
                  <Mail className="w-5 h-5" />
                  Subscribe
                </button>
              </form>
              <p className="mt-4 text-sm text-white-200">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
