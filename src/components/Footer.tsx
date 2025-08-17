import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 tracking-wider uppercase">
              About Us
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 dark:text-gray-400 hover:text-black"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="/about#beliefs"
                  className="text-gray-600 dark:text-gray-400 hover:text-black"
                >
                  Our Beliefs
                </Link>
              </li>
              <li>
                <Link
                  href="/about#leadership"
                  className="text-gray-600 dark:text-gray-400 hover:text-black"
                >
                  Leadership
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 tracking-wider uppercase">
              Ministries
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/ministries#youth"
                  className="text-gray-600 dark:text-gray-400 hover:text-black"
                >
                  Youth
                </Link>
              </li>
              <li>
                <Link
                  href="/ministries#children"
                  className="text-gray-600 dark:text-gray-400 hover:text-black"
                >
                  Children
                </Link>
              </li>
              <li>
                <Link
                  href="/ministries#worship"
                  className="text-gray-600 dark:text-gray-400 hover:text-black"
                >
                  Worship
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 tracking-wider uppercase">
              Resources
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/sermons"
                  className="text-gray-600 dark:text-gray-400 hover:text-black"
                >
                  Sermons
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-gray-600 dark:text-gray-400 hover:text-black"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/give"
                  className="text-gray-600 dark:text-gray-400 hover:text-black"
                >
                  Give
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 tracking-wider uppercase">
              Connect
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 dark:text-gray-400 hover:text-black"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/prayer"
                  className="text-gray-600 dark:text-gray-400 hover:text-black"
                >
                  Prayer Request
                </Link>
              </li>
              <li>
                <Link
                  href="/visit"
                  className="text-gray-600 dark:text-gray-400 hover:text-black"
                >
                  Plan a Visit
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center sm:text-left w-full sm:w-auto">
            © {new Date().getFullYear()} Rhema Faith AG Church. All rights reserved.
          </p>
          
          {/* Social Links */}
          <div className="flex flex-wrap justify-center sm:justify-end gap-3 sm:gap-4 w-full sm:w-auto">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/rhema.faithag/"
              className="text-gray-400 hover:text-[#1877F2] transition-colors"
            >
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 
                  6.477 2 12c0 4.991 3.657 9.128 8.438 
                  9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 
                  1.492-3.89 3.777-3.89 1.094 0 
                  2.238.195 2.238.195v2.46h-1.26c-1.243 
                  0-1.63.771-1.63 1.562V12h2.773l-.443 
                  2.89h-2.33v6.988C18.343 21.128 
                  22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
            </a>

            {/* Twitter */}
            <a
              href="#"
              className="text-gray-400 hover:text-[#1DA1F2] transition-colors"
            >
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.4.36a9.1 9.1 0 0 1-2.88 1.1A4.52 4.52 0 0 0 16.11 0c-2.63 0-4.77 2.12-4.77 4.74 0 .37.04.72.12 1.06A12.94 12.94 0 0 1 3.15.86a4.72 4.72 0 0 0-.65 2.38c0 1.64.85 3.08 2.14 3.92a4.48 4.48 0 0 1-2.16-.59v.06c0 2.3 1.66 4.22 3.86 4.66a4.53 4.53 0 0 1-2.15.08c.61 1.89 2.37 3.27 4.47 3.31A9.06 9.06 0 0 1 0 19.54 12.82 12.82 0 0 0 6.95 21c8.32 0 12.86-6.86 12.86-12.81 0-.2 0-.39-.01-.59A9.06 9.06 0 0 0 23 3z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/rfag_church_/"
              className="text-gray-400 hover:text-[#E1306C] transition-colors"
            >
              <span className="sr-only">Instagram</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 1 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://www.youtube.com/@RhemaFaithAGChurch"
              className="text-gray-400 hover:text-[#FF0000] transition-colors"
            >
              <span className="sr-only">YouTube</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M23.498 6.186a3.016 3.016 0 
                  0 0-2.122-2.136C19.505 3.545 12 
                  3.545s-7.505 0-9.377.505A3.017 3.017 
                  0 0 0 .502 6.186C0 8.07 0 12 0 
                  12s0 3.93.502 5.814a3.016 3.016 0 
                  0 0 2.122 2.136c1.871.505 9.376.505 
                  9.376.505s7.505 0 9.377-.505a3.015 
                  3.015 0 0 0 2.122-2.136C24 15.93 
                  24 12 24 12s0-3.93-.502-5.814zM9.545 
                  15.568V8.432L15.818 12l-6.273 
                  3.568z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
