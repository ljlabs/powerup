import { useNavigate } from "react-router-dom";
import HeroSection from "../components/features/HeroSection";
import CategoryGrid from "../components/features/CategoryGrid";
import FeaturedSkillsGrid from "../components/features/FeaturedSkillsGrid";
import CTABanner from "../components/features/CTABanner";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div>
      <HeroSection onSearch={(q) => navigate(`/skills?q=${encodeURIComponent(q)}`)} />
      <CategoryGrid />
      <FeaturedSkillsGrid />
      <CTABanner />
    </div>
  );
}
