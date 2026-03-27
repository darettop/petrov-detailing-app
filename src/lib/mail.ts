import nodemailer from 'nodemailer';

/**
 * PETROV DETAILING - Automated Email Dispatcher (V2 Professional)
 */

async function getTransporter() {
  // Check if Production SMTP is configured
  if (process.env.SMTP_USER && process.env.SMTP_PASSWORD) {
    const port = parseInt(process.env.SMTP_PORT || "587");
    console.log(`[MAIL] Initializing PRODUCTION SMTP Transport (${process.env.SMTP_HOST}:${port})`);
    
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: port,
      secure: port === 465, // True for 465 (SSL), false for 587 (TLS)
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  // Fallback to Development (Ethereal)
  console.log(`[MAIL] No SMTP credentials found. Initializing TEST (Ethereal) mode.`);
  const testAccount = await nodemailer.createTestAccount();
  return nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
}

export async function sendBookingConfirmation(email: string, details: {
  name: string;
  service: string;
  date: string;
  time: string;
}) {
  try {
    const transporter = await getTransporter();

    const htmlContent = `
      <div style="font-family: 'Playfair Display', serif; background-color: #0a0a0a; color: #e8e8e8; padding: 60px; line-height: 1.6;">
        <div style="max-width: 600px; margin: 0 auto; border: 1px solid #c9a84c20; padding: 40px; background: #0c0c0c;">
          <h1 style="color: #c9a84c; text-transform: uppercase; letter-spacing: 5px; text-align: center; font-weight: normal; margin-bottom: 40px;">
            PETROV
          </h1>
          <p style="font-size: 18px; margin-bottom: 30px;">Dear ${details.name},</p>
          <p style="margin-bottom: 30px;">Your pursuit of automotive perfection has been acknowledged. We are pleased to confirm your appointment at our studio.</p>
          <div style="background: #111; padding: 30px; border-left: 2px solid #c9a84c; margin-bottom: 40px;">
            <p style="margin: 10px 0;"><strong>Treatment:</strong> ${details.service}</p>
            <p style="margin: 10px 0;"><strong>Date:</strong> ${details.date}</p>
            <p style="margin: 10px 0;"><strong>Arrival:</strong> ${details.time}</p>
          </div>
          <p style="text-align: center; font-size: 10px; color: #c9a84c; opacity: 0.5; text-transform: uppercase;">
            Where Perfection Meets Passion
          </p>
        </div>
      </div>
    `;

    const info = await transporter.sendMail({
      from: process.env.FROM_EMAIL || '"Petrov Detailing" <reservations@petrovdetailing.com>',
      to: email,
      subject: "PETROV | Appointment Confirmed",
      html: htmlContent,
    });

    console.log('----------------------------------------------------');
    console.log(`[MAIL] Dispatching confirmation to: ${email}`);
    if (!process.env.SMTP_USER) {
      console.log(`[MAIL] Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
    } else {
      console.log(`[MAIL] Sent successfully via SMTP`);
    }
    console.log('----------------------------------------------------');

    return true;
  } catch (error) {
    console.error('Email Dispatch Error:', error);
    return false;
  }
}
