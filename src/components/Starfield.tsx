// Bintang sebagai satu elemen ber-multi-box-shadow (murah). Seeded RNG -> tak ada
// hydration mismatch. ponytail: box-shadow stars, ganti ke canvas kalau butuh parallax.
function stars(count: number, seed: number) {
  let s = seed;
  const rng = () => ((s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff);
  return Array.from({ length: count }, () => {
    const x = (rng() * 100).toFixed(2);
    const y = (rng() * 100).toFixed(2);
    return `${x}vw ${y}vh`;
  }).join(", ");
}

export default function Starfield() {
  const far = stars(160, 7);
  const near = stars(60, 99);
  return (
    <div aria-hidden className="fixed inset-0 -z-10 bg-[#05060c] pointer-events-none">
      <div
        className="absolute left-0 top-0 h-px w-px rounded-full"
        style={{ boxShadow: `${far} #ffffffcc`, background: "#fff" }}
      />
      <div
        className="twinkle absolute left-0 top-0 h-[2px] w-[2px] rounded-full"
        style={{ boxShadow: `${near} #fff`, background: "#fff" }}
      />
      {/* sapuan bima sakti tipis */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 80% -10%, rgba(120,90,180,0.16), transparent 55%), radial-gradient(90% 60% at 10% 110%, rgba(60,120,200,0.14), transparent 60%)",
        }}
      />
    </div>
  );
}
