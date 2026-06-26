import Planet from "@/components/Planet";
import Starfield from "@/components/Starfield";
import OrbitTour from "@/components/OrbitTour";
import { PLANETS, recap } from "@/lib/planets";

const nf = new Intl.NumberFormat("id-ID");

function Hero() {
  const saturn = PLANETS.find((p) => p.id === "saturnus")!;
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden px-6 pt-20 md:px-12 lg:px-16">
      {/* video latar loop; fallback = starfield, disembunyikan saat prefers-reduced-motion */}
      <video
        autoPlay
        loop
        muted
        playsInline
        aria-hidden
        src="/hero.mp4"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-70 motion-reduce:hidden"
      />
      {/* scrim: lebih gelap di kiri (teks), lebih terang di kanan (Saturnus) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#05060c] via-[#05060c]/70 to-[#05060c]/35" />

      {/* Saturnus besar, sebagian keluar layar (scale-in di dalam, centering di luar) */}
      <div className="pointer-events-none absolute right-[-12vw] top-1/2 -translate-y-1/2 md:right-[-6vw]">
        <div className="planet-rise" style={{ animationDelay: "0.5s" }}>
          <Planet texture={saturn.texture} size={620} spin={saturn.spin} glow={saturn.glow} ring />
        </div>
      </div>

      <div className="relative z-10 max-w-2xl">
        <p className="rise text-sm uppercase tracking-[0.3em] text-[var(--color-muted)]" style={{ animationDelay: "0.55s" }}>
          Planetarium
        </p>
        <h1 className="rise mt-4 font-serif text-7xl leading-[0.95] text-foreground md:text-8xl lg:text-9xl" style={{ animationDelay: "0.65s" }}>
          Tata Surya
        </h1>
        <p className="rise mt-6 max-w-md text-lg leading-relaxed text-foreground/80" style={{ animationDelay: "0.8s" }}>
          Delapan planet, satu Matahari, satu sistem. Geser untuk menyusuri dari
          Merkurius hingga Neptunus.
        </p>
        <a
          href="#tur"
          className="rise mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-[#1a1304] transition-transform active:scale-[0.98]"
          style={{ animationDelay: "0.92s" }}
        >
          Mulai jelajah
          <span aria-hidden>→</span>
        </a>
      </div>

      {/* fade bawah: lebur mulus ke section tur (#05060c), hilangkan seam */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-b from-transparent to-[#05060c]" />
    </section>
  );
}

function Recap() {
  const r = recap();
  const items = [
    { tag: "Terbesar", planet: r.terbesar, value: `${nf.format(r.terbesar.diameterKm)} km` },
    { tag: "Terpanas", planet: r.terpanas, value: r.terpanas.suhu },
    { tag: "Terjauh", planet: r.terjauh, value: `${nf.format(r.terjauh.jarakJutaKm)} juta km` },
    { tag: "Bulan terbanyak", planet: r.terbanyakBulan, value: `${r.terbanyakBulan.satelit} satelit` },
    { tag: "Terkecil", planet: r.terkecil, value: `${nf.format(r.terkecil.diameterKm)} km` },
    { tag: "Rotasi tercepat", planet: r.tercepatRotasi, value: r.tercepatRotasi.rotasi },
  ];
  return (
    <section className="relative px-6 py-28 md:px-12 lg:px-16">
      <h2 className="font-serif text-5xl text-foreground md:text-6xl">
        Sekali lihat, satu sistem
      </h2>
      <p className="mt-3 max-w-md text-foreground/70">
        Rekam jejak rekor di antara delapan planet.
      </p>
      <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <div key={it.tag} className="flex items-center gap-4 bg-[#070810] p-6">
            <Planet texture={it.planet.texture} size={56} spin={it.planet.spin} glow={it.planet.glow} />
            <div>
              <div className="text-xs uppercase tracking-wider text-accent">{it.tag}</div>
              <div className="mt-0.5 font-serif text-2xl text-foreground">{it.planet.nama}</div>
              <div className="text-sm text-foreground/70">{it.value}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-10 text-sm text-[var(--color-muted)] md:px-12 lg:px-16">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <span className="font-serif text-lg text-foreground">Tata Surya · Planetarium</span>
        <span>
          Tekstur planet: Solar System Scope (CC BY 4.0). Data: nilai astronomi umum (IAU).
        </span>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="relative">
      <Starfield />
      <div className="intro-curtain" aria-hidden />
      <Hero />
      <div id="tur">
        <OrbitTour />
      </div>
      <Recap />
      <Footer />
    </main>
  );
}
