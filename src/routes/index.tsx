import { useCallback, useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Compass, FileText } from "lucide-react";
import { HueBackground } from "@/components/HueBackground";
import { IntroSection } from "@/components/sections/IntroSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { FrontendSection } from "@/components/sections/FrontendSection";
import { DataSection } from "@/components/sections/DataSection";
import { ResumeModal } from "@/components/ResumeModal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Daphne Duong — Data Analyst & Frontend Portfolio" },
      {
        name: "description",
        content:
          "An interactive spatial canvas portfolio: Power BI and SQL analytics, frontend engineering, and education from Daphne Duong.",
      },
      { property: "og:title", content: "Daphne Duong — Data Analyst & Frontend Portfolio" },
      {
        property: "og:description",
        content:
          "Explore Daphne Duong's analytics and frontend work on a playful, canvas-style portfolio map.",
      },
    ],
  }),
  component: Index,
});

type SectionId = "intro" | "education" | "frontend" | "data";
type Dir = "left" | "right" | "up" | "down";

const LABELS: Record<SectionId, string> = {
  intro: "Intro",
  education: "Education",
  frontend: "Frontend",
  data: "Data",
};

const NEIGHBOURS: Record<SectionId, Partial<Record<Dir, SectionId>>> = {
  intro: { left: "education", right: "frontend", down: "data" },
  education: { right: "intro", down: "data" },
  frontend: { left: "intro", down: "data" },
  data: { up: "intro", left: "education", right: "frontend" },
};

