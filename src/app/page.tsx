"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import HeroCinema from "@/components/ui/HeroCinema";
import InteractiveOverlay from "@/components/ui/InteractiveOverlay";

export default function Home() {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  return (
    <main className="relative bg-black w-screen h-screen overflow-hidden">
      {/* Cinematic One-Screen Landing Page */}
      <HeroCinema onEnterUniverse={() => setIsOverlayOpen(true)} />

      {/* Conversion Drawer Transition Overlay */}
      <AnimatePresence mode="wait">
        {isOverlayOpen && (
          <InteractiveOverlay
            key="overlay"
            isOpen={isOverlayOpen}
            onClose={() => setIsOverlayOpen(false)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
