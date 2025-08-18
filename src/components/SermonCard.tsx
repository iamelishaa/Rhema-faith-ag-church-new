import Link from 'next/link';
import { YouTubeVideo } from '@/lib/youtube';
import { Button } from './ui/button';
import { format } from 'date-fns';
import Image from 'next/image';

export function SermonCard({ sermon }: { sermon: YouTubeVideo }) {
  return (
    <div className="bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <div className="relative pt-[56.25%] bg-gray-200 dark:bg-gray-600">
        <Image
          src={sermon.thumbnail}
          alt={sermon.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized={sermon.thumbnail?.startsWith('data:')}
        />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
          {sermon.duration}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 mb-2">
          {sermon.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-4">
          {sermon.description}
        </p>
        <div className="mt-auto flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>{format(new Date(sermon.publishedAt), 'MMM d, yyyy')}</span>
          <span>{sermon.viewCount} views</span>
        </div>
        <Button
          asChild
          variant="outline"
          className="mt-4 w-full border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-gray-600"
        >
          <Link
            href={`https://www.youtube.com/watch?v=${sermon.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch Now
          </Link>
        </Button>
      </div>
    </div>
  );
}
