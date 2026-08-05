import Hero from "@/components/home/Hero";
import AboutPreview from "@/components/home/AboutPreview";
import ProductsSection from "@/components/home/ProductsSection";
import IndustriesSection from "@/components/home/IndustriesSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import MissionVision from "@/components/home/MissionVision";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <ProductsSection />
      <IndustriesSection />
      <WhyChooseUs />
      <MissionVision />
      <CTASection />
    </>
  );
}
