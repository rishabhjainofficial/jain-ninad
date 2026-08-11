import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const quotes = await prisma.jivanNeetiQuote.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(quotes);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch quotes' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { quoteHindi, quoteEnglish, category, likes } = body;

    const item = await prisma.jivanNeetiQuote.create({
      data: {
        quoteHindi,
        quoteEnglish,
        category,
        likes: typeof likes === 'number' ? likes : 0,
      },
    });

    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create quote' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, quoteHindi, quoteEnglish, category, likes } = body;

    const item = await prisma.jivanNeetiQuote.update({
      where: { id },
      data: { quoteHindi, quoteEnglish, category, likes },
    });

    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update quote' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    await prisma.jivanNeetiQuote.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete quote' }, { status: 500 });
  }
}
