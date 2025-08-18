export interface VideoItem {
  id: string;
  title: string;
  published: string;
  thumbnail: string;
}

export interface VideoResponse {
  videos: VideoItem[];
  nextPageToken?: string;
  error?: string;
}

// Fallback video data in case the feed is unavailable
const FALLBACK_VIDEOS: VideoItem[] = [
  {
    id: 'welcome-video-1',
    title: 'Welcome to Our Channel',
    published: new Date().toISOString(),
    thumbnail: '/images/placeholder-1.jpg',
  },
  {
    id: 'sermon-video-2',
    title: 'Latest Sermon',
    published: new Date(Date.now() - 86400000).toISOString(),
    thumbnail: '/images/placeholder-2.jpg',
  },
];

export async function fetchLatestVideos(
  channelId: string,
  maxResults: number = 6,
  startIndex: string = "0"
): Promise<VideoResponse> {
  try {
    // Try direct fetch first
    const targetUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    console.log("Fetching YouTube RSS feed from:", targetUrl);

    let response;
    let useFallback = false;
    let lastError: Error | null = null;
    
    try {
      // Try direct fetch first
      response = await fetch(targetUrl, {
        method: 'GET',
        mode: 'cors',
        credentials: 'omit',
        headers: {
          'Content-Type': 'application/xml',
        },
      });

      if (!response.ok) {
        console.warn(`Direct fetch failed with status: ${response.status}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (directError) {
      console.warn("Direct fetch failed, trying with CORS proxy...", directError);
      
      try {
        // Try with CORS proxy
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;
        response = await fetch(proxyUrl);

        if (!response.ok) {
          console.warn(`CORS proxy fetch failed with status: ${response.status}`);
          throw new Error(`CORS proxy fetch failed with status: ${response.status}`);
        }
        
        // Parse the AllOrigins response
        const data = await response.json();
        if (data.contents) {
          // Create a new response with the contents
          response = new Response(data.contents, {
            status: 200,
            headers: { 'Content-Type': 'application/xml' }
          });
        } else {
          throw new Error('Invalid response from CORS proxy');
        }
      } catch (proxyError) {
        lastError = proxyError as Error;
        console.error("All fetch methods failed, using fallback data", {
          error: lastError.message,
          stack: lastError.stack
        });
        useFallback = true;
      }
    }

    if (useFallback || !response) {
      console.warn("Using fallback video data. Last error:", lastError?.message || 'Unknown error');
      return {
        videos: FALLBACK_VIDEOS.slice(0, maxResults),
        nextPageToken: undefined,
        error: lastError?.message || 'Failed to fetch videos'
      };
    }

    const xmlText = await response.text();
    console.log("Received XML response:", xmlText.substring(0, 500)); // Log first 500 chars of response

    // Parse the XML response
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");

    // Check for XML parsing errors
    const parserError = xmlDoc.getElementsByTagName("parsererror");
    if (parserError.length > 0) {
      console.error("XML Parse Error:", parserError[0].textContent);
      throw new Error("Failed to parse XML response from YouTube");
    }

    // Get all entry elements
    const entries = Array.from(xmlDoc.getElementsByTagName("entry"));
    console.log(`Found ${entries.length} video entries`);

    if (entries.length === 0) {
      console.warn("No video entries found in the feed");
      return { videos: [] };
    }

    // Log total entries before limiting
    console.log(
      `Total entries found: ${entries.length}, maxResults: ${maxResults}`
    );

    // Ensure we only process up to maxResults entries
    const limitedEntries = entries.slice(parseInt(startIndex), parseInt(startIndex) + maxResults);
    console.log(
      `Processing ${limitedEntries.length} entries (limited to ${maxResults})`
    );

    // Map entries to video items
    const videos = limitedEntries
      .map((entry) => {
        try {
          const id =
            entry.getElementsByTagName("yt:videoId")[0]?.textContent || "";
          const title =
            entry.getElementsByTagName("title")[0]?.textContent ||
            "Untitled Video";
          const published =
            entry.getElementsByTagName("published")[0]?.textContent || "";
          const thumbnail = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

          if (!id) {
            console.warn("Entry missing videoId:", entry);
            return null;
          }

          return {
            id,
            title,
            published,
            thumbnail,
          };
        } catch (error) {
          console.error("Error parsing video entry:", error);
          return null;
        }
      })
      .filter((video): video is VideoItem => video !== null); // Filter out any entries without an ID

    const filteredVideos = videos.filter((v): v is VideoItem => v !== null);
    
    console.log(`Processed ${filteredVideos.length} videos`);
    console.log(
      "Video IDs being returned:",
      filteredVideos.map((v) => v.id)
    );
    
    return {
      videos: filteredVideos,
      nextPageToken: filteredVideos.length === maxResults ? String(parseInt(startIndex) + maxResults) : undefined
    };
  } catch (error: unknown) {
    console.error("Error in fetchLatestVideos:", error);
    if (error instanceof Error) {
      console.error("Error details:", {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
    } else {
      console.error("Unknown error occurred:", String(error));
    }
    // Return a fallback empty array if there's an error
    return { videos: [] };
  }
}
