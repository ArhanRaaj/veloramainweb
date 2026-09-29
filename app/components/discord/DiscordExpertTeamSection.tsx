"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Ticket, Users, ChevronRight, Hash, Volume2 } from "lucide-react"
import { useLanguage } from "../../contexts/LanguageContext"

const MEMBERS = [
    { name: "! Owner NotDhirajX", avatar: "/discord/members/notdhirajx.png" },
    { name: "! Co-Owner 0Parasjainop0" },
    { name: "Admin | Prince" },
    { name: "Admin | Aryan", avatar: "/discord/members/aryan.png" },
]

export default function DiscordExpertTeamSection() {
    const { t } = useLanguage()

    return (
        <div className="bg-gray-50 dark:bg-[#0a0b0f] relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left: copy + stats + mascot */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-left gap-2 bg-[#51A2FF]/10 dark:bg-[#51A2FF]/20 px-4 py-2 rounded-tl-2xl rounded-br-2xl mb-4 border border-[#51A2FF]/20 dark:border-[#51A2FF]/20">
                        <span className="text-[#51A2FF] dark:text-[#51A2FF] text-sm">
                            {t("discord.expertTeam.eyebrow")}
                        </span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6 orbitron-font leading-tight">
                        {t("discord.expertTeam.title")}{" "}
                        <span className="text-[#51A2FF]">{t("discord.expertTeam.titleHighlight")}</span>
                    </h2>

                    <div className="flex items-start gap-6">
                        <div className="flex-1">
                            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md">
                                {t("discord.expertTeam.description")}
                            </p>

                            <div className="grid grid-cols-2 gap-6 max-w-md">
                                <div>
                                    <Ticket className="w-6 h-6 text-[#51A2FF] mb-2" />
                                    <p className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                                        {t("discord.expertTeam.stat1Title")}
                                    </p>
                                    <p className="text-gray-500 dark:text-gray-400 text-xs">
                                        {t("discord.expertTeam.stat1Description")}
                                    </p>
                                </div>
                                <div>
                                    <Users className="w-6 h-6 text-[#51A2FF] mb-2" />
                                    <p className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                                        {t("discord.expertTeam.stat2Title")}
                                    </p>
                                    <p className="text-gray-500 dark:text-gray-400 text-xs">
                                        {t("discord.expertTeam.stat2Description")}
                                    </p>
                                </div>
                            </div>

                            <a
                                href="https://discord.gg/rxhy4j7Xrh"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-8 inline-flex items-center gap-1 text-sm font-medium text-[#51A2FF] hover:text-[#2B85F5] transition-colors duration-300"
                            >
                                Join our Discord
                                <ChevronRight className="w-4 h-4" />
                            </a>
                        </div>

                        {/* Mascot: face1 head layered onto body torso.
                            The outer wrapper holds the static horizontal shift (a net 20% of the robot's
                            width to the left of its natural spot - it was +40%, then moved 60% left);
                            the inner motion.div only handles the floating animation. */}
                        <div className="hidden sm:block relative w-[190px] h-[250px] flex-shrink-0 -mt-2 ml-[64px] sm:-translate-x-[20%]">
                        <motion.div
                            className="relative w-full h-full"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <div className="absolute left-1/2 -translate-x-1/2 top-[149px] w-[146px] h-[87px]">
                                <Image
                                    src="/discord/mascot/mascot-body.png"
                                    alt=""
                                    fill
                                    className="object-contain object-bottom"
                                />
                            </div>
                            <div className="absolute left-1/2 -translate-x-1/2 top-[40px] w-[130px] h-[94px]">
                                <Image
                                    src="/discord/mascot/mascot-head.png"
                                    alt=""
                                    fill
                                    className="object-contain object-top"
                                />
                            </div>
                        </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* Right: mock Discord widget */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-sm mx-auto lg:mx-0 lg:ml-auto rounded-2xl overflow-hidden border border-white/10 bg-[#12141a] shadow-2xl"
                >
                    <div className="flex items-center gap-2 px-5 py-4 bg-[#5865F2]">
                        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" aria-hidden="true">
                            <path d="M20.317 4.3698a19.7913 19.7913 0 0 0-4.8851-1.5152.0741.0741 0 0 0-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 0 0-.0785-.037 19.7363 19.7363 0 0 0-4.8852 1.515.0699.0699 0 0 0-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 0 0 .0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 0 0 .0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 0 0-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 0 1-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 0 1 .0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 0 1 .0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 0 1-.0066.1276 12.2986 12.2986 0 0 1-1.873.8914.0766.0766 0 0 0-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 0 0 .0842.0286c1.961-.6067 3.9495-1.522 6.0023-3.0294a.077.077 0 0 0 .0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 0 0-.0312-.0286ZM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.419 2.157-2.419 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.419-2.1569 2.419Zm7.9748 0c-1.1825 0-2.1568-1.0857-2.1568-2.419 0-1.3332.9554-2.419 2.1568-2.419 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419Z" />
                        </svg>
                        <span className="font-semibold text-white text-sm">{t("discord.expertTeam.widgetTitle")}</span>
                        <span className="ml-auto flex items-center gap-1.5 text-white/90 text-xs">
                            <span className="w-2 h-2 rounded-full bg-[#3ba55d]" />
                            146 {t("discord.expertTeam.widgetSubtitle")}
                        </span>
                    </div>

                    <div className="px-4 py-4">
                        <div className="flex items-center gap-2 px-2 py-1.5 text-gray-400 text-sm">
                            <Hash className="w-4 h-4" />
                            {t("discord.expertTeam.channelGeneral")}
                        </div>
                        <div className="flex items-center gap-2 px-2 py-1.5 mb-3 text-gray-400 text-sm">
                            <Volume2 className="w-4 h-4" />
                            {t("discord.expertTeam.channelSupport")}
                        </div>

                        <p className="px-2 text-[11px] font-semibold tracking-wide text-gray-500 uppercase mb-2">
                            Members Online
                        </p>
                        <div className="space-y-1 max-h-52 overflow-hidden">
                            {MEMBERS.map((m) => (
                                <div key={m.name} className="flex items-center gap-2.5 px-2 py-1 rounded hover:bg-white/5">
                                    <div className="relative w-6 h-6 rounded-full bg-gradient-to-br from-[#51A2FF] to-[#5865F2] flex-shrink-0 overflow-hidden">
                                        {m.avatar && (
                                            <Image
                                                src={m.avatar}
                                                alt={m.name}
                                                fill
                                                sizes="24px"
                                                className="object-cover"
                                            />
                                        )}
                                        <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#3ba55d] border-2 border-[#12141a]" />
                                    </div>
                                    <span className="text-gray-300 text-sm truncate">{m.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center justify-between px-4 py-3 bg-[#0d0e13] border-t border-white/5">
                        <span className="text-gray-500 text-xs">{t("discord.expertTeam.widgetFooter")}</span>
                        <a
                            href="https://discord.gg/rxhy4j7Xrh"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-3 py-1.5 rounded-lg bg-[#5865F2] hover:bg-[#4752c4] text-white text-xs font-medium transition-colors duration-300"
                        >
                            {t("discord.expertTeam.widgetCta")}
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
