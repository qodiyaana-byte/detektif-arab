import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Detektif Arab — Misi Isim dan Fi'il",
  description: "Petualangan interaktif bahasa Arab kelas VII untuk memahami isim dan fi'il melalui enam pos.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="id"><body>{children}</body></html>;
}
