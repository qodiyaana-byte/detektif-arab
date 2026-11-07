export type Word = { arabic: string; meaning: string };
export type Sign = { name: string; rule: string; arabic: string; meaning: string };
export type Slide =
  | { kind: "definition"; title: string; arabic: string; text: string; examples: Word[] }
  | { kind: "signs"; title: string; intro: string; items: Sign[] }
  | { kind: "words"; title: string; intro: string; words: Word[] }
  | { kind: "mindmap"; title: string }
  | { kind: "table"; title: string };

export type MapPosition = {
  id: number; title: string; subtitle: string; icon: string; x: number; y: number;
};

export const positions: MapPosition[] = [
  { id: 1, title: "Rumah Isim", subtitle: "Definisi, ciri, dan contoh isim", icon: "🏠", x: 11, y: 70 },
  { id: 2, title: "Taman Fi'il", subtitle: "Definisi, tanda, dan contoh fi'il", icon: "🌳", x: 28, y: 30 },
  { id: 3, title: "Ruang Peta Konsep", subtitle: "Perbedaan isim dan fi'il", icon: "🗺️", x: 47, y: 68 },
  { id: 4, title: "Ruang Investigasi", subtitle: "Evaluasi seluruh materi", icon: "🔎", x: 64, y: 28 },
  { id: 5, title: "Menara Tantangan", subtitle: "Soal akhir yang lebih sulit", icon: "🏰", x: 81, y: 66 },
  { id: 6, title: "Aula Bintang", subtitle: "Skor setiap pos dan nilai akhir", icon: "🏆", x: 91, y: 24 },
];

export const slides: Record<number, Slide[]> = {
  1: [
    {
      kind: "definition", title: "Pengertian Isim", arabic: "الاِسْمُ",
      text: "Isim adalah kata yang menunjukkan nama orang, hewan, benda, tempat, atau sifat. Maknanya berdiri sendiri dan tidak terikat dengan waktu.",
      examples: [
        { arabic: "أَحْمَدُ", meaning: "Ahmad (nama orang)" },
        { arabic: "بَيْتٌ", meaning: "rumah (tempat)" },
        { arabic: "قَلَمٌ", meaning: "pena (benda)" },
      ],
    },
    {
      kind: "signs", title: "Ciri-ciri Isim", intro: "Kata dapat dikenali sebagai isim jika memiliki salah satu ciri berikut.",
      items: [
        { name: "1. Dimasuki alif lam (ال)", rule: "Awal kata diberi ال.", arabic: "الْكِتَابُ", meaning: "buku itu" },
        { name: "2. Bertanwin", rule: "Akhir kata berharakat dua (ـٌ ـً ـٍ).", arabic: "كِتَابٌ", meaning: "sebuah buku" },
        { name: "3. Didahului huruf jar", rule: "Huruf jar: مِنْ, إِلَى, فِي, عَلَى, عَنْ.", arabic: "فِي الْبَيْتِ", meaning: "di dalam rumah" },
        { name: "4. Dimasuki huruf nida (يَا)", rule: "Digunakan untuk memanggil.", arabic: "يَا طَالِبُ", meaning: "wahai siswa" },
      ],
    },
    {
      kind: "words", title: "Contoh Mufradat Isim", intro: "Pelajari kosakata isim berikut. Tekan tombol suara untuk mendengarkan.",
      words: [
        { arabic: "بَيْتٌ", meaning: "Rumah" }, { arabic: "كِتَابٌ", meaning: "Buku" },
        { arabic: "قَلَمٌ", meaning: "Pena" }, { arabic: "مَدْرَسَةٌ", meaning: "Sekolah" },
        { arabic: "مَاءٌ", meaning: "Air" }, { arabic: "أُمٌّ", meaning: "Ibu" },
        { arabic: "أَبٌ", meaning: "Ayah" }, { arabic: "طَالِبٌ", meaning: "Siswa laki-laki" },
      ],
    },
  ],
  2: [
    {
      kind: "definition", title: "Pengertian Fi'il", arabic: "الْفِعْلُ",
      text: "Fi'il adalah kata yang menunjukkan pekerjaan atau kejadian dan terikat dengan waktu: lampau (madhi), sekarang atau akan datang (mudhari'), atau perintah (amr).",
      examples: [
        { arabic: "كَتَبَ", meaning: "telah menulis (lampau)" },
        { arabic: "يَكْتُبُ", meaning: "menulis (sekarang/akan datang)" },
        { arabic: "اُكْتُبْ", meaning: "tulislah! (perintah)" },
      ],
    },
    {
      kind: "signs", title: "Tanda-tanda Fi'il", intro: "Kata dapat dikenali sebagai fi'il jika menerima salah satu tanda berikut.",
      items: [
        { name: "1. Didahului قَدْ", rule: "قَدْ berada sebelum fi'il.", arabic: "قَدْ كَتَبَ", meaning: "sungguh telah menulis" },
        { name: "2. Didahului سَ atau سَوْفَ", rule: "Menunjukkan waktu yang akan datang.", arabic: "سَيَكْتُبُ", meaning: "akan menulis" },
        { name: "3. Bertemu ta' ta'nits sakinah (تْ)", rule: "Menandakan pelaku perempuan.", arabic: "كَتَبَتْ", meaning: "dia (perempuan) telah menulis" },
        { name: "4. Bertemu ta' fa'il (تُ)", rule: "Menandakan pelaku orang pertama.", arabic: "كَتَبْتُ", meaning: "aku telah menulis" },
      ],
    },
    {
      kind: "words", title: "Contoh Mufradat Fi'il", intro: "Pelajari kosakata fi'il berikut. Tekan tombol suara untuk mendengarkan.",
      words: [
        { arabic: "كَتَبَ", meaning: "Telah menulis" }, { arabic: "يَكْتُبُ", meaning: "Menulis" },
        { arabic: "قَرَأَ", meaning: "Telah membaca" }, { arabic: "يَقْرَأُ", meaning: "Membaca" },
        { arabic: "أَكَلَ", meaning: "Telah makan" }, { arabic: "يَأْكُلُ", meaning: "Makan" },
        { arabic: "شَرِبَ", meaning: "Telah minum" }, { arabic: "يَشْرَبُ", meaning: "Minum" },
        { arabic: "ذَهَبَ", meaning: "Telah pergi" }, { arabic: "يَذْهَبُ", meaning: "Pergi" },
      ],
    },
  ],
  3: [
    { kind: "mindmap", title: "Peta Konsep: Isim dan Fi'il" },
    { kind: "table", title: "Tabel Perbedaan Isim dan Fi'il" },
  ],
};

