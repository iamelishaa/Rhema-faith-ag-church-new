"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IMAGES } from "@/lib/images";
import { 
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Clock,
  Mail,
  Phone,
  Video as VideoIcon,
  Play,
  Users,
  Music,
  BookOpen,
  MapPin
} from "lucide-react";

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  videoUrl: string;
}

// YouTube API integration
const fetchSermons = async (): Promise<YouTubeVideo[]> => {
  // In production with static export, return an empty array
  if (process.env.NODE_ENV === 'production') {
    console.log('Running in production mode, returning empty sermons array');
    return [];
  }

  try {
    console.log('Fetching sermons from YouTube API directly...');
    
    // In development, fetch directly from YouTube API
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
    const YOUTUBE_CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;
    
    if (!YOUTUBE_API_KEY || !YOUTUBE_CHANNEL_ID) {
      console.error('Missing YouTube API configuration');
      throw new Error('YouTube API is not properly configured');
    }
    
    // First, get the uploads playlist ID with more details
    const channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails,snippet&id=${YOUTUBE_CHANNEL_ID}&maxResults=1&key=${YOUTUBE_API_KEY}`
    );
    
    if (!channelResponse.ok) {
      const errorData = await channelResponse.json();
      console.error('YouTube API error:', errorData);
      throw new Error(`YouTube API error: ${channelResponse.status} ${channelResponse.statusText}`);
    }
    
    const channelData = await channelResponse.json();
    
    if (!channelData.items || channelData.items.length === 0) {
      throw new Error('No channel found with the provided CHANNEL_ID');
    }
    
    const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;
    
    // Then, get the videos from the uploads playlist with all necessary parts
    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?` + new URLSearchParams({
        part: 'snippet,contentDetails',
        maxResults: '10',
        playlistId: uploadsPlaylistId,
        key: YOUTUBE_API_KEY
      })
    );
    
    if (!videosResponse.ok) {
      const errorData = await videosResponse.json().catch(() => ({}));
      console.error('YouTube Videos API error:', errorData);
      throw new Error(`YouTube API error (${videosResponse.status}): ${errorData.message || videosResponse.statusText}`);
    }
    
    const videosData = await videosResponse.json();
    
    if (!videosData.items || !Array.isArray(videosData.items)) {
      console.warn('No videos found or invalid response format:', videosData);
      return [];
    }
    
    // Transform the response to match our component's expected format
    const sermons = videosData.items.map((item: any) => {
      const videoId = item.snippet.resourceId.videoId;
      const thumbnails = item.snippet.thumbnails;
      
      // Use the highest quality available thumbnail
      const thumbnailUrl = thumbnails?.maxres?.url || 
                          thumbnails?.standard?.url || 
                          thumbnails?.high?.url || 
                          thumbnails?.medium?.url || 
                          thumbnails?.default?.url ||
                          `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      
      return {
        id: videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: thumbnailUrl,
        publishedAt: item.snippet.publishedAt,
        videoUrl: `https://www.youtube.com/watch?v=${videoId}`
      };
    });
    
    console.log('Successfully fetched', sermons.length, 'sermons');
    return sermons;
    
  } catch (error) {
    console.error("Error in fetchSermons:", error);
    // Return empty array to prevent breaking the UI
    return [];
  }
};

export default function Home() {
  const [sermons, setSermons] = useState<YouTubeVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSermons = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        console.log('Loading sermons...');
        const data = await fetchSermons();
        console.log('Sermons loaded:', data);
        
        if (data.length === 0) {
          if (process.env.NODE_ENV === 'production') {
            setError("Sermon videos are not available in the static version of the site. Please check our YouTube channel.");
          } else {
            setError("No sermons found. This could be because:\n" +
                    "1. YouTube API is not properly configured\n" +
                    "2. No videos found in the specified channel\n" +
                    "3. Check browser console for detailed error information");
          }
        }
        
        setSermons(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        console.error('Error in loadSermons:', err);
        setError(`Failed to load sermons: ${errorMessage}. Please check the console for more details.`);
      } finally {
        setIsLoading(false);
      }
    };

    loadSermons();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <section className="relative bg-gray-900 text-white overflow-hidden min-h-screen">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={IMAGES.pastor}
            alt="Pastor"
            fill
            priority
            quality={100}
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
                  Explore Children's Ministry
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
                  Serving our community and sharing God&apos;s love through practical
                  acts of service, compassion, and intentional relationships.
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
              {(sermons || []).slice(0, 3).map((sermon) => (
                <div
                  key={sermon.id}
                  className="bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg  transition-shadow duration-300"
                >
                  <div className="relative h-56 w-full bg-gray-100">
                    {sermon.thumbnail ? (
                      <Image
                        src={sermon.thumbnail}
                        alt={sermon.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <VideoIcon className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <a
                      href={`https://www.youtube.com/watch?v=${sermon.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center text-[#282828] dark:text-[#282828] hover:text-black font-medium gap-1 transition-colors duration-200"
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
              Whether you&#39;re new to faith, looking for a church family, or just
              curious &#8212; you are welcome. Join us this Sunday and experience
              uplifting worship, biblical teaching, and a community that feels
              like home.
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
              <p className="mt-4 text-lg text-indigo-100">
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
              <p className="mt-4 text-sm text-indigo-200">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
