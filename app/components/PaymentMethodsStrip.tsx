"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"

// Accepted payment methods — logo only, no labels or boxes.
const METHODS = [
    { key: "paypal", label: "PayPal", logo: "/payments/paypal.svg", w: 92, h: 92 },
    { key: "apple-pay", label: "Apple Pay", logo: "/payments/apple-pay.svg", w: 92, h: 92 },
    { key: "gpay", label: "Google Pay", logo: "/payments/gpay.png", w: 92, h: 92 },
    { key: "amex", label: "American Express", logo: "/payments/amex.svg", w: 92, h: 92 },
    { key: "upi", label: "UPI", logo: "/payments/upi.png", w: 92, h: 92 },
    { key: "rupay", label: "RuPay", logo: "/payments/rupay.png", w: 92, h: 92 },
    { key: "phonepe", label: "PhonePe", logo: "/payments/phonepe.svg", w: 92, h: 92 },
    { key: "paytm", label: "Paytm", logo: "/payments/paytm.png", w: 92, h: 92 },
    { key: "fampay", label: "FamPay", logo: "/payments/fampay.svg", w: 92, h: 92 },
]

// Duplicate for a seamless infinite scroll loop.
const ITEMS = [...METHODS, ...METHODS, ...METHODS]

export default function PaymentMethodsStrip({
    introText,
    showLearnMoreLink = false,
    learnMoreHref = "https://billing.veloracloud.space",
    learnMoreText = "Learn More About Payment Methods",
}: {
    introText?: string
    showLearnMoreLink?: boolean
    learnMoreHref?: string
    learnMoreText?: string
}) {
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
        <>
            {introText && (
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="mt-12 text-center text-md text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
                >
                    {introText}
                </motion.p>
            )}
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="mt-12 relative py-4 overflow-hidden bg-transparent"
            >
            {/* Left / right edge fade — swaps per theme */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10 bg-gradient-to-r from-gray-100 dark:from-[#0a0b0f] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10 bg-gradient-to-l from-gray-100 dark:from-[#0a0b0f] to-transparent" />

            <div
                className="flex items-center gap-28 will-change-transform"
                style={{
                    // Pause the animation off-screen to save GPU cycles.
                    animation: inView ? "scroll 90s linear infinite" : "none",
                    width: "max-content",
                }}
            >
                {ITEMS.map((m, i) => (
                    <div
                        key={`${m.key}-${i}`}
                        className="flex items-center justify-center flex-shrink-0 select-none opacity-70 hover:opacity-100 transition-opacity duration-300"
                        title={m.label}
                    >
                        <Image
                            src={m.logo}
                            alt={m.label}
                            width={m.w}
                            height={m.h}
                            className={
                                m.key === "apple-pay"
                                    ? "h-[92px] w-auto max-w-[92px] object-contain dark:invert"
                                    : "h-[92px] w-auto max-w-[92px] object-contain"
                            }
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>
        </motion.div>

        {showLearnMoreLink && (
            <div className="flex justify-center mt-8 mb-4">
                <a
                    href={learnMoreHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium text-[#51A2FF] hover:text-[#2B85F5] transition-colors duration-300"
                >
                    {learnMoreText}
                    <ChevronRight className="w-4 h-4" />
                </a>
            </div>
        )}
        </>
    )
}
