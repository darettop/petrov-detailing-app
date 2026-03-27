const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Clear existing
  await prisma.service.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.galleryItem.deleteMany();

  // Seed Services
  const services = await Promise.all([
    prisma.service.create({ data: { name: 'Signature Detail', description: 'Our flagship multi-stage correction.', price: 500, duration: '6-8 Hours' } }),
    prisma.service.create({ data: { name: 'Ceramic Coating', description: '9H hardness permanent protection.', price: 1200, duration: '2 Days' } }),
    prisma.service.create({ data: { name: 'Interior Restoration', description: 'Deep steam cleaning and leather care.', price: 350, duration: '4 Hours' } }),
    prisma.service.create({ data: { name: 'Platinum Package', description: 'The ultimate bespoke detailing experience.', price: 2500, duration: '3 Days' } }),
  ]);

  // Seed Bookings
  await prisma.booking.create({
    data: {
      name: 'Darko Petrov',
      email: 'daremc2123@gmail.com',
      phone: '078246700',
      carMake: 'GOLF 5',
      service: 'Signature Detail',
      price: 500,
      date: '2026-03-25',
      time: '09:00 AM',
      status: 'confirmed'
    }
  });

  // Seed Gallery
  const images = [
    'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1601362840469-51e4d8d59085?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=800',
  ];

  for (let i = 0; i < images.length; i++) {
    await prisma.galleryItem.create({
      data: {
        imageUrl: images[i],
        order: i
      }
    });
  }

  console.log('Seed completed successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
