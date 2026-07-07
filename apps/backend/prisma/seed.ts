import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.event.createMany({
    data: [
      {
        name: 'Tech Conference 2026',
        description: 'Annual software engineering conference',
        date: new Date('2026-12-20T10:00:00Z'),
        totalSeats: 100,
        remainingSeats: 100,
        price: 99.99,
      },
      {
        name: 'Software Conference',
        description: 'Annual conference',
        date: new Date('2026-12-25T09:00:00Z'),
        totalSeats: 80,
        remainingSeats: 80,
        price: 79.99,
      },
      {
        name: 'AI Summit',
        description: 'Artificial Intelligence Summit',
        date: new Date('2026-12-30T11:00:00Z'),
        totalSeats: 120,
        remainingSeats: 120,
        price: 149.99,
      },
    ],
    skipDuplicates: true,
  });

  console.log('Database seeded successfully.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });