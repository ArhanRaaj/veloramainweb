"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function HytaleMultiplayerSection() {
  return (
    <div className="bg-gray-50 dark:bg-[#0a0b0f] relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex justify-center order-2 lg:order-1"
          >
            <Image
              src="/hytale/characters/hytale-archer.png"
              alt="Hytale character"
              width={380}
              height={400}
              className="object-contain w-full max-w-sm"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 orbitron-font uppercase leading-tight">
              Play <span className="text-[#1A7595]">Hytale</span> With Your Friends
            </h2>
            <p className="text-sm font-bold tracking-wide text-[#1A7595] mb-6 orbitron-font">
              ELEVATE YOUR MULTIPLAYER EXPERIENCE
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Whether you&apos;re embarking on an epic adventure through the zones of Orbis or competing
              in high-stakes minigames, playing with friends is at the heart of Hytale. With VeloraCloud
              hosting, you get low-latency servers designed to handle seamless world-building and
              combat, ensuring your community stays connected and your adventures never end.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
