export type QuestionType = "picture" | "meaning" | "isim" | "fiil" | "context";
export type Question = {
  id: string;
  position: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  category: "mufradat" | "isim" | "fiil" | "konteks";
  type: QuestionType;
  prompt: string;
  picture?: string;
  arabic?: string;
  options: string[];
  answer: string;
  explanation: string;
};

const q = (
  id: string, position: Question["position"], category: Question["category"], type: QuestionType,
  prompt: string, options: string[], answer: string, explanation: string,
  arabic?: string, picture?: string
): Question => ({ id, position, category, type, prompt, options, answer, explanation, arabic, picture });

export const questions: Question[] = [
  // POS 1: cek pemahaman kosakata dasar (3 soal)
  q("p1-01",1,"mufradat","picture","Gambar menunjukkan rumah. Apa bahasa Arabnya?",["بَيْتٌ","مَاءٌ","كِتَابٌ"],"بَيْتٌ","بَيْتٌ berarti rumah.","بَيْتٌ","🏠"),
  q("p1-02",1,"mufradat","meaning","Apa arti مَاءٌ?",["Air","Makanan","Kamar"],"Air","مَاءٌ berarti air.","مَاءٌ"),
  q("p1-03",1,"mufradat","picture","Gambar menunjukkan kegiatan membaca. Pilih kata yang tepat.",["يَقْرَأُ","يَنَامُ","يَأْكُلُ"],"يَقْرَأُ","يَقْرَأُ berarti membaca.","يَقْرَأُ","📖"),

  // POS 2: cek pemahaman kosakata dalam frasa (3 soal)
  q("p2-01",2,"mufradat","context","Apa arti أَغْسِلُ يَدِي?",["Saya mencuci tangan","Saya membaca buku","Saya tidur"],"Saya mencuci tangan","أَغْسِلُ berarti saya mencuci dan يَدِي berarti tanganku.","أَغْسِلُ يَدِي"),
  q("p2-02",2,"mufradat","context","Lengkapi: أَشْرَبُ ... (Saya minum air).",["الْمَاءَ","الْكِتَابَ","الْبَابَ"],"الْمَاءَ","الْمَاءَ berarti air.","أَشْرَبُ الْمَاءَ"),
  q("p2-03",2,"mufradat","picture","Gambar menunjukkan kegiatan memasak. Pilih ungkapan yang tepat.",["أَنَا أَطْبُخُ","أَنَا أَنَامُ","أَنَا أَقْرَأُ"],"أَنَا أَطْبُخُ","أَطْبُخُ berarti saya memasak.","أَنَا أَطْبُخُ","🍳"),
  // POS 3: pengenalan isim
  q("p3-01",3,"isim","isim","Kata أُمٌّ termasuk jenis kata apa?",["Isim","Fi'il","Huruf"],"Isim","أُمٌّ adalah kata benda yang berarti ibu.","أُمٌّ"),
  q("p3-02",3,"isim","isim","Manakah kata yang menunjukkan benda di rumah?",["يَنَامُ","بَيْتٌ","يَأْكُلُ"],"بَيْتٌ","بَيْتٌ berarti rumah dan termasuk isim.","بَيْتٌ"),
  q("p3-03",3,"isim","picture","Perhatikan gambar. Kata Arab yang tepat untuk gambar ini adalah ...",["مَاءٌ","بَيْتٌ","كِتَابٌ"],"كِتَابٌ","كِتَابٌ berarti buku.","كِتَابٌ","📖"),
  q("p3-04",3,"isim","isim","Manakah yang merupakan isim?",["يَشْرَبُ","مَطْبَخٌ","يَقْرَأُ"],"مَطْبَخٌ","مَطْبَخٌ berarti dapur, yaitu nama tempat.","مَطْبَخٌ"),
  q("p3-05",3,"isim","meaning","Apa arti kata كُرْسِيٌّ?",["Kursi","Meja","Pintu"],"Kursi","كُرْسِيٌّ berarti kursi.","كُرْسِيٌّ"),
  q("p3-06",3,"isim","isim","Kata مَاءٌ yang berarti air termasuk ...",["Isim","Fi'il","Kata perintah"],"Isim","مَاءٌ menamai benda, sehingga termasuk isim.","مَاءٌ"),
  q("p3-07",3,"isim","picture","Gambar menunjukkan sebuah rumah. Pilih kosakata Arabnya.",["بَيْتٌ","بَابٌ","سَرِيرٌ"],"بَيْتٌ","بَيْتٌ berarti rumah.","بَيْتٌ","🏠"),
  q("p3-08",3,"isim","isim","Manakah pasangan isim yang benar?",["كِتَابٌ dan بَابٌ","يَكْتُبُ dan يَقْرَأُ","يَنَامُ dan مَاءٌ"],"كِتَابٌ dan بَابٌ","Keduanya merupakan nama benda: buku dan pintu.","كِتَابٌ · بَابٌ"),
  q("p3-09",3,"isim","meaning","Kata غُرْفَةٌ berarti ...",["Kamar","Makan","Tidur"],"Kamar","غُرْفَةٌ berarti kamar.","غُرْفَةٌ"),
  q("p3-10",3,"isim","context","Lengkapi kalimat: هَذَا ... (Ini buku).",["كِتَابٌ","يَكْتُبُ","يَنَامُ"],"كِتَابٌ","كِتَابٌ adalah isim yang berarti buku.","هَذَا كِتَابٌ"),

  // POS 4: pengenalan fi'il
  q("p4-01",4,"fiil","fiil","Kata يَنَامُ menunjukkan ...",["Benda","Kegiatan tidur","Tempat"],"Kegiatan tidur","يَنَامُ berarti sedang tidur.","يَنَامُ"),
  q("p4-02",4,"fiil","fiil","Manakah kata yang menunjukkan kegiatan makan?",["يَأْكُلُ","طَعَامٌ","مَطْبَخٌ"],"يَأْكُلُ","يَأْكُلُ berarti makan.","يَأْكُلُ"),
  q("p4-03",4,"fiil","picture","Gambar menunjukkan anak sedang membaca. Pilih fi'il yang tepat.",["يَقْرَأُ","كِتَابٌ","بَيْتٌ"],"يَقْرَأُ","يَقْرَأُ berarti membaca.","يَقْرَأُ","📚"),
  q("p4-04",4,"fiil","fiil","Kata يَشْرَبُ berarti ...",["Minum","Menulis","Membersihkan"],"Minum","يَشْرَبُ berarti minum.","يَشْرَبُ"),
  q("p4-05",4,"fiil","fiil","Manakah yang termasuk fi'il?",["بَابٌ","يَكْتُبُ","مَاءٌ"],"يَكْتُبُ","يَكْتُبُ berarti menulis dan menunjukkan kegiatan.","يَكْتُبُ"),
  q("p4-06",4,"fiil","meaning","Apa arti يَنْظُفُ?",["Membersihkan","Tidur","Membuka"],"Membersihkan","يَنْظُفُ berarti membersihkan.","يَنْظُفُ"),
  q("p4-07",4,"fiil","picture","Gambar menunjukkan seseorang sedang makan. Kata yang tepat adalah ...",["يَأْكُلُ","طَعَامٌ","مَاءٌ"],"يَأْكُلُ","يَأْكُلُ adalah fi'il yang berarti makan.","يَأْكُلُ","🍽️"),
  q("p4-08",4,"fiil","fiil","Pasangan fi'il yang benar adalah ...",["يَلْعَبُ dan يَرْتَبُ","بَيْتٌ dan بَابٌ","مَاءٌ dan كِتَابٌ"],"يَلْعَبُ dan يَرْتَبُ","Keduanya menunjukkan kegiatan bermain dan merapikan.","يَلْعَبُ · يُرَتِّبُ"),
  q("p4-09",4,"fiil","context","Kalimat أَنَا أَغْسِلُ يَدِي berarti ...",["Saya mencuci tangan","Saya membaca buku","Saya tidur"],"Saya mencuci tangan","أَغْسِلُ adalah fi'il yang berarti mencuci.","أَنَا أَغْسِلُ يَدِي"),
  q("p4-10",4,"fiil","fiil","Kata يَفْتَحُ berarti ...",["Membuka","Menutup","Duduk"],"Membuka","يَفْتَحُ berarti membuka.","يَفْتَحُ"),

  // POS 5: campuran dasar
  q("p5-01",5,"mufradat","picture","Tebak gambar: benda ini digunakan untuk tidur. Apa bahasa Arabnya?",["سَرِيرٌ","كُرْسِيٌّ","بَابٌ"],"سَرِيرٌ","سَرِيرٌ berarti tempat tidur.","سَرِيرٌ","🛏️"),
  q("p5-02",5,"isim","isim","Pilih kata yang termasuk isim.",["يَغْسِلُ","مِنْشَفَةٌ","يَطْبُخُ"],"مِنْشَفَةٌ","مِنْشَفَةٌ berarti handuk dan termasuk isim.","مِنْشَفَةٌ"),
  q("p5-03",5,"fiil","picture","Tebak kegiatan pada gambar. Kata Arab yang tepat adalah ...",["يَطْبُخُ","مَطْبَخٌ","طَعَامٌ"],"يَطْبُخُ","يَطْبُخُ berarti memasak.","يَطْبُخُ","👩‍🍳"),
  q("p5-04",5,"mufradat","meaning","Apa arti بَابٌ?",["Pintu","Jendela","Lantai"],"Pintu","بَابٌ berarti pintu.","بَابٌ"),
  q("p5-05",5,"isim","isim","Kata نَافِذَةٌ termasuk ...",["Isim","Fi'il","Huruf"],"Isim","نَافِذَةٌ berarti jendela.","نَافِذَةٌ"),
  q("p5-06",5,"fiil","fiil","Manakah fi'il yang berarti bermain?",["يَلْعَبُ","لُعْبَةٌ","غُرْفَةٌ"],"يَلْعَبُ","يَلْعَبُ berarti bermain.","يَلْعَبُ"),
  q("p5-07",5,"mufradat","picture","Gambar ini menunjukkan air. Pilih kosakata yang benar.",["مَاءٌ","طَعَامٌ","كِتَابٌ"],"مَاءٌ","مَاءٌ berarti air.","مَاءٌ","💧"),
  q("p5-08",5,"fiil","context","Apa arti kalimat أَنَا أَقْرَأُ الْكِتَابَ?",["Saya membaca buku","Saya menulis buku","Saya membeli buku"],"Saya membaca buku","أَقْرَأُ berarti membaca.","أَنَا أَقْرَأُ الْكِتَابَ"),
  q("p5-09",5,"isim","isim","Manakah kelompok kata benda seluruhnya?",["بَيْتٌ، مَاءٌ، كِتَابٌ","يَأْكُلُ، يَشْرَبُ، يَنَامُ","يَقْرَأُ، بَابٌ، يَلْعَبُ"],"بَيْتٌ، مَاءٌ، كِتَابٌ","Ketiganya menamai benda.","بَيْتٌ · مَاءٌ · كِتَابٌ"),
  q("p5-10",5,"fiil","fiil","Kata yang menunjukkan kegiatan membersihkan adalah ...",["يُنَظِّفُ","مِكْنَسَةٌ","غُرْفَةٌ"],"يُنَظِّفُ","يُنَظِّفُ berarti membersihkan.","يُنَظِّفُ"),

  // POS 6: aplikasi dalam konteks
  q("p6-01",6,"konteks","context","Pilih kalimat yang berarti 'Ibu memasak di dapur'.",["أُمِّي تَطْبُخُ فِي الْمَطْبَخِ","أَبِي يَنَامُ فِي الْغُرْفَةِ","أَخِي يَقْرَأُ الْكِتَابَ"],"أُمِّي تَطْبُخُ فِي الْمَطْبَخِ","تَطْبُخُ berarti memasak dan الْمَطْبَخِ berarti dapur.","أُمِّي تَطْبُخُ فِي الْمَطْبَخِ"),
  q("p6-02",6,"isim","isim","Dalam kalimat أَبِي يَقْرَأُ كِتَابًا, kata yang merupakan isim adalah ...",["أَبِي dan كِتَابًا","يَقْرَأُ saja","Tidak ada"],"أَبِي dan كِتَابًا","أَبِي (ayahku) dan كِتَابًا (buku) merupakan isim.","أَبِي يَقْرَأُ كِتَابًا"),
  q("p6-03",6,"fiil","fiil","Fi'il pada kalimat أُخْتِي تَغْسِلُ الصُّحُونَ adalah ...",["أُخْتِي","تَغْسِلُ","الصُّحُونَ"],"تَغْسِلُ","تَغْسِلُ berarti mencuci.","أُخْتِي تَغْسِلُ الصُّحُونَ"),
  q("p6-04",6,"konteks","picture","Gambar menunjukkan anak merapikan kamar. Pilih kalimat yang sesuai.",["الْوَلَدُ يُرَتِّبُ الْغُرْفَةَ","الْوَلَدُ يَشْرَبُ الْمَاءَ","الْوَلَدُ يَنَامُ"],"الْوَلَدُ يُرَتِّبُ الْغُرْفَةَ","يُرَتِّبُ berarti merapikan dan الْغُرْفَةَ berarti kamar.","الْوَلَدُ يُرَتِّبُ الْغُرْفَةَ","🧹"),
  q("p6-05",6,"isim","meaning","Apa arti الْمَطْبَخُ?",["Dapur","Kamar mandi","Ruang tamu"],"Dapur","الْمَطْبَخُ berarti dapur.","الْمَطْبَخُ"),
  q("p6-06",6,"fiil","meaning","Kata يَسْتَيْقِظُ berarti ...",["Bangun tidur","Pergi tidur","Mencuci"],"Bangun tidur","يَسْتَيْقِظُ berarti bangun tidur.","يَسْتَيْقِظُ"),
  q("p6-07",6,"konteks","context","Lengkapi: أَنَا ... الْمَاءَ (Saya minum air).",["أَشْرَبُ","أَكْتُبُ","أَنَامُ"],"أَشْرَبُ","أَشْرَبُ berarti saya minum.","أَنَا أَشْرَبُ الْمَاءَ"),
  q("p6-08",6,"isim","isim","Kata الْحَمَّامُ dalam kalimat أَذْهَبُ إِلَى الْحَمَّامِ adalah ...",["Isim","Fi'il","Kata sambung"],"Isim","الْحَمَّامُ menamai tempat, yaitu kamar mandi.","الْحَمَّامُ"),
  q("p6-09",6,"fiil","fiil","Pilih dua fi'il berikut.",["يَفْتَحُ dan يُغْلِقُ","بَابٌ dan نَافِذَةٌ","مَاءٌ dan طَعَامٌ"],"يَفْتَحُ dan يُغْلِقُ","Keduanya menunjukkan tindakan membuka dan menutup.","يَفْتَحُ · يُغْلِقُ"),
  q("p6-10",6,"konteks","context","Makna kalimat أَبِي يَغْسِلُ السَّيَّارَةَ adalah ...",["Ayahku mencuci mobil","Ayahku membaca buku","Ayahku memasak makanan"],"Ayahku mencuci mobil","يَغْسِلُ berarti mencuci.","أَبِي يَغْسِلُ السَّيَّارَةَ"),

  // POS 7: evaluasi akhir integratif
  q("p7-01",7,"mufradat","picture","Tebak gambar: benda untuk menyimpan pakaian adalah ...",["خِزَانَةٌ","مِكْنَسَةٌ","كُرْسِيٌّ"],"خِزَانَةٌ","خِزَانَةٌ berarti lemari.","خِزَانَةٌ","🚪"),
  q("p7-02",7,"isim","isim","Manakah isim dalam kalimat الْبِنْتُ تَكْنُسُ الْبَيْتَ?",["الْبِنْتُ dan الْبَيْتَ","تَكْنُسُ saja","Semua fi'il"],"الْبِنْتُ dan الْبَيْتَ","الْبِنْتُ (anak perempuan) dan الْبَيْتَ (rumah) adalah isim.","الْبِنْتُ تَكْنُسُ الْبَيْتَ"),
  q("p7-03",7,"fiil","fiil","Fi'il yang berarti menyapu adalah ...",["تَكْنُسُ","مِكْنَسَةٌ","بَيْتٌ"],"تَكْنُسُ","تَكْنُسُ berarti menyapu.","تَكْنُسُ"),
  q("p7-04",7,"konteks","context","Kalimat yang berarti 'Saya tidur di kamar' adalah ...",["أَنَا أَنَامُ فِي الْغُرْفَةِ","أَنَا أَشْرَبُ الْمَاءَ","أَنَا أَطْبُخُ الطَّعَامَ"],"أَنَا أَنَامُ فِي الْغُرْفَةِ","أَنَامُ berarti saya tidur dan الْغُرْفَةِ berarti kamar.","أَنَا أَنَامُ فِي الْغُرْفَةِ"),
  q("p7-05",7,"mufradat","meaning","Apa arti مِكْنَسَةٌ?",["Sapu","Piring","Lemari"],"Sapu","مِكْنَسَةٌ berarti sapu.","مِكْنَسَةٌ"),
  q("p7-06",7,"fiil","picture","Gambar menunjukkan seseorang membuka pintu. Fi'il yang tepat adalah ...",["يَفْتَحُ","يُغْلِقُ","يَنَامُ"],"يَفْتَحُ","يَفْتَحُ berarti membuka.","يَفْتَحُ","🚪"),
  q("p7-07",7,"isim","isim","Kelompok isim yang tepat adalah ...",["طَعَامٌ، مَاءٌ، مَائِدَةٌ","يَأْكُلُ، يَشْرَبُ، يَنَامُ","يَفْتَحُ، بَابٌ، يَغْسِلُ"],"طَعَامٌ، مَاءٌ، مَائِدَةٌ","Ketiganya menamai makanan, air, dan meja makan.","طَعَامٌ · مَاءٌ · مَائِدَةٌ"),
  q("p7-08",7,"konteks","context","Arti أُمِّي تَغْسِلُ الْمَلَابِسَ adalah ...",["Ibuku mencuci pakaian","Ibuku membaca buku","Ibuku tidur di kamar"],"Ibuku mencuci pakaian","تَغْسِلُ berarti mencuci dan الْمَلَابِسَ berarti pakaian.","أُمِّي تَغْسِلُ الْمَلَابِسَ"),
  q("p7-09",7,"fiil","fiil","Manakah pasangan fi'il dan artinya yang benar?",["يَكْنُسُ = menyapu","بَيْتٌ = tidur","مَاءٌ = minum"],"يَكْنُسُ = menyapu","يَكْنُسُ merupakan fi'il yang berarti menyapu.","يَكْنُسُ"),
  q("p7-10",7,"konteks","context","Pilih kalimat yang memuat isim dan fi'il sekaligus.",["الْوَلَدُ يَلْعَبُ فِي الْبَيْتِ","بَيْتٌ وَكِتَابٌ","مَاءٌ وَطَعَامٌ"],"الْوَلَدُ يَلْعَبُ فِي الْبَيْتِ","الْوَلَدُ dan الْبَيْتِ adalah isim, sedangkan يَلْعَبُ adalah fi'il.","الْوَلَدُ يَلْعَبُ فِي الْبَيْتِ"),
];
