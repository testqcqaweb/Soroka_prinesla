import { AboutSection } from "@/components/portfolio/about-section";
import { ContactSection } from "@/components/portfolio/contact-section";
import { HeroSection } from "@/components/portfolio/hero-section";
import { ServicesSection } from "@/components/portfolio/services-section";
import { WorkSection } from "@/components/portfolio/work-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <WorkSection />
      <ServicesSection />
      <ContactSection />
    </>
  );
}
