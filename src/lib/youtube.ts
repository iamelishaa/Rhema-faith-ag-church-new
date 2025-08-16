const YOUTUBE_API_KEY =
  process.env.YOUTUBE_API_KEY || process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;
const MAX_RESULTS = 7; // Number of videos to fetch

if (!YOUTUBE_API_KEY) {
  console.error(
    "YOUTUBE_API_KEY is not defined. Please check your environment variables."
  );
}

if (!CHANNEL_ID) {
  console.error(
    "YOUTUBE_CHANNEL_ID is not defined. Please check your environment variables."
  );
}

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
  try {
    // First, get the uploads playlist ID
    const channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${CHANNEL_ID}&key=${YOUTUBE_API_KEY}`
    );
    const channelData = await channelResponse.json();
    const uploadsPlaylistId =
      channelData.items[0].contentDetails.relatedPlaylists.uploads;

    // Then, get the videos from the uploads playlist with pagination
    let url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${MAX_RESULTS}&playlistId=${uploadsPlaylistId}`;
    if (pageToken) {
      url += `&pageToken=${pageToken}`;
    }
    url += `&key=${YOUTUBE_API_KEY}`;

    const playlistResponse = await fetch(url);
    const playlistData = await playlistResponse.json();

    // Get video details including duration
    const videoIds = playlistData.items
      .map((item: any) => item.snippet.resourceId.videoId)
      .join(",");
    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIds}&key=${YOUTUBE_API_KEY}`
    );
    const videosData = await videosResponse.json();

    // Format the response
    const items = videosData.items.map((video: any) => {
      // Use maxres thumbnail if available, otherwise fall back to high
      const thumbnail =
        video.snippet.thumbnails.maxres?.url ||
        video.snippet.thumbnails.high.url;

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
    });

    return {
      items,
      nextPageToken: playlistData.nextPageToken,
    };
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    return { items: [] };
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
