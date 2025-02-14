import Hero from "@/components/Hero";
import Services from "@/components/Services";
import RegionalExpertise from "@/components/RegionalExpertise";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <RegionalExpertise />
      <Testimonials />
      <Contact />
    </main>
  );
}
