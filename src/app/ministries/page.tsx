"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiUsers, FiHeart, FiMusic, FiMic, FiCoffee } from "react-icons/fi";
import { useState } from "react";

// Ministry type
type Ministry = {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  imageAttribution?: string;
  meetingTime?: string;
  meetingDay?: string;
  leader?: string;
  buttonText?: string;
  buttonLink?: string;
  category: string;
};

// Ministry data
const ministries: Ministry[] = [
  {
    id: 1,
    title: "Youth Ministry",
    description:
      "A dynamic ministry for teenagers to grow in their faith, build meaningful relationships, and discover their God-given purpose.",
    icon: <FiMusic className="h-8 w-8 text-black" />,
    image: "/images/youths.webp",
    imageAttribution:
      'Designed by <a href="http://www.freepik.com">kjpargeter / Freepik</a>',
    meetingTime: "Sunday at 5:00PM",
    meetingDay: "Every 3rd Sunday",
    buttonText: "Learn More",
    buttonLink: "/youth",
    category: "Youth",
  },
  {
    id: 2,
    title: "Children's Ministry",
    description:
      "A safe and engaging environment where children learn about Jesus through age-appropriate teaching, worship, and activities.",
    icon: <FiHeart className="h-8 w-8 text-black" />,
    image: "/images/kids.webp",
    meetingTime: "Sundays at 9:30 AM",
    meetingDay: "Sundays",
    buttonText: "Register Your Child",
    buttonLink: "/children",
    category: "Children",
  },
  {
    id: 3,
    title: "Worship Ministry",
    description:
      "Join our team of musicians and vocalists as we lead the church in worship. All skill levels are welcome.",
    icon: <FiMic className="h-8 w-8 text-black" />,
    image:
      "https://images.unsplash.com/photo-1501612780327-45045538702b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    meetingTime: "Friday at 6:30 PM",
    meetingDay: "Fridays",
    buttonText: "Join the Team",
    buttonLink: "/worship-team",
    category: "Worship",
  },
  {
    id: 4,
    title: "Women's Ministry",
    description:
      "A ministry dedicated to women of all ages to grow spiritually, build strong relationships, and serve in community. Join us for fellowship, Bible studies, and events tailored for women.",
    icon: <FiUsers className="h-8 w-8 text-black" />,
    image: "/images/womens.webp",

    meetingTime: "Sunday at 5:00 PM",
    meetingDay: "Every 1st Sundays",
    buttonText: "Join Women's Ministry",
    buttonLink: "/womens-ministry",
    category: "Women's",
  },
];

const categories = ["All", "Women's", "Youth", "Children", "Worship"];

export default function Ministries() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="relative bg-black">
        <div className="absolute inset-0 bg-gray-900 mix-blend-multiply" />
        <div className="relative max-w-7xl mx-auto py-24 px-4 text-center sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Our Ministries
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-300">
            Discover your place to connect, grow, and serve at Rhema Faith AG
            Church. There's a place for everyone in God's family!
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full font-medium ${
                selectedCategory === cat
                  ? "bg-black text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Ministries Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {ministries
            .filter(
              (m) =>
                selectedCategory === "All" || m.category === selectedCategory
            )
            .map((ministry, index) => (
              <motion.div
                key={ministry.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex flex-col h-full bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="relative h-48">
                    <Image
                      src={ministry.image}
                      alt={ministry.title}
                      fill
                      className="object-cover"
                      priority
                    />
                    {ministry.imageAttribution && (
                      <div className="absolute bottom-0 right-0 left-0 bg-black/50 text-white text-xs p-1 text-center">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: ministry.imageAttribution,
                          }}
                          className="[&_a]:text-white [&_a]:underline"
                        />
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-3 mb-3">
                      {ministry.icon}
                      <h3 className="text-xl font-semibold text-black">
                        {ministry.title}
                      </h3>
                    </div>
                    <p className="text-gray-700 flex-grow">
                      {ministry.description}
                    </p>
                    <div className="mt-4 space-y-1 text-sm text-gray-500">
                      {ministry.meetingDay && (
                        <div>
                          <strong>Meeting:</strong> {ministry.meetingDay}{" "}
                          {ministry.meetingTime
                            ? `• ${ministry.meetingTime}`
                            : ""}
                        </div>
                      )}
                      {ministry.leader && (
                        <div>
                          <strong>Leader:</strong> {ministry.leader}
                        </div>
                      )}
                    </div>
                    {ministry.buttonLink && ministry.buttonText && (
                      <Link
                        href={ministry.buttonLink}
                        className="mt-4 inline-block w-full text-center bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                      >
                        {ministry.buttonText}
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gray-900">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Want to start a new ministry?</span>
            <span className="block">Let's talk!</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-gray-300">
            We're always looking for passionate leaders to help us serve our
            community in new ways.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/contact"
              className="bg-white text-black hover:bg-gray-100 px-5 py-3 rounded-md font-medium"
            >
              Contact Us About Starting a Ministry
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
