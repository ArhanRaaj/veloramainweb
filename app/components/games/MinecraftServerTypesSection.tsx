"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { CheckCircle2 } from "lucide-react"
import MinecraftSoftwareLogosStrip from "./MinecraftSoftwareLogosStrip"

const CHECKLIST = [
  "Java + Bedrock",
  "Plugins & Mods",
  "Modpacks",
  "Cross-Platform",
  "Easy Software Switching",
  "GeyserMC Cross-Play",
]

export default function MinecraftServerTypesSection() {
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
              What Types Of Minecraft Servers Can I Run?
            </h2>

            <div className="space-y-4 text-gray-600 dark:text-gray-300 text-md leading-relaxed mb-6">
              <p>
                We support a wide range of Minecraft server types for both{" "}
                <strong className="text-gray-900 dark:text-white">Minecraft Java Edition</strong> and{" "}
                <strong className="text-gray-900 dark:text-white">Minecraft Bedrock Edition</strong>, also
                known as Pocket Edition or Windows Edition.
              </p>
              <p>
                Using our Game Panel, you can easily install and switch between server software such as{" "}
                <strong className="text-gray-900 dark:text-white">
                  Vanilla, Paper, CraftBukkit, Forge, Fabric, Spigot, and Sponge
                </strong>
                , along with performance-focused forks like{" "}
                <strong className="text-gray-900 dark:text-white">Purpur, Pufferfish, and Folia</strong>.
                Proxy and network software including{" "}
                <strong className="text-gray-900 dark:text-white">Velocity, BungeeCord, and Waterfall</strong>{" "}
                are also supported.
              </p>
              <p>
                For Bedrock Edition, we support{" "}
                <strong className="text-gray-900 dark:text-white">
                  Bedrock Dedicated Server, PocketMine-MP, and NukkitMP
                </strong>
                , enabling cross-platform play across mobile, console, and Windows devices. Java and
                Bedrock players can also play together simultaneously using the{" "}
                <strong className="text-gray-900 dark:text-white">GeyserMC</strong> plugin.
              </p>
              <p className="italic text-gray-500 dark:text-gray-400 text-sm">
                All server types and software versions can be changed at any time directly from the panel
                in a single click.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3">
              {CHECKLIST.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4CAF50] flex-shrink-0" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                </div>
              ))}
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
              src="/minecraft/minecraft-server-types.png"
              alt="Minecraft characters"
              width={420}
              height={420}
              className="object-contain w-full max-w-sm"
            />
          </motion.div>
        </div>

        <MinecraftSoftwareLogosStrip />
      </div>
    </div>
  )
}
