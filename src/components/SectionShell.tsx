import type { ReactNode } from "react";

export function SectionShell({
  title,
  kicker,
  children,
}: {
  title: string;
  kicker?: string;
  children: ReactNode;
}) {
  return (
    <div className="glass-panel flex h-full w-full flex-col rounded-[2.5rem] p-6 sm:p-9">
      <header className="mb-5 text-center">
        {kicker ? (
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
            {kicker}
          </p>
        ) : null}
        <h2 className="mt-1 text-3xl font-bold sm:text-4xl">
          <span className="text-gradient">{title}</span>
        </h2>
      </header>
      <div className="min-h-0 flex-1">{children}</div>
    </div>
  );
}
