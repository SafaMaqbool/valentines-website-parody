"use client"

import { Heart, HeartCrack } from "lucide-react"
import { DodgeButton } from "./dodge-button"

interface LandingScreenProps {
  onJustChilling: () => void
  yesGrowing: boolean
  onDodge: (message: string) => void // Add this
}

export function LandingScreen({ onJustChilling, yesGrowing, onDodge }: LandingScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-8 text-center px-6">
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight text-balance" style={{ color: "hsl(350 30% 15%)" }}>
          {"It's 14th February..."}
        </h1>
        <p className="text-2xl md:text-4xl font-semibold" style={{ color: "hsl(350 70% 55%)" }}>
          What are your plans for today?
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-4 items-center">
        {/* Just Chilling button */}
        <button
          onClick={onJustChilling}
          className={`group flex items-center justify-center gap-3 rounded-full px-10 py-4 text-lg font-semibold shadow-lg transition-all duration-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
            yesGrowing ? "scale-[2] md:scale-[2.5] opacity-90 shadow-2xl" : "hover:scale-105 hover:shadow-xl active:scale-95"
          }`}
          style={{ backgroundColor: "hsl(350 70% 55%)", color: "white" }}
          disabled={yesGrowing}
        >
          <HeartCrack className={`h-5 w-5 transition-transform ${yesGrowing ? "animate-pulse-soft" : "group-hover:scale-110"}`} />
          <span>{yesGrowing ? "Aww..." : "Just chilling"}</span>
        </button>

        {/* Dodge button for Going on a date */}
        {!yesGrowing && <DodgeButton onDodge={onDodge} />}
      </div>

      <p className={`text-sm mt-2 tracking-wide transition-opacity duration-500 ${yesGrowing ? "opacity-0" : "opacity-100"}`} style={{ color: "hsl(350 15% 45%)" }}>
        Choose wisely.
      </p>

      
    </div>
  )
}
