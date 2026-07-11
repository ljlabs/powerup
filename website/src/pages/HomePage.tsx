import HeroSection from "../components/features/HeroSection";
import CategoryGrid from "../components/features/CategoryGrid";
import FeaturedSkillsGrid from "../components/features/FeaturedSkillsGrid";
import CTABanner from "../components/features/CTABanner";

export default function HomePage() {
  return (
    <div>
      <HeroSection onSearch={(q) => console.log("search:", q)} />
      <CategoryGrid />
      <FeaturedSkillsGrid onAdd={(id) => console.log("add:", id)} />
      <CTABanner />
    </div>
  );
}