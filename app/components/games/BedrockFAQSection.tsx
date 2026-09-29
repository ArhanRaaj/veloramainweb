"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { TbChevronUpRight, TbChevronDownRight } from "react-icons/tb"
import Image from "next/image"

interface FAQItem {
  question: string
  answer: string
}

const BEDROCK_FAQS: FAQItem[] = [
  {
    question: "What is PocketMine-MP?",
    answer:
      "PocketMine-MP is a custom, plugin-ready server software for Minecraft: Bedrock Edition, letting you run mods, plugins, and custom game modes on Bedrock the same way Spigot/Paper do on Java Edition.",
  },
  {
    question: "Can I install plugins on my Bedrock server?",
    answer:
      "Yes. Every plan supports installing PocketMine plugins directly from the panel, so you can add custom commands, minigames, economy systems, and more.",
  },
  {
    question: "Will this work with the regular Minecraft: Bedrock app?",
    answer:
      "Yes, players connect using the standard Minecraft: Bedrock Edition client on mobile, console, or Windows — no special client is required.",
  },
  {
    question: "Is PocketMine-MP still being developed?",
    answer:
      "PocketMine-MP's original project was officially archived in mid-2026. Existing setups continue to run fine on our hosting, but new upstream Bedrock version support is no longer being released by the maintainers.",
  },
  {
    question: "How much RAM do I need for a small Bedrock server?",
    answer:
      "For a handful of friends, the 2 GB plan is usually enough. Larger communities with more plugins or players should look at the 4–8 GB plans for smoother performance.",
  },
]

export default function BedrockFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="bg-gray-50 dark:bg-[#0a0b0f] relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="hidden md:block"
          >
            <motion.div
              animate={{ y: [0, -18, 0], rotate: [0, 3, 0, -3, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative h-[300px] md:h-[420px] w-full"
            >
              <Image
                src="/bedrock/pocketmine-sword.png"
                alt="Diamond sword"
                fill
                style={{ objectFit: "contain" }}
              />
            </motion.div>
          </motion.div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4 orbitron-font">
                Bedrock Hosting <span className="text-[#3B82F6]">FAQ</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
                Common questions about running a PocketMine-MP server with us
              </p>
            </motion.div>

            <div className="space-y-4">
              {BEDROCK_FAQS.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-900/5 backdrop-blur-sm border border-[#3B82F6]/20 rounded-md overflow-hidden hover:border-[#3B82F6]/50 transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full px-4 sm:px-3 py-3 sm:py-3 flex items-center text-left gap-2 sm:gap-4"
                  >
                    <span className="orbitron-font flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-md bg-[#3B82F6]/10 flex items-center justify-center text-[#3B82F6] text-sm sm:text-base">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    <span className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                      {faq.question}
                    </span>
                    {openIndex === index ? (
                      <TbChevronDownRight className="w-5 h-5 text-[#3B82F6] ml-auto flex-shrink-0" />
                    ) : (
                      <TbChevronUpRight className="w-5 h-5 text-[#3B82F6] ml-auto flex-shrink-0" />
                    )}
                  </button>
                  <div
                    className={`px-4 sm:px-6 transition-all duration-300 overflow-hidden ${
                      openIndex === index ? "pb-3 sm:pb-4 pl-[52px] sm:pl-[72px]" : "h-0"
                    }`}
                  >
                    <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">{faq.answer}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
