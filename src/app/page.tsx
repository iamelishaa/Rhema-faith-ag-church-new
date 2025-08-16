"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";

// Simple grid layout for events and testimonials
const EventCard = ({ event }: { event: any }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg h-full flex flex-col">
    <div className="relative h-48 w-full">
      <Image
        src={event.image}
        alt={event.title}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 50vw, 33vw"
      />
    </div>
    <div className="p-6 flex-1 flex flex-col">
      <div className="flex-1">
        <div className="flex items-center mb-2">
          <span className="px-3 py-1 text-xs font-semibold text-indigo-700 dark:text-indigo-200 bg-indigo-100 dark:bg-indigo-900 rounded-full">
            {event.date}
          </span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {event.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {event.description}
        </p>
      </div>
      <div className="mt-4">
        <Link
          href={`/events/${event.id}`}
          className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 font-medium flex items-center"
        >
          Learn More
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </div>
  </div>
);

const TestimonialCard = ({ testimonial }: { testimonial: any }) => (
  <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg h-full">
    <div className="relative">
      <svg
        className="absolute -top-4 -left-2 w-10 h-10 text-indigo-100 dark:text-indigo-900"
        fill="currentColor"
        viewBox="0 0 32 32"
      >
        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.016 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.016 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
      </svg>
      <p className="text-lg text-gray-700 dark:text-gray-200 italic pl-8">
        {testimonial.content}
      </p>
    </div>
    <div className="mt-6 flex items-center">
      <div className="h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-300 font-bold text-lg">
        {testimonial.author.charAt(0)}
      </div>
      <div className="ml-4">
        <p className="font-medium text-gray-900 dark:text-white">
          {testimonial.author}
        </p>
        <p className="text-indigo-600 dark:text-indigo-400">
          {testimonial.role}
        </p>
      </div>
    </div>
  </div>
);

// Mock data - Replace with your actual data
const featuredSermons = [
  {
    id: 1,
    title: "The Power of Faith",
    speaker: "Pastor John Doe",
    duration: "45 min",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Faith",
  },
  {
    id: 2,
    title: "Walking in Love",
    speaker: "Pastor Jane Smith",
    duration: "38 min",
    image:
      "https://images.unsplash.com/photo-1501281667305-0d4e0f46dc07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Love",
  },
  {
    id: 3,
    title: "Finding Peace in Chaos",
    speaker: "Pastor Michael Johnson",
    duration: "52 min",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Peace",
  },
];

const upcomingEvents = [
  {
    id: 1,
    title: "Sunday Service",
    date: "Every Sunday",
    time: "10:00 AM",
    location: "Main Sanctuary",
    image:
      "https://images.unsplash.com/photo-1501281667305-0d4e0f46dc07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Bible Study",
    date: "Every Wednesday",
    time: "7:00 PM",
    location: "Fellowship Hall",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Prayer Meeting",
    date: "Every Friday",
    time: "6:30 PM",
    location: "Prayer Room",
    image:
      "https://images.unsplash.com/photo-1501281667305-0d4e0f46dc07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

const testimonials = [
  {
    id: 1,
    quote:
      "This church has truly been a blessing to my family. The messages are always inspiring and relevant to daily life.",
    author: "Sarah Johnson",
    role: "Member for 5 years",
  },
  {
    id: 2,
    quote:
      "The worship team is incredible, and the community is so welcoming. I felt at home from day one.",
    author: "Michael Chen",
    role: "New Member",
  },
  {
    id: 3,
    quote:
      "The children's ministry is outstanding. My kids love coming to church!",
    author: "The Williams Family",
    role: "Family of 5",
  },
];

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-800 to-purple-900 text-white overflow-hidden">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-32 md:py-48">
          <div className="relative z-10">
            <div className="mb-12">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-left">
                Rhema Faith AG Church
              </h1>
              <p className="text-xl md:text-2xl text-indigo-100 mb-8 max-w-3xl text-left">
                A place where faith, hope, and love come together to transform
                lives.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/about"
                className="px-8 py-4 bg-white text-indigo-700 font-semibold rounded-lg hover:bg-indigo-50 transition duration-300 text-center w-full sm:w-auto"
              >
                Learn More
              </Link>
              <Link
                href="/sermons"
                className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:bg-opacity-10 transition duration-300 text-center w-full sm:w-auto"
              >
                Watch Sermons
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
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
                  className="p-0 h-auto text-gray-600 hover:text-gray-800 text-lg font-medium group"
                >
                  Learn more about Worship Ministry
                  <svg
                    className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
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
                  Children's Ministry
                </span>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Children's Ministry
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Nurturing young hearts and minds in the love of Christ through
                  engaging activities, biblical teaching, and a safe, fun
                  environment.
                </p>
              </div>
              <div className="mt-auto">
                <Button
                  variant="ghost"
                  className="p-0 h-auto text-gray-600 hover:text-gray-800 group"
                >
                  Explore Children's Ministry
                  <svg
                    className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
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
                  variant="ghost"
                  className="p-0 h-auto text-gray-600 hover:text-gray-800 group"
                >
                  Join Youth Group
                  <svg
                    className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
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
                  Serving our community and sharing God's love through practical
                  acts of service, compassion, and intentional relationships.
                </p>
              </div>
              <div className="mt-auto">
                <Button
                  variant="ghost"
                  className="p-0 h-auto text-gray-600 hover:text-gray-800 group"
                >
                  Get Involved
                  <svg
                    className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
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
                  Women's Ministry
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Women's Ministry
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Empowering women of all ages to grow in faith, build authentic
                  relationships, and serve together in community.
                </p>
              </div>
              <div className="mt-auto">
                <Button
                  variant="ghost"
                  className="p-0 h-auto text-gray-600 hover:text-gray-800 group"
                >
                  Connect with Us
                  <svg
                    className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
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

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredSermons.map((sermon) => (
              <div
                key={sermon.id}
                className="bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-56 w-full">
                  <Image
                    src={sermon.image}
                    alt={sermon.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <span className="inline-block px-3 py-1 bg-indigo-600 text-white text-xs font-semibold rounded-full">
                      {sermon.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {sermon.title}
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    {sermon.speaker} • {sermon.duration}
                  </p>
                  <Link
                    href={`/sermons/${sermon.id}`}
                    className="mt-4 inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 font-medium"
                  >
                    Watch Now
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/sermons"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300"
            >
              View All Sermons
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
              EVENTS
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Upcoming Events
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-300">
              Join us for worship, fellowship, and community events
            </p>
          </div>

          <div className="mt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Ready to visit us this Sunday?
          </h2>
          <p className="mt-4 text-xl text-indigo-100 max-w-3xl mx-auto">
            We'd love to welcome you to our next service. Join us as we worship
            and grow together in faith.
          </p>
          <div className="mt-8">
            <Link
              href="/visit"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 transition-colors duration-300"
            >
              Plan Your Visit
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
              LATEST NEWS
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Church Updates
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-300">
              Stay connected with the latest news and announcements
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* News Item 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48 w-full">
                <Image
                  src="https://images.unsplash.com/photo-1501281667305-0d4e0f46dc07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Church Event"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <span className="inline-block px-3 py-1 bg-indigo-600 text-white text-xs font-semibold rounded-full">
                    Announcement
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <time dateTime="2023-06-15">June 15, 2023</time>
                </div>
                <h3 className="mt-2 text-xl font-bold text-gray-900 dark:text-white">
                  Summer Bible Study Series Starting Soon
                </h3>
                <p className="mt-3 text-gray-600 dark:text-gray-300">
                  Join us for our 6-week summer Bible study series starting next
                  month. All are welcome!
                </p>
                <Link
                  href="/news/summer-bible-study"
                  className="mt-4 inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 font-medium"
                >
                  Read More
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Add more news items as needed */}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-indigo-700 rounded-2xl px-6 py-16 md:p-12 lg:flex lg:items-center">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-extrabold text-white">
                Stay Connected
              </h2>
              <p className="mt-4 text-lg text-indigo-100">
                Subscribe to our newsletter to receive updates on services,
                events, and more.
              </p>
            </div>
            <div className="mt-8 lg:mt-0 lg:ml-8 lg:flex-1">
              <form className="sm:flex">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-5 py-3 border border-transparent placeholder-gray-500 focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white focus:border-white sm:max-w-xs rounded-md"
                  placeholder="Enter your email"
                />
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
              <p className="mt-3 text-sm text-indigo-200">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
