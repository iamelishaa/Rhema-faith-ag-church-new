import Image from 'next/image';
import { Play, Clock, Calendar } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';

export type Sermon = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  duration: string;
  viewCount: string;
  videoId?: string; // Adding for backward compatibility
};

type SermonCardProps = {
  sermon: Sermon;
};

export function SermonCard({ sermon }: SermonCardProps) {
  const { id, title, description, thumbnail, publishedAt, duration } = sermon;
  const videoId = sermon.videoId || id; // Use videoId if available, otherwise use id
  return (
    <div className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={thumbnail}
          alt={title}
          fill
          unoptimized={thumbnail.includes('ytimg.com')}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
          loading="lazy"
          onError={(e) => {
            // Fallback to a default image if the thumbnail fails to load
            const target = e.target as HTMLImageElement;
            target.src = '/images/placeholder.jpg';
            target.onerror = null; // Prevent infinite loop if placeholder also fails
          }}
        />
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button
            asChild
            size="icon"
            className="rounded-full w-16 h-16 bg-white/90 hover:bg-white text-black"
          >
            <Link href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener noreferrer">
              <Play className="w-8 h-8 ml-1" />
              <span className="sr-only">Play {title}</span>
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2 flex-wrap">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {new Date(publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {duration}
          </span>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-4">
          {description}
        </p>
        
        <Button asChild variant="outline" className="w-full">
          <Link href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener noreferrer">
            Watch on YouTube
          </Link>
        </Button>
      </div>
    </div>
  );
}
