import type { ReactNode } from "react";

export function SectionShell({
  title,
  kicker,
  children,
  boxed = true,
}: {
  title: string;
  kicker?: string;
  children: ReactNode;
  boxed?: boolean;
}) {
  if (!boxed) {
    return (
      <div className="flex h-full w-full flex-col px-2 sm:px-4 py-1 sm:py-2 relative overflow-hidden">
        <header className="mb-3 sm:mb-4 text-center shrink-0">
          {kicker ? (
            <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-muted-foreground">
              {kicker}
            </p>
          ) : null}
          <h2 className="mt-0.5 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            <span className="text-gradient">{title}</span>
          </h2>
        </header>
        <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
      </div>
    );
  }

  return (
    <div className="glass-panel flex h-full w-full flex-col rounded-[2.5rem] p-5 sm:p-7 md:p-8 overflow-hidden shadow-2xl">
      <header className="mb-4 text-center shrink-0">
        {kicker ? (
          <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-muted-foreground">
            {kicker}
          </p>
        ) : null}
        <h2 className="mt-1 text-3xl font-extrabold sm:text-4xl">
          <span className="text-gradient">{title}</span>
        </h2>
      </header>
      <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
