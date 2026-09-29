"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

// Minecraft server software logos — cleanly cut out, no boxes or labels,
// styled the same way as PaymentMethodsStrip.
const SOFTWARE_LOGOS = [
    { key: "vanilla", label: "Vanilla", logo: "/minecraft/software/vanilla.png" },
    { key: "paper", label: "Paper", logo: "/minecraft/software/paper.png" },
    { key: "forge", label: "Forge", logo: "/minecraft/software/forge.png" },
    { key: "velocity", label: "Velocity", logo: "/minecraft/software/velocity.png" },
    { key: "bungeecord", label: "BungeeCord", logo: "/minecraft/software/bungeecord.png" },
    { key: "pufferfish", label: "Pufferfish", logo: "/minecraft/software/pufferfish.png" },
    { key: "purpur", label: "Purpur", logo: "/minecraft/software/purpur.png" },
    { key: "bedrock", label: "Bedrock", logo: "/minecraft/software/bedrock.png" },
    { key: "fabric", label: "Fabric", logo: "/minecraft/software/fabric.png" },
    { key: "neoforge", label: "NeoForge", logo: "/minecraft/software/neoforge.png" },
    { key: "leaves", label: "Leaves", logo: "/minecraft/software/leaves.png" },
]

// Duplicate for a seamless infinite scroll loop.
const ITEMS = [...SOFTWARE_LOGOS, ...SOFTWARE_LOGOS, ...SOFTWARE_LOGOS]

export default function MinecraftSoftwareLogosStrip() {
    const ref = useRef<HTMLDivElement>(null)
    const [inView, setInView] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.1 })
        io.observe(el)
        return () => io.disconnect()
    }, [])

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mt-14 relative py-4 overflow-hidden bg-transparent"
        >
            {/* Left / right edge fade — swaps per theme */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10 bg-gradient-to-r from-gray-50 dark:from-[#0a0b0f] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10 bg-gradient-to-l from-gray-50 dark:from-[#0a0b0f] to-transparent" />

            <div
                className="flex items-center gap-24 will-change-transform"
                style={{
                    // Pause the animation off-screen to save GPU cycles.
                    animation: inView ? "scroll 60s linear infinite" : "none",
                    width: "max-content",
                }}
            >
                {ITEMS.map((m, i) => (
                    <div
                        key={`${m.key}-${i}`}
                        className="flex items-center justify-center flex-shrink-0 select-none opacity-80 hover:opacity-100 transition-opacity duration-300"
                        title={m.label}
                    >
                        <Image
                            src={m.logo}
                            alt={m.label}
                            width={100}
                            height={100}
                            className="h-[100px] w-auto max-w-[100px] object-contain"
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>
        </motion.div>
    )
}
