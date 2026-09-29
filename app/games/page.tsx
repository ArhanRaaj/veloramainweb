import GameServerListWrapper from '../components/games/GameServerListWrapper';
import Footer from "../components/Footer"
import Navbar from "../components/Navbar";
import PanelShowcase from "../components/PanelShowcase"

export default function GamesPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0b0f] transition-colors duration-300">
      <Navbar />
      <GameServerListWrapper />
      <PanelShowcase />
      <Footer />
    </div>
  );
}
