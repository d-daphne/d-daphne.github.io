import { motion } from "framer-motion";

const PALETTES = {
  intro: ["var(--periwinkle)", "var(--blossom)", "var(--petal)", "var(--lilac)"],
  education: ["var(--lilac)", "var(--periwinkle)", "var(--orchid)", "var(--blossom)"],
  frontend: ["var(--petal)", "var(--orchid)", "var(--blossom)", "var(--periwinkle)"],
  data: ["var(--iris)", "var(--periwinkle)", "var(--lilac)", "var(--petal)"],
} as const;

type PaletteKey = keyof typeof PALETTES;

const BLOBS = [
  { size: 46, x: "-8%", y: "-12%", delay: 0 },
  { size: 38, x: "62%", y: "-6%", delay: 2.5 },
  { size: 42, x: "70%", y: "58%", delay: 5 },
  { size: 34, x: "4%", y: "62%", delay: 7.5 },
] as const;

export function HueBackground({ section }: { section: string }) {
  const key = (section in PALETTES ? section : "intro") as PaletteKey;
  const colors = PALETTES[key];

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {BLOBS.map((blob, i) => (
        <motion.div
          key={i}
          className="hue-blob"
          style={{
            width: `${blob.size}vw`,
            height: `${blob.size}vw`,
            left: blob.x,
            top: blob.y,
            animationDelay: `${blob.delay}s`,
          }}
          animate={{ backgroundColor: colors[i % colors.length] as string }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />
      ))}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(color-mix(in oklab, var(--iris) 18%, transparent) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(circle at 50% 45%, black 30%, transparent 78%)",
        }}
      />
    </div>
  );
}
