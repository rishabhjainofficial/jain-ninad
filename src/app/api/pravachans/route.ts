import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const pravachans = await prisma.pravachan.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(pravachans);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch pravachans' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, category, description, youtubeId, audioUrl, duration, date } = body;

    const item = await prisma.pravachan.create({
      data: { title, category, description, youtubeId, audioUrl, duration, date },
    });

    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create pravachan' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, title, category, description, youtubeId, audioUrl, duration, date } = body;

    const item = await prisma.pravachan.update({
      where: { id },
      data: { title, category, description, youtubeId, audioUrl, duration, date },
    });

    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update pravachan' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    await prisma.pravachan.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete pravachan' }, { status: 500 });
  }
}
