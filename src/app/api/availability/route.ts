import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const blockedDates = await prisma.blockedDate.findMany();
    // Return just the date strings
    return NextResponse.json(blockedDates.map(d => d.date));
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
