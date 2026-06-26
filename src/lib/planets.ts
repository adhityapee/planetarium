// Data 8 planet + bulan utama. Statis, satu sumber kebenaran.
// Angka: nilai astronomi yang umum dipakai (IAU). Suhu/rotasi disimpan sebagai
// string karena banyak yang berupa rentang atau kasus khusus (mis. retrograde).

export type Moon = { nama: string; fakta: string };

export type Planet = {
  id: string;
  nama: string;
  urutan: number;          // urutan dari Matahari (1-8)
  texture: string;         // path di /public/textures
  glow: string;            // warna pendar atmosfer (rgba)
  spin: number;            // detik per putaran poros (untuk animasi)
  ring?: boolean;          // punya cincin?
  diameterKm: number;
  jarakJutaKm: number;     // jarak rata-rata dari Matahari
  suhu: string;
  rotasi: string;          // lama 1 putaran poros (1 hari)
  revolusi: string;        // lama 1 kali mengelilingi Matahari (1 tahun)
  satelit: number;         // jumlah satelit diketahui
  julukan: string;
  fenomena: string;        // penjelasan singkat fenomena khas
  fakta: string[];         // 2-3 fakta pemikat
  bulan: Moon[];           // bulan utama (bukan semua)
};

export const PLANETS: Planet[] = [
  {
    id: "merkurius",
    nama: "Merkurius",
    urutan: 1,
    texture: "/textures/2k_mercury.jpg",
    glow: "rgba(170,150,130,0.45)",
    spin: 46,
    diameterKm: 4879,
    jarakJutaKm: 57.9,
    suhu: "Siang 430 C, malam -180 C",
    rotasi: "59 hari Bumi",
    revolusi: "88 hari Bumi",
    satelit: 0,
    julukan: "Planet terkecil & tercepat mengorbit",
    fenomena:
      "Tanpa atmosfer berarti, panas siang langsung lenyap saat malam. Bedanya bisa lebih dari 600 derajat dalam satu hari.",
    fakta: [
      "Setahun di Merkurius cuma 88 hari Bumi.",
      "Permukaannya penuh kawah seperti Bulan.",
      "Planet terdekat dengan Matahari, tapi bukan yang terpanas.",
    ],
    bulan: [],
  },
  {
    id: "venus",
    nama: "Venus",
    urutan: 2,
    texture: "/textures/2k_venus_atmosphere.jpg",
    glow: "rgba(240,200,120,0.5)",
    spin: 60,
    diameterKm: 12104,
    jarakJutaKm: 108.2,
    suhu: "Sekitar 464 C (terpanas)",
    rotasi: "243 hari Bumi (terbalik)",
    revolusi: "225 hari Bumi",
    satelit: 0,
    julukan: "Planet terpanas, kembaran Bumi yang ganas",
    fenomena:
      "Atmosfer karbon dioksida tebal memerangkap panas lewat efek rumah kaca ekstrem, membuatnya lebih panas dari Merkurius.",
    fakta: [
      "Sehari di Venus lebih panjang dari setahunnya.",
      "Berputar terbalik dibanding planet lain.",
      "Hujan asam sulfat, bukan air.",
    ],
    bulan: [],
  },
  {
    id: "bumi",
    nama: "Bumi",
    urutan: 3,
    texture: "/textures/2k_earth_daymap.jpg",
    glow: "rgba(90,160,255,0.55)",
    spin: 24,
    diameterKm: 12742,
    jarakJutaKm: 149.6,
    suhu: "Rata-rata 15 C",
    rotasi: "24 jam",
    revolusi: "365,25 hari",
    satelit: 1,
    julukan: "Satu-satunya yang diketahui menampung kehidupan",
    fenomena:
      "Jaraknya pas dari Matahari membuat air bisa berwujud cair. Atmosfer dan medan magnetnya melindungi kehidupan.",
    fakta: [
      "71% permukaannya tertutup air.",
      "Satu-satunya planet yang tak dinamai dari dewa.",
      "Atmosfernya 78% nitrogen, 21% oksigen.",
    ],
    bulan: [
      { nama: "Bulan", fakta: "Penyebab pasang surut laut dan menstabilkan kemiringan poros Bumi." },
    ],
  },
  {
    id: "mars",
    nama: "Mars",
    urutan: 4,
    texture: "/textures/2k_mars.jpg",
    glow: "rgba(220,110,70,0.5)",
    spin: 25,
    diameterKm: 6779,
    jarakJutaKm: 227.9,
    suhu: "Rata-rata -63 C",
    rotasi: "24,6 jam",
    revolusi: "687 hari Bumi",
    satelit: 2,
    julukan: "Planet Merah, target jelajah manusia",
    fenomena:
      "Warna merahnya berasal dari karat (oksida besi) di tanahnya. Punya gunung tertinggi di tata surya, Olympus Mons.",
    fakta: [
      "Sehari di Mars hampir sama dengan di Bumi.",
      "Punya tudung es di kutub seperti Bumi.",
      "Pernah punya air mengalir di masa lalu.",
    ],
    bulan: [
      { nama: "Phobos", fakta: "Mengorbit sangat dekat dan perlahan jatuh ke Mars." },
      { nama: "Deimos", fakta: "Bulan terkecil dan terjauh dari dua bulan Mars." },
    ],
  },
  {
    id: "jupiter",
    nama: "Jupiter",
    urutan: 5,
    texture: "/textures/2k_jupiter.jpg",
    glow: "rgba(220,180,140,0.5)",
    spin: 10,
    diameterKm: 139820,
    jarakJutaKm: 778.5,
    suhu: "Sekitar -110 C",
    rotasi: "9,9 jam (tercepat)",
    revolusi: "11,9 tahun",
    satelit: 95,
    julukan: "Planet terbesar, raksasa gas",
    fenomena:
      "Bintik Merah Raksasa adalah badai yang lebih besar dari Bumi dan sudah berlangsung ratusan tahun.",
    fakta: [
      "Bisa memuat lebih dari 1.300 Bumi di dalamnya.",
      "Berotasi paling cepat: sehari kurang dari 10 jam.",
      "Punya puluhan bulan, beberapa lebih besar dari Merkurius.",
    ],
    bulan: [
      { nama: "Io", fakta: "Benda paling vulkanik di tata surya." },
      { nama: "Europa", fakta: "Diduga punya lautan air di bawah kerak esnya." },
      { nama: "Ganymede", fakta: "Bulan terbesar di tata surya, lebih besar dari Merkurius." },
      { nama: "Callisto", fakta: "Permukaannya paling banyak kawah." },
    ],
  },
  {
    id: "saturnus",
    nama: "Saturnus",
    urutan: 6,
    texture: "/textures/2k_saturn.jpg",
    glow: "rgba(230,205,150,0.5)",
    spin: 11,
    ring: true,
    diameterKm: 116460,
    jarakJutaKm: 1434,
    suhu: "Sekitar -140 C",
    rotasi: "10,7 jam",
    revolusi: "29,5 tahun",
    satelit: 146,
    julukan: "Permata bercincin, pemilik bulan terbanyak",
    fenomena:
      "Cincinnya terbuat dari miliaran bongkah es dan batu. Lebarnya ratusan ribu kilometer tapi tebalnya hanya puluhan meter.",
    fakta: [
      "Punya satelit terbanyak di tata surya.",
      "Cukup ringan untuk mengapung di air (jika ada lautnya).",
      "Cincinnya bisa dilihat dengan teleskop kecil.",
    ],
    bulan: [
      { nama: "Titan", fakta: "Satu-satunya bulan dengan atmosfer tebal dan danau metana." },
      { nama: "Enceladus", fakta: "Menyemburkan air dari bawah permukaan esnya." },
      { nama: "Rhea", fakta: "Bulan terbesar kedua Saturnus, dunia es berkawah." },
    ],
  },
  {
    id: "uranus",
    nama: "Uranus",
    urutan: 7,
    texture: "/textures/2k_uranus.jpg",
    glow: "rgba(140,220,225,0.5)",
    spin: 17,
    diameterKm: 50724,
    jarakJutaKm: 2871,
    suhu: "Sekitar -195 C",
    rotasi: "17 jam (berbaring)",
    revolusi: "84 tahun",
    satelit: 28,
    julukan: "Raksasa es yang berputar berbaring",
    fenomena:
      "Porosnya miring hampir 98 derajat, jadi Uranus seolah menggelinding. Tiap kutub mengalami 42 tahun siang lalu 42 tahun malam.",
    fakta: [
      "Warna biru-hijaunya berasal dari gas metana.",
      "Planet pertama yang ditemukan dengan teleskop.",
      "Salah satu tempat terdingin di tata surya.",
    ],
    bulan: [
      { nama: "Titania", fakta: "Bulan terbesar Uranus, penuh ngarai dan tebing." },
      { nama: "Miranda", fakta: "Permukaannya paling aneh: tebing setinggi 20 km." },
    ],
  },
  {
    id: "neptunus",
    nama: "Neptunus",
    urutan: 8,
    texture: "/textures/2k_neptune.jpg",
    glow: "rgba(70,110,240,0.55)",
    spin: 16,
    diameterKm: 49244,
    jarakJutaKm: 4495,
    suhu: "Sekitar -200 C",
    rotasi: "16 jam",
    revolusi: "165 tahun",
    satelit: 16,
    julukan: "Planet terjauh, dunia angin tercepat",
    fenomena:
      "Angin di Neptunus bisa mencapai 2.000 km/jam, tercepat di tata surya, padahal jaraknya paling jauh dari Matahari.",
    fakta: [
      "Ditemukan lewat hitungan matematika sebelum dilihat.",
      "Satu tahunnya = 165 tahun Bumi.",
      "Warna birunya lebih pekat dari Uranus.",
    ],
    bulan: [
      { nama: "Triton", fakta: "Mengorbit terbalik dan menyemburkan gas nitrogen beku." },
    ],
  },
];

export const SUN_TEXTURE = "/textures/2k_sun.jpg";
export const MOON_TEXTURE = "/textures/2k_moon.jpg";
export const RING_TEXTURE = "/textures/2k_saturn_ring_alpha.png";

// Rekap perbandingan (diturunkan dari data agar tak salah ketik).
export const recap = () => {
  const by = (f: (p: Planet) => number, max = true) =>
    [...PLANETS].sort((a, b) => (max ? f(b) - f(a) : f(a) - f(b)))[0];
  return {
    terbesar: by((p) => p.diameterKm),
    terkecil: by((p) => p.diameterKm, false),
    terjauh: by((p) => p.jarakJutaKm),
    terbanyakBulan: by((p) => p.satelit),
    terpanas: PLANETS.find((p) => p.id === "venus")!, // suhu string, dikunci manual
    tercepatRotasi: PLANETS.find((p) => p.id === "jupiter")!,
  };
};
