import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">About Us</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/about" className="text-base text-gray-400 hover:text-white">Our Story</Link></li>
              <li><Link href="/about#beliefs" className="text-base text-gray-400 hover:text-white">Our Beliefs</Link></li>
              <li><Link href="/about#leadership" className="text-base text-gray-400 hover:text-white">Leadership</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Ministries</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/ministries#youth" className="text-base text-gray-400 hover:text-white">Youth</Link></li>
              <li><Link href="/ministries#children" className="text-base text-gray-400 hover:text-white">Children</Link></li>
              <li><Link href="/ministries#worship" className="text-base text-gray-400 hover:text-white">Worship</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/sermons" className="text-base text-gray-400 hover:text-white">Sermons</Link></li>
              <li><Link href="/events" className="text-base text-gray-400 hover:text-white">Events</Link></li>
              <li><Link href="/give" className="text-base text-gray-400 hover:text-white">Give</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Connect</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/contact" className="text-base text-gray-400 hover:text-white">Contact Us</Link></li>
              <li><Link href="/prayer" className="text-base text-gray-400 hover:text-white">Prayer Request</Link></li>
              <li><Link href="/visit" className="text-base text-gray-400 hover:text-white">Plan a Visit</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
          <p className="text-base text-gray-400">© 2025 Rhema Faith AG Church. All rights reserved.</p>
          <div className="mt-6 space-x-6 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white">
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <span className="sr-only">YouTube</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
