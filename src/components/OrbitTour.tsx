"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionTemplate,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import Planet from "./Planet";
import { PLANETS, SUN_TEXTURE, MOON_TEXTURE, type Planet as P } from "@/lib/planets";

const N = PLANETS.length;
const STEP = (Math.PI * 2) / N;

// Geometri orbit (persen dari panggung). Desktop: fokus di kiri, panel di kanan.
// Mobile: orbit di atas, fokus di bawah-tengah, panel jadi bottom-sheet.
type Geo = { CX: number; CY: number; RX: number; RY: number; FOCAL: number };
const DESKTOP: Geo = { CX: 32, CY: 46, RX: 21, RY: 31, FOCAL: Math.PI };
const MOBILE: Geo = { CX: 50, CY: 23, RX: 32, RY: 15, FOCAL: Math.PI / 2 };

const nf = new Intl.NumberFormat("id-ID");

// ukuran dasar tiap planet (skala lembut dari diameter agar tetap terbaca)
const sizes = (() => {
  const ds = PLANETS.map((p) => Math.log(p.diameterKm));
  const min = Math.min(...ds);
  const max = Math.max(...ds);
  return PLANETS.map((p) => 44 + 52 * ((Math.log(p.diameterKm) - min) / (max - min)));
})();

function OrbitBody({
  planet,
  index,
  base,
  progress,
  geo,
}: {
  planet: P;
  index: number;
  base: number;
  progress: MotionValue<number>;
  geo: Geo;
}) {
  const angle = useTransform(progress, (p) => geo.FOCAL + index * STEP - p * (N - 1) * STEP);
  const left = useTransform(angle, (a) => `${geo.CX + geo.RX * Math.cos(a)}%`);
  const top = useTransform(angle, (a) => `${geo.CY + geo.RY * Math.sin(a)}%`);
  const t = useTransform(angle, (a) => (Math.cos(a - geo.FOCAL) + 1) / 2); // 1 = fokus
  const scale = useTransform(t, (v) => 0.45 + 1.12 * v * v * v * v); // falloff tajam: fokus menonjol
  const opacity = useTransform(t, (v) => 0.4 + 0.6 * v);
  const zIndex = useTransform(t, (v) => Math.round(10 + v * 90));

  return (
    <motion.div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left, top, scale, opacity, zIndex }}
    >
      <Planet
        texture={planet.texture}
        size={base}
        spin={planet.spin}
        glow={planet.glow}
        ring={planet.ring}
      />
    </motion.div>
  );
}

function MoonOrbit({
  planet,
  index,
  size,
  progress,
  geo,
}: {
  planet: P;
  index: number;
  size: number;
  progress: MotionValue<number>;
  geo: Geo;
}) {
  const reduce = useReducedMotion();
  const angle = useTransform(progress, (p) => geo.FOCAL + index * STEP - p * (N - 1) * STEP);
  const left = useTransform(angle, (a) => `${geo.CX + geo.RX * Math.cos(a)}%`);
  const top = useTransform(angle, (a) => `${geo.CY + geo.RY * Math.sin(a)}%`);
  const moons = planet.bulan;
  if (moons.length === 0) return null;
  const r = size * 0.7 + 26;
  return (
    <motion.div
      className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left, top, width: r * 2, height: r * 2, zIndex: 120 }}
    >
      {moons.map((m, i) => (
        <div
          key={m.nama}
          className="absolute inset-0"
          style={{
            animation: reduce
              ? "none"
              : `moon-orbit ${16 + i * 5}s linear infinite`,
            transform: reduce ? `rotate(${i * (360 / moons.length)}deg)` : undefined,
          }}
        >
          <div
            className="absolute left-1/2 top-0 -translate-x-1/2 rounded-full"
            style={{
              width: 12,
              height: 12,
              backgroundImage: `url(${MOON_TEXTURE})`,
              backgroundSize: "200% 100%",
              boxShadow: "inset -3px -3px 5px rgba(0,0,0,.7)",
            }}
            title={m.nama}
          />
        </div>
      ))}
    </motion.div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-l border-white/15 pl-3">
      <div className="text-[11px] uppercase tracking-wider text-[var(--color-muted)]">{label}</div>
      <div className="mt-0.5 text-sm text-foreground">{value}</div>
    </div>
  );
}

