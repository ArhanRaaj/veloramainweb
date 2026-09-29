"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Cpu, MemoryStick, HardDrive, Archive, Network, Database } from "lucide-react"
import gamesConfig from "../../config/sections/games.json"
import type { GamesConfig, Game, GamePlan, GameLocation } from "../../types/games"
import { CurrencySelector, useCurrency } from "../ui/CurrencySelector"
import PlansComingSoon from "../ui/PlansComingSoon"
import { useLanguage } from "../../contexts/LanguageContext"

const config = gamesConfig as GamesConfig

type PlanTypeId = string

export default function BedrockPricingSection() {
  const { selectedCurrency, setSelectedCurrency, convertPrice } = useCurrency()
  const { t } = useLanguage()
  const [selectedPlanType, setSelectedPlanType] = useState<PlanTypeId>("budget")
  const [selectedLocation, setSelectedLocation] = useState<string>(config.locations[0]?.id || "")

  const game = config.games.find((g: Game) => g.id === "pocketmine")

  if (!game) {
    return null
  }

  // Processors offered for Bedrock (a processor can be limited to certain games via "games" in games.json).
  const visiblePlanTypes = config.planTypes.filter((pt) => !pt.games || pt.games.includes(game.id))

  // A processor tile is only clickable once real plans exist for it in games.json - Premium
  // is listed with an empty plans array, so it shows greyed out
  // and closed. Ryzen 7 5800X is switched back on for Bedrock even with an empty plans array
  // (it shows the "coming soon" panel below instead of plan cards until real plans are added).
  const hasPlans = (type: PlanTypeId) => (game.plans[type]?.length ?? 0) > 0
  const isOpenEvenWithoutPlans = (type: PlanTypeId) => type === "ryzen7"
  const locationSupports = (loc: GameLocation, type: PlanTypeId) =>
    loc.availablePlanTypes.includes(type) && (hasPlans(type) || isOpenEvenWithoutPlans(type))
  const isPlanTypeAvailable = (type: PlanTypeId) =>
    config.locations.some((loc) => locationSupports(loc, type))
  const isLocationAvailable = (loc: GameLocation) =>
    visiblePlanTypes.some((pt) => locationSupports(loc, pt.id))

  const handlePlanTypeSelection = (type: PlanTypeId) => {
    setSelectedPlanType(type)
    const currentLoc = config.locations.find((loc) => loc.id === selectedLocation)
    if (!currentLoc || !locationSupports(currentLoc, type)) {
      const compatible = config.locations.find((loc) => locationSupports(loc, type))
      if (compatible) setSelectedLocation(compatible.id)
    }
  }

  const handleLocationSelection = (locationId: string) => {
    setSelectedLocation(locationId)
    const newLoc = config.locations.find((loc) => loc.id === locationId)
    if (newLoc && !locationSupports(newLoc, selectedPlanType)) {
      const firstType = visiblePlanTypes.find((pt) => locationSupports(newLoc, pt.id))
      if (firstType) setSelectedPlanType(firstType.id)
    }
  }

  const plans = game.plans[selectedPlanType] || []
  const currentPlanTypeName = config.planTypes.find((pt) => pt.id === selectedPlanType)?.name || ""

  return (
    <div
      className="bg-gray-50 dark:bg-[#0a0b0f] relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ "--game-color": game.primaryColor } as React.CSSProperties}
    >
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url('${game.banner}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-gray-50/40 to-transparent dark:from-[#0a0b0f] dark:via-[#0a0b0f]/60 dark:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-gray-50/80 to-gray-50/40 dark:from-[#0a0b0f] dark:via-[#0a0b0f]/95 dark:to-[#0a0b0f]/60" />
      </div>

      <div className="relative z-10 mt-16 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-left mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
            <div className="flex-1">
              <div className="inline-flex items-left gap-2 bg-[var(--game-color)]/10 px-4 py-2 rounded-tl-xl rounded-br-xl mb-4">
                <span className="text-[var(--game-color)] text-sm">Bedrock Servers</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 orbitron-font">
                PocketMine <span className="text-[var(--game-color)]">Bedrock Plans</span>
              </h2>
              <p className="text-md text-gray-600 max-w-3xl dark:text-gray-300">
                Custom, plugin-ready servers for Minecraft: Bedrock Edition. Pick a spec below and deploy in under a minute.
              </p>
            </div>
            <CurrencySelector
              selectedCurrency={selectedCurrency}
              onCurrencyChange={setSelectedCurrency}
              className="w-full sm:w-64 mt-4 sm:mt-0"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6"
        >
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex flex-col">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">{t("gameServerList.step1")}</h3>
              <div className="flex flex-wrap gap-2">
                {visiblePlanTypes.map((type) => {
                  const isAvailable = isPlanTypeAvailable(type.id)
                  const isSelected = selectedPlanType === type.id

                  return (
                    <button
                      key={type.id}
                      onClick={() => handlePlanTypeSelection(type.id)}
                      disabled={!isAvailable}
                      className={`relative flex items-center gap-3 px-6 py-2 rounded-tl-xl rounded-br-xl font-medium transition-all duration-300 backdrop-blur-sm ${isSelected
                          ? "bg-[var(--game-color)]/10 border border-[var(--game-color)]/30 text-[var(--game-color)] shadow-lg backdrop-blur-sm"
                          : isAvailable
                            ? "bg-white/5 dark:bg-gray-800/20 border border-[var(--game-color)]/30 dark:border-white/10 text-gray-700 dark:text-gray-400 hover:bg-[radial-gradient(50%_50%_at_50%_100%,rgba(255,255,255,0.05)_0%,transparent_100%)] hover:border-[var(--game-color)]/30"
                            : "bg-white/5 dark:bg-gray-800/10 border border-gray-300/40 dark:border-gray-600/20 text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-50"
                        }`}
                    >
                      <Image
                        src={type.image || "/placeholder.svg"}
                        alt={type.name}
                        width={32}
                        height={32}
                        className={`rounded-md object-contain ${!isAvailable ? "opacity-50" : ""}`}
                      />
                      <span className="text-sm font-semibold">{type.name}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="flex flex-col">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">{t("gameServerList.step2")}</h3>
              <div className="flex flex-wrap gap-2">
                {config.locations.map((location: GameLocation) => {
                  const isAvailable = isLocationAvailable(location)
                  const isSelected = selectedLocation === location.id

                  return (
                    <button
                      key={location.id}
                      onClick={() => handleLocationSelection(location.id)}
                      disabled={!isAvailable}
                      className={`flex items-center gap-3 px-4 py-3 rounded-tl-xl rounded-br-xl font-medium transition-all duration-300 backdrop-blur-sm ${isSelected
                          ? "bg-[var(--game-color)]/10 border border-[var(--game-color)]/30 text-[var(--game-color)] shadow-lg backdrop-blur-sm"
                          : isAvailable
                            ? "bg-white/5 dark:bg-gray-800/20 border border-[var(--game-color)]/30 dark:border-white/10 text-gray-700 dark:text-gray-400 hover:bg-[radial-gradient(50%_50%_at_50%_100%,rgba(255,255,255,0.05)_0%,transparent_100%)] hover:border-[var(--game-color)]/30"
                            : "bg-white/5 dark:bg-gray-800/10 border border-gray-300/40 dark:border-gray-600/20 text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-50"
                        }`}
                    >
                      <Image
                        src={location.flag || "/placeholder.svg"}
                        alt={`${location.name} flag`}
                        width={24}
                        height={24}
                        className={`rounded-full object-cover ${!isAvailable ? "opacity-50" : ""}`}
                      />
                      <span className="text-sm font-medium">{location.name}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {plans.length === 0 && <PlansComingSoon cpuName={currentPlanTypeName} />}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {plans.map((plan: GamePlan, index: number) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
              className="bg-white dark:bg-gray-950/20 backdrop-blur-xl border border-[var(--game-color)]/20 hover:border-[var(--game-color)]/50 rounded-lg p-5 transition-all duration-300 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-10 h-10 rounded-lg flex-shrink-0">
                  <Image
                    src={plan.icon || game.icon || "/placeholder.svg"}
                    alt={plan.name}
                    fill
                    sizes="40px"
                    className="object-contain rounded-md"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white orbitron-font">{plan.name}</h3>
              </div>

              <div className="grid grid-cols-1 gap-2 mb-5 flex-1">
                <div className="border border-[var(--game-color)]/20 flex items-center justify-between px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-900/30">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-[var(--game-color)]" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">CPU</span>
                  </div>
                  <span className="text-sm font-medium text-[var(--game-color)]">{plan.cpu}</span>
                </div>
                <div className="border border-[var(--game-color)]/20 flex items-center justify-between px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-900/30">
                  <div className="flex items-center gap-2">
                    <MemoryStick className="w-4 h-4 text-[var(--game-color)]" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">RAM</span>
                  </div>
                  <span className="text-sm font-medium text-[var(--game-color)]">{plan.ram} DDR4</span>
                </div>
                <div className="border border-[var(--game-color)]/20 flex items-center justify-between px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-900/30">
                  <div className="flex items-center gap-2">
                    <HardDrive className="w-4 h-4 text-[var(--game-color)]" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">Storage</span>
                  </div>
                  <span className="text-sm font-medium text-[var(--game-color)]">{plan.storage} NVMe</span>
                </div>
                {plan.backups !== undefined && (
                  <div className="border border-[var(--game-color)]/20 flex items-center justify-between px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-900/30">
                    <div className="flex items-center gap-2">
                      <Archive className="w-4 h-4 text-[var(--game-color)]" />
                      <span className="text-xs text-gray-500 dark:text-gray-400">Backups</span>
                    </div>
                    <span className="text-sm font-medium text-[var(--game-color)]">{plan.backups}</span>
                  </div>
                )}
                {plan.ports !== undefined && (
                  <div className="border border-[var(--game-color)]/20 flex items-center justify-between px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-900/30">
                    <div className="flex items-center gap-2">
                      <Network className="w-4 h-4 text-[var(--game-color)]" />
                      <span className="text-xs text-gray-500 dark:text-gray-400">Ports</span>
                    </div>
                    <span className="text-sm font-medium text-[var(--game-color)]">{plan.ports}</span>
                  </div>
                )}
                {plan.databases !== undefined && (
                  <div className="border border-[var(--game-color)]/20 flex items-center justify-between px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-900/30">
                    <div className="flex items-center gap-2">
                      <Database className="w-4 h-4 text-[var(--game-color)]" />
                      <span className="text-xs text-gray-500 dark:text-gray-400">Databases</span>
                    </div>
                    <span className="text-sm font-medium text-[var(--game-color)]">{plan.databases}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between gap-3 pt-3 border-t border-[var(--game-color)]/10">
                <div className="text-lg font-bold text-[var(--game-color)] orbitron-font">
                  {selectedCurrency.code === "USD" && plan.priceUSD !== undefined
                    ? `${selectedCurrency.symbol}${plan.priceUSD.toFixed(2)}`
                    : convertPrice(`$${plan.price}`)}
                  <span className="text-xs font-normal text-gray-500 dark:text-gray-400"> /mo</span>
                </div>
                <a
                  href={plan.orderLink}
                  className="orbitron-font bg-[var(--game-color)] text-white px-5 py-2 rounded-lg text-sm font-medium transition-opacity duration-300 hover:opacity-90 flex items-center gap-2 no-underline"
                >
                  {t("common.orderNow")}
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
