import HeroSection from "@/components/HeroSection";
import ServicesOverview from "@/components/ServicesOverview";
import TestimonialsSection from "@/components/TestimonialsSection";
import GuaranteeSection from "@/components/GuaranteeSection";
import HowItWorks from "@/components/HowItWorks";
import StatsSection from "@/components/StatsSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <StatsSection />
      <ServicesOverview />
      <HowItWorks />
      <TestimonialsSection />
      <GuaranteeSection />
    </div>
  );
}
