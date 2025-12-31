import { Navbar } from "@/app/components/landing/Navbar";
import { Hero } from "@/app/components/landing/Hero";
import { Features } from "@/app/components/landing/Features";
import { HowItWorks } from "@/app/components/landing/HowItWorks";
import { Pricing } from "@/app/components/landing/Pricing";
import { UseCases } from "@/app/components/landing/UseCases";
import { FinalCTA } from "@/app/components/landing/FinalCTA";
import { Footer } from "@/app/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <UseCases />
      <FinalCTA />
      <Footer />
    </>
  );
}
