"use client"

import { motion } from "framer-motion"
import { Clock, ArrowUpRight } from "lucide-react"

/**
 * Shown in place of the plan cards when a processor has no plans yet.
 * Add plans to that processor in the config (games.json / vps.json) and this
 * panel is replaced by the normal plan cards automatically.
 */
export default function PlansComingSoon({ cpuName }: { cpuName: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center gap-3 text-center rounded-xl border border-dashed border-[var(--game-color,#2B7FFF)]/40 bg-white/10 dark:bg-gray-900/20 backdrop-blur-sm px-6 py-12"
    >
      <Clock className="w-8 h-8 text-[var(--game-color,#2B7FFF)]" />
      <h3 className="text-xl font-bold text-gray-900 dark:text-white orbitron-font">
        {cpuName} plans are coming soon
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md">
        We&apos;re getting these servers ready. Join our Discord to be the first to know when they launch.
      </p>
      <a
        href="https://discord.gg/rxhy4j7Xrh"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-sm font-medium text-[var(--game-color,#2B7FFF)] hover:underline"
      >
        Join our Discord
        <ArrowUpRight className="w-4 h-4" />
      </a>
    </motion.div>
  )
}
