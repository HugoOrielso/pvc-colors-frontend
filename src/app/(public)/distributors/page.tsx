import { type Metadata } from "next";

import { DistributorLocations } from "@/components/distributors/DistribuitorsLocations";
import { DistributorHero } from "@/components/distributors/DistributorsHero";
import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";

export const metadata: Metadata = {
  title: "Distribuidores autorizados | PVC Colors",
  description:
    "Encuentra distribuidores autorizados de PVC Colors y descubre dónde comprar nuestros productos y soluciones de pintura cerca de ti.",
};

export default function DistribuidoresPage() {
  return (
    <>
      <Header />

      <main className="pvc-page overflow-hidden bg-white text-[#061540]">
        <DistributorHero />
        <DistributorLocations />
      </main>

      <Footer />
    </>
  );
}