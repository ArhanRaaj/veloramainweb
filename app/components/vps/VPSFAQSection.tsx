"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { TbChevronUpRight, TbChevronDownRight } from "react-icons/tb"
import Image from "next/image"

interface FAQItem {
  question: string
  answer: string
}

const VPS_FAQS: FAQItem[] = [
  {
    question: "Do I get full Root access?",
    answer: "Yes, every VPS comes with full root (administrator) access, so you have complete control over your server's configuration, software, and firewall settings.",
  },
  {
    question: "What virtualization technology do you use?",
    answer: "Our VPS plans run on KVM virtualization, which provides dedicated resources and full isolation from other users, unlike lightweight container-based virtualization.",
  },
  {
    question: "Which Operating Systems can I install?",
    answer: "You can choose from a range of Linux distributions such as Ubuntu, Debian, CentOS, and AlmaLinux, along with Windows Server options, directly from the panel.",
  },
  {
    question: "Is the storage NVMe or SSD?",
    answer: "All VPS plans use enterprise-grade NVMe storage for significantly faster read/write speeds compared to traditional SSDs or HDDs.",
  },
  {
    question: "Can I use the VPS for hosting multiple game servers?",
    answer: "Absolutely. With full root access and dedicated resources, you can run multiple game servers, panels, or any other software side by side on a single VPS.",
  },
]

export default function VPSFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="bg-gray-50 dark:bg-[#0a0b0f] relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="hidden md:block"
          >
            <div className="relative h-[300px] md:h-[420px] w-full">
              <Image
                src="/vps/server-rack.png"
                alt="VPS Server Rack"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          </motion.div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4 orbitron-font">
                VPS Hosting <span className="icon-text-primary">FAQ</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
                Technical details regarding our high-performance Virtual Private Servers
              </p>
            </motion.div>

            <div className="space-y-4">
              {VPS_FAQS.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-900/5 backdrop-blur-sm border border-secondary rounded-md overflow-hidden hover:bg-gray-50 dark:hover:bg-transparent hover:border-secondary dark:hover:border-secondary hover:hover-gradient dark:hover:hover-gradient hover:text-icon-text-primary dark:hover:text-icon-text-primary transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full px-4 sm:px-3 py-3 sm:py-3 flex items-center text-left gap-2 sm:gap-4"
                  >
                    <span className="orbitron-font flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-md card-primary dark:card-primary flex items-center justify-center icon-text-primary text-sm sm:text-base">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    <span className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                      {faq.question}
                    </span>
                    {openIndex === index ? (
                      <TbChevronDownRight className="w-5 h-5 icon-text-primary dark:icon-text-primary ml-auto flex-shrink-0" />
                    ) : (
                      <TbChevronUpRight className="w-5 h-5 icon-text-primary dark:icon-text-primary ml-auto flex-shrink-0" />
                    )}
                  </button>
                  <div
                    className={`px-4 sm:px-6 transition-all duration-300 overflow-hidden ${
                      openIndex === index ? "pb-3 sm:pb-4 pl-[52px] sm:pl-[72px]" : "h-0"
                    }`}
                  >
                    <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">{faq.answer}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
