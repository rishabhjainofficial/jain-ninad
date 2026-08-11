import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const pageParam = searchParams.get('page');
    const limitParam = searchParams.get('limit');

    if (pageParam && limitParam) {
      const page = Math.max(1, parseInt(pageParam, 10) || 1);
      const limit = Math.max(1, parseInt(limitParam, 10) || 10);
      const skip = (page - 1) * limit;

      const [schedules, total] = await Promise.all([
        prisma.viharSchedule.findMany({
          orderBy: { createdAt: 'desc' },
          skip,
          take: limit,
        }),
        prisma.viharSchedule.count(),
      ]);

      const totalPages = Math.ceil(total / limit);

      return NextResponse.json({
        schedules,
        total,
        page,
        totalPages,
        limit,
      });
    }

    const schedules = await prisma.viharSchedule.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(schedules);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch vihar schedules' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { date, title, location, details, isCurrent } = body;

    const schedule = await prisma.viharSchedule.create({
      data: { date, title, location, details, isCurrent: Boolean(isCurrent) },
    });

    return NextResponse.json(schedule);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create vihar schedule' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, date, title, location, details, isCurrent } = body;

    const schedule = await prisma.viharSchedule.update({
      where: { id },
      data: { date, title, location, details, isCurrent: Boolean(isCurrent) },
    });

    return NextResponse.json(schedule);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update vihar schedule' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    await prisma.viharSchedule.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete vihar schedule' }, { status: 500 });
  }
}
