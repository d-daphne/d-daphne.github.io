import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { SectionShell } from "@/components/SectionShell";
import { certifications, education, skillGroups } from "@/data/portfolio";

export function EducationSection() {
  const [featured, ...rest] = education;

  return (
    <SectionShell kicker="Where it started" title="Education">
      <div className="flex h-full flex-col gap-3.5 overflow-y-auto pr-1">
        {featured ? (
          <motion.article
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[1.75rem] border border-border p-4 sm:p-5 shadow-xs backdrop-blur-md"
            style={{ background: "color-mix(in oklab, var(--periwinkle) 45%, transparent)" }}
          >
            <div className="flex items-start gap-3.5">
              <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-card shadow-xs">
                <GraduationCap className="size-5 text-[#ab93db]" />
              </span>
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#45324d] leading-tight">
                  {featured.program}
                </h3>
                <p className="mt-0.5 text-xs sm:text-sm font-extrabold text-muted-foreground">
                  {featured.school} · {featured.location}
                </p>
                <p className="mt-1.5 text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
                  {featured.details}
                </p>
              </div>
            </div>
          </motion.article>
        ) : null}

        {rest.map((item, i) => (
          <motion.article
            key={item.school}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 * (i + 1) }}
            className="rounded-[1.5rem] border border-border bg-card/90 p-3.5 sm:p-4 shadow-2xs backdrop-blur-md"
          >
            <h3 className="text-base sm:text-lg font-extrabold text-[#45324d]">{item.program}</h3>
            <p className="mt-0.5 text-xs sm:text-sm font-bold text-muted-foreground">
              {item.school} · {item.location}
            </p>
            <p className="mt-1 text-xs text-slate-700 font-medium">
              {item.details}
            </p>
          </motion.article>
        ))}

        <div>
          <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.24em] text-muted-foreground">
            Certifications
          </p>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {certifications.map((c, i) => (
              <motion.div
                key={c.code}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.08 + i * 0.04 }}
                whileHover={{ y: -2, rotate: i % 2 ? 1.5 : -1.5 }}
                className="rounded-2xl border border-border p-3 shadow-2xs backdrop-blur-md"
                style={{
                  background: `color-mix(in oklab, var(--${["lilac", "blossom", "petal", "orchid"][i % 4]}) 50%, transparent)`,
                }}
              >
                <p className="text-base font-extrabold text-[#45324d]">{c.code}</p>
                <p className="mt-0.5 text-xs leading-snug font-bold text-slate-800">{c.label}</p>
                <p className="mt-0.5 text-[10px] font-semibold text-muted-foreground">
                  {c.issuer} · {c.year}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.24em] text-muted-foreground">
            Toolbox
          </p>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {skillGroups.map((group) => (
              <div key={group.title} className="rounded-2xl border border-border bg-card/90 p-3 shadow-2xs backdrop-blur-md">
                <p className="text-xs font-extrabold text-[#45324d]">{group.title}</p>
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-muted/80 px-2.5 py-0.5 text-xs font-bold text-muted-foreground"
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
    </SectionShell>
  );
}
