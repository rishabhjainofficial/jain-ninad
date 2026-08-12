import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import bcrypt from 'bcryptjs';

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/jain_ninad_db?schema=public';
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Starting seed process...');

  // 1. Admin User Seed
  const adminEmail = 'admin@gmail.com';
  const hashedPassword = await bcrypt.hash('12345678', 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      password: hashedPassword,
    },
    create: {
      name: 'Admin',
      email: adminEmail,
      password: hashedPassword,
      role: 'admin',
    },
  });
  console.log('Seeded admin user:', admin.email);

  // 2. Site Settings Seed
  await prisma.siteSettings.upsert({
    where: { id: 'default' },
    update: {
      currentLocation: 'दिगंबर जैन श्रमण भवन, नागदा बाजार, सलूम्बर (राजस्थान)',
      currentStayDetails: 'परम पूज्य निर्ग्रन्थ मुनि श्री 108 सुवन्द्य सागर जी महाराज ससंघ का पावन चातुर्मास प्रवास एवं स्वाध्याय charyaa',
      mahamantraText: 'ॐ Ignoraay नमः  |  ॐ Deletaaya नमः',
    },
    create: {
      id: 'default',
      currentLocation: 'दिगंबर जैन श्रमण भवन, नागदा बाजार, सलूम्बर (राजस्थान)',
      currentStayDetails: 'परम पूज्य निर्ग्रन्थ मुनि श्री 108 सुवन्द्य सागर जी महाराज ससंघ का पावन चातुर्मास प्रवास एवं स्वाध्याय charyaa',
      mahamantraText: 'ॐ Ignoraay नमः  |  ॐ Deletaaya नमः',
    },
  });
  console.log('Seeded site settings');

  // 3. Vihar Schedules
  const viharSchedules = [
    {
      id: "v1",
      date: "26 फ़रवरी 2025",
      title: "श्री भक्तामर विधान एवं पात्रचयन",
      location: "चंद्रप्रभु मांगलिक भावन, अंजनी नगर",
      details: "प्रातः 08:00 बजे पात्रचयन एवं मांगलिक क्रियाएं",
      isCurrent: false
    },
    {
      id: "v2",
      date: "27 फ़रवरी 2025",
      title: "नरिमन सिटी के लिए विहार",
      location: "अंजनी नगर से नरिमन सिटी",
      details: "दोपहर 03:30 बजे ससंघ पद विहार",
      isCurrent: false
    },
    {
      id: "v3",
      date: "28 फ़रवरी - 02 मार्च 2025",
      title: "वेदी शिलान्यास एवं प्रतिष्ठा",
      location: "Nariman City Jain Mandir",
      details: "वेदी शिलान्यास, वेदी प्रतिष्ठा एवं भक्तामर विधान",
      isCurrent: true
    },
    {
      id: "v4",
      date: "03 मार्च 2025",
      title: "प्रवेश एवं चर्या प्रवचन",
      location: "खातीवाला जैन मंदिर",
      details: "प्रतिभाचयन में प्रवेश, चर्या एवं शाम मंदिर प्रवेश",
      isCurrent: false
    },
    {
      id: "v5",
      date: "07 - 09 मार्च 2025",
      title: "भव्य सर्वोदय सर्व विघ्नहरण भक्तामर मंडल विधान",
      location: "मोदी जी की नसिया",
      details: "सामूहिक विधान एवं दिव्य देशना",
      isCurrent: false
    }
  ];

  for (const item of viharSchedules) {
    await prisma.viharSchedule.upsert({
      where: { id: item.id },
      update: item,
      create: item,
    });
  }
  console.log('Seeded vihar schedules');

  // 4. Pravachans
  const pravachans = [
    {
      id: "p1",
      title: "वक्त बनाने का रहस्य",
      category: "Pravachan",
      description: "मुनि सुवन्द्य सागर जी महाराज इस प्रवचन में जीवन और समय के महत्व को समझाते हुए आत्मशुद्धि का मार्ग बताते हैं।",
      youtubeId: "dQw4w9WgXcQ",
      duration: "32:15",
      date: "10 Feb 2025"
    },
    {
      id: "p2",
      title: "वक्त पर सीखें दौर आयेगा",
      category: "Pravachan",
      description: "जीवन एक पावन साधना है, जहाँ धैर्य और संयम से हर कठिनाई को जीता जा सकता है।",
      youtubeId: "dQw4w9WgXcQ",
      duration: "45:00",
      date: "05 Feb 2025"
    },
    {
      id: "p3",
      title: "बचें झूठी तारीफ से",
      category: "Pravachan",
      description: "प्रशंसा और निंदा से परे होकर अपने निज स्वरूप में लीन होने की अद्भुत देशना।",
      youtubeId: "dQw4w9WgXcQ",
      duration: "28:40",
      date: "01 Feb 2025"
    },
    {
      id: "p4",
      title: "कर्म सिद्धांत एवं समाधान",
      category: "Pravachan",
      description: "श्रोताओं के गूढ़ आध्यात्मिक प्रश्नों के प्रामाणिक एवं सरल समाधान।",
      youtubeId: "dQw4w9WgXcQ",
      duration: "40:10",
      date: "25 Jan 2025"
    }
  ];

  for (const item of pravachans) {
    await prisma.pravachan.upsert({
      where: { id: item.id },
      update: item,
      create: item,
    });
  }
  console.log('Seeded pravachans');

  // 5. Jivan Neeti Quotes
  const quotes = [
    {
      id: "q1",
      quoteHindi: "संसार की हर वस्तु परिवर्तनशील है, केवल आपकी अपनी आत्मा ही अजर-अमर और सत्य है।",
      quoteEnglish: "Everything in the world is dynamic and impermanent; only your inner pure soul is eternal true peace.",
      category: "आत्मानुशासन",
      likes: 1240
    },
    {
      id: "q2",
      quoteHindi: "क्रोध को क्षमा से, अहंकार को नम्रता से और कपट को सरलता से जीतो।",
      quoteEnglish: "Conquer anger with forgiveness, pride with humility, and deceit with simplicity.",
      category: "संयम व अहिंसा",
      likes: 980
    },
    {
      id: "q3",
      quoteHindi: "ॐ Ignoraay नमः | ॐ Deletaaya नमः - व्यर्थ की बातों को अनदेखा करो, अशुभ विचारों को मिटा दो।",
      quoteEnglish: "Ignore trivial worldly distractions, delete negative thoughts from the heart.",
      category: "जीवन मंत्र",
      likes: 2150
    }
  ];

  for (const item of quotes) {
    await prisma.jivanNeetiQuote.upsert({
      where: { id: item.id },
      update: item,
      create: item,
    });
  }
  console.log('Seeded quotes');

  // 6. Granth Books
  const granthBooks = [
    {
      id: "b1",
      titleHindi: "सम्यग्ज्ञान दीपक",
      titleEnglish: "Samyagjnana Deepak",
      description: "जैन दर्शन के मौलिक सिद्धांतों और आत्मसाधना पर रचित 500 से अधिक संस्कृत श्लोक मय व्याख्या।",
      versesCount: "520 श्लोक",
      language: "संस्कृत / हिंदी",
      coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
      pdfFilePath: null
    },
    {
      id: "b2",
      titleHindi: "इष्टोपदेश स्वाध्याय तरङ्गिणी",
      titleEnglish: "Istopadesha Swadhyay Tarangini",
      description: "आचार्य पूज्यपाद कृत इष्टोपदेश ग्रंथ पर मुनि श्री सुवन्द्य सागर जी की प्रांजल टीका।",
      versesCount: "350 श्लोक",
      language: "प्राकृत / हिंदी",
      coverImage: "https://images.unsplash.com/photo-1532012164546-f43249488629?auto=format&fit=crop&w=600&q=80",
      pdfFilePath: null
    },
    {
      id: "b3",
      titleHindi: "आत्मानुशासन भक्ति पुष्प",
      titleEnglish: "Atmanushasana Bhakti Pushpa",
      description: "आत्मा के उत्थान और ध्यान साधना हेतु रचित भक्ति श्लोक संग्रह।",
      versesCount: "1200 श्लोक",
      language: "संस्कृत",
      coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80",
      pdfFilePath: null
    }
  ];

  for (const item of granthBooks) {
    await prisma.granthBook.upsert({
      where: { id: item.id },
      update: item,
      create: item,
    });
  }
  console.log('Seeded granth books');

  // 7. Podcasts
  const podcasts = [
    {
      id: "pod1",
      title: "मुनि सुवन्द्य सागर जी के संग आध्यात्मिक संवाद",
      guestHost: "राघव शर्मा",
      description: "जैन धर्म के गूढ़ सिद्धांतों, अहिंसा, आत्मशुद्धि और कर्म सिद्धांत की प्रामाणिक व्याख्या।",
      youtubeId: "dQw4w9WgXcQ",
      duration: "54:20",
      date: "14 Feb 2025"
    }
  ];

  for (const item of podcasts) {
    await prisma.podcastEpisode.upsert({
      where: { id: item.id },
      update: item,
      create: item,
    });
  }
  console.log('Seeded podcasts');

  // 8. Blogs
  const blogs = [
    {
      id: "blog1",
      title: "श्रुतसंवेगी महाश्रमण ससंघ का इंदौर नगर में भव्य प्रवेश",
      category: "Bihar Updates",
      snippet: "पूज्य मुनि श्री 108 सुवन्द्य सागर जी महाराज ससंघ के आगमन से इंदौर नगरी धर्ममय हो उठी।",
      content: "पूज्य मुनि श्री 108 सुवन्द्य सागर जी महाराज ससंघ के इंदौर नगर आगमन पर अपार जनसैलाब उमड़ा। भव्य आगवानी के साथ भक्तजनों ने मुनि श्री का पाद प्रक्षालन कर आशीर्वाद प्राप्त किया।",
      date: "12 Feb 2025",
      author: "श्री सुवन्द्य देशना मीडिया संघ"
    },
    {
      id: "blog2",
      title: "भक्तामर विधान एवं वेदी शिलान्यास महोत्सव की रूपरेखा",
      category: "Program Updates",
      snippet: "नरिमन सिटी जैन मंदिर में आयोजित होने वाले भव्य तीन दिवसीय कार्यक्रम का विवरण।",
      content: "नरिमन सिटी जैन मंदिर परिसर में पूज्य मुनि श्री के पावन सान्निध्य में वेदी शिलान्यास एवं सर्व विघ्नहरण भक्तामर विधान का आयोजन होने जा रहा है।",
      date: "08 Feb 2025",
      author: "प्रचार समिति"
    }
  ];

  for (const item of blogs) {
    await prisma.blogUpdate.upsert({
      where: { id: item.id },
      update: item,
      create: item,
    });
  }
  console.log('Seeded blogs');

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
