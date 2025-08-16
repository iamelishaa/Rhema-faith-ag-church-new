const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID;
const MAX_RESULTS = 6;

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnail: string;
  videoId: string;
  viewCount?: string;
  duration?: string;
}

export async function fetchLatestVideos(): Promise<YouTubeVideo[]> {
  if (!YOUTUBE_API_KEY || !CHANNEL_ID) {
    console.error('YouTube API key or Channel ID is not set');
    return [];
  }

  try {
    // First, get the uploads playlist ID from the channel
    const channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${CHANNEL_ID}&key=${YOUTUBE_API_KEY}`
    );
    
    if (!channelResponse.ok) {
      throw new Error('Failed to fetch channel data');
    }
    
    const channelData = await channelResponse.json();
    const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;

    // Then, get the videos from the uploads playlist
    const playlistResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${MAX_RESULTS}&playlistId=${uploadsPlaylistId}&key=${YOUTUBE_API_KEY}`
    );
    
    if (!playlistResponse.ok) {
      throw new Error('Failed to fetch playlist items');
    }

    const playlistData = await playlistResponse.json();

    // Get video details including duration and view count
    const videoIds = playlistData.items.map((item: any) => item.snippet.resourceId.videoId).join(',');
    
    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIds}&key=${YOUTUBE_API_KEY}`
    );
    
    if (!videosResponse.ok) {
      throw new Error('Failed to fetch video details');
    }

    const videosData = await videosResponse.json();

    // Format the response
    return videosData.items.map((video: any) => ({
      id: video.id,
      title: video.snippet.title,
      description: video.snippet.description,
      publishedAt: video.snippet.publishedAt,
      thumbnail: video.snippet.thumbnails.medium.url,
      videoId: video.id,
      viewCount: video.statistics?.viewCount || '0',
      duration: formatDuration(video.contentDetails.duration)
    }));
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    throw error;
  }
}

// Helper function to format ISO 8601 duration to human-readable format
function formatDuration(duration: string): string {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return '';
  
  const hours = (parseInt(match[1]) || 0);
  const minutes = (parseInt(match[2]) || 0);
  const seconds = (parseInt(match[3]) || 0);
  
  const parts = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0 || hours > 0) parts.push(`${minutes}m`);
  parts.push(`${seconds}s`);
  
  return parts.join(' ');
}
