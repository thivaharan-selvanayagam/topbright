import type { Metadata } from "next";
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
import { faqs } from "@/data/faqs";
import CtaSection from "@/sections/home/CtaSection";
import WhatWeOfferSection from "@/sections/home/WhatWeOfferSection";
import AcademicRoadmapSection from "@/sections/home/AcademicRoadmapSection";

export const metadata: Metadata = {
  title: "TopBright ICT Academy | Premier Online & Physical ICT Classes | Grades 6–13",
  description:
    "TopBright ICT Academy provides premier online & physical ICT classes in Sri Lanka for Grades 6–13 with live sessions, past papers, and auto-marked exams.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <div className="relative overflow-hidden bg-slate-50 text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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
      <AcademicRoadmapSection/>
      <FaqSection />
      <CtaSection />
    </div>
  );
}