"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "../../contexts/LanguageContext"

export default function MinecraftHostingCTASection() {
  const { t } = useLanguage()

  const features = [
    t("minecraftCta.feature1"),
    t("minecraftCta.feature2"),
    t("minecraftCta.feature3"),
    t("minecraftCta.feature4"),
    t("minecraftCta.feature5"),
  ]

  const scrollToPlans = () => {
    document.getElementById("minecraft-plans")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="relative bg-gray-50 dark:bg-[#0a0b0f] py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex justify-center order-2 lg:order-1"
          >
            <div className="relative w-full max-w-xs aspect-[3/4]">
              <Image
                src="/minecraft/cta-hero.webp"
                alt="Minecraft character"
                fill
                sizes="(max-width: 768px) 80vw, 320px"
                className="object-contain"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 orbitron-font">
              {t("minecraftCta.title")}{" "}
              <span className="text-[#4CAF50]">{t("minecraftCta.titleHighlight")}</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">{t("minecraftCta.description")}</p>

            <div className="space-y-3 mb-8">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 bg-white/40 dark:bg-gray-900/30 backdrop-blur-sm border border-[#4CAF50]/20 dark:border-[#4CAF50]/20 rounded-lg px-4 py-3"
                >
                  <span className="flex-shrink-0 text-xs font-bold text-[#4CAF50] bg-[#4CAF50]/10 dark:bg-[#4CAF50]/20 rounded-md px-2 py-1 orbitron-font">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm text-gray-700 dark:text-gray-200">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={scrollToPlans}
                className="orbitron-font px-6 py-3 rounded-lg font-medium bg-[#4CAF50] hover:bg-[#429646] text-white transition-colors duration-300"
              >
                {t("minecraftCta.viewPlans")}
              </button>
              <Link
                href="/"
                className="orbitron-font px-6 py-3 rounded-lg font-medium border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors duration-300"
              >
                {t("minecraftCta.backHome")}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
