'use client'
import VPSPricingSection from "../components/vps/VPSPricingSection"
import OSSelectionSection from "../components/vps/OSSelectionSection"
import PaymentMethodsStrip from "../components/PaymentMethodsStrip"
import VPSFAQSection from "../components/vps/VPSFAQSection"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar";
import PanelShowcase from "../components/PanelShowcase"
import { useLanguage } from "../contexts/LanguageContext"

export default function Home() {
  const { t } = useLanguage()
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0b0f] transition-colors duration-300">
      <Navbar />
      <div className="cloud-theme">
        <VPSPricingSection />
        <OSSelectionSection />
        <div className="bg-gray-50 dark:bg-[#0a0b0f] px-4 sm:px-6 lg:px-8 pb-16">
          <div className="max-w-7xl mx-auto">
            <PaymentMethodsStrip
              introText={t('common.paymentsIntro')}
              showLearnMoreLink
              learnMoreText={t('discord.paymentLink')}
            />
          </div>
        </div>
        <VPSFAQSection />
      </div>
      <PanelShowcase />
      <Footer />
    </div>
  )
}
