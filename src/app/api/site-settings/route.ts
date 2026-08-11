import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const settings = await prisma.siteSettings.findUnique({
      where: { id: 'default' },
    });
    return NextResponse.json(settings || {});
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch site settings' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { currentLocation, currentStayDetails, mahamantraText } = body;

    const settings = await prisma.siteSettings.upsert({
      where: { id: 'default' },
      update: { currentLocation, currentStayDetails, mahamantraText },
      create: {
        id: 'default',
        currentLocation: currentLocation || '',
        currentStayDetails: currentStayDetails || '',
        mahamantraText: mahamantraText || '',
      },
    });

    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update site settings' }, { status: 500 });
  }
}
