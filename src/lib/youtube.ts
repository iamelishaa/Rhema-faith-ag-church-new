// Define types for YouTube API responses
interface YouTubePlaylistItem {
  snippet: {
    resourceId: {
      videoId: string;
    };
  };
}

interface YouTubeVideoItem {
  id: string;
  snippet: {
    title: string;
    description: string;
    publishedAt: string;
    thumbnails: {
      default?: { url: string };
      medium?: { url: string };
      high?: { url: string };
      standard?: { url: string };
      maxres?: { url: string };
    };
  };
  contentDetails: {
    duration: string;
  };
  statistics: {
    viewCount: string;
  };
}

// Get YouTube API key from environment variables (with fallback for development)
const YOUTUBE_API_KEY =
  process.env.YOUTUBE_API_KEY || process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || ""; // Empty string as fallback to prevent undefined errors

// Get YouTube Channel ID from environment variables
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID || "";
const MAX_RESULTS = 7; // Number of videos to fetch

// Check if required environment variables are set
const isConfigured = () => {
  if (!YOUTUBE_API_KEY || !CHANNEL_ID) {
    console.warn(
      "YouTube API is not properly configured. " +
        "Please set YOUTUBE_API_KEY and YOUTUBE_CHANNEL_ID environment variables."
    );
    return false;
  }
  return true;
};

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  duration: string;
  viewCount: string;
}

export async function getLatestSermons(
  pageToken?: string
): Promise<{ items: YouTubeVideo[]; nextPageToken?: string }> {
  // Return empty array if YouTube API is not properly configured
  if (!isConfigured()) {
    console.warn(
      "YouTube API is not properly configured. Returning empty sermon list."
    );
    return { items: [] };
  }

  try {
    if (!YOUTUBE_API_KEY) {
      throw new Error('YouTube API key is not configured');
    }
    
    if (!CHANNEL_ID) {
      throw new Error('YouTube Channel ID is not configured');
    }
    
    // First, get the uploads playlist ID
    const channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${CHANNEL_ID}&key=${YOUTUBE_API_KEY}`
    );
    
    if (!channelResponse.ok) {
      const errorData = await channelResponse.json().catch(() => ({}));
      throw new Error(
        `YouTube API error: ${channelResponse.status} ${channelResponse.statusText} - ${JSON.stringify(errorData.error || {})}`
      );
    }

    const channelData = await channelResponse.json();

    if (!channelData.items || channelData.items.length === 0) {
      throw new Error("No channel found with the provided CHANNEL_ID");
    }

    const uploadsPlaylistId =
      channelData.items[0].contentDetails.relatedPlaylists.uploads;

    // Then, get the videos from the uploads playlist with pagination
    let url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${MAX_RESULTS}&playlistId=${uploadsPlaylistId}`;
    if (pageToken) {
      url += `&pageToken=${pageToken}`;
    }
    url += `&key=${YOUTUBE_API_KEY}`;

    const playlistResponse = await fetch(url);
    if (!playlistResponse.ok) {
      throw new Error(`YouTube API error: ${playlistResponse.statusText}`);
    }
    const playlistData = (await playlistResponse.json()) as {
      items: YouTubePlaylistItem[];
      nextPageToken?: string;
    };

    // Get video details including duration
    const videoIds = (playlistData.items as YouTubePlaylistItem[])
      .map((item) => item.snippet.resourceId.videoId)
      .join(",");
    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIds}&key=${YOUTUBE_API_KEY}`
    );
    
    if (!videosResponse.ok) {
      throw new Error(`YouTube API error: ${videosResponse.statusText}`);
    }
    
    const videosData = await videosResponse.json() as {
      items: YouTubeVideoItem[];
    };

    // Format the response with proper type safety
    const items: YouTubeVideo[] = videosData.items.map(
      (video: YouTubeVideoItem) => {
        // Use maxres thumbnail if available, otherwise fall back to high
        // Ensure we're using HTTPS and the correct domain for YouTube thumbnails
        let thumbnail =
          video.snippet.thumbnails.maxres?.url ||
          video.snippet.thumbnails.high?.url ||
          video.snippet.thumbnails.standard?.url ||
          video.snippet.thumbnails.medium?.url ||
          video.snippet.thumbnails.default?.url ||
          `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;

        // Ensure the URL uses HTTPS and the correct domain
        if (thumbnail) {
          thumbnail = thumbnail
            .replace("http://", "https://")
            .replace("i1.ytimg.com", "i.ytimg.com")
            .replace("i2.ytimg.com", "i.ytimg.com")
            .replace("i3.ytimg.com", "i.ytimg.com")
            .replace("i4.ytimg.com", "i.ytimg.com");
        }

        return {
          id: video.id,
          title: cleanTitle(video.snippet.title),
          description: video.snippet.description || "", // Ensure description is always a string
          thumbnail,
          publishedAt: video.snippet.publishedAt,
          duration: formatDuration(video.contentDetails.duration),
          viewCount: formatViewCount(video.statistics.viewCount),
          // Keep original title in case it's needed
          originalTitle: video.snippet.title,
        };
      }
    );

    return {
      items,
      nextPageToken: playlistData.nextPageToken,
    };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Error in getLatestSermons:", errorMessage);
    return { items: [], nextPageToken: undefined };
  }
}

function formatDuration(duration: string): string {
  // Convert ISO 8601 duration format to human-readable format
  const matches = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!matches) return "0:00";

  const hours = matches[1] ? parseInt(matches[1]) : 0;
  const minutes = matches[2] ? parseInt(matches[2]) : 0;
  const seconds = matches[3] ? parseInt(matches[3]) : 0;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function formatViewCount(views: string): string {
  const count = parseInt(views);
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + "M";
  }
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + "K";
  }
  return count.toString();
}

function cleanTitle(title: string): string {
  // Remove common patterns and clean up the title
  return (
    title
      // Remove LIVE and any following |
      .replace(/^\s*LIVE\s*\|?\s*/i, "")
      // Remove everything after the last | if it contains 'WORSHIP & WORD OF GOD BY'
      .replace(/\s*\|\s*WORSHIP & WORD OF GOD BY.*$/i, "")
      // Remove any remaining | and trim whitespace
      .replace(/\|/g, "")
      .trim()
      // Capitalize first letter of each word
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
      // Limit length to 50 characters
      .substring(0, 50)
      .trim()
  );
}