function DetailPanel({ planet }: { planet: P }) {
  const [moon, setMoon] = useState<number | null>(null);
  return (
    <motion.div
      key={planet.id}
      initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -16, filter: "blur(12px)" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-auto w-full max-w-xl"
    >
      <p className="text-sm text-[var(--color-muted)]">
        Planet ke-{planet.urutan} dari Matahari
      </p>
      <h2 className="mt-1 font-serif text-5xl leading-none text-foreground sm:text-6xl md:text-7xl">
        {planet.nama}
      </h2>
      <p className="mt-3 max-w-md text-[15px] italic text-[var(--color-muted)]">
        {planet.julukan}
      </p>

      <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
        <Stat label="Diameter" value={`${nf.format(planet.diameterKm)} km`} />
        <Stat label="Jarak Matahari" value={`${nf.format(planet.jarakJutaKm)} juta km`} />
        <Stat label="Suhu" value={planet.suhu} />
        <Stat label="1 hari" value={planet.rotasi} />
        <Stat label="1 tahun" value={planet.revolusi} />
        <Stat label="Satelit" value={planet.satelit === 0 ? "Tidak ada" : `${planet.satelit} diketahui`} />
      </div>

      <p className="mt-6 max-w-md text-[15px] leading-relaxed text-foreground/85">
        {planet.fenomena}
      </p>

      <ul className="mt-4 hidden max-w-md space-y-1.5 sm:block">{/* ponytail: fakta disembunyikan di HP agar bottom-sheet muat */}
        {planet.fakta.map((f) => (
          <li key={f} className="flex gap-2 text-sm text-foreground/75">
            <span className="text-accent">·</span>
            {f}
          </li>
        ))}
      </ul>

      {planet.bulan.length > 0 && (
        <div className="mt-6 max-w-md">
          <div className="text-[11px] uppercase tracking-wider text-[var(--color-muted)]">
            Satelit utama, klik untuk fakta
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {planet.bulan.map((m, i) => (
              <button
                key={m.nama}
                onClick={() => setMoon(moon === i ? null : i)}
                className={`rounded-full border px-3 py-1 text-sm transition-colors ${
                  moon === i
                    ? "border-accent bg-accent/15 text-accent"
                    : "border-white/20 text-foreground/80 hover:border-white/40"
                }`}
              >
                {m.nama}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            {moon !== null && (
              <motion.p
                key={moon}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 text-sm leading-relaxed text-foreground/80"
              >
                {planet.bulan[moon].fakta}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}

export default function OrbitTour() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [focus, setFocus] = useState(0);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const geo = mobile ? MOBILE : DESKTOP;

  // --- Timeline koreografi (ala reference) ---
  // 0    -> 0.10 : intro, video luar angkasa + judul
  // 0.10 -> 0.18 : reveal, clip-path lingkaran membuka -> orbit muncul
  // 0.18 -> 0.88 : tur, planet zoom + panel detail
  // 0.88 -> 1    : outro, zoom out ke gelap
  const introOpacity = useTransform(scrollYProgress, [0, 0.06, 0.12], [1, 1, 0]);
  const introBlur = useTransform(scrollYProgress, [0.05, 0.12], [0, 14]);
  const introFilter = useMotionTemplate`blur(${introBlur}px)`;
  const introY = useTransform(scrollYProgress, [0.05, 0.12], [0, -36]);

  // scrim menggelapkan video saat orbit muncul (panel terbaca) lalu penuh di outro
  // agar serah-terima ke section rekap mulus
  const scrim = useTransform(
    scrollYProgress,
    [0.06, 0.18, 0.9, 1],
    [0.25, 0.72, 0.72, 0.97],
    { clamp: true },
  );

  // reveal: lingkaran membuka dari pusat orbit
  const revealPct = useTransform(scrollYProgress, [0.1, 0.18], [0, 165], { clamp: true });
  const clip = useMotionTemplate`circle(${revealPct}% at ${geo.CX}% ${geo.CY}%)`;

  // zoom amplop + plateau (planet membesar saat masuk, mengecil saat keluar)
  const bloom = useTransform(scrollYProgress, [0.1, 0.2, 0.86, 1], [0.5, 1, 1, 0.5]);

  // pp = progres planet bergerak, hanya selama fase tur
  const pp = useTransform(scrollYProgress, [0.18, 0.88], [0, 1], { clamp: true });

  // UI (panel + dots) hanya muncul setelah reveal
  const uiOpacity = useTransform(scrollYProgress, [0.15, 0.2], [0, 1], { clamp: true });

  useMotionValueEvent(pp, "change", (v) => {
    const i = Math.min(N - 1, Math.max(0, Math.round(v * (N - 1))));
    if (i !== focus) setFocus(i);
  });

  const focused = PLANETS[focus];
  const focusedSize = sizes[focus] * 1.55; // sesuai puncak skala fokus

  return (
    <section ref={ref} className="relative" style={{ height: `${N * 90 + 140}vh` }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* video luar angkasa, autoplay loop; fallback = starfield di belakang */}
        <video
          autoPlay
          loop
          muted
          playsInline
          aria-hidden
          src="/hero.mp4"
          className="absolute inset-0 z-0 h-full w-full object-cover motion-reduce:hidden"
        />
        {/* scrim: menggelapkan video saat orbit muncul */}
        <motion.div
          aria-hidden
          className="absolute inset-0 z-[1] bg-[#05060c]"
          style={{ opacity: scrim }}
        />

        {/* intro: judul di atas video, memudar saat reveal */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center"
          style={{ opacity: introOpacity, filter: introFilter, y: introY }}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-muted)]">
            Planetarium
          </p>
          <h1 className="mt-4 font-serif text-7xl leading-[0.95] text-foreground md:text-8xl lg:text-9xl">
            Tata Surya
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-foreground/80">
            Delapan planet, satu Matahari, satu sistem. Geser ke bawah untuk
            menyusurinya.
          </p>
        </motion.div>

        {/* orbit: muncul lewat clip-path reveal, lalu zoom mengikuti bloom */}
        <motion.div className="absolute inset-0 z-10" style={{ clipPath: clip }}>
          <motion.div
            className="absolute inset-0"
            style={{ scale: bloom, transformOrigin: `${geo.CX}% ${geo.CY}%` }}
          >
            {/* lintasan elips */}
            <svg
              aria-hidden
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
            >
              <ellipse
                cx={geo.CX}
                cy={geo.CY}
                rx={geo.RX}
                ry={geo.RY}
                fill="none"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="0.15"
              />
            </svg>

            {/* Matahari di pusat */}
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${geo.CX}%`, top: `${geo.CY}%`, zIndex: 5 }}
            >
              <Planet
                texture={SUN_TEXTURE}
                size={84}
                spin={40}
                glow="rgba(245,181,74,0.85)"
                className="drop-shadow-[0_0_60px_rgba(245,181,74,0.6)]"
              />
            </div>

            {/* planet-planet mengorbit */}
            {PLANETS.map((p, i) => (
              <OrbitBody key={p.id} planet={p} index={i} base={sizes[i]} progress={pp} geo={geo} />
            ))}

            {/* bulan mengelilingi planet fokus */}
            <MoonOrbit planet={focused} index={focus} size={focusedSize} progress={pp} geo={geo} />
          </motion.div>
        </motion.div>

        {/* panel detail (lapis 2), muncul setelah reveal */}
        <motion.div
          style={{ opacity: uiOpacity }}
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end bg-gradient-to-t from-[#05060c] via-[#05060c]/90 to-transparent px-6 pb-12 pt-16 md:inset-x-auto md:inset-y-0 md:right-0 md:w-[55%] md:items-center md:justify-end md:bg-none md:px-12 md:pb-0 md:pt-0 lg:px-16"
        >
          <AnimatePresence mode="wait">
            <DetailPanel key={focused.id} planet={focused} />
          </AnimatePresence>
        </motion.div>

        {/* progres tur */}
        <motion.div
          style={{ opacity: uiOpacity }}
          className="absolute left-1/2 top-4 z-30 flex -translate-x-1/2 items-center gap-2 md:bottom-6 md:left-12 md:top-auto md:translate-x-0"
        >
          {PLANETS.map((p, i) => (
            <span
              key={p.id}
              className={`h-1.5 rounded-full transition-all ${
                i === focus ? "w-6 bg-accent" : "w-1.5 bg-white/30"
              }`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
