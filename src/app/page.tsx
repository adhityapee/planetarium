import Planet from "@/components/Planet";
import Starfield from "@/components/Starfield";
import OrbitTour from "@/components/OrbitTour";
import { recap } from "@/lib/planets";

const nf = new Intl.NumberFormat("id-ID");

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
      <OrbitTour />
      <Recap />
      <Footer />
    </main>
  );
}
