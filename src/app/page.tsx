import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Gallery from "@/components/Gallery";
import BookingWizard from "@/components/BookingWizard";

export default function Home() {
  return (
    <main className="relative bg-bg-black min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Process />
      <Gallery />
      <BookingWizard />

      <footer className="py-20 border-t border-white/5 bg-black">
        <div className="container mx-auto px-6 flex flex-col items-center gap-10">
          <div className="text-3xl font-serif text-gold tracking-widest">PETROV</div>
          <div className="flex gap-8 text-[10px] uppercase tracking-widest text-platinum/40">
            <a href="#about" className="hover:text-gold transition-colors">About</a>
            <a href="#services" className="hover:text-gold transition-colors">Services</a>
            <a href="#gallery" className="hover:text-gold transition-colors">Gallery</a>
            <a href="#book" className="hover:text-gold transition-colors">Book Now</a>
          </div>
          <p className="text-gold/30 text-[9px] tracking-[0.4em] font-light mt-10">
            &copy; 2026 PETROV DETAILING. CRAFTED WITH PASSION.
          </p>
        </div>
      </footer>
    </main>
  );
}
