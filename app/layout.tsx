import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Detektif Arab — Peta Petualangan",
  description: "Petualangan interaktif bahasa Arab kelas VII melalui tujuh pos pembelajaran dan tantangan."
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body>{children}</body></html>;
}
