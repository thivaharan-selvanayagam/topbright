import SmokeCanvas from "@/sections/home/SmokeCanvas";
import HeroSection from "@/sections/home/HeroSection";
import HighlightsSection from "@/sections/home/HighlightsSection";
import WhyChooseUsSection from "@/sections/home/WhyChooseUsSection";
import PlatformFeaturesSection from "@/sections/home/PlatformFeaturesSection";
import HowItWorksSection from "@/sections/home/HowItWorksSection";
import HallOfFameSection from "@/sections/home/HallOfFameSection";
import TestimonialsSection from "@/sections/home/TestimonialsSection";
import StudyVaultSection from "@/sections/home/StudyVaultSection";
import ForParentsSection from "@/sections/home/ForParentsSection";
import FaqSection from "@/sections/home/FaqSection";
import CtaSection from "@/sections/home/CtaSection";
import WhatWeOfferSection from "@/sections/home/WhatWeOfferSection";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden bg-slate-50 text-slate-900">
      <SmokeCanvas />
      <HeroSection />
      <HighlightsSection />
      <WhatWeOfferSection/>
      <WhyChooseUsSection />
      <PlatformFeaturesSection />
      <HowItWorksSection />
      <HallOfFameSection />
      <TestimonialsSection />
      <StudyVaultSection />
      <ForParentsSection />
      <FaqSection />
      <CtaSection />
    </div>
  );
}