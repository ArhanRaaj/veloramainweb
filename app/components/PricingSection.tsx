"use client"

import { Check, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useCurrency } from "./ui/CurrencySelector"
import pricingConfig from "../config/sections/pricing.json"
import type { PricingConfig } from "../types/pricing"
import { useLanguage } from "../contexts/LanguageContext"

const config = pricingConfig as PricingConfig

// Home page shows only the three game plans, in this order. The other plans
// (Discord bots, VPS) stay in pricing.json and are linked below the cards.
const FEATURED = [
  "pricingPlans.minecraftServers.title",
  "pricingPlans.bedrockServers.title",
  "pricingPlans.hytaleServers.title",
]

export default function PricingSection() {
  const { t } = useLanguage()
  const { convertPrice } = useCurrency()

  const plans = FEATURED.map((key) => config.section.plans.find((p) => p.titleKey === key)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p)
  )
  const otherPlans = config.section.plans.filter((p) => !FEATURED.includes(p.titleKey))

  return (
    <section className="bg-gray-50 dark:bg-[#0a0b0f] py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3 orbitron-font">
            {t("pricingSection.title")}{" "}
            <span className="icon-text-primary">{t("pricingSection.titleHighlight")}</span>
          </h2>
          <p className="text-sm sm:text-base max-w-xl mx-auto text-gray-600 dark:text-gray-300">
            {t("pricingSection.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.titleKey}
              className="flex flex-col bg-white dark:bg-gray-950/40 border border-secondary rounded-md p-6 transition-colors duration-300 hover:hover-gradient"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white orbitron-font mb-1">
                {t(plan.titleKey)}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-5">{t(plan.descriptionKey)}</p>

              <div className="mb-5">
                <span className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Starting at</span>
                <span className="text-3xl orbitron-font font-bold text-gray-900 dark:text-white">
                  {convertPrice(plan.basePrice.toString())}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">/month</span>
              </div>

              <ul className="space-y-2 mb-6 flex-1">
                {plan.featuresKeys.slice(0, 3).map((featureKey) => (
                  <li key={featureKey} className="flex items-center gap-3">
                    <Check className="w-4 h-4 icon-text-primary flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300 text-sm">{t(featureKey)}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.link}
                className="w-full py-3 px-6 rounded-lg font-semibold flex items-center justify-between group button-primary text-button-primary border border-transparent transition-colors duration-300 hover:bg-[var(--hover-gradient)] hover:text-[var(--icon-text-primary)] hover:border-[var(--border-secondary)]"
              >
                <span className="w-full orbitron-font text-center">{t(plan.buttonTextKey)}</span>
                <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>

        {otherPlans.length > 0 && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm">
            {otherPlans.map((plan) => (
              <Link
                key={plan.titleKey}
                href={plan.link}
                className="text-gray-600 dark:text-gray-400 hover:text-icon-text-primary transition-colors duration-300"
              >
                {t(plan.titleKey)} · {convertPrice(plan.basePrice.toString())}/month
              </Link>
            ))}
          </div>
        )}

        <p className="text-center mt-8 orbitron-font text-gray-600 dark:text-gray-400 text-sm">
          {t("pricingSection.footerText")}{" "}
          <a
            href="https://billing.veloracloud.space"
            className="icon-text-primary hover:opacity-80 cursor-pointer"
          >
            {t("pricingSection.footerLinkText")}
          </a>
        </p>
      </div>
    </section>
  )
}
