import React, { useState } from 'react';
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
  const diameter = `min(${project.size * 14}rem, ${project.size * 30}vh)`;

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      layoutId={`bubble-${project.id}`}
      className="absolute grid place-items-center rounded-full border border-border/80 px-4 text-center cursor-pointer select-none"
      style={{
        left: `${project.x}%`,
        top: `${project.y}%`,
        width: diameter,
        aspectRatio: '1',
        translate: '-50% -50%',
        background: `radial-gradient(circle at 32% 28%, color-mix(in oklab, ${project.tint} 92%, white), color-mix(in oklab, ${project.tint} 60%, transparent))`,
        boxShadow: 'var(--shadow-bubble)',
        opacity: isOpen ? 0 : 1,
        pointerEvents: isOpen ? 'none' : 'auto',
      }}
      transition={{ type: 'spring', stiffness: 280, damping: 24 }}
      whileHover={{ scale: 1.12, rotate: index % 2 ? 3 : -3 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Inner floating container for y keyframes */}
      <motion.span 
        className="pointer-events-none flex flex-col items-center justify-center p-3"
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 5 + index * 0.7,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: index * 0.4,
        }}
      >
        <span className="block text-[clamp(0.9rem,1.8vw,1.35rem)] font-extrabold leading-tight text-[#45324d]">
          {project.name}
        </span>
        <span className="mt-1 block text-[clamp(0.65rem,1.1vw,0.85rem)] font-extrabold text-muted-foreground">
          {project.stack[0]}
        </span>
      </motion.span>
    </motion.button>
  );
}

export function FrontendSection() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

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
        className="relative h-full w-full overflow-hidden"
        onClick={(e) => {
          if (e.target === e.currentTarget) handleClose();
        }}
      >
        {frontendProjects.map((project, i) => (
          <Bubble
            key={project.id}
            project={project}
            index={i}
            isOpen={active?.id === project.id}
            onOpen={() => handleOpen(project.id)}
          />
        ))}

        <AnimatePresence mode="wait">
          {active && (
            <motion.div
              key={active.id}
              layoutId={`bubble-${active.id}`}
              className="absolute left-1/2 top-1/2 z-30 w-[min(94%,52rem)] max-h-[85vh] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-[2.5rem] border border-border p-7 sm:p-9 shadow-2xl backdrop-blur-xl"
              style={{
                background: `linear-gradient(150deg, color-mix(in oklab, ${active.tint} 65%, var(--background)), var(--background))`,
                boxShadow: 'var(--shadow-soft)',
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
              transition={{ type: 'spring', stiffness: 280, damping: 24 }}
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
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-800 flex items-center justify-center shadow backdrop-blur transition-all"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() =>
                              setActiveImageIndex((prev) =>
                                prev === active.images.length - 1 ? 0 : prev + 1
                              )
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-800 flex items-center justify-center shadow backdrop-blur transition-all"
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
