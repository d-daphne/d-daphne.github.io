import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { SectionShell } from "@/components/SectionShell";
import { certifications, education, skillGroups } from "@/data/portfolio";

export function EducationSection() {
  const [featured, ...rest] = education;
  if (!featured) return null;

  return (
    <SectionShell kicker="Where it started" title="Education">
      <div className="flex h-full flex-col gap-5 overflow-y-auto pr-1">
        <motion.article
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[2rem] border border-border p-6"
          style={{ background: "color-mix(in oklab, var(--periwinkle) 42%, transparent)" }}
        >
          <div className="flex items-start gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-card">
              <GraduationCap className="size-5" />
            </span>
            <div>
              <h3 className="text-2xl font-bold sm:text-3xl">{featured.program}</h3>
              <p className="mt-1 text-sm font-semibold text-muted-foreground">
                {featured.school} · {featured.location}
              </p>
            </div>
          </div>
        </motion.article>

        {rest.map((item, i) => (
          <motion.article
            key={item.school}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 * (i + 1) }}
            className="rounded-[1.75rem] border border-border bg-card p-5"
          >
            <h3 className="text-lg font-bold">{item.program}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {item.school} · {item.location}
            </p>
          </motion.article>
        ))}

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Certifications
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {certifications.map((c, i) => (
              <motion.div
                key={c.code}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + i * 0.06 }}
                whileHover={{ y: -4, rotate: i % 2 ? 1.5 : -1.5 }}
                className="rounded-3xl border border-border p-4"
                style={{
                  background: `color-mix(in oklab, var(--${["lilac", "blossom", "petal", "orchid"][i % 4]}) 55%, transparent)`,
                }}
              >
                <p className="text-base font-bold">{c.code}</p>
                <p className="mt-1 text-xs leading-snug text-muted-foreground">{c.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Toolbox
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {skillGroups.map((group) => (
              <div key={group.title} className="rounded-3xl border border-border bg-card p-4">
                <p className="text-sm font-bold">{group.title}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground"
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