export const mindmapRows = [
  { aspect: "Pengertian", isim: "Nama orang, benda, tempat, atau sifat", fiil: "Pekerjaan atau kejadian" },
  { aspect: "Waktu", isim: "Tidak terikat waktu", fiil: "Terikat waktu: lampau, sekarang, akan datang" },
  { aspect: "Ciri / tanda", isim: "ال, tanwin, huruf jar, يَا", fiil: "قَدْ, سَ / سَوْفَ, تْ, تُ" },
  { aspect: "Contoh", isim: "بَيْتٌ (rumah)", fiil: "كَتَبَ (telah menulis)" },
];

export const tableRows = [
  { aspect: "Pengertian", isim: "Kata yang menunjukkan nama orang, benda, tempat, atau sifat", fiil: "Kata yang menunjukkan pekerjaan atau kejadian" },
  { aspect: "Waktu", isim: "Tidak terikat waktu", fiil: "Terikat waktu (lampau, sekarang/akan datang, perintah)" },
  { aspect: "Dimasuki alif lam (ال)", isim: "Bisa ✓", fiil: "Tidak bisa ✗" },
  { aspect: "Bertanwin", isim: "Bisa ✓", fiil: "Tidak bisa ✗" },
  { aspect: "Didahului huruf jar", isim: "Bisa ✓", fiil: "Tidak bisa ✗" },
  { aspect: "Didahului قَدْ atau سَ / سَوْفَ", isim: "Tidak bisa ✗", fiil: "Bisa ✓" },
  { aspect: "Bertemu تْ atau تُ", isim: "Tidak bisa ✗", fiil: "Bisa ✓" },
  { aspect: "Contoh", isim: "بَيْتٌ (rumah), الْكِتَابُ (buku itu), طَالِبٌ (siswa)", fiil: "كَتَبَ (telah menulis), يَقْرَأُ (membaca), سَيَذْهَبُ (akan pergi)" },
];
