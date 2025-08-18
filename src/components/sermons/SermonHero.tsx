import Image from "next/image";
import { Play } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import type { Sermon } from "./SermonCard";

type SermonHeroProps = {
  latestSermon: Sermon | null;
};

export function SermonHero({ latestSermon }: SermonHeroProps) {
  if (!latestSermon) return null;

  return (
    <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src={latestSermon.thumbnail}
          alt={latestSermon.title}
          fill
          className="object-cover"
          priority
          quality={100}
          sizes="100vw"
          placeholder="blur"
          blurDataURL={latestSermon.thumbnail.replace(
            "maxresdefault",
            "hqdefault"
          )}
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-3xl  p-6 rounded-lg ">
          <span className="text-sm font-medium text-white/80 mb-2 inline-block">
            Latest Sermon
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Watch Our Latest Sermon
          </h1>
          <p className="text-lg text-white/90 mb-6">
            {new Date(latestSermon.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-black hover:bg-white/90"
          >
            <Link
              href={`https://www.youtube.com/@RhemaFaithAGChurch/streams${
                latestSermon.videoId || latestSermon.id
              }`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              Watch Now
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
