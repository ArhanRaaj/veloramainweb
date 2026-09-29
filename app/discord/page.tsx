import DiscordPricingSection from '../components/discord/DiscordPricingSection';
import DiscordTechStackSection from '../components/discord/DiscordTechStackSection';
import DiscordExpertTeamSection from '../components/discord/DiscordExpertTeamSection';
import Footer from "../components/Footer"
import Navbar from "../components/Navbar";
import PanelShowcase from "../components/PanelShowcase"

export default function DiscordPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0b0f] transition-colors duration-300">
      <Navbar />
      <DiscordPricingSection />
      <DiscordTechStackSection />
      <DiscordExpertTeamSection />
      <PanelShowcase />
      <Footer />
    </div>
  );
}
