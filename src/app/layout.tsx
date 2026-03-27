import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/Cursor";
import { cn } from "@/lib/utils";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-sans" 
});

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-serif",
  style: ["normal", "italic"]
});

export const metadata: Metadata = {
  title: "PETROV | Ultra-Luxury Car Detailing",
  description: "Where Perfection Meets Passion. Luxury Car Detailing & Deep Cleaning — Crafted by Hand, Finished to Perfection.",
};

import AuthProvider from "@/components/AuthProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(inter.variable, playfair.variable, "dark")}>
      <body className="bg-bg-black text-platinum selection:bg-gold/30 selection:text-gold antialiased">
        <AuthProvider>
          <Cursor />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
