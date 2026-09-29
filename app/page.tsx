'use client'
import HeroSection from "./components/HeroSection"
import FeaturesSection from "./components/FeaturesSection"
import PanelShowcase from "./components/PanelShowcase"
import LocationsSection from "./components/LocationsSection"
import PricingSection from "./components/PricingSection"
import PaymentMethodsStrip from "./components/PaymentMethodsStrip"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import { useLanguage } from "./contexts/LanguageContext"

export default function Home() {
  const { t } = useLanguage()
  return (
    <div className="main-theme min-h-screen bg-gray-50 dark:bg-[#0a0b0f] transition-colors duration-300">
      <Navbar />
        <HeroSection />
        <FeaturesSection />
        <LocationsSection />
        <PricingSection />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PaymentMethodsStrip introText={t('common.paymentsIntro')} />
        </div>
        <PanelShowcase />
        <Footer />
    </div>
  )
}

// hey smexy, i love you bb :0-