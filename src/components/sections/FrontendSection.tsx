import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionShell } from '@/components/SectionShell';
import { frontendProjects, type Project } from '@/data/portfolio';

function ImagePlaceholder({ tint, label }: { tint: string; label: string }) {
  return (
    <div
      className="grid aspect-[16/10] w-full place-items-center rounded-2xl border border-border"
      style={{
        background: `linear-gradient(135deg, color-mix(in oklab, ${tint} 70%, transparent), color-mix(in oklab, var(--blossom) 70%, transparent))`,
      }}
    >
      <span className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

function Bubble({
  project,
  onOpen,
  index,
  isOpen,
}: {
  project: Project;
  onOpen: () => void;
  index: number;
  isOpen: boolean;
}) {
  const diameter = `clamp(${project.size * 135}px, ${project.size * 15}vw, ${project.size * 190}px)`;
  const floatClass = `bubble-float-${(index % 3) + 1}`;

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style={{
        left: `${project.x}%`,
        top: `${project.y}%`,
        zIndex: isOpen ? 0 : 10,
      }}
    >
      <motion.button
        type="button"
        onClick={onOpen}
        className="pointer-events-auto relative grid place-items-center rounded-full border border-border/80 text-center cursor-pointer select-none transition-shadow duration-300 hover:shadow-xl group"
        style={{
          width: diameter,
          height: diameter,
          background: `radial-gradient(circle at 35% 30%, color-mix(in oklab, ${project.tint} 94%, white), color-mix(in oklab, ${project.tint} 65%, transparent))`,
          boxShadow: 'var(--shadow-bubble)',
          opacity: isOpen ? 0 : 1,
        }}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 380, damping: 26 }}
      >
        {/* Inner floating container for organic multi-axis keyframes */}
        <span 
          className={`pointer-events-none flex flex-col items-center justify-center p-3 sm:p-4 ${floatClass}`}
          style={{
            animationDuration: `${6.5 + index * 0.8}s`,
            animationDelay: `${index * 0.45}s`,
          }}
        >
          <span className="block text-[clamp(0.85rem,1.3vw,1.25rem)] font-extrabold leading-tight text-[#45324d] group-hover:text-primary transition-colors">
            {project.name}
          </span>
          <span className="mt-1 block text-[clamp(0.65rem,0.9vw,0.8rem)] font-extrabold text-muted-foreground">
            {project.stack[0]}
          </span>
          <span className="mt-1 text-[10px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
            View &rarr;
          </span>
        </span>
      </motion.button>
    </div>
  );
}

