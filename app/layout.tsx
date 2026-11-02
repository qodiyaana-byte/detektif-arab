import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Detektif Arab — Misi Keluargaku",
  description: "Permainan edukasi interaktif untuk belajar bahasa Arab kelas VII."
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body>{children}</body></html>;
}
