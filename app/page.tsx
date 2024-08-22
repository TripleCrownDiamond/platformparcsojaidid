import Hero from "@/components/Hero/Hero";
import Features from "@/components/Features/Features";
import Cta from "@/components/Cta/Cta";
import Testimonials from "@/components/Testimonials/Testimonials";
import Contact from "@/components/Contact/Contact";
import About from "@/components/About/About";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <Features />
      <Cta />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
