import Hero from "@/components/Hero/Hero";
import Features from "@/components/Features/Features";
import Cta from "@/components/Cta/Cta";
import Testimonials from "@/components/Testimonials/Testimonials";
import Contact from "@/components/Contact/Contact";
import About from "@/components/About/About";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Hero />
        <About />
        <Features />
        <Cta />
        <Testimonials />
        <Contact />
      </main>
    </div>
  );
}
