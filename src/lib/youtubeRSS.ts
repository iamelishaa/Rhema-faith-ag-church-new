export interface VideoItem {
  id: string;
  title: string;
  published: string;
  thumbnail: string;
}

export interface VideoResponse {
  videos: VideoItem[];
  nextPageToken?: string;
}

export async function fetchLatestVideos(
  channelId: string,
  maxResults: number = 6,
  startIndex: string = "0"
): Promise<VideoResponse> {
  try {
    // Try direct fetch first
    const targetUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    console.log("Fetching YouTube RSS feed from:", targetUrl);

    // First try direct fetch
    let response;
    try {
      response = await fetch(targetUrl, {
        mode: "cors",
        credentials: "omit",
      });

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
    } catch (directError) {
      console.log(
        "Direct fetch failed, trying with CORS proxy...",
        directError
      );
      // If direct fetch fails, try with CORS proxy
      const proxyUrl = "https://api.allorigins.win/raw?url=";
      response = await fetch(proxyUrl + encodeURIComponent(targetUrl));

      if (!response.ok) {
        throw new Error(
          `CORS proxy fetch failed with status: ${response.status}`
        );
      }
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