export function FrontendSection() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  // Preload all project images immediately into browser cache
  useEffect(() => {
    frontendProjects.forEach((p) => {
      p.images?.forEach((src) => {
        const fullSrc = src.startsWith("http")
          ? src
          : `${import.meta.env.BASE_URL}${src.replace(/^\.?\//, "")}`;
        const img = new Image();
        img.src = fullSrc;
      });
    });
  }, []);

  const active = frontendProjects.find((p) => p.id === openId) ?? null;

  const handleOpen = (id: string) => {
    setOpenId(id);
    setActiveImageIndex(0);
  };

  const handleClose = () => {
    setOpenId(null);
  };

  return (
    <SectionShell kicker="Things I've built" title="Frontend & Engineering" boxed={false}>
      <div
        className="relative h-full w-full"
        onClick={(e) => {
          if (e.target === e.currentTarget) handleClose();
        }}
      >
        {/* Constellation Orbit Connection Lines */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          <line
            x1="50%"
            y1="46%"
            x2="20%"
            y2="32%"
            stroke="color-mix(in oklab, var(--iris) 18%, transparent)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />
          <line
            x1="50%"
            y1="46%"
            x2="80%"
            y2="32%"
            stroke="color-mix(in oklab, var(--iris) 18%, transparent)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />
          <line
            x1="50%"
            y1="46%"
            x2="24%"
            y2="65%"
            stroke="color-mix(in oklab, var(--iris) 18%, transparent)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />
          <line
            x1="50%"
            y1="46%"
            x2="76%"
            y2="65%"
            stroke="color-mix(in oklab, var(--iris) 18%, transparent)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />
        </svg>

        {frontendProjects.map((project, i) => (
          <Bubble
            key={project.id}
            project={project}
            index={i}
            isOpen={active?.id === project.id}
            onOpen={() => handleOpen(project.id)}
          />
        ))}

        <AnimatePresence>
          {active && (
            <motion.div
              key={active.id}
              className="absolute left-1/2 top-1/2 z-30 w-[min(94%,52rem)] max-h-[85vh] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-[2.5rem] border border-border p-7 sm:p-9 shadow-2xl bg-card/95"
              style={{
                background: `linear-gradient(150deg, color-mix(in oklab, ${active.tint} 45%, var(--card)), var(--card))`,
                boxShadow: 'var(--shadow-soft)',
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close project"
                className="absolute right-5 top-5 grid size-10 place-items-center rounded-full border border-border bg-card text-[#45324d] transition-transform hover:rotate-90 hover:scale-110 shadow-sm cursor-pointer z-10"
              >
                <X className="size-5" />
              </button>

              <div className="grid gap-6 sm:grid-cols-[1.15fr_1fr]">
                <div className="min-w-0 flex flex-col justify-between">
                  <div>
                    <h3 className="text-3xl font-extrabold sm:text-4xl text-[#45324d]">{active.name}</h3>
                    <p className="mt-1.5 text-base font-bold text-muted-foreground">
                      {active.tagline}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {active.stack.map((s) => (
                        <span
                          key={s}
                          className="rounded-full bg-card px-3.5 py-1.5 text-xs font-bold text-[#45324d] border border-white/60 shadow-xs"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    <ul className="mt-5 space-y-2.5 text-sm sm:text-base leading-relaxed text-slate-700 font-medium">
                      {active.details.map((d) => (
                        <li key={d} className="flex gap-2.5">
                          <span aria-hidden className="mt-2 size-2 shrink-0 rounded-full bg-primary" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3 pt-4 border-t border-border">
                    {active.githubUrl && (
                      <a
                        href={active.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-[#45324d] px-5 py-2.5 text-sm font-extrabold text-white transition-transform hover:scale-105 shadow-md"
                      >
                        <Github className="size-4" /> Repository
                      </a>
                    )}
                    {active.demoUrl && (
                      <a
                        href={active.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-extrabold text-[#45324d] transition-transform hover:scale-105 shadow-sm"
                      >
                        <ExternalLink className="size-4 text-[#ab93db]" /> Live Demo
                      </a>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  {active.images && active.images.length > 0 ? (
                    <div className="relative aspect-[16/10] w-full rounded-3xl border border-border overflow-hidden bg-slate-100 shadow-md group">
                      <img
                        src={active.images[activeImageIndex].startsWith("http") ? active.images[activeImageIndex] : `${import.meta.env.BASE_URL}${active.images[activeImageIndex].replace(/^\.?\//, "")}`}
                        alt={`${active.name} preview`}
                        decoding="async"
                        // @ts-expect-error React 19 / modern HTML standard fetchpriority attribute
                        fetchpriority="high"
                        className="w-full h-full object-cover object-top"
                      />
                      {active.images.length > 1 && (
                        <>
                          <button
                            onClick={() =>
                              setActiveImageIndex((prev) =>
                                prev === 0 ? active.images.length - 1 : prev - 1
                              )
                            }
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow transition-all cursor-pointer"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() =>
                              setActiveImageIndex((prev) =>
                                prev === active.images.length - 1 ? 0 : prev + 1
                              )
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow transition-all cursor-pointer"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </>
                      )}
                    </div>
                  ) : (
                    <ImagePlaceholder tint={active.tint} label={`${active.name} Architecture`} />
                  )}

                  <ImagePlaceholder tint="var(--periwinkle)" label="System Workflow & Models" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionShell>
  );
}
