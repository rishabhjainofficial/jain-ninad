import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { ALL_UPLOADED_GRANTHS } from '@/lib/granthData';

export async function POST() {
  try {
    // Remove legacy placeholder records if present
    await prisma.granthBook.deleteMany({
      where: { id: { in: ['b1', 'b2', 'b3'] } },
    });

    await Promise.all(
      ALL_UPLOADED_GRANTHS.map((item) =>
        prisma.granthBook.upsert({
          where: { id: item.id },
          update: {
            titleHindi: item.titleHindi,
            titleEnglish: item.titleEnglish,
            description: item.description,
            versesCount: item.versesCount,
            language: item.language,
            pdfLink: item.pdfLink,
            pdfFilePath: item.pdfFilePath,
            coverImage: item.coverImage,
          },
          create: {
            id: item.id,
            titleHindi: item.titleHindi,
            titleEnglish: item.titleEnglish,
            description: item.description,
            versesCount: item.versesCount,
            language: item.language,
            pdfLink: item.pdfLink,
            pdfFilePath: item.pdfFilePath,
            coverImage: item.coverImage,
          },
        })
      )
    );

    const count = await prisma.granthBook.count();
    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${ALL_UPLOADED_GRANTHS.length} granths into database.`,
      totalGranthsInDb: count,
    });
  } catch (error: unknown) {
    console.error('Granth seed API error:', error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: 'Failed to seed granths into database', details: message },
      { status: 500 }
    );
  }
}

