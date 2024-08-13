import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/database';
import Vote from '@/lib/database/models/vote.model';

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const vote = await Vote.findOne({ userId });

    if (vote) {
      return NextResponse.json({ hasVoted: true });
    } else {
      return NextResponse.json({ hasVoted: false });
    }
  } catch (error) {
    console.error('Error fetching vote status:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
