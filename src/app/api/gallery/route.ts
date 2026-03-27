import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const galleryItems = await prisma.galleryItem.findMany({
      orderBy: { order: 'asc' }
    });
    return NextResponse.json(galleryItems);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { imageUrl, order } = await req.json();
    const item = await prisma.galleryItem.create({
      data: { imageUrl, order: order || 0 }
    });
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
