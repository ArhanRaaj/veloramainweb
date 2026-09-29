"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useLanguage } from "../../contexts/LanguageContext"

const TECH_STACK = [
    { key: "nodejs", label: "Node.js", logo: "/discord/techstack/nodejs.svg" },
    { key: "python", label: "Python", logo: "/discord/techstack/python.png" },
    { key: "java", label: "Java", logo: "/discord/techstack/java.png" },
    { key: "discordjs", label: "Discord.js", logo: "/discord/techstack/discordjs.png" },
    { key: "lavalink", label: "Lavalink", logo: "/discord/techstack/lavalink.png" },
    { key: "go", label: "Go", logo: "/discord/techstack/go.svg" },
    { key: "typescript", label: "TypeScript", logo: "/discord/techstack/typescript.png" },
    { key: "telegram", label: "Telegram", logo: "/discord/techstack/telegram.png" },
    { key: "deno", label: "Deno", logo: "/discord/techstack/deno.png" },
    { key: "discord", label: "Discord", logo: "/discord/techstack/discord.svg" },
    { key: "ruby", label: "Ruby", logo: "/discord/techstack/ruby.svg" },
    { key: "cpp", label: "C++", logo: "/discord/techstack/cpp.png" },
]

// Rounded elongated-hexagon outline, drawn once in a 92x80 box and scaled
// via the SVG viewBox so it stays crisp at every breakpoint.
const HEX_PATH =
    "M 18.02 8.67 Q 23.00 0.00 33.00 0.00 L 59.00 0.00 Q 69.00 0.00 73.98 8.67 " +
    "L 87.02 31.33 Q 92.00 40.00 87.02 48.67 L 73.98 71.33 Q 69.00 80.00 59.00 80.00 " +
    "L 33.00 80.00 Q 23.00 80.00 18.02 71.33 L 4.98 48.67 Q 0.00 40.00 4.98 31.33 Z"

function HexIcon({ logo, label }: { logo: string; label: string }) {
    return (
        <div
            className="group relative aspect-[92/80] w-[78px] sm:w-[90px] lg:w-28 flex-shrink-0"
            title={label}
        >
            <svg
                viewBox="0 0 92 80"
                className="absolute inset-0 h-full w-full overflow-visible"
                preserveAspectRatio="none"
            >
                <path
                    d={HEX_PATH}
                    className="fill-gray-900/80 stroke-white/5 transition-colors duration-300 group-hover:stroke-[#51A2FF]/50 dark:fill-gray-900/80"
                    strokeWidth="1"
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <Image
                    src={logo}
                    alt={label}
                    width={40}
                    height={40}
                    className="h-[39px] w-[39px] object-contain sm:h-[45px] sm:w-[45px] lg:h-14 lg:w-14"
                />
            </div>
        </div>
    )
}

export default function DiscordTechStackSection() {
    const { t } = useLanguage()

    return (
        <div className="bg-gray-50 dark:bg-[#0a0b0f] relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-4 gap-3 sm:gap-4 lg:gap-5 w-fit mx-auto lg:mx-0 -mt-6 sm:-mt-8"
                >
                    {TECH_STACK.map((tech) => (
                        <HexIcon key={tech.key} logo={tech.logo} label={tech.label} />
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6 orbitron-font leading-tight">
                        {t("discord.techStack.title")}{" "}
                        <span className="text-[#51A2FF]">{t("discord.techStack.titleHighlight")}</span>
                    </h2>

                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {t("discord.techStack.paragraph1Prefix")}{" "}
                        <span className="text-[#51A2FF] font-medium">{t("discord.techStack.paragraph1Highlight")}</span>
                        {t("discord.techStack.paragraph1Suffix")}
                    </p>

                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {t("discord.techStack.paragraph2Prefix")}{" "}
                        <span className="text-[#51A2FF] font-medium">{t("discord.techStack.paragraph2Highlight1")}</span>{" "}
                        {t("discord.techStack.paragraph2Mid")}{" "}
                        <span className="text-[#51A2FF] font-medium">{t("discord.techStack.paragraph2Highlight2")}</span>
                        {t("discord.techStack.paragraph2Suffix")}
                    </p>

                    <p className="text-gray-600 dark:text-gray-300">
                        {t("discord.techStack.paragraph3Prefix")}{" "}
                        <span className="text-[#51A2FF] font-medium">{t("discord.techStack.paragraph3Highlight")}</span>
                        {t("discord.techStack.paragraph3Suffix")}
                    </p>
                </motion.div>
            </div>
        </div>
    )
}
