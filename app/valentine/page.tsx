"use client";

import { useState, useCallback, useRef } from "react";
import { FloatingHearts } from "../components/floating-hearts";
import { CornerCuties } from "../components/corner-cuties";
import { FunToast } from "../components/fun-toast";
import { LandingScreen } from "../components/landing-screen";
import { JustChillingReveal } from "../components/just-chilling-reveal";

interface Toast {
  id: number;
  message: string;
}

export default function Page() {
  const [screen, setScreen] = useState<"landing" | "transition" | "reveal">(
    "landing",
  );
  const [yesGrowing, setYesGrowing] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [showCuties, setShowCuties] = useState(false);
  const toastId = useRef(0);

  const handleDodge = useCallback((message: string) => {
    toastId.current += 1;
    const id = toastId.current;
    setToasts((prev) => [...prev.slice(-3), { id, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 7000);
  }, []);

  const handleGoingOnDate = useCallback(() => {
    if (yesGrowing) return;
    toastId.current += 1;
    const id = toastId.current;
    setToasts((prev) => [
      ...prev.slice(-3),
      { id, message: "Haha, button dodges you!" },
    ]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2500);
  }, [yesGrowing]);

  const handleJustChilling = useCallback(() => {
    if (yesGrowing) return;
    setYesGrowing(true);
    setShowCuties(true);
    setTimeout(() => setScreen("transition"), 1200);
    setTimeout(() => setScreen("reveal"), 2200);
  }, [yesGrowing]);

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden transition-colors duration-1000"
      style={{
        backgroundColor:
          screen === "reveal"
            ? "hsl(345 70% 96%)"
            : screen === "transition"
              ? "hsl(0 0% 100%)"
              : "hsl(350 60% 96%)",
      }}
    >
     {(screen === "landing" || screen === "reveal") && <FloatingHearts />}

      {showCuties && screen !== "reveal" && <CornerCuties />}

      {toasts.map((t) => (
        <FunToast key={t.id} id={t.id} message={t.message} />
      ))}

      <div
        className={`fixed inset-0 z-30 transition-opacity duration-700 pointer-events-none ${
          screen === "transition" ? "opacity-100" : "opacity-0"
        }`}
        style={{ backgroundColor: "hsl(0 0% 100%)" }}
        aria-hidden="true"
      />

      <main
        className={`relative z-10 flex-1 flex items-center justify-center w-full transition-opacity duration-700 ${
          screen === "transition" ? "opacity-0" : "opacity-100"
        }`}
      >
        {screen === "landing" && (
          <LandingScreen
            onJustChilling={handleJustChilling}
            yesGrowing={yesGrowing}
            onDodge={handleDodge} // Pass the page-level handler
          />
        )}
        {screen === "reveal" && <JustChillingReveal />}
      </main>

      <footer className="relative z-10 pb-6 pt-4">
        <p
          className="text-xs tracking-wider"
          style={{ color: "hsl(350 15% 55%)" }}
        >
          {"Built with Next js tailwind css & halal intentions."}
        </p>
      </footer>
    </div>
  );
}
