import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  // --- Demo accounts (idempotent) ---
  const adminPassword = await bcrypt.hash('admin123', 10);
  const userPassword = await bcrypt.hash('user123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: adminPassword,
      role: Role.ADMIN,
    },
  });

  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      password: userPassword,
      role: Role.USER,
    },
  });

  // --- Sample trains (only seed when the table is empty) ---
  const trainCount = await prisma.train.count();
  if (trainCount === 0) {
    await prisma.train.createMany({
      data: [
        {
          trainNumber: 'IC-001',
          departureStation: 'Kyiv',
          arrivalStation: 'Lviv',
          departureTime: new Date('2026-07-01T08:00:00.000Z'),
          arrivalTime: new Date('2026-07-01T13:30:00.000Z'),
        },
        {
          trainNumber: 'IC-014',
          departureStation: 'Kyiv',
          arrivalStation: 'Odesa',
          departureTime: new Date('2026-07-01T09:15:00.000Z'),
          arrivalTime: new Date('2026-07-01T16:00:00.000Z'),
        },
        {
          trainNumber: 'RE-220',
          departureStation: 'Kharkiv',
          arrivalStation: 'Dnipro',
          departureTime: new Date('2026-07-02T07:45:00.000Z'),
          arrivalTime: new Date('2026-07-02T10:10:00.000Z'),
        },
        {
          trainNumber: 'IC-077',
          departureStation: 'Lviv',
          arrivalStation: 'Ivano-Frankivsk',
          departureTime: new Date('2026-07-02T18:30:00.000Z'),
          arrivalTime: new Date('2026-07-02T20:45:00.000Z'),
        },
      ],
    });
  }

  console.log('Seed complete:', {
    admin: admin.email,
    user: user.email,
    trains: await prisma.train.count(),
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
