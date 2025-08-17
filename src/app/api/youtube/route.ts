import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const YOUTUBE_RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${process.env.YOUTUBE_CHANNEL_ID}`;
    
    const response = await fetch(YOUTUBE_RSS_URL, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.statusText}`);
    }

    const xmlText = await response.text();
    return new NextResponse(xmlText, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 's-maxage=3600, stale-while-revalidate'
      }
    });
  } catch (error) {
    console.error('YouTube API Error:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to fetch YouTube data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export const dynamic = 'force-dynamic';
