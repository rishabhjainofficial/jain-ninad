import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const podcasts = await prisma.podcastEpisode.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(podcasts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch podcasts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, guestHost, description, youtubeId, duration, date } = body;

    const item = await prisma.podcastEpisode.create({
      data: { title, guestHost, description, youtubeId, duration, date },
    });

    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create podcast' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, title, guestHost, description, youtubeId, duration, date } = body;

    const item = await prisma.podcastEpisode.update({
      where: { id },
      data: { title, guestHost, description, youtubeId, duration, date },
    });

    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update podcast' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    await prisma.podcastEpisode.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete podcast' }, { status: 500 });
  }
}
