import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Prisma Client untuk PostgreSQL (Supabase)
export const db = globalForPrisma.prisma ?? new PrismaClient({
  log: ['query'],
  datasources: {
    db: {
      url: "postgresql://postgres.hooyyafipijurqemmiep:EdKS2HGrsM6ZxCRH@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres"
    }
  }
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db

// Helper function to test database connection
export const testDatabaseConnection = async () => {
  try {
    // Test Prisma connection
    await db.$connect()
    console.log('✅ Prisma connection successful')
    return true
  } catch (error) {
    console.log('❌ Database connection failed:', error instanceof Error ? error.message : 'Unknown error')
    return false
  }
}