import Image from 'next/image';
import { FiPlay, FiCalendar, FiClock } from 'react-icons/fi';

// This would typically come from an API or database
const recentSermons = [
  {
    id: 'abc123',
    title: 'The Power of Faith',
    preacher: 'Pastor John Smith',
    date: '2023-10-15',
    duration: '45:22',
    thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    videoId: 'dQw4w9WgXcQ',
    description: 'In this powerful message, we explore how faith can move mountains in our lives.'
  },
  {
    id: 'def456',
    title: 'Walking in Love',
    preacher: 'Pastor Sarah Johnson',
    date: '2023-10-08',
    duration: '38:15',
    thumbnail: 'https://i.ytimg.com/vi/9bZkp7q19f0/maxresdefault.jpg',
    videoId: '9bZkp7q19f0',
    description: 'Learning to walk in love as Christ loved us and gave Himself for us.'
  },
  {
    id: 'ghi789',
    title: 'The Joy of the Lord',
    preacher: 'Pastor Michael Brown',
    date: '2023-10-01',
    duration: '42:30',
    thumbnail: 'https://i.ytimg.com/vi/JGwWNGJdvx8/maxresdefault.jpg',
    videoId: 'JGwWNGJdvx8',
    description: 'Discovering the secret of true joy that comes from the Lord.'
  },
  {
    id: 'jkl012',
    title: 'Overcoming Trials',
    preacher: 'Pastor John Smith',
    date: '2023-09-24',
    duration: '51:45',
    thumbnail: 'https://i.ytimg.com/vi/9bZkp7q19f0/maxresdefault.jpg',
    videoId: '9bZkp7q19f0',
    description: 'Finding strength and victory in the midst of life\'s challenges.'
  },
];

export default function Sermons() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-indigo-800">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-indigo-800 mix-blend-multiply" aria-hidden="true" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">Sermons</h1>
          <p className="mt-6 max-w-3xl text-xl text-indigo-100">
            Watch or listen to our latest messages and be encouraged in your faith journey.
          </p>
        </div>
      </div>

      {/* Featured Sermon */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-indigo-50 rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
          <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
            <div className="lg:self-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                <span className="block">Featured Message</span>
              </h2>
              <h3 className="mt-4 text-2xl font-semibold text-indigo-600">
                {recentSermons[0].title}
              </h3>
              <p className="mt-4 text-lg leading-6 text-gray-600">
                {recentSermons[0].description}
              </p>
              <div className="mt-6 flex items-center text-gray-500">
                <div className="flex items-center">
                  <FiCalendar className="h-5 w-5" />
                  <span className="ml-2">
                    {new Date(recentSermons[0].date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex items-center ml-6">
                  <FiClock className="h-5 w-5" />
                  <span className="ml-2">{recentSermons[0].duration}</span>
                </div>
              </div>
              <div className="mt-6">
                <a
                  href={`https://www.youtube.com/watch?v=${recentSermons[0].videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <FiPlay className="h-5 w-5 mr-2" />
                  Watch Now
                </a>
              </div>
            </div>
          </div>
          <div className="-mt-6 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
            <a
              href={`https://www.youtube.com/watch?v=${recentSermons[0].videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="relative block w-full h-full group"
            >
              <Image
                className="w-full h-full object-cover"
                src={recentSermons[0].thumbnail}
                alt={recentSermons[0].title}
                width={800}
                height={450}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 group-hover:bg-opacity-30 transition duration-300">
                <div className="w-20 h-20 bg-white bg-opacity-90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <FiPlay className="h-10 w-10 text-indigo-600 ml-1" />
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Recent Sermons */}
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Recent Messages</h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Browse our collection of recent sermons and teachings.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {recentSermons.slice(1).map((sermon) => (
              <div key={sermon.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <a
                  href={`https://www.youtube.com/watch?v=${sermon.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative"
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={sermon.thumbnail}
                      alt={sermon.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center">
                        <FiPlay className="h-6 w-6 text-indigo-600 ml-1" />
                      </div>
                    </div>
                  </div>
                </a>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900">
                    <a
                      href={`https://www.youtube.com/watch?v=${sermon.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-indigo-600"
                    >
                      {sermon.title}
                    </a>
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    {sermon.preacher}
                  </p>
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <span>
                      {new Date(sermon.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                    <span className="mx-2">•</span>
                    <span>{sermon.duration}</span>
                  </div>
                  <p className="mt-3 text-gray-600">
                    {sermon.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href="https://www.youtube.com/channel/your-channel-id"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              View More on YouTube
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
