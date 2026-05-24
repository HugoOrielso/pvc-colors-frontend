"use client";

import type { Metadata } from "next";

import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";
import ResultadoContent from "@/components/result/result";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Estado de pago",
  description:
    "Consulta el estado de tu pago, el detalle de tu pedido y la información de facturación de PVC Colors.",
};

export default function Page() {
  return (
    <Suspense fallback={<div>Cargando pago...</div>}>
      <div>
        <Header />
        <ResultadoContent />
        <Footer />
      </div>
    </Suspense>
  );
}