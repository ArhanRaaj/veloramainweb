"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { memo, useMemo, useState, useEffect } from "react";
import WorldMap from "./ui/world-map";

// Percent-based position of each marker on the flat dotted map image (equirectangular:
// x% = (lng + 180) / 360, y% = (90 - lat) / 180), used only by the "map" globe variant.
const mapMarkerPositions: Record<string, { top: string; left: string }> = {
    Mumbai: { left: "70.24%", top: "39.40%" },
    Noida: { left: "71.42%", top: "34.04%" },
    Singapore: { left: "78.84%", top: "49.25%" },
};

// Cards shown above the full map on the home page ("globe" variant), one per country -
// matching the reference layout. India's cities all share the same CPU lineup in
// games.json/vps.json (location-level, not city-level), so they're combined into a
// single card; Singapore has no active plans yet anywhere on the site, so it's marked
// "Coming Soon" rather than showing a CPU that isn't actually offered there.
const globeLocationCards = [
    {
        name: "India",
        flag: "/flags/india.png",
        cpu: "AMD Ryzen 9",
        cpuImages: [
            { src: "/cpu/ryzen9.png", alt: "AMD Ryzen 9" },
        ],
    },
    { name: "Singapore", flag: "/flags/singapore.png", cpu: "Coming Soon", cpuImages: [] },
];

const locations = [
    {
        name: "Mumbai",
        region: "India West",
        flag: "/flags/india.png",
        ping: "8ms",
        status: "active",
        lat: 19.0760,
        lng: 72.8777,
    },
    {
        name: "Noida",
        region: "India North",
        flag: "/flags/india.png",
        ping: "12ms",
        status: "active",
        lat: 28.5355,
        lng: 77.3910,
    },
    {
        name: "Delhi",
        region: "India North",
        flag: "/flags/india.png",
        ping: "10ms",
        status: "active",
        lat: 28.7041,
        lng: 77.1025,
    },
    {
        name: "Singapore",
        region: "International",
        flag: "/flags/singapore.png",
        ping: "35ms",
        status: "active",
        lat: 1.3521,
        lng: 103.8198,
    },
];

const LocationItem = memo(({ location, index }: { location: typeof locations[0], index: number }) => {
    const isActive = location.status === "active";

    return (
        <motion.div
            className={`flex items-center justify-between gap-2 sm:gap-3 py-1.5 sm:py-2 lg:py-3 last:border-0 ${isActive ? "" : "opacity-50 grayscale"}`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: isActive ? 1 : 0.5, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                <Image
                    src={location.flag}
                    alt={`${location.name} flag`}
                    width={32}
                    height={32}
                    className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 rounded object-cover flex-shrink-0"
                    loading="lazy"
                />
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                        <h3 className="text-gray-900 dark:text-white font-semibold text-xs sm:text-sm lg:text-base truncate">
                            {location.name}
                        </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-[10px] sm:text-xs lg:text-sm mt-0.5 truncate">
                        {location.region}
                    </p>
                </div>
            </div>

        </motion.div>
    );
});

LocationItem.displayName = 'LocationItem';




interface LocationsSectionProps {
    /**
     * "globe" renders the animated 3D globe (used on the home page).
     * "map" renders a flat world map with location dots instead
     * (used on secondary pages like Games, VPS/Cloud, and Discord).
     */
    variant?: "globe" | "map";
}

export default function LocationsSection({ variant = "globe" }: LocationsSectionProps) {
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        const checkTheme = () => {
            const isDarkMode = document.documentElement.classList.contains('dark');
            setIsDark(isDarkMode);
        };

        checkTheme();
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });

        return () => observer.disconnect();
    }, []);

    const containerVariants = useMemo(() => ({
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
    }), []);

    return (
        <div className="relative px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div
                className="absolute inset-0 bg-center bg-no-repeat bg-cover opacity-[0.07] dark:opacity-[0.12] pointer-events-none"
                style={{ backgroundImage: "url('/World_map_with_points.svg')" }}
            />
            <div className="pointer-events-none relative mx-auto h-[30rem] sm:h-[40rem] lg:h-[50rem] overflow-hidden [mask-image:radial-gradient(ellipse_at_center_center,#000,transparent_50%)] my-[-12rem] sm:my-[-15rem] lg:my-[-18.8rem] before:absolute before:inset-0 before:h-full before:w-full before:opacity-40 before:[background-image:radial-gradient(circle_at_bottom_center,var(--color),transparent_70%)] after:absolute after:-left-1/2 after:top-1/2 after:aspect-[1/0.7] after:w-[200%] after:rounded-[50%] after:border-t after:border-secondary after:bg-primary"></div>
            <div className="absolute top-1/2 left-1/2 opacity-60 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-full max-w-[100vw] overflow-hidden">
                <div className="relative w-full max-w-[1463px] max-h-[926px] aspect-[1463/926]">
                    <div
                        className="absolute -translate-x-1/2 -translate-y-1/2"
                        style={{
                            left: "60.66%", top: "43.47%", width: "72%", height: "42%",
                            backgroundImage: "radial-gradient(closest-side, var(--icon-primary), transparent)",
                            opacity: isDark ? 0.4 : 0.2,
                        }}
                    />
                    <div
                        className="absolute -translate-x-1/2 -translate-y-1/2"
                        style={{
                            left: "39.34%", top: "56.53%", width: "72%", height: "42%",
                            backgroundImage: "radial-gradient(closest-side, var(--icon-primary), transparent)",
                            opacity: isDark ? 0.4 : 0.2,
                        }}
                    />
                </div>






            </div>

            <div className="relative z-10 max-w-7xl mx-auto py-8 sm:py-12 lg:py-16">
                {variant === "globe" && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col items-center text-center mb-10 sm:mb-14"
                    >
                        <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#2B7FFF]/40 bg-[#2B7FFF]/10 icon-text-primary text-xs font-semibold tracking-wider uppercase mb-4">
                            Global Infrastructure
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold orbitron-font text-gray-900 dark:text-white mb-3">
                            Global <span className="relative inline-block icon-text-primary">
                                Locations
                                <svg
                                    className="absolute left-0 -bottom-1.5 w-full h-2.5 icon-text-primary"
                                    viewBox="0 0 120 10"
                                    preserveAspectRatio="none"
                                    fill="none"
                                    aria-hidden="true"
                                >
                                    <path d="M2 7.5C20 2 40 2 60 5C80 8 100 8 118 3" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                                </svg>
                            </span>
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base max-w-xl">
                            Strategically positioned servers across India and Singapore for optimal
                            performance and minimal latency.
                        </p>
                    </motion.div>
                )}

                {variant === "globe" && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 mb-10 sm:mb-14"
                    >
                        {globeLocationCards.map((loc) => (
                            <div key={loc.name} className="flex items-center gap-3">
                                <Image
                                    src={loc.flag}
                                    alt={`${loc.name} flag`}
                                    width={32}
                                    height={32}
                                    className="w-7 h-7 rounded object-cover flex-shrink-0"
                                    loading="lazy"
                                />
                                <div className="text-left">
                                    <div className="font-semibold text-sm text-gray-900 dark:text-white">{loc.name}</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">{loc.cpu}</div>
                                </div>
                                {loc.cpuImages.length > 0 && (
                                    <div className="flex items-center gap-2 pl-3 ml-1 border-l border-gray-300 dark:border-white/15">
                                        {loc.cpuImages.map((img) => (
                                            <Image
                                                key={img.src}
                                                src={img.src}
                                                alt={img.alt}
                                                title={img.alt}
                                                width={40}
                                                height={40}
                                                className="h-8 w-auto max-w-[3rem] object-contain flex-shrink-0"
                                                loading="lazy"
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </motion.div>
                )}

                <div className={variant === "globe" ? "flex justify-center" : "grid lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-16 items-center"}>
                    {variant === "map" && (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                                <div>
                                    <h3 className="icon-text-primary orbitron-font text-sm sm:text-base lg:text-lg mb-1.5 sm:mb-2 font-semibold">West India</h3>
                                    <div className="space-y-0.5 sm:space-y-1">
                                        {locations
                                            .filter(loc => loc.region.includes("West"))
                                            .map((location, index) => (
                                                <LocationItem key={location.name} location={location} index={index} />
                                            ))
                                        }
                                    </div>
                                </div>

                                <div>
                                    <h3 className="icon-text-primary orbitron-font text-sm sm:text-base lg:text-lg mb-1.5 sm:mb-2 font-semibold">North India</h3>
                                    <div className="space-y-0.5 sm:space-y-1">
                                        {locations
                                            .filter(loc => loc.region.includes("North"))
                                            .map((location, index) => (
                                                <LocationItem key={location.name} location={location} index={index + 1} />
                                            ))
                                        }
                                    </div>
                                </div>

                                <div>
                                    <h3 className="icon-text-primary orbitron-font text-sm sm:text-base lg:text-lg mb-1.5 sm:mb-2 font-semibold">International</h3>
                                    <div className="space-y-0.5 sm:space-y-1">
                                        {locations
                                            .filter(loc => loc.region === "International")
                                            .map((location, index) => (
                                                <LocationItem key={location.name} location={location} index={index + 2} />
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    <motion.div
                        className={variant === "globe"
                            ? "relative w-full h-[320px] sm:h-[440px] lg:h-[620px] flex items-center justify-center"
                            : "relative hidden lg:flex lg:h-[600px] items-center justify-center"}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        {variant === "globe" ? (
                            <div className="absolute inset-0 flex items-center justify-center">
                                {/* aspect-locked to the source image (1320x640) so the marker
                                    percentages below line up exactly with no letterboxing */}
                                <div className="relative w-full max-w-[1100px] aspect-[1320/640]">
                                    <Image
                                        src="/world-map-dots.png"
                                        alt="World coverage map"
                                        fill
                                        sizes="100vw"
                                        className="object-contain dark:invert"
                                        priority
                                    />
                                    {Object.entries(mapMarkerPositions).map(([name, pos]) => (
                                        <span
                                            key={name}
                                            title={name}
                                            className="absolute flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
                                            style={{ left: pos.left, top: pos.top }}
                                        >
                                            <motion.span
                                                className="absolute h-3 w-3 rounded-full bg-[#2B7FFF]"
                                                animate={{ scale: [1, 2.4, 1], opacity: [0.6, 0, 0.6] }}
                                                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                                            />
                                            <span className="relative h-2 w-2 rounded-full bg-[#2B7FFF] ring-2 ring-white dark:ring-[#0a0b0f]" />
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="w-full max-w-xl">
                                <WorldMap
                                    lineColor="#2B7FFF"
                                    dots={[
                                        {
                                            start: { lat: 19.0760, lng: 72.8777, label: "Mumbai" },
                                            end: { lat: 1.3521, lng: 103.8198, label: "Singapore" },
                                        },
                                    ]}
                                />
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-px overflow-hidden">
                <div
                    className="h-full w-full bottom-border-gradient"
                    style={{
                        maskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)'
                    }}
                />
            </div>
        </div>
    );
}
