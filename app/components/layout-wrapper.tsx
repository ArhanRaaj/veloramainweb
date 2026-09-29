'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import uiConfig from "../config/sections/ui.json";
import type { UIConfig } from "../types/ui";

const config = uiConfig as UIConfig;

function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-50 dark:bg-[#0a0b0f] transition-colors duration-300">
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-24 h-24 flex items-center justify-center">
          {/* soft ambient glow */}
          <div className="absolute inset-0 rounded-full bg-icon-primary/20 blur-xl animate-pulse"></div>

          {/* outer spinning ring (gradient arc) */}
          <div
            className="absolute inset-0 rounded-full animate-spin"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0%, transparent 65%, rgba(43, 127, 255,1) 100%)",
              WebkitMask:
                "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))",
              mask: "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))",
              animationDuration: "1.1s",
            }}
          ></div>

          {/* inner spinning ring, reverse direction */}
          <div
            className="absolute inset-3 rounded-full animate-spin animate-reverse"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0%, transparent 75%, rgba(43, 127, 255,0.6) 100%)",
              WebkitMask:
                "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))",
              mask: "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))",
              animationDuration: "1.6s",
            }}
          ></div>

          {/* static track rings for definition */}
          <div className="absolute inset-0 rounded-full border border-gray-200 dark:border-gray-800"></div>
          <div className="absolute inset-3 rounded-full border border-gray-100 dark:border-gray-800/70"></div>

          {/* logo centered, gently pulsing */}
          <div className="relative w-10 h-10 flex items-center justify-center animate-pulse" style={{ animationDuration: "2s" }}>
            <Image
              src="/loader/logo.png"
              alt="VeloraCloud"
              width={40}
              height={40}
              className="object-contain drop-shadow-[0_0_8px_rgba(43, 127, 255,0.5)]"
              priority
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-lg text-gray-900 dark:text-white orbitron-font">
            VeloraCloud
          </span>
        </div>
      </div>
    </div>
  );
}

export function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(config.loading.enableLoadingScreen);

  useEffect(() => {
    if (config.loading.enableLoadingScreen) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, config.loading.loadingDuration);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      {isLoading && config.loading.enableLoadingScreen && <LoadingScreen />}
      <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </div>
    </>
  );
}
