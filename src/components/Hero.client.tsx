"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-r from-indigo-800 to-purple-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Welcome to Rhema Faith AG Church
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-indigo-100">
            A place of worship, fellowship, and spiritual growth. Join us as we
            seek Gods presence and purpose for our lives.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/about"
                className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 md:py-4 md:text-lg md:px-10"
              >
                Learn More
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/sermons"
                className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 md:py-4 md:text-lg md:px-10"
              >
                Watch Sermons
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
