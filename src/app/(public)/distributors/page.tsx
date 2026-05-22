"use client";

import { DistributorLocations } from "@/components/distributors/DistribuitorsLocations";
import { DistributorHero } from "@/components/distributors/DistributorsHero";
import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";

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