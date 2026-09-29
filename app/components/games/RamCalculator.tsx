"use client"

import type React from "react"
import { useMemo, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Box, Zap, Layers, Smartphone, Minus, Plus, ChevronRight, Sparkles } from "lucide-react"
import type { Game, GamePlan } from "../../types/games"
import type { Currency } from "../../types/ui"

interface ServerTypeOption {
  id: string
  label: string
  sub: string
  icon: React.ElementType
  allowsPlugins: boolean
}

interface GameMeta {
  versions: { id: string; label: string }[]
  serverTypes: ServerTypeOption[]
  baseRam: number
  ramPerPlayer: number
  description: string
}

const GAME_META: Record<string, GameMeta> = {
  minecraft: {
    versions: [
      { id: "1.21", label: "Minecraft 1.21+" },
      { id: "1.20", label: "Minecraft 1.20.x" },
      { id: "1.19", label: "Minecraft 1.19.x & Older" },
    ],
    serverTypes: [
      { id: "vanilla", label: "Vanilla", sub: "JAVA EDITION", icon: Box, allowsPlugins: false },
      { id: "optimized", label: "Optimized", sub: "PAPER, PURPUR", icon: Zap, allowsPlugins: true },
      { id: "modded", label: "Modded", sub: "FORGE, FABRIC", icon: Layers, allowsPlugins: true },
      { id: "bedrock", label: "Bedrock", sub: "BEDROCK EDITION", icon: Smartphone, allowsPlugins: false },
    ],
    baseRam: 2,
    ramPerPlayer: 0.12,
    description: "The ideal choice for a smooth, lag-free world.",
  },
  hytale: {
    versions: [
      { id: "latest", label: "Hytale - Latest Update" },
    ],
    serverTypes: [
      { id: "vanilla", label: "Vanilla", sub: "OFFICIAL", icon: Box, allowsPlugins: false },
      { id: "modded", label: "Modded", sub: "MODS & PLUGINS", icon: Layers, allowsPlugins: true },
      { id: "creative", label: "Creative", sub: "BUILD MODE", icon: Sparkles, allowsPlugins: true },
    ],
    baseRam: 2,
    ramPerPlayer: 0.15,
    description: "The ideal choice for a smooth voxel adventure with your friends.",
  },
}

function parseRam(ram: string): number {
  const match = ram.match(/[\d.]+/)
  return match ? parseFloat(match[0]) : 0
}

interface RamCalculatorProps {
  game: Game
  planType: string
  selectedCurrency: Currency
  convertPrice: (price: string) => string
}

export default function RamCalculator({ game, planType, selectedCurrency, convertPrice }: RamCalculatorProps) {
  const meta = GAME_META[game.id]
  const [version, setVersion] = useState(meta?.versions[0]?.id || "")
  const [serverType, setServerType] = useState(meta?.serverTypes[0]?.id || "")
  const [players, setPlayers] = useState(2)
  const [plugins, setPlugins] = useState(0)
  const [optimization, setOptimization] = useState(false)

  const currentType = meta?.serverTypes.find((t) => t.id === serverType) || meta?.serverTypes[0]
  const pluginsEnabled = currentType?.allowsPlugins ?? false

  const recommendedRam = useMemo(() => {
    if (!meta || !currentType) return 0
    let ram = meta.baseRam + players * meta.ramPerPlayer
    if (currentType.id === "modded") ram += 2
    if (currentType.id === "optimized" || currentType.id === "pve") ram += 0.75
    if (pluginsEnabled) ram += plugins * 0.15
    if (!optimization) ram *= 1.15
    return Math.max(meta.baseRam, ram)
  }, [meta, players, currentType, plugins, pluginsEnabled, optimization])

  // must come after every hook above (hooks can't run conditionally)
  if (!meta || !currentType) return null

  const plans = game.plans[planType] || []
  const recommendedPlan: GamePlan | undefined =
    plans.slice().sort((a, b) => parseRam(a.ram) - parseRam(b.ram)).find((p) => parseRam(p.ram) >= recommendedRam) ||
    plans.slice().sort((a, b) => parseRam(b.ram) - parseRam(a.ram))[0]

  const accent = game.primaryColor || "#2B7FFF"

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      style={{ "--game-color": accent } as React.CSSProperties}
      className="mt-10 rounded-2xl border border-white/10 bg-black overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px]">
        {/* Left: Controls */}
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-5 h-5 text-[var(--game-color)]" />
            <h3 className="orbitron-font text-2xl font-bold text-white">RAM Calculator</h3>
          </div>
          <p className="text-sm text-gray-400 mb-6">
            Configure your server requirements to find the{" "}
            <span className="text-[var(--game-color)] font-medium">
              {recommendedPlan?.name || "right"}
            </span>{" "}
            recommendation.
          </p>

          <div className="mb-6">
            <label className="block text-xs font-semibold tracking-wider text-gray-400 mb-2">
              {game.id === "minecraft" ? "MINECRAFT VERSION" : "GAME VERSION"}
            </label>
            <div className="relative">
              <select
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                className="w-full appearance-none bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[var(--game-color)]/60 transition-colors"
              >
                {meta.versions.map((v) => (
                  <option key={v.id} value={v.id} className="bg-[#0a0b0f]">
                    {v.label}
                  </option>
                ))}
              </select>
              <ChevronRight className="w-4 h-4 text-gray-500 rotate-90 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-xs font-semibold tracking-wider text-gray-400 mb-2">SERVER TYPE</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {meta.serverTypes.map((type) => {
                const Icon = type.icon
                const isSelected = type.id === serverType
                return (
                  <button
                    key={type.id}
                    onClick={() => setServerType(type.id)}
                    className={`flex flex-col items-center justify-center gap-2 rounded-lg border px-3 py-4 text-center transition-all duration-200 ${
                      isSelected
                        ? "border-[var(--game-color)] bg-[var(--game-color)]/10"
                        : "border-white/10 bg-white/5 hover:border-white/20"
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isSelected ? "text-[var(--game-color)]" : "text-gray-400"}`} />
                    <div>
                      <div className={`text-sm font-semibold ${isSelected ? "text-white" : "text-gray-300"}`}>
                        {type.label}
                      </div>
                      <div className="text-[10px] tracking-wide text-gray-500">{type.sub}</div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold tracking-wider text-gray-400">EXPECTED ACTIVE PLAYERS</label>
              <span className="text-[var(--game-color)] font-bold text-sm">{players}+</span>
            </div>
            <input
              type="range"
              min={2}
              max={100}
              value={players}
              onChange={(e) => setPlayers(Number(e.target.value))}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-white/10 accent-[var(--game-color)]"
              style={{ accentColor: accent }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className={!pluginsEnabled ? "opacity-40 pointer-events-none" : ""}>
              <label className="block text-xs font-semibold tracking-wider text-gray-400 mb-2">
                PLUGINS
              </label>
              <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-lg px-2 py-2">
                <button
                  onClick={() => setPlugins((p) => Math.max(0, p - 1))}
                  className="w-8 h-8 flex items-center justify-center rounded-md text-gray-300 hover:bg-white/10"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-white text-sm font-medium">{plugins}</span>
                <button
                  onClick={() => setPlugins((p) => Math.min(50, p + 1))}
                  className="w-8 h-8 flex items-center justify-center rounded-md text-gray-300 hover:bg-white/10"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className={!pluginsEnabled ? "opacity-40 pointer-events-none" : ""}>
              <label className="block text-xs font-semibold tracking-wider text-gray-400 mb-2">PERFORMANCE</label>
              <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-lg px-4 py-2.5">
                <span className="text-xs text-gray-400 tracking-wide">OPTIMIZATION</span>
                <button
                  onClick={() => setOptimization((o) => !o)}
                  className={`relative w-10 h-5 rounded-full transition-colors ${
                    optimization ? "bg-[var(--game-color)]" : "bg-white/20"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                      optimization ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Recommendation */}
        <div className="relative bg-black border-t lg:border-t-0 lg:border-l border-white/10 p-6 sm:p-8 flex flex-col items-center text-center">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-[var(--game-color)]" />

          <div className="inline-flex items-center gap-1.5 border border-[var(--game-color)]/40 text-[var(--game-color)] text-[10px] font-semibold tracking-wider px-3 py-1 rounded-full mb-6 mt-2">
            WE RECOMMEND
          </div>

          {recommendedPlan?.icon ? (
            <div className="relative w-20 h-20 mb-4" style={{ imageRendering: "pixelated" }}>
              <Image src={recommendedPlan.icon} alt={recommendedPlan.name} fill className="object-contain drop-shadow-[0_0_25px_var(--game-color)]" />
            </div>
          ) : (
            <div className="relative w-20 h-20 mb-4">
              <Image src={game.icon} alt={game.name} fill className="object-contain rounded-lg" />
            </div>
          )}

          <h4 className="orbitron-font text-xl font-bold text-white mb-2 uppercase">
            {recommendedPlan?.name || "Custom Plan"}
          </h4>

          <div className="inline-flex items-center border border-[var(--game-color)]/40 text-[var(--game-color)] text-xs font-semibold px-3 py-1 rounded-full mb-4">
            {recommendedPlan?.ram || `${Math.ceil(recommendedRam)} GB`} RAM
          </div>

          <p className="text-sm text-gray-400 mb-6 max-w-[240px]">{meta.description}</p>

          <div className="mb-6">
            <div className="text-[10px] tracking-wider text-gray-500 mb-1">STARTING AT</div>
            <div className="flex items-baseline justify-center gap-1">
              <span className="orbitron-font text-3xl font-bold text-white">
                {recommendedPlan
                  ? selectedCurrency.code === "USD" && recommendedPlan.priceUSD !== undefined
                    ? `${selectedCurrency.symbol}${recommendedPlan.priceUSD.toFixed(2)}`
                    : convertPrice(`$${recommendedPlan.price}`)
                  : "--"}
              </span>
              <span className="text-gray-500 text-sm">/mo</span>
            </div>
          </div>

          <a
            href={recommendedPlan?.orderLink || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="orbitron-font w-full bg-[var(--game-color)] hover:opacity-90 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2"
          >
            DEPLOY NOW
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  )
}
