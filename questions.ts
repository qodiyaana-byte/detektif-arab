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
  q("p1-01",1,"mufradat","picture","Amati gambar berikut, lalu pilih kosakata yang sesuai.",["بَيْتٌ","مَاءٌ","كِتَابٌ"],"بَيْتٌ","بَيْتٌ berarti rumah.","بَيْتٌ","🏠"),
  q("p1-02",1,"mufradat","meaning","Apa arti مَاءٌ?",["Air","Makanan","Kamar"],"Air","مَاءٌ berarti air.","مَاءٌ"),
  q("p1-03",1,"mufradat","picture","Amati gambar berikut, lalu pilih kosakata yang sesuai.",["يَقْرَأُ","يَنَامُ","يَأْكُلُ"],"يَقْرَأُ","يَقْرَأُ berarti membaca.","يَقْرَأُ","📖"),

  // POS 2: cek pemahaman kosakata dalam frasa (3 soal)
  q("p2-01",2,"mufradat","context","Apa arti أَغْسِلُ يَدِي?",["Saya mencuci tangan","Saya membaca buku","Saya tidur"],"Saya mencuci tangan","أَغْسِلُ berarti saya mencuci dan يَدِي berarti tanganku.","أَغْسِلُ يَدِي"),
  q("p2-02",2,"mufradat","context","Lengkapi: أَشْرَبُ ... (Saya minum air).",["الْمَاءَ","الْكِتَابَ","الْبَابَ"],"الْمَاءَ","الْمَاءَ berarti air.","أَشْرَبُ الْمَاءَ"),
  q("p2-03",2,"mufradat","picture","Amati gambar berikut, lalu pilih ungkapan yang sesuai.",["أَنَا أَطْبُخُ","أَنَا أَنَامُ","أَنَا أَقْرَأُ"],"أَنَا أَطْبُخُ","أَطْبُخُ berarti saya memasak.","أَنَا أَطْبُخُ","🍳"),
  // POS 3: materi dasar isim dan fi'il secara eksplisit
  q("p3-01",3,"isim","isim","Apa definisi isim dalam bahasa Arab?",["Kata yang menunjukkan nama orang, benda, tempat, atau sesuatu","Kata yang menunjukkan pekerjaan atau tindakan","Kata penghubung yang tidak memiliki makna sendiri"],"Kata yang menunjukkan nama orang, benda, tempat, atau sesuatu","Isim digunakan untuk menamai orang, benda, tempat, hewan, atau sesuatu.","الطَّالِبُ، كِتَابٌ، مَدْرَسَةٌ"),
  q("p3-02",3,"isim","isim","Manakah ciri isim yang tepat?",["Dapat menerima ال (alif lam) atau tanwin pada banyak bentuknya","Selalu diawali يـ atau تـ","Selalu menunjukkan kegiatan"],"Dapat menerima ال (alif lam) atau tanwin pada banyak bentuknya","Contoh: كِتَابٌ menjadi الْكِتَابُ. Tanwin dan ال merupakan ciri yang sering ditemukan pada isim.","كِتَابٌ ← الْكِتَابُ"),
  q("p3-03",3,"isim","context","Pilih kalimat yang memuat isim كِتَابٌ (buku).",["هَذَا كِتَابٌ","هَذَا يَكْتُبُ","هَذَا يَقْرَأُ"],"هَذَا كِتَابٌ","هَذَا كِتَابٌ berarti ini buku. كِتَابٌ menamai benda sehingga termasuk isim.","هَذَا كِتَابٌ","📘"),
  q("p3-04",3,"isim","isim","Manakah contoh isim yang menunjukkan nama tempat?",["مَدْرَسَةٌ","يَكْتُبُ","يَذْهَبُ"],"مَدْرَسَةٌ","مَدْرَسَةٌ berarti sekolah, nama sebuah tempat.","مَدْرَسَةٌ"),
  q("p3-05",3,"fiil","fiil","Apa definisi fi'il?",["Kata yang menunjukkan pekerjaan atau tindakan","Kata yang menamai benda atau tempat","Kata yang menghubungkan dua kata"],"Kata yang menunjukkan pekerjaan atau tindakan","Fi'il menyatakan kegiatan atau tindakan, misalnya membaca dan menulis.","يَقْرَأُ، يَكْتُبُ"),
  q("p3-06",3,"fiil","fiil","Manakah ciri umum fi'il mudhari' (kegiatan yang sedang/akan dilakukan)?",["Sering diawali salah satu huruf أ، ن، ي، ت","Selalu diakhiri tanwin","Selalu diawali ال"],"Sering diawali salah satu huruf أ، ن، ي، ت","Fi'il mudhari' sering diawali huruf أ، ن، ي، atau ت, seperti يَكْتُبُ dan تَقْرَأُ.","يَكْتُبُ"),
  q("p3-07",3,"fiil","picture","Pada kalimat berikut, kata yang menunjukkan tindakan adalah fi'il. Pilih jenis kata yang tepat.",["Fi'il","Isim","Huruf"],"Fi'il","يَكْتُبُ berarti sedang/akan menulis. Kata yang menunjukkan tindakan termasuk fi'il.","الطَّالِبُ يَكْتُبُ"),
  q("p3-08",3,"isim","isim","Pasangan yang seluruhnya merupakan isim adalah ...",["طَالِبٌ dan قَلَمٌ","يَكْتُبُ dan يَقْرَأُ","يَذْهَبُ dan مَدْرَسَةٌ"],"طَالِبٌ dan قَلَمٌ","طَالِبٌ (siswa) dan قَلَمٌ (pena) sama-sama menamai sesuatu.","طَالِبٌ · قَلَمٌ"),
  q("p3-09",3,"fiil","fiil","Manakah contoh fi'il yang berarti membaca?",["يَقْرَأُ","كِتَابٌ","مَكْتَبَةٌ"],"يَقْرَأُ","يَقْرَأُ berarti membaca dan menunjukkan tindakan.","يَقْرَأُ"),
  q("p3-10",3,"konteks","context","Dalam kalimat الطَّالِبُ يَقْرَأُ الْكِتَابَ, manakah kata yang termasuk isim?",["الطَّالِبُ dan الْكِتَابَ","يَقْرَأُ saja","Tidak ada isim"],"الطَّالِبُ dan الْكِتَابَ","الطَّالِبُ (siswa) dan الْكِتَابَ (buku) adalah isim. يَقْرَأُ adalah fi'il.","الطَّالِبُ يَقْرَأُ الْكِتَابَ"),

  // POS 4: membandingkan isim dan fi'il
  q("p4-01",4,"isim","context","Apa perbedaan utama isim dan fi'il?",["Isim menamai sesuatu, sedangkan fi'il menunjukkan tindakan","Isim menunjukkan tindakan, sedangkan fi'il menamai benda","Keduanya selalu berarti benda"],"Isim menamai sesuatu, sedangkan fi'il menunjukkan tindakan","Contoh: بَابٌ (pintu) adalah isim, sedangkan يَفْتَحُ (membuka) adalah fi'il.","بَابٌ يَفْتَحُ"),
  q("p4-02",4,"isim","picture","Lihat ilustrasi anak yang sedang membaca buku. Kata كِتَابٌ (buku) termasuk ...",["Isim","Fi'il","Huruf"],"Isim","كِتَابٌ menamai benda yang dibaca, sehingga termasuk isim.","كِتَابٌ"),
  q("p4-03",4,"fiil","picture","Lihat ilustrasi anak yang sedang membaca buku. Kata يَقْرَأُ (membaca) termasuk ...",["Fi'il","Isim","Huruf"],"Fi'il","يَقْرَأُ menunjukkan tindakan membaca, sehingga termasuk fi'il.","يَقْرَأُ"),
  q("p4-04",4,"isim","isim","Manakah pasangan isim dan fi'il yang benar?",["قَلَمٌ (pena) = isim; يَكْتُبُ (menulis) = fi'il","يَكْتُبُ = isim; قَلَمٌ = fi'il","Keduanya fi'il"],"قَلَمٌ (pena) = isim; يَكْتُبُ (menulis) = fi'il","قَلَمٌ adalah nama benda, sedangkan يَكْتُبُ adalah tindakan menulis.","قَلَمٌ · يَكْتُبُ"),
  q("p4-05",4,"isim","context","Dalam kalimat الْوَلَدُ يَلْعَبُ, kata الْوَلَدُ termasuk ...",["Isim","Fi'il","Huruf"],"Isim","الْوَلَدُ berarti anak laki-laki dan menamai orang.","الْوَلَدُ يَلْعَبُ"),
  q("p4-06",4,"fiil","context","Dalam kalimat الْوَلَدُ يَلْعَبُ, kata يَلْعَبُ termasuk ...",["Fi'il","Isim","Huruf"],"Fi'il","يَلْعَبُ berarti bermain dan menunjukkan tindakan.","الْوَلَدُ يَلْعَبُ"),
  q("p4-07",4,"isim","isim","Manakah kata yang dapat menerima ال dan tetap menjadi isim?",["بَيْتٌ menjadi الْبَيْتُ","يَأْكُلُ menjadi الْيَأْكُلُ","يَشْرَبُ menjadi الْيَشْرَبُ"],"بَيْتٌ menjadi الْبَيْتُ","الْبَيْتُ adalah bentuk isim dengan ال.","بَيْتٌ ← الْبَيْتُ"),
  q("p4-08",4,"fiil","fiil","Kata يَشْرَبُ termasuk fi'il karena ...",["Menunjukkan tindakan minum","Menamai benda air","Menamai tempat"],"Menunjukkan tindakan minum","يَشْرَبُ berarti minum, yaitu sebuah tindakan.","يَشْرَبُ"),
  q("p4-09",4,"konteks","context","Pilih analisis yang tepat untuk kalimat أَحْمَدُ يَفْتَحُ الْبَابَ.",["أَحْمَدُ dan الْبَابَ = isim; يَفْتَحُ = fi'il","Semua kata adalah isim","Semua kata adalah fi'il"],"أَحْمَدُ dan الْبَابَ = isim; يَفْتَحُ = fi'il","أَحْمَدُ adalah nama orang, الْبَابَ adalah benda, dan يَفْتَحُ menunjukkan tindakan membuka.","أَحْمَدُ يَفْتَحُ الْبَابَ"),
  q("p4-10",4,"context","context","Kalimat yang memuat isim dan fi'il sekaligus adalah ...",["الْبِنْتُ تَقْرَأُ الْكِتَابَ","كِتَابٌ وَقَلَمٌ","يَقْرَأُ وَيَكْتُبُ"],"الْبِنْتُ تَقْرَأُ الْكِتَابَ","الْبِنْتُ dan الْكِتَابَ adalah isim, sedangkan تَقْرَأُ adalah fi'il.","الْبِنْتُ تَقْرَأُ الْكِتَابَ"),

  // POS 5: campuran dasar
  q("p5-01",5,"mufradat","picture","Amati gambar berikut, lalu pilih kosakata yang sesuai.",["سَرِيرٌ","كُرْسِيٌّ","بَابٌ"],"سَرِيرٌ","سَرِيرٌ berarti tempat tidur.","سَرِيرٌ","🛏️"),
  q("p5-02",5,"isim","isim","Pilih kata yang termasuk isim.",["يَغْسِلُ","مِنْشَفَةٌ","يَطْبُخُ"],"مِنْشَفَةٌ","مِنْشَفَةٌ berarti handuk dan termasuk isim.","مِنْشَفَةٌ"),
  q("p5-03",5,"fiil","picture","Amati gambar berikut, lalu pilih kata yang sesuai.",["يَطْبُخُ","مَطْبَخٌ","طَعَامٌ"],"يَطْبُخُ","يَطْبُخُ berarti memasak.","يَطْبُخُ","👩‍🍳"),
  q("p5-04",5,"mufradat","meaning","Apa arti بَابٌ?",["Pintu","Jendela","Lantai"],"Pintu","بَابٌ berarti pintu.","بَابٌ"),
  q("p5-05",5,"isim","isim","Kata نَافِذَةٌ termasuk ...",["Isim","Fi'il","Huruf"],"Isim","نَافِذَةٌ berarti jendela.","نَافِذَةٌ"),
  q("p5-06",5,"fiil","fiil","Manakah fi'il yang berarti bermain?",["يَلْعَبُ","لُعْبَةٌ","غُرْفَةٌ"],"يَلْعَبُ","يَلْعَبُ berarti bermain.","يَلْعَبُ"),
  q("p5-07",5,"mufradat","picture","Amati gambar berikut, lalu pilih kosakata yang sesuai.",["مَاءٌ","طَعَامٌ","كِتَابٌ"],"مَاءٌ","مَاءٌ berarti air.","مَاءٌ","💧"),
  q("p5-08",5,"fiil","context","Apa arti kalimat أَنَا أَقْرَأُ الْكِتَابَ?",["Saya membaca buku","Saya menulis buku","Saya membeli buku"],"Saya membaca buku","أَقْرَأُ berarti membaca.","أَنَا أَقْرَأُ الْكِتَابَ"),
  q("p5-09",5,"isim","isim","Manakah kelompok kata benda seluruhnya?",["بَيْتٌ، مَاءٌ، كِتَابٌ","يَأْكُلُ، يَشْرَبُ، يَنَامُ","يَقْرَأُ، بَابٌ، يَلْعَبُ"],"بَيْتٌ، مَاءٌ، كِتَابٌ","Ketiganya menamai benda.","بَيْتٌ · مَاءٌ · كِتَابٌ"),
  q("p5-10",5,"fiil","fiil","Kata yang menunjukkan kegiatan membersihkan adalah ...",["يُنَظِّفُ","مِكْنَسَةٌ","غُرْفَةٌ"],"يُنَظِّفُ","يُنَظِّفُ berarti membersihkan.","يُنَظِّفُ"),

  // POS 6: aplikasi dalam konteks
  q("p6-01",6,"konteks","context","Pilih kalimat yang berarti 'Ibu memasak di dapur'.",["أُمِّي تَطْبُخُ فِي الْمَطْبَخِ","أَبِي يَنَامُ فِي الْغُرْفَةِ","أَخِي يَقْرَأُ الْكِتَابَ"],"أُمِّي تَطْبُخُ فِي الْمَطْبَخِ","تَطْبُخُ berarti memasak dan الْمَطْبَخِ berarti dapur.","أُمِّي تَطْبُخُ فِي الْمَطْبَخِ"),
  q("p6-02",6,"isim","isim","Dalam kalimat أَبِي يَقْرَأُ كِتَابًا, kata yang merupakan isim adalah ...",["أَبِي dan كِتَابًا","يَقْرَأُ saja","Tidak ada"],"أَبِي dan كِتَابًا","أَبِي (ayahku) dan كِتَابًا (buku) merupakan isim.","أَبِي يَقْرَأُ كِتَابًا"),
  q("p6-03",6,"fiil","fiil","Fi'il pada kalimat أُخْتِي تَغْسِلُ الصُّحُونَ adalah ...",["أُخْتِي","تَغْسِلُ","الصُّحُونَ"],"تَغْسِلُ","تَغْسِلُ berarti mencuci.","أُخْتِي تَغْسِلُ الصُّحُونَ"),
  q("p6-04",6,"konteks","picture","Amati gambar berikut, lalu pilih kalimat yang sesuai.",["الْوَلَدُ يُرَتِّبُ الْغُرْفَةَ","الْوَلَدُ يَشْرَبُ الْمَاءَ","الْوَلَدُ يَنَامُ"],"الْوَلَدُ يُرَتِّبُ الْغُرْفَةَ","يُرَتِّبُ berarti merapikan dan الْغُرْفَةَ berarti kamar.","الْوَلَدُ يُرَتِّبُ الْغُرْفَةَ","🧹"),
  q("p6-05",6,"isim","meaning","Apa arti الْمَطْبَخُ?",["Dapur","Kamar mandi","Ruang tamu"],"Dapur","الْمَطْبَخُ berarti dapur.","الْمَطْبَخُ"),
  q("p6-06",6,"fiil","meaning","Kata يَسْتَيْقِظُ berarti ...",["Bangun tidur","Pergi tidur","Mencuci"],"Bangun tidur","يَسْتَيْقِظُ berarti bangun tidur.","يَسْتَيْقِظُ"),
  q("p6-07",6,"konteks","context","Lengkapi: أَنَا ... الْمَاءَ (Saya minum air).",["أَشْرَبُ","أَكْتُبُ","أَنَامُ"],"أَشْرَبُ","أَشْرَبُ berarti saya minum.","أَنَا أَشْرَبُ الْمَاءَ"),
  q("p6-08",6,"isim","isim","Kata الْحَمَّامُ dalam kalimat أَذْهَبُ إِلَى الْحَمَّامِ adalah ...",["Isim","Fi'il","Kata sambung"],"Isim","الْحَمَّامُ menamai tempat, yaitu kamar mandi.","الْحَمَّامُ"),
  q("p6-09",6,"fiil","fiil","Pilih dua fi'il berikut.",["يَفْتَحُ dan يُغْلِقُ","بَابٌ dan نَافِذَةٌ","مَاءٌ dan طَعَامٌ"],"يَفْتَحُ dan يُغْلِقُ","Keduanya menunjukkan tindakan membuka dan menutup.","يَفْتَحُ · يُغْلِقُ"),
  q("p6-10",6,"konteks","context","Makna kalimat أَبِي يَغْسِلُ السَّيَّارَةَ adalah ...",["Ayahku mencuci mobil","Ayahku membaca buku","Ayahku memasak makanan"],"Ayahku mencuci mobil","يَغْسِلُ berarti mencuci.","أَبِي يَغْسِلُ السَّيَّارَةَ"),

  // POS 7: evaluasi akhir integratif
  q("p7-01",7,"mufradat","picture","Amati gambar berikut, lalu pilih kosakata yang sesuai.",["خِزَانَةٌ","مِكْنَسَةٌ","كُرْسِيٌّ"],"خِزَانَةٌ","خِزَانَةٌ berarti lemari.","خِزَانَةٌ","🗄️"),
  q("p7-02",7,"isim","isim","Manakah isim dalam kalimat الْبِنْتُ تَكْنُسُ الْبَيْتَ?",["الْبِنْتُ dan الْبَيْتَ","تَكْنُسُ saja","Semua fi'il"],"الْبِنْتُ dan الْبَيْتَ","الْبِنْتُ (anak perempuan) dan الْبَيْتَ (rumah) adalah isim.","الْبِنْتُ تَكْنُسُ الْبَيْتَ"),
  q("p7-03",7,"fiil","fiil","Fi'il yang berarti menyapu adalah ...",["تَكْنُسُ","مِكْنَسَةٌ","بَيْتٌ"],"تَكْنُسُ","تَكْنُسُ berarti menyapu.","تَكْنُسُ"),
  q("p7-04",7,"konteks","context","Kalimat yang berarti 'Saya tidur di kamar' adalah ...",["أَنَا أَنَامُ فِي الْغُرْفَةِ","أَنَا أَشْرَبُ الْمَاءَ","أَنَا أَطْبُخُ الطَّعَامَ"],"أَنَا أَنَامُ فِي الْغُرْفَةِ","أَنَامُ berarti saya tidur dan الْغُرْفَةِ berarti kamar.","أَنَا أَنَامُ فِي الْغُرْفَةِ"),
  q("p7-05",7,"mufradat","meaning","Apa arti مِكْنَسَةٌ?",["Sapu","Piring","Lemari"],"Sapu","مِكْنَسَةٌ berarti sapu.","مِكْنَسَةٌ"),
  q("p7-06",7,"fiil","picture","Amati gambar berikut, lalu pilih kata yang sesuai.",["يَفْتَحُ","يُغْلِقُ","يَنَامُ"],"يَفْتَحُ","يَفْتَحُ berarti membuka.","يَفْتَحُ","🚪"),
  q("p7-07",7,"isim","isim","Kelompok isim yang tepat adalah ...",["طَعَامٌ، مَاءٌ، مَائِدَةٌ","يَأْكُلُ، يَشْرَبُ، يَنَامُ","يَفْتَحُ، بَابٌ، يَغْسِلُ"],"طَعَامٌ، مَاءٌ، مَائِدَةٌ","Ketiganya menamai makanan, air, dan meja makan.","طَعَامٌ · مَاءٌ · مَائِدَةٌ"),
  q("p7-08",7,"konteks","context","Arti أُمِّي تَغْسِلُ الْمَلَابِسَ adalah ...",["Ibuku mencuci pakaian","Ibuku membaca buku","Ibuku tidur di kamar"],"Ibuku mencuci pakaian","تَغْسِلُ berarti mencuci dan الْمَلَابِسَ berarti pakaian.","أُمِّي تَغْسِلُ الْمَلَابِسَ"),
  q("p7-09",7,"fiil","fiil","Manakah pasangan fi'il dan artinya yang benar?",["يَكْنُسُ = menyapu","بَيْتٌ = tidur","مَاءٌ = minum"],"يَكْنُسُ = menyapu","يَكْنُسُ merupakan fi'il yang berarti menyapu.","يَكْنُسُ"),
  q("p7-10",7,"konteks","context","Pilih kalimat yang memuat isim dan fi'il sekaligus.",["الْوَلَدُ يَلْعَبُ فِي الْبَيْتِ","بَيْتٌ وَكِتَابٌ","مَاءٌ وَطَعَامٌ"],"الْوَلَدُ يَلْعَبُ فِي الْبَيْتِ","الْوَلَدُ dan الْبَيْتِ adalah isim, sedangkan يَلْعَبُ adalah fi'il.","الْوَلَدُ يَلْعَبُ فِي الْبَيْتِ"),
];
