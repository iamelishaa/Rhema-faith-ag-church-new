import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm transition-shadow duration-300 hover:shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none">
          <div
            className="flex items-center
          "
          >
            <Link href="/" className="text-2xl font-bold text-indigo-600">
              Rhema Faith AG Church
            </Link>
          </div>
          <div className="ml-10 space-x-8">
            <Link
              href="/"
              className="text-base font-medium text-gray-700 hover:text-indigo-600"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-base font-medium text-gray-700 hover:text-indigo-600"
            >
              About
            </Link>
            <Link
              href="/sermons"
              className="text-base font-medium text-gray-700 hover:text-indigo-600"
            >
              Sermons
            </Link>
            <Link
              href="/events"
              className="text-base font-medium text-gray-700 hover:text-indigo-600"
            >
              Events
            </Link>
            <Link
              href="/ministries"
              className="text-base font-medium text-gray-700 hover:text-indigo-600"
            >
              Ministries
            </Link>
            <Link
              href="/contact"
              className="text-base font-medium text-gray-700 hover:text-indigo-600"
            >
              Contact
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
