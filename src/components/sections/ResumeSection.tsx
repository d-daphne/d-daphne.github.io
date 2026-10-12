import React from 'react';
import { motion } from 'framer-motion';
import { Printer, Mail, Linkedin, Github, GraduationCap, Award, Briefcase, Sparkles, Wrench } from 'lucide-react';
import { SectionShell } from '@/components/SectionShell';
import { contact, dataRoles, certifications, education, skillGroups } from '@/data/portfolio';

export const ResumeSection: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <SectionShell kicker="Curriculum Vitae" title="Resume">
      <div id="printable-resume" className="flex h-full flex-col gap-4 overflow-y-auto pr-1">
        {/* Top Header & Print Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5 rounded-[1.75rem] border border-border bg-card/90 shadow-xs backdrop-blur-md">
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#45324d] flex items-center gap-2">
              <span>{contact.name}</span>
              <Sparkles className="size-4 text-[#ab93db]" />
            </h3>
            <p className="text-xs font-bold text-muted-foreground mt-0.5">
              Data & Systems Analyst · {contact.email}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 no-print">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 rounded-full bg-[#45324d] px-4 py-2 text-xs font-extrabold text-white transition-transform hover:scale-105 shadow-md cursor-pointer"
            >
              <Printer className="size-3.5" /> Print / Save PDF
            </button>
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-2 text-xs font-bold text-[#45324d] transition-transform hover:scale-105 shadow-2xs"
            >
              <Mail className="size-3.5 text-[#ab93db]" /> Email
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-2 text-xs font-bold text-[#45324d] transition-transform hover:scale-105 shadow-2xs"
            >
              <Linkedin className="size-3.5 text-[#0A66C2]" /> LinkedIn
            </a>
            <a
              href={contact.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-2 text-xs font-bold text-[#45324d] transition-transform hover:scale-105 shadow-2xs"
            >
              <Github className="size-3.5 text-slate-900" /> GitHub
            </a>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="p-4 sm:p-5 rounded-[1.75rem] border border-border bg-muted/40 backdrop-blur-md">
          <p className="text-xs sm:text-sm font-semibold text-slate-700 leading-relaxed">
            {contact.summary}
          </p>
        </div>

        {/* Grid of Resume Content */}
        <div className="grid gap-4 md:grid-cols-12">
          {/* Left Column: Work Experience (7 cols) */}
          <div className="md:col-span-7 flex flex-col gap-3.5">
            <p className="text-xs font-extrabold uppercase tracking-[0.26em] text-muted-foreground flex items-center gap-1.5">
              <Briefcase className="size-3.5 text-[#ab93db]" />
              <span>Work Experience</span>
            </p>

            {dataRoles.map((exp, i) => (
              <motion.article
                key={exp.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * (i + 1) }}
                className="rounded-[1.75rem] border border-border bg-card/90 p-4 sm:p-5 shadow-2xs backdrop-blur-md"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h4 className="text-base sm:text-lg font-extrabold text-[#45324d]">{exp.role}</h4>
                  <span className="text-xs font-extrabold text-muted-foreground">{exp.period}</span>
                </div>
                <p className="text-xs font-extrabold text-primary">{exp.org} · {exp.location}</p>

                <ul className="mt-2.5 space-y-2 text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                  {exp.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-3 flex flex-wrap gap-1.5 pt-2 border-t border-border/50">
                  {exp.tools.map((t) => (
                    <span key={t} className="rounded-full bg-muted/80 px-2.5 py-0.5 text-[11px] font-bold text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>

          {/* Right Column: Education, Certs & Toolbox (5 cols) */}
          <div className="md:col-span-5 flex flex-col gap-4">
            {/* Certifications */}
            <div>
              <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.26em] text-muted-foreground flex items-center gap-1.5">
                <Award className="size-3.5 text-[#ab93db]" />
                <span>Certifications</span>
              </p>
              <div className="grid grid-cols-2 gap-2">
                {certifications.map((c, idx) => (
                  <div
                    key={c.code}
                    className="rounded-2xl border border-border p-3 shadow-2xs backdrop-blur-md"
                    style={{
                      background: `color-mix(in oklab, var(--${["lilac", "blossom", "petal", "orchid"][idx % 4]}) 50%, transparent)`,
                    }}
                  >
                    <p className="text-sm font-extrabold text-[#45324d]">{c.code}</p>
                    <p className="mt-0.5 text-[11px] leading-snug font-bold text-slate-800 line-clamp-2">{c.label}</p>
                    <p className="mt-0.5 text-[10px] font-semibold text-muted-foreground">
                      {c.issuer} · {c.year}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.26em] text-muted-foreground flex items-center gap-1.5">
                <GraduationCap className="size-3.5 text-[#ab93db]" />
                <span>Education</span>
              </p>
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.school} className="rounded-2xl border border-border bg-card/90 p-3 shadow-2xs">
                    <p className="text-xs sm:text-sm font-extrabold text-[#45324d]">{edu.program}</p>
                    <p className="text-[11px] font-bold text-muted-foreground">{edu.school} · {edu.location}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Toolbox */}
            <div>
              <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.26em] text-muted-foreground flex items-center gap-1.5">
                <Wrench className="size-3.5 text-[#ab93db]" />
                <span>Technical Skills</span>
              </p>
              <div className="space-y-2">
                {skillGroups.map((group) => (
                  <div key={group.title} className="rounded-2xl border border-border bg-card/90 p-3 shadow-2xs">
                    <p className="text-xs font-extrabold text-[#45324d]">{group.title}</p>
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-full bg-muted/80 px-2 py-0.5 text-[11px] font-bold text-muted-foreground"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
};
