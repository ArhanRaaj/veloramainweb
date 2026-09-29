'use client'
import BedrockPricingSection from "../components/games/BedrockPricingSection"
import BedrockFAQSection from "../components/games/BedrockFAQSection"
import PaymentMethodsStrip from "../components/PaymentMethodsStrip"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import PanelShowcase from "../components/PanelShowcase"
import { useLanguage } from "../contexts/LanguageContext"

export default function BedrockPage() {
  const { t } = useLanguage()
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0b0f] transition-colors duration-300">
      <Navbar />
      <BedrockPricingSection />
      <BedrockFAQSection />
      <div className="bg-gray-50 dark:bg-[#0a0b0f] px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <PaymentMethodsStrip
            introText={t('common.paymentsIntro')}
            showLearnMoreLink
            learnMoreText={t('discord.paymentLink')}
          />
        </div>
      </div>
      <PanelShowcase />
      <Footer />
    </div>
  )
}
