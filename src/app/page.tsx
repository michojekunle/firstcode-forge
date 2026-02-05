import { HeroSection } from "@/components/landing/hero-section";
import { ConceptSection } from "@/components/landing/concept-section";
import { CoursesSection } from "@/components/landing/courses-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { CTASection } from "@/components/landing/cta-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CoursesSection />
      <ConceptSection />
      <FeaturesSection />
      <CTASection />
    </>
  );
}
