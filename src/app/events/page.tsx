import { FiCalendar, FiClock, FiMapPin, FiArrowRight } from "react-icons/fi";
import Image from "next/image";

// This would typically come from an API or database
const upcomingEvents = [
  {
    id: 1,
    title: "Sunday Worship Service",
    date: "2023-11-05",
    time: "10:30 AM - 12:00 PM",
    location: "Main Sanctuary",
    description:
      "Join us for our weekly Sunday worship service with inspiring music and a powerful message.",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Worship",
  },
  {
    id: 2,
    title: "Bible Study",
    date: "2023-11-08",
    time: "7:00 PM - 8:30 PM",
    location: "Fellowship Hall",
    description:
      "Mid-week Bible study and prayer meeting. All are welcome to join us as we study God's Word together.",
    image:
      "https://images.unsplash.com/photo-1588072432836-e100327743db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Bible Study",
  },
  {
    id: 3,
    title: "Youth Night",
    date: "2023-11-10",
    time: "7:00 PM - 9:00 PM",
    location: "Youth Center",
    description:
      "A fun and engaging time for youth to grow in their faith. Games, worship, and relevant Bible teaching.",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Youth",
  },
  {
    id: 4,
    title: "Men's Breakfast",
    date: "2023-11-11",
    time: "8:00 AM - 10:00 AM",
    location: "Fellowship Hall",
    description:
      "A time for men to connect over a good breakfast and encouraging conversation.",
    image:
      "https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Men",
  },
  {
    id: 5,
    title: "Women's Fellowship",
    date: "2023-11-12",
    time: "2:00 PM - 4:00 PM",
    location: "Fellowship Hall",
    description:
      "A time for women to come together for fellowship, prayer, and encouragement.",
    image:
      "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Women",
  },
  {
    id: 6,
    title: "Community Outreach",
    date: "2023-11-18",
    time: "9:00 AM - 12:00 PM",
    location: "City Park",
    description:
      "Join us as we serve our local community through various outreach activities.",
    image:
      "https://images.unsplash.com/photo-1507676184212-d03ab07a01a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Outreach",
  },
];

const categories = [
  { name: "All", count: upcomingEvents.length },
  {
    name: "Worship",
    count: upcomingEvents.filter((event) => event.category === "Worship")
      .length,
  },
  {
    name: "Bible Study",
    count: upcomingEvents.filter((event) => event.category === "Bible Study")
      .length,
  },
  {
    name: "Youth",
    count: upcomingEvents.filter((event) => event.category === "Youth").length,
  },
  {
    name: "Men",
    count: upcomingEvents.filter((event) => event.category === "Men").length,
  },
  {
    name: "Women",
    count: upcomingEvents.filter((event) => event.category === "Women").length,
  },
  {
    name: "Outreach",
    count: upcomingEvents.filter((event) => event.category === "Outreach")
      .length,
  },
];

export default function Events() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-indigo-800">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-indigo-800 mix-blend-multiply"
            aria-hidden="true"
          />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Events
          </h1>
          <p className="mt-6 max-w-3xl text-xl text-indigo-100">
            Join us for our upcoming events and activities. There&apos;s
            something for everyone!
          </p>
        </div>
      </div>

      {/* Events List */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category.name}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  category.name === "All"
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                } shadow-sm`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-48">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {event.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {event.title}
                  </h3>

                  <div className="mt-4 flex items-center text-gray-600">
                    <FiCalendar className="h-5 w-5 text-indigo-500 mr-2" />
                    <span>
                      {new Date(event.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center text-gray-600">
                    <FiClock className="h-5 w-5 text-indigo-500 mr-2" />
                    <span>{event.time}</span>
                  </div>

                  <div className="mt-2 flex items-center text-gray-600">
                    <FiMapPin className="h-5 w-5 text-indigo-500 mr-2" />
                    <span>{event.location}</span>
                  </div>

                  <p className="mt-4 text-gray-600">{event.description}</p>

                  <div className="mt-6">
                    <button className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-800">
                      Learn more
                      <FiArrowRight className="ml-2 h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Events Message */}
          {upcomingEvents.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900">
                No upcoming events
              </h3>
              <p className="mt-2 text-gray-600">
                Check back later for upcoming events and activities.
              </p>
            </div>
          )}

          {/* Calendar View Link */}
          <div className="mt-12 text-center">
            <a
              href="#"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <svg
                className="h-5 w-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              View Full Calendar
            </a>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-indigo-700">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Have an event idea?</span>
            <span className="block">Let us know!</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-indigo-200">
            We&apos;re always looking for new ways to serve our community and
            grow together in faith.
          </p>
          <a
            href="/contact"
            className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
