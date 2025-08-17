// This API route is not available in static export
// We'll handle the data fetching directly in the page component

import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

// Simple response for static export
export function GET() {
  return NextResponse.json(
    { 
      items: [],
      message: 'Sermons are not available in the static export. Please check our YouTube channel directly.'
    },
    { 
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600'
      }
    }
  );
}
