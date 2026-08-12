import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pgPool: pg.Pool | undefined;
};

function getPgPool() {
  if (globalForPrisma.pgPool) return globalForPrisma.pgPool;
  const connectionString =
    process.env.DATABASE_URL ||
    process.env.jain_ninad_db_PRISMA_DATABASE_URL ||
    process.env.jain_ninad_db_POSTGRES_URL ||
    'postgresql://postgres:postgres@localhost:5432/jain_ninad_db?schema=public';
  const pool = new pg.Pool({ connectionString, max: 10 });
  if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.pgPool = pool;
  }
  return pool;
}

function createPrismaClient() {
  const pool = getPgPool();
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
