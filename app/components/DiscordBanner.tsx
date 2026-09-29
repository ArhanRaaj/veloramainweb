"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { FaDiscord } from "react-icons/fa6";
import { useLanguage } from '../contexts/LanguageContext';
import DiscordLiveMemberCount from './DiscordLiveMemberCount';

export default function DiscordBanner() {
    const { t } = useLanguage();

    return (
        <div className=" py-18 px-4 sm:px-6 lg:px-8 relative">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 max-w-7xl mx-auto"
            >
                <div className="relative backdrop-blur-sm bg-gradient-to-br from-[#7289FA] via-[#5865F2] to-[#3B4CCB] dark:from-[#7289FA] dark:via-[#5865F2] dark:to-[#3B4CCB] overflow-hidden rounded-md border border-gray-600/20 dark:border-gray-400/10 p-8 md:p-12">
                    {/* Soft cloud-like glows, echoing the official Discord promo art */}
                    <div className="absolute -bottom-10 -left-10 w-56 h-56 rounded-full scale-150" style={{ backgroundImage: "radial-gradient(closest-side, rgba(255,255,255,0.22), transparent)" }} />
                    <div className="absolute -bottom-16 left-1/3 w-72 h-72 rounded-full scale-150" style={{ backgroundImage: "radial-gradient(closest-side, rgba(255,255,255,0.22), transparent)" }} />
                    <div className="absolute -top-16 -right-10 w-64 h-64 rounded-full scale-150" style={{ backgroundImage: "radial-gradient(closest-side, rgba(255,255,255,0.22), transparent)" }} />

                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-4 left-4">
                            <FaDiscord className="w-16 h-16 text-white" />
                        </div>
                        <div className="absolute top-8 right-8">
                            <FaDiscord className="w-12 h-12 text-white" />
                        </div>
                        <div className="absolute bottom-4 left-1/4">
                            <FaDiscord className="w-8 h-8 text-white" />
                        </div>
                        <div className="absolute bottom-8 right-1/4">
                            <FaDiscord className="w-10 h-10 text-white" />
                        </div>
                    </div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                                <a
                                    href="https://discord.gg/rxhy4j7Xrh"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center md:justify-start gap-3 "
                                >
                                    <h2 className="text-3xl md:text-4xl font-bold text-white orbitron-font">
                                        {t('discordBanner.title').split(' ').slice(0, -1).join(' ')} <span className="text-white/80">{t('discordBanner.title').split(' ').slice(-1)[0]}</span>
                                    </h2>
                                </a>

                            </div>
                            <p className="text-xl text-white mb-2">
                                {t('discordBanner.subtitle')}
                            </p>
                            <p className=" text-white">
                                {t('discordBanner.description')}
                            </p>
                            <div className="mt-4 flex justify-center md:justify-start">
                                <DiscordLiveMemberCount />
                            </div>

                        </div>

                        <div className="flex-shrink-0">
                            <a
                                href="https://discord.gg/rxhy4j7Xrh"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block transition-all duration-300 hover:scale-105"
                            >
                                <Image
                                    src="/joinus.png"
                                    alt="Join Discord"
                                    width={598}
                                    height={187}
                                    className="w-auto h-12 md:h-16"
                                />
                            </a>
                        </div>

                    </div>
                </div>
            </motion.div>
        </div>
    )
}
