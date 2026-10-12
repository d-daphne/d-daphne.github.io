import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, FileText } from 'lucide-react';
import { contact } from '@/data/portfolio';

interface IntroSectionProps {
  onOpenResume?: () => void;
}

export const IntroSection: React.FC<IntroSectionProps> = ({ onOpenResume }) => {
  return (
    <div className="glass-panel relative flex h-full w-full flex-col items-center justify-center rounded-[2.5rem] px-6 text-center overflow-hidden">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.34em] text-muted-foreground"
      >
        Data & Systems Analyst · Frontend Tinkerer
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.16, type: 'spring', stiffness: 120, damping: 14 }}
        className="mt-4 text-5xl font-extrabold leading-[1.05] sm:text-7xl"
      >
        <span className="text-gradient">{contact.name}</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.26 }}
        className="mt-5 max-w-xl text-base leading-relaxed text-slate-700 font-semibold sm:text-lg"
      >
        I turn messy operational data into dashboards people actually use — and build calm,
        colourful interfaces around them. Power BI and SQL by day, React and Tailwind for fun.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.34 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-3"
      >
        <a
          href={`mailto:${contact.email}`}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5 shadow-md"
        >
          <Mail className="size-4" /> {contact.email}
        </a>

        {onOpenResume && (
          <button
            onClick={onOpenResume}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[#e7b1e8]/30 px-5 py-2.5 text-sm font-bold text-[#45324d] transition-transform hover:-translate-y-0.5 hover:bg-[#e7b1e8]/50 shadow-xs cursor-pointer"
          >
            <FileText className="size-4 text-[#ab93db]" /> View Resume
          </button>
        )}

        <a
          href={contact.linkedin}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-card px-5 py-2.5 text-sm font-bold transition-transform hover:-translate-y-0.5 shadow-xs"
        >
          <Linkedin className="size-4 text-[#0A66C2]" /> LinkedIn
        </a>

        <a
          href={contact.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-card px-5 py-2.5 text-sm font-bold transition-transform hover:-translate-y-0.5 shadow-xs"
        >
          <Github className="size-4 text-slate-900" /> GitHub
        </a>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-10 text-xs font-bold text-muted-foreground"
      >
        Drag, swipe or click directional arrows to explore the map.
      </motion.p>
    </div>
  );
};
