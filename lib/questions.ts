export type Question = {
  id: string; category: "mufradat" | "isim-fiil" | "konteks";
  prompt: string; arabic?: string; options: string[]; answer: string;
  explanation: string;
};

export const questions: Question[] = [
  { id:"m1", category:"mufradat", prompt:"Manakah gambar/kata yang berarti ayah?", arabic:"أَبٌ", options:["Ayah","Ibu","Kakek","Saudara perempuan"], answer:"Ayah", explanation:"أَبٌ berarti ayah." },
  { id:"m2", category:"mufradat", prompt:"Apa arti kata berikut?", arabic:"أُمٌّ", options:["Nenek","Ibu","Saudara laki-laki","Ayah"], answer:"Ibu", explanation:"أُمٌّ berarti ibu." },
  { id:"m3", category:"mufradat", prompt:"Pilih arti yang tepat.", arabic:"أَخٌ", options:["Saudara perempuan","Kakek","Saudara laki-laki","Nenek"], answer:"Saudara laki-laki", explanation:"أَخٌ berarti saudara laki-laki." },
  { id:"m4", category:"mufradat", prompt:"Apa arti kata berikut?", arabic:"جَدَّةٌ", options:["Ibu","Nenek","Kakek","Saudara perempuan"], answer:"Nenek", explanation:"جَدَّةٌ berarti nenek." },
  { id:"i1", category:"isim-fiil", prompt:"Kata أَبٌ termasuk kelompok apa?", arabic:"أَبٌ", options:["Isim","Fi'il"], answer:"Isim", explanation:"أَبٌ adalah kata benda (isim)." },
  { id:"i2", category:"isim-fiil", prompt:"Kata يَلْعَبُ termasuk kelompok apa?", arabic:"يَلْعَبُ", options:["Isim","Fi'il"], answer:"Fi'il", explanation:"يَلْعَبُ menunjukkan kegiatan bermain, sehingga termasuk fi'il." },
  { id:"i3", category:"isim-fiil", prompt:"Manakah yang termasuk fi'il?", options:["بَيْتٌ","أُمٌّ","يَقْرَأُ","أَخٌ"], answer:"يَقْرَأُ", explanation:"يَقْرَأُ berarti membaca dan termasuk fi'il." },
  { id:"k1", category:"konteks", prompt:"Lengkapi makna kalimat هَذَا أَبِي.", arabic:"هَذَا أَبِي", options:["Ini ayahku.","Ini ibuku.","Ini rumahku.","Ini saudaraku."], answer:"Ini ayahku.", explanation:"هَذَا أَبِي berarti ini ayahku." },
  { id:"k2", category:"konteks", prompt:"Kata yang tepat untuk 'Ini ibuku' adalah ...", options:["هَذَا أَبِي","هَذِهِ أُمِّي","هَذَا أَخِي","هَذِهِ أُخْتِي"], answer:"هَذِهِ أُمِّي", explanation:"هَذِهِ أُمِّي berarti ini ibuku." },
  { id:"k3", category:"konteks", prompt:"Apa arti kalimat أَخِي يَقْرَأُ?", arabic:"أَخِي يَقْرَأُ", options:["Saudaraku membaca.","Ayahku bermain.","Ibuku menulis.","Nenekku membaca."], answer:"Saudaraku membaca.", explanation:"أَخِي berarti saudaraku dan يَقْرَأُ berarti membaca." }
];
