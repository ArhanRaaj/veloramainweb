'use client'

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import {
  Calendar,
  Rocket,
  Target,
  ShieldCheck,
  Headset,
  ArrowRight,
} from "lucide-react"
import { FaDiscord } from "react-icons/fa6"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import PanelShowcase from "../components/PanelShowcase"
import aboutConfig from "../config/sections/about.json"
import type { AboutConfig } from "../types/about"

const config = aboutConfig as AboutConfig

const valueIcons = [ShieldCheck, Target, Headset]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0b0f] transition-colors duration-300">
      <Navbar />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url('/vps/vps-hero-2.webp')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-gray-50/40 to-transparent dark:from-[#0a0b0f] dark:via-[#0a0b0f]/60 dark:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-gray-50/80 to-gray-50/40 dark:from-[#0a0b0f] dark:via-[#0a0b0f]/95 dark:to-[#0a0b0f]/60" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center gap-2 card-primary px-6 py-3 rounded-full mb-6 border border-secondary">
              <Rocket className="w-5 h-5 icon-text-primary" />
              <span className="icon-text-primary text-sm font-medium">{config.hero.badge}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6 orbitron-font">
              {config.hero.title} <span className="icon-text-primary">{config.hero.titleAccent}</span>
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
              {config.hero.subtitle}
            </p>

            <div className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
              <Calendar className="w-4 h-4 icon-text-primary" />
              {config.hero.launchLabel} {config.hero.launchDate}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16"
          >
            {config.stats.map((stat) => (
              <div
                key={stat.label}
                className="card-primary border border-secondary rounded-tl-xl rounded-br-xl p-5 text-center"
              >
                <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white orbitron-font mb-1">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Story */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 orbitron-font text-center">
            {config.story.title}
          </h2>
          <div className="space-y-4">
            {config.story.paragraphs.map((p, i) => (
              <p key={i} className="text-gray-600 dark:text-gray-300 leading-relaxed text-center">
                {p}
              </p>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Values */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {config.values.map((value, i) => {
            const Icon = valueIcons[i % valueIcons.length]
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card-primary border border-secondary rounded-tl-xl rounded-br-xl p-6"
              >
                <div className="w-12 h-12 rounded-lg card-primary border border-secondary flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 icon-text-primary" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 orbitron-font">
                  {value.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{value.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Leadership team */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3 orbitron-font">
            Leadership Team
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            The people behind VeloraCloud.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {config.team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-primary border border-secondary rounded-tl-xl rounded-br-xl p-6 text-center"
            >
              {member.photo ? (
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border border-[#2B7FFF]/30 mb-4 relative">
                  <Image src={member.photo} alt={member.name} fill sizes="96px" className="object-cover" />
                </div>
              ) : (
                <div className="w-24 h-24 mx-auto rounded-full bg-[#2B7FFF]/15 border border-[#2B7FFF]/30 flex items-center justify-center mb-4">
                  <span className="text-lg font-bold icon-text-primary orbitron-font">{member.initials}</span>
                </div>
              )}
              <h3 className="text-base font-bold text-gray-900 dark:text-white orbitron-font">{member.name}</h3>
              <p className="text-sm icon-text-primary font-medium mt-1">{member.role}</p>
              {member.bio && (
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mt-3">{member.bio}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="card-primary border border-secondary rounded-tl-xl rounded-br-xl p-8 sm:p-12 text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 orbitron-font">
            {config.cta.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto">{config.cta.subtitle}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={config.cta.primaryHref}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-tl-xl rounded-br-xl bg-[#2B7FFF] hover:bg-[#2B7FFF]/90 text-white font-semibold transition-colors"
            >
              {config.cta.primaryText}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={config.cta.secondaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-tl-xl rounded-br-xl border border-secondary text-gray-700 dark:text-gray-300 font-semibold hover:bg-white/5 transition-colors"
            >
              <FaDiscord className="w-4 h-4" />
              {config.cta.secondaryText}
            </a>
          </div>
        </motion.div>
      </div>

      <PanelShowcase />
      <Footer />
    </div>
  )
}
