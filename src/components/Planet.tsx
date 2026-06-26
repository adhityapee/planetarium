type Props = {
  texture: string;
  size: number; // px
  spin?: number; // detik per putaran
  glow?: string;
  ring?: boolean;
  className?: string;
};

// cincin: annulus radial-gradient yang dimiringkan. ponytail: CSS, bukan texture
// radial (butuh canvas/WebGL). Digambar 2 lapis supaya MELINGKARI planet: lapis
// belakang (busur atas, di balik bola) + lapis depan yang di-mask gradient
// (busur depan menyilang di depan bola, memudar mulus tanpa seam).
const ringBase = (size: number): React.CSSProperties => ({
  width: size * 2.25,
  height: size * 2.25,
  transform: "translate(-50%, -50%) rotateX(72deg) rotate(-16deg)",
  background:
    "radial-gradient(closest-side, transparent 0 53%, rgba(232,214,176,0.55) 55%, rgba(150,130,100,0.12) 60%, rgba(238,222,188,0.6) 64%, rgba(150,130,100,0.1) 68%, rgba(226,206,168,0.45) 72%, transparent 75%)",
});

// Bola: permukaan texture di-scroll (spin poros) + shading sferis (lihat globals.css).
export default function Planet({
  texture,
  size,
  spin = 30,
  glow,
  ring = false,
  className = "",
}: Props) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {ring && (
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 rounded-full"
          style={ringBase(size)}
        />
      )}
      <div
        className="planet"
        style={{
          width: size,
          height: size,
          boxShadow: glow ? `0 0 ${size * 0.4}px ${glow}` : undefined,
        }}
      >
        <div
          className="planet-surface"
          style={
            {
              backgroundImage: `url(${texture})`,
              "--spin": `${spin}s`,
            } as React.CSSProperties
          }
        />
      </div>
      {ring && (
        // lapis depan: busur bawah memudar ke atas via gradient mask -> tanpa seam
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 rounded-full"
          style={{
            ...ringBase(size),
            WebkitMaskImage: "linear-gradient(to top, #000 35%, transparent 62%)",
            maskImage: "linear-gradient(to top, #000 35%, transparent 62%)",
          }}
        />
      )}
    </div>
  );
}
