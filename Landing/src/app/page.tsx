import "swiper/css";
import Hero from "@/components/sections/hero";
import ProjectScreenshot from "@/components/sections/project-screenshot";
import WhatIs from "@/components/sections/what-is";
import CheckSection from "@/components/sections/check-section";
import AdvantageSection from "@/components/sections/advantage-section";
import HowItWorks from "@/components/sections/how-it-works";
import DecentralizedProtocol from "@/components/sections/decentralized-protocol";
import Faq from "@/components/sections/faq";
import ReadyToPlay from "@/components/sections/ready-to-play";

export default function Home() {
  return (
    <main>
      <Hero />
      <ProjectScreenshot />
      <WhatIs />
      <CheckSection />
      <AdvantageSection />
      <HowItWorks />
      <DecentralizedProtocol />
      <Faq />
      <ReadyToPlay />
    </main>
  );
}
