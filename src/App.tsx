import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  FileText,
  GraduationCap,
  Home,
  Code2,
  Database,
} from "lucide-react";
import { HueBackground } from "./components/HueBackground";
import { IntroSection } from "./components/sections/IntroSection";
import { EducationSection } from "./components/sections/EducationSection";
import { FrontendSection } from "./components/sections/FrontendSection";
import { DataSection } from "./components/sections/DataSection";
import { ResumeSection } from "./components/sections/ResumeSection";

type SectionId = "intro" | "education" | "frontend" | "data" | "resume";
type Dir = "left" | "right" | "up" | "down";

const LABELS: Record<SectionId, string> = {
  intro: "Intro",
  education: "Education",
  frontend: "Frontend",
  data: "Data",
  resume: "Resume",
};

const NEIGHBOURS: Record<SectionId, Partial<Record<Dir, SectionId>>> = {
  intro: { left: "education", right: "frontend", down: "data", up: "resume" },
  resume: { down: "intro", left: "education", right: "frontend" },
  education: { right: "intro", down: "data", up: "resume" },
  frontend: { left: "intro", down: "data", up: "resume" },
  data: { up: "intro", left: "education", right: "frontend" },
};

export default function App() {
  const [section, setSection] = useState<SectionId>("intro");

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
  const touchStartRef = useRef<{ x: number; y: number; inScrollable: boolean } | null>(null);
  const pointerStartRef = useRef<{ x: number; y: number; time: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      const target = e.target as HTMLElement;
      const inScrollable = !!target.closest(".overflow-y-auto, [data-scrollable]");
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        inScrollable,
      };
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current || e.changedTouches.length === 0) return;
    const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
    const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
    const inScrollable = touchStartRef.current.inScrollable;
    touchStartRef.current = null;

    const threshold = 45;
    if (inScrollable) {
      if (Math.abs(dx) > 65 && Math.abs(dx) > Math.abs(dy) * 1.6) {
        go(dx > 0 ? "left" : "right");
      }
      return;
    }

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
      target.closest(".overflow-y-auto") ||
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

  // Calculate 3D hardware-accelerated translate relative to Center Intro Canvas
  const getTransform = () => {
    switch (section) {
      case "intro":
        return "translate3d(0%, 0%, 0)";
      case "resume":
        return "translate3d(0%, 100vh, 0)";
      case "education":
        return "translate3d(100vw, 0%, 0)";
      case "frontend":
        return "translate3d(-100vw, 0%, 0)";
      case "data":
        return "translate3d(0%, -100vh, 0)";
    }
  };

  return (
    <main
      className="relative h-screen w-screen overflow-hidden select-none bg-[#faf8fd]"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      {/* Hue Background Blob Animation */}
      <HueBackground section={section} />

      {/* 2D Spatial Container Grid with snappy GPU hardware translation */}
      <div
        className="w-full h-full z-10 relative cursor-default"
        style={{
          transform: getTransform(),
          transition: "transform 400ms cubic-bezier(0.2, 0.9, 0.25, 1)",
          willChange: "transform",
        }}
      >
        {/* TOP PANEL: RESUME (-100vh offset relative to center) */}
        <div
          aria-hidden={section !== "resume"}
          style={{ transform: "translateZ(0)" }}
          className={`absolute -top-[100vh] left-0 w-full h-full flex items-center justify-center p-3 sm:p-6 md:p-10 overflow-hidden ${
            section === "resume" ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          <div className="w-full h-full max-w-6xl lg:max-w-7xl max-h-[88vh]">
            <ResumeSection />
          </div>
        </div>

        {/* CENTER PANEL: INTRO */}
        <div
          aria-hidden={section !== "intro"}
          style={{ transform: "translateZ(0)" }}
          className={`absolute inset-0 w-full h-full flex items-center justify-center p-3 sm:p-6 md:p-10 overflow-hidden ${
            section === "intro" ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          <div className="w-full h-full max-w-6xl lg:max-w-7xl max-h-[88vh]">
            <IntroSection onOpenResume={() => setSection("resume")} />
          </div>
        </div>

        {/* LEFT PANEL: EDUCATION (-100vw offset relative to center) */}
        <div
          aria-hidden={section !== "education"}
          style={{ transform: "translateZ(0)" }}
          className={`absolute top-0 -left-[100vw] w-full h-full flex items-center justify-center p-3 sm:p-6 md:p-10 overflow-hidden ${
            section === "education" ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          <div className="w-full h-full max-w-6xl lg:max-w-7xl max-h-[88vh]">
            <EducationSection />
          </div>
        </div>

        {/* RIGHT PANEL: FRONTEND (+100vw offset relative to center) */}
        <div
          aria-hidden={section !== "frontend"}
          style={{ transform: "translateZ(0)" }}
          className={`absolute top-0 left-[100vw] w-full h-full flex items-center justify-center p-3 sm:p-6 md:p-10 overflow-hidden ${
            section === "frontend" ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          <div className="w-full h-full max-w-6xl lg:max-w-7xl max-h-[88vh]">
            <FrontendSection />
          </div>
        </div>

        {/* BOTTOM PANEL: DATA (+100vh offset relative to center) */}
        <div
          aria-hidden={section !== "data"}
          style={{ transform: "translateZ(0)" }}
          className={`absolute top-[100vh] left-0 w-full h-full flex items-center justify-center p-3 sm:p-6 md:p-10 overflow-hidden ${
            section === "data" ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          <div className="w-full h-full max-w-6xl lg:max-w-7xl max-h-[88vh]">
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
            className={`absolute z-30 flex items-center gap-2 rounded-full border border-border bg-card/95 px-3.5 py-3 text-xs font-bold uppercase tracking-[0.22em] text-[#45324d] shadow-sm transition-all hover:bg-card hover:shadow-[var(--shadow-bubble)] hover:scale-105 cursor-pointer ${pos} no-print`}
          >
            <Icon className="size-4 shrink-0 text-[#ab93db]" />
            <span style={vertical ? { writingMode: "vertical-rl" } : undefined}>
              {LABELS[target]}
            </span>
          </button>
        );
      })}

      {/* Bottom-Left Spatial Map Radar Navigation */}
      <div className="fixed bottom-4 left-4 z-40 hidden lg:flex items-center bg-card/95 border border-border p-2 rounded-[1.5rem] shadow-xl no-print">
        <div className="relative w-28 h-24 bg-muted/60 rounded-2xl border border-border p-1">
          {/* Resume Box (Top Center) */}
          <button
            type="button"
            onClick={() => setSection("resume")}
            className={`absolute top-1 left-9 w-10 h-6 rounded-xl border flex items-center justify-center cursor-pointer transition-all ${
              section === "resume"
                ? "bg-[var(--orchid)] border-[#ab93db] shadow-xs text-[#45324d] scale-105"
                : "bg-card border-border hover:border-[#ab93db] text-muted-foreground hover:text-[#45324d]"
            }`}
            title="Resume"
            aria-label="Resume Section"
          >
            <FileText className="size-3.5" />
          </button>

          {/* Education Box (Left) */}
          <button
            type="button"
            onClick={() => setSection("education")}
            className={`absolute top-8 left-1 w-7 h-10 rounded-xl border flex items-center justify-center cursor-pointer transition-all ${
              section === "education"
                ? "bg-[var(--periwinkle)] border-[#ab93db] shadow-xs text-[#45324d] scale-105"
                : "bg-card border-border hover:border-[#ab93db] text-muted-foreground hover:text-[#45324d]"
            }`}
            title="Education"
            aria-label="Education Section"
          >
            <GraduationCap className="size-3.5" />
          </button>

          {/* Intro Box (Center) */}
          <button
            type="button"
            onClick={() => setSection("intro")}
            className={`absolute top-8 left-9 w-10 h-8 rounded-xl border flex items-center justify-center cursor-pointer transition-all ${
              section === "intro"
                ? "bg-[var(--lilac)] border-[#ab93db] shadow-xs text-[#45324d] scale-105"
                : "bg-card border-border hover:border-[#ab93db] text-muted-foreground hover:text-[#45324d]"
            }`}
            title="Intro (Home)"
            aria-label="Intro Section"
          >
            <Home className="size-3.5" />
          </button>

          {/* Frontend Box (Right) */}
          <button
            type="button"
            onClick={() => setSection("frontend")}
            className={`absolute top-8 right-1 w-7 h-10 rounded-xl border flex items-center justify-center cursor-pointer transition-all ${
              section === "frontend"
                ? "bg-[var(--petal)] border-[#ab93db] shadow-xs text-[#45324d] scale-105"
                : "bg-card border-border hover:border-[#ab93db] text-muted-foreground hover:text-[#45324d]"
            }`}
            title="Frontend & Engineering"
            aria-label="Frontend Section"
          >
            <Code2 className="size-3.5" />
          </button>

          {/* Data Box (Bottom Center) */}
          <button
            type="button"
            onClick={() => setSection("data")}
            className={`absolute bottom-1 left-9 w-10 h-6 rounded-xl border flex items-center justify-center cursor-pointer transition-all ${
              section === "data"
                ? "bg-[var(--orchid)] border-[#ab93db] shadow-xs text-[#45324d] scale-105"
                : "bg-card border-border hover:border-[#ab93db] text-muted-foreground hover:text-[#45324d]"
            }`}
            title="Data & Systems"
            aria-label="Data Section"
          >
            <Database className="size-3.5" />
          </button>
        </div>
      </div>
    </main>
  );
}
