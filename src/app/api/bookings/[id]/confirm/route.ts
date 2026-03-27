import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendBookingConfirmation } from '@/lib/mail';

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { status } = await req.json();
    const { id } = await params;

    const booking = await prisma.booking.update({
      where: { id },
      data: { status }
    });

    console.log(`[DEBUG] Booking status updated to: ${status} for ${booking.email}`);

    if (status === 'confirmed') {
      console.log(`[DEBUG] Triggering email dispatch for: ${booking.email}`);
      await sendBookingConfirmation(booking.email, {
        name: booking.name,
        service: booking.service,
        date: booking.date,
        time: booking.time
      });
    }

    return NextResponse.json({ success: true, booking });
  } catch (error) {
    console.error('Update Booking Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
