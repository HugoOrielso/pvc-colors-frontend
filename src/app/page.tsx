import type { Metadata } from "next";

import PublicLines from "@/components/home/PublicLines";
import { HeroSlider } from "@/components/home/HeroSlider";
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";

export const metadata: Metadata = {
  title: "PVC Colors | Pinturas, recubrimientos y productos especializados",
  description:
    "Encuentra productos especializados de PVC Colors: líneas de pinturas, recubrimientos, colores, presentaciones y fichas técnicas para tus proyectos.",
  keywords: [
    "PVC Colors",
    "pinturas",
    "recubrimientos",
    "colores",
    "productos industriales",
    "fichas técnicas",
  ],
  openGraph: {
    title: "PVC Colors | Productos especializados",
    description:
      "Explora nuestras líneas de productos, colores disponibles, presentaciones y fichas técnicas.",
    type: "website",
    locale: "es_CO",
    siteName: "PVC Colors",
  },
  twitter: {
    card: "summary_large_image",
    title: "PVC Colors | Productos especializados",
    description:
      "Explora nuestras líneas de productos, colores disponibles, presentaciones y fichas técnicas.",
  },
};

export default function HomePage() {
  return (
    <main className="pvc-page min-h-screen bg-white text-[#061540]">
      <Header />

      <HeroSlider />

      <PublicLines />

      <Footer />
    </main>
  );
}