import Link from 'next/link';

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100">
          <svg
            className="h-16 w-16 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        
        <h1 className="text-3xl font-extrabold text-gray-900">
          Thank You for Your Generous Donation!
        </h1>
        
        <p className="mt-4 text-lg text-gray-600">
          Your support helps us continue our mission and make a difference in our community.
        </p>
        
        <div className="mt-8 space-y-4">
          <p className="text-sm text-gray-500">
            A receipt has been sent to your email address.
          </p>
          
          <div className="mt-6">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Return to Home
            </Link>
          </div>
          
          <p className="text-sm text-gray-500">
            Need help?{' '}
            <a href="mailto:donations@rhemafaithag.org" className="font-medium text-indigo-600 hover:text-indigo-500">
              Contact us
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
