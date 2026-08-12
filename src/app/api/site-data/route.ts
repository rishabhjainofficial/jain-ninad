import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const settings = await prisma.siteSettings.findUnique({
      where: { id: 'default' },
    });

    const viharSchedules = await prisma.viharSchedule.findMany({
      orderBy: { createdAt: 'desc' },
    });

    const pravachans = await prisma.pravachan.findMany({
      orderBy: { createdAt: 'desc' },
    });

    const jivanNeetiQuotes = await prisma.jivanNeetiQuote.findMany({
      orderBy: { createdAt: 'desc' },
    });

    const granthBooks = await prisma.granthBook.findMany({
      orderBy: { createdAt: 'desc' },
    });

    const podcasts = await prisma.podcastEpisode.findMany({
      orderBy: { createdAt: 'desc' },
    });

    const blogs = await prisma.blogUpdate.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      currentLocation: settings?.currentLocation || "दिगंबर जैन श्रमण भवन, नागदा बाजार, सलूम्बर (राजस्थान)",
      currentStayDetails: settings?.currentStayDetails || "परम पूज्य निर्ग्रन्थ मुनि श्री 108 सुवन्द्य सागर जी महाराज ससंघ का पावन चातुर्मास प्रवास एवं स्वाध्याय charyaa",
      mahamantraText: settings?.mahamantraText || "ॐ Ignoraay नमः  |  ॐ Deletaaya नमः",
      viharSchedules,
      pravachans,
      jivanNeetiQuotes,
      granthBooks,
      podcasts,
      blogs,
    });
  } catch (error) {
    console.error('Error fetching aggregated site data from DB (falling back):', error);
    return NextResponse.json({
      currentLocation: "दिगंबर जैन श्रमण भवन, नागदा बाजार, सलूम्बर (राजस्थान)",
      currentStayDetails: "परम पूज्य निर्ग्रन्थ मुनि श्री 108 सुवन्द्य सागर जी महाराज ससंघ का पावन चातुर्मास प्रवास एवं स्वाध्याय charyaa",
      mahamantraText: "ॐ Ignoraay नमः  |  ॐ Deletaaya नमः",
      viharSchedules: [],
      pravachans: [],
      jivanNeetiQuotes: [],
      granthBooks: [],
      podcasts: [],
      blogs: [],
    });
  }
}
