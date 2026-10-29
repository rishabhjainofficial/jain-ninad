import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import { ALL_UPLOADED_GRANTHS } from '../src/lib/granthData';

const connectionString =
  process.env.DATABASE_URL ||
  process.env.jain_ninad_db_PRISMA_DATABASE_URL ||
  process.env.jain_ninad_db_POSTGRES_URL ||
  'postgresql://postgres:postgres@localhost:5432/jain_ninad_db?schema=public';

const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log(`Connecting to DB to seed ${ALL_UPLOADED_GRANTHS.length} granths...`);

  // Remove old placeholder records if present
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
  console.log(`✅ Successfully seeded granths! Total granths in DB: ${count}`);
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });

