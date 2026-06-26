# Tata Surya — Planetarium

Website edukatif interaktif untuk mengenal **8 planet tata surya beserta satelitnya**, dirancang untuk pelajar SMA. Orbit planet berputar mengikuti scroll, tiap planet punya panel detail, dan hero berlatar video luar angkasa.

> Hasil **refactor** dari sebuah hero "orbit" parfum menjadi planetarium edukatif. File asli disimpan di [`reference/index.html`](reference/index.html).

**Live:** https://planetarium.vercel.app _(setelah deploy)_

## Fitur

- **Hero sinematik** — latar video Milky Way looping, judul serif, intro reveal (tirai iris menutup ke pusat).
- **Orbit interaktif** — scroll memutar 8 planet mengelilingi Matahari; orbit mengembang lalu mengecil (zoom + dock) saat masuk/keluar tur.
- **Planet berputar di porosnya** — texture asli di-scroll dengan shading sferis; Saturnus bercincin (melingkari planet, tanpa seam).
- **Panel detail edukatif** — diameter, jarak dari Matahari, suhu, lama rotasi & revolusi, jumlah satelit, fenomena khas, dan fakta menarik (Bahasa Indonesia, angka mengacu nilai umum IAU).
- **Satelit mengorbit** — bulan utama mengelilingi planet yang sedang fokus; klik untuk lihat faktanya.
- **Rekap perbandingan** — terbesar, terpanas, terjauh, bulan terbanyak, terkecil, rotasi tercepat.
- **Responsif** (di HP orbit pindah ke atas, panel jadi bottom-sheet) dan menghormati `prefers-reduced-motion`.

## Teknologi

- [Next.js 16](https://nextjs.org) (App Router) + React 19
- [Tailwind CSS v4](https://tailwindcss.com)
- [Motion](https://motion.dev) untuk animasi (orbit di-scrub via `useScroll`)
- Font via `next/font`: Cormorant Garamond (display) + Space Grotesk (UI)

## Menjalankan lokal

```bash
npm install
npm run dev      # http://localhost:3000
```

Build produksi:

```bash
npm run build
npm start
```

## Struktur

```
src/
  app/              layout.tsx, page.tsx (Hero + Tur + Rekap + Footer), globals.css
  components/
    Planet.tsx      bola berputar + shading + cincin
    Starfield.tsx   bintang latar
    OrbitTour.tsx   orbit di-scrub scroll + panel detail + orbit bulan
  lib/planets.ts    data 8 planet + bulan (Bahasa Indonesia)
public/textures/    texture planet, Matahari, cincin, bulan
public/hero.mp4     video latar hero
reference/          file hero asli sebelum refactor
```

## Kredit

- **Texture planet & Matahari:** [Solar System Scope](https://www.solarsystemscope.com/textures) — lisensi CC BY 4.0.
- **Video latar hero:** [Pexels](https://www.pexels.com) — lisensi gratis (tanpa atribusi wajib).
- **Data astronomi:** nilai umum yang dipublikasikan (IAU).
