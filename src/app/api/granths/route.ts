import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const books = await prisma.granthBook.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(books);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch granth books' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { titleHindi, titleEnglish, description, versesCount, coverImage, pdfLink, pdfFilePath, language } = body;

    const item = await prisma.granthBook.create({
      data: {
        titleHindi,
        titleEnglish,
        description,
        versesCount,
        coverImage,
        pdfLink,
        pdfFilePath,
        language: language || 'Hindi',
      },
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error('Granth creation error:', error);
    return NextResponse.json({ error: 'Failed to create granth book' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, titleHindi, titleEnglish, description, versesCount, coverImage, pdfLink, pdfFilePath, language } = body;

    const item = await prisma.granthBook.update({
      where: { id },
      data: {
        titleHindi,
        titleEnglish,
        description,
        versesCount,
        coverImage,
        pdfLink,
        pdfFilePath,
        language,
      },
    });

    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update granth book' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    await prisma.granthBook.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete granth book' }, { status: 500 });
  }
}
