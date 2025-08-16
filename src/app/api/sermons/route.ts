import { NextResponse } from 'next/server';
import { getLatestSermons } from '@/lib/youtube';

export async function GET() {
  try {
    const sermons = await getLatestSermons();
    return NextResponse.json(sermons);
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sermons' },
      { status: 500 }
    );
  }
}
