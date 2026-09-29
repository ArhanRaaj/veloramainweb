"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { CheckCircle2, ArrowUpRight } from "lucide-react"

const CHECKLIST = [
  "Adventure RPG Mode",
  "Creative World Building",
  "Community Servers",
  "Scripting & Modding",
  "Cinematic Tools",
  "Competitive Minigames",
]

export default function HytaleAboutSection() {
  return (
    <div className="bg-gray-50 dark:bg-[#0a0b0f] relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6 orbitron-font">
              What is <span className="text-[#1A7595]">Hytale?</span>
            </h2>

            <div className="space-y-4 text-gray-600 dark:text-gray-300 text-md leading-relaxed mb-6">
              <p>
                Set out on an adventure built for both creation and play. Hytale blends the freedom of a
                sandbox with the momentum of an RPG: explore a procedurally generated world full of
                dungeons, secrets, and a variety of creatures, then shape it block by block.
              </p>
              <p>
                Jump in, make your mark, and help us grow this world together.{" "}
                <a
                  href="https://hytale.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#1A7595] hover:underline font-medium"
                >
                  Learn more
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 gap-x-6 gap-y-3">
              {CHECKLIST.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1A7595] flex-shrink-0" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4 justify-center lg:justify-start">
              <div>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1">Starting at</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl orbitron-font font-bold text-[#1A7595]">$0.37</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">/month</span>
                </div>
              </div>
              <Link
                href="/games?game=hytale"
                className="inline-flex items-center gap-2 bg-[#1A7595] hover:bg-[#155f79] text-white px-5 py-3 rounded-lg font-semibold orbitron-font text-sm transition-colors duration-300"
              >
                View Plans
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <Image
              src="/hytale/characters/hytale-mascot.png"
              alt="Hytale creature"
              width={420}
              height={340}
              className="object-contain w-full max-w-sm"
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