function Index() {
  const [section, setSection] = useState<SectionId>("intro");
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);

  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const pointerStartRef = useRef<{ x: number; y: number; time: number } | null>(null);

  const go = useCallback(
    (direction: Dir) => {
      const next = NEIGHBOURS[section][direction];
      if (!next) return;
      setSection(next);
    },
    [section],
  );

  // Keyboard navigation listener
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      const map: Record<string, Dir> = {
        ArrowLeft: "left",
        ArrowRight: "right",
        ArrowUp: "up",
        ArrowDown: "down",
      };
      const d = map[e.key];
      if (d) {
        e.preventDefault();
        go(d);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  // Touch swipe handling for mobile / tablets
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current || e.changedTouches.length === 0) return;
    const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
    const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    const threshold = 45;
    if (Math.abs(dx) > threshold || Math.abs(dy) > threshold) {
      if (Math.abs(dx) >= Math.abs(dy)) {
        go(dx > 0 ? "left" : "right");
      } else {
        go(dy > 0 ? "up" : "down");
      }
    }
  };

  // Mouse Pointer drag/swipe handling on canvas
  const handlePointerDown = (e: React.PointerEvent) => {
    const target = e.target as HTMLElement;
    if (
      target.closest("button") ||
      target.closest("a") ||
      target.closest("input") ||
      target.closest("textarea") ||
      target.closest("[data-no-drag]")
    ) {
      return;
    }
    pointerStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      time: Date.now(),
    };
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!pointerStartRef.current) return;
    const dx = e.clientX - pointerStartRef.current.x;
    const dy = e.clientY - pointerStartRef.current.y;
    const dt = Date.now() - pointerStartRef.current.time;
    pointerStartRef.current = null;

    const threshold = 50;
    if ((Math.abs(dx) > threshold || Math.abs(dy) > threshold) && dt < 800) {
      if (Math.abs(dx) >= Math.abs(dy)) {
        go(dx > 0 ? "left" : "right");
      } else {
        go(dy > 0 ? "up" : "down");
      }
    }
  };

  // Calculate 2D Transform Translate relative to Center Intro Canvas
  const getTransform = () => {
    switch (section) {
      case "intro":
        return "translate(0%, 0%)";
      case "education":
        return "translate(100vw, 0%)";
      case "frontend":
        return "translate(-100vw, 0%)";
      case "data":
        return "translate(0%, -100vh)";
    }
  };

  return (
    <main
      className="relative h-screen w-screen overflow-hidden select-none bg-[#faf8fd] touch-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      {/* Hue Background Blob Animation */}
      <HueBackground section={section} />

      {/* 2D Spatial Container Grid with smooth canvas sliding transition */}
      <div
        className="w-full h-full transition-transform duration-700 cubic-bezier(0.16, 1, 0.3, 1) ease-out z-10 relative cursor-default"
        style={{
          transform: getTransform(),
        }}
      >
        {/* CENTER PANEL: INTRO */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center p-4 sm:p-8 md:p-12 overflow-hidden">
          <div className="w-full h-full max-w-5xl max-h-[85vh]">
            <IntroSection onOpenResume={() => setIsResumeOpen(true)} />
          </div>
        </div>

        {/* LEFT PANEL: EDUCATION (-100vw offset relative to center) */}
        <div className="absolute top-0 -left-[100vw] w-full h-full flex items-center justify-center p-4 sm:p-8 md:p-12 overflow-hidden">
          <div className="w-full h-full max-w-5xl max-h-[85vh]">
            <EducationSection />
          </div>
        </div>

        {/* RIGHT PANEL: FRONTEND (+100vw offset relative to center) */}
        <div className="absolute top-0 left-[100vw] w-full h-full flex items-center justify-center p-4 sm:p-8 md:p-12 overflow-hidden">
          <div className="w-full h-full max-w-5xl max-h-[85vh]">
            <FrontendSection />
          </div>
        </div>

        {/* BOTTOM PANEL: DATA (+100vh offset relative to center) */}
        <div className="absolute top-[100vh] left-0 w-full h-full flex items-center justify-center p-4 sm:p-8 md:p-12 overflow-hidden">
          <div className="w-full h-full max-w-5xl max-h-[85vh]">
            <DataSection />
          </div>
        </div>
      </div>

      {/* Edge Directional Navigation Chevron Buttons */}
      {(["left", "right", "up", "down"] as Dir[]).map((d) => {
        const target = NEIGHBOURS[section][d];
        if (!target) return null;
        const vertical = d === "left" || d === "right";
        const Icon =
          d === "left"
            ? ChevronLeft
            : d === "right"
              ? ChevronRight
              : d === "up"
                ? ChevronUp
                : ChevronDown;
        const pos =
          d === "left"
            ? "left-2 top-1/2 -translate-y-1/2 flex-col"
            : d === "right"
              ? "right-2 top-1/2 -translate-y-1/2 flex-col"
              : d === "up"
                ? "top-3 left-1/2 -translate-x-1/2"
                : "bottom-3 left-1/2 -translate-x-1/2";

        return (
          <button
            key={d}
            type="button"
            onClick={() => go(d)}
            aria-label={`Go to ${LABELS[target]}`}
            className={`absolute z-30 flex items-center gap-2 rounded-full border border-border bg-card/90 px-3.5 py-3 text-xs font-bold uppercase tracking-[0.22em] text-[#45324d] backdrop-blur transition-all hover:bg-card hover:shadow-[var(--shadow-bubble)] hover:scale-105 cursor-pointer ${pos}`}
          >
            <Icon className="size-4 shrink-0 text-[#ab93db]" />
            <span style={vertical ? { writingMode: "vertical-rl" } : undefined}>
              {LABELS[target]}
            </span>
          </button>
        );
      })}



      {/* Bottom-Left Spatial Map Radar Navigation (Consistent DemoSite Theme) */}
      <div className="fixed bottom-4 left-4 z-40 hidden lg:flex flex-col items-center bg-card/90 border border-border p-2.5 rounded-[1.5rem] backdrop-blur shadow-xl">
        <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1">
          <Compass className="w-3 h-3 text-[#ab93db]" />
          <span>Spatial Map</span>
        </div>
        <div className="relative w-28 h-20 bg-muted/60 rounded-2xl border border-border p-1">
          {/* Education Box (Left) */}
          <div
            onClick={() => setSection("education")}
            className={`absolute top-2 left-1 w-7 h-11 rounded-xl border flex items-center justify-center cursor-pointer transition-all ${
              section === "education"
                ? "bg-[var(--periwinkle)] border-[#ab93db] shadow-xs text-[#45324d] font-bold scale-105"
                : "bg-card border-border hover:border-[#ab93db] text-muted-foreground"
            }`}
            title="Education"
          >
            <span className="text-[9px] font-bold">Edu</span>
          </div>

          {/* Intro Box (Center) */}
          <div
            onClick={() => setSection("intro")}
            className={`absolute top-2 left-9 w-10 h-7 rounded-xl border flex items-center justify-center cursor-pointer transition-all ${
              section === "intro"
                ? "bg-[var(--lilac)] border-[#ab93db] shadow-xs text-[#45324d] font-bold scale-105"
                : "bg-card border-border hover:border-[#ab93db] text-muted-foreground"
            }`}
            title="Intro (Center)"
          >
            <span className="text-[9px] font-bold">Intro</span>
          </div>

          {/* Frontend Box (Right) */}
          <div
            onClick={() => setSection("frontend")}
            className={`absolute top-2 right-1 w-7 h-11 rounded-xl border flex items-center justify-center cursor-pointer transition-all ${
              section === "frontend"
                ? "bg-[var(--petal)] border-[#ab93db] shadow-xs text-[#45324d] font-bold scale-105"
                : "bg-card border-border hover:border-[#ab93db] text-muted-foreground"
            }`}
            title="Frontend"
          >
            <span className="text-[9px] font-bold">UI</span>
          </div>

          {/* Data Box (Bottom Center) */}
          <div
            onClick={() => setSection("data")}
            className={`absolute bottom-1 left-9 w-10 h-7 rounded-xl border flex items-center justify-center cursor-pointer transition-all ${
              section === "data"
                ? "bg-[var(--orchid)] border-[#ab93db] shadow-xs text-[#45324d] font-bold scale-105"
                : "bg-card border-border hover:border-[#ab93db] text-muted-foreground"
            }`}
            title="Data"
          >
            <span className="text-[9px] font-bold">Data</span>
          </div>
        </div>
      </div>

      {/* Full Resume Modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </main>
  );
}
