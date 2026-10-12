import { motion } from "framer-motion";
import { SectionShell } from "@/components/SectionShell";
import { dataRoles } from "@/data/portfolio";

const TINTS = ["var(--periwinkle)", "var(--petal)"];

export function DataSection() {
  return (
    <SectionShell kicker="Where I work with numbers" title="Data">
      <div className="grid h-full gap-5 overflow-y-auto pr-1 md:grid-cols-2 md:overflow-visible">
        {dataRoles.map((role, i) => (
          <motion.article
            key={role.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -6 }}
            className="flex flex-col rounded-[2rem] border border-border p-6 md:overflow-y-auto"
            style={{
              background: `linear-gradient(160deg, color-mix(in oklab, ${TINTS[i % TINTS.length]} 48%, transparent), color-mix(in oklab, var(--background) 90%, transparent))`,
            }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              {role.period}
            </p>
            <h3 className="mt-2 text-2xl font-bold">{role.org}</h3>
            <p className="text-sm font-semibold text-muted-foreground">
              {role.role} · {role.location}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{role.blurb}</p>

            <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-muted-foreground">
              {role.bullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {role.tools.map((t) => (
                <span key={t} className="rounded-full bg-card px-2.5 py-1 text-xs font-semibold">
                  {t}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </SectionShell>
  );
}
