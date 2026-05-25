import type { Metadata } from "next";
import { TermsAndConditions } from "@/components/conditions/Conditions";
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";

export const metadata: Metadata = {
  title: "Términos y Condiciones | PVC Colors",
  description:
    "Consulta los términos y condiciones de uso, compra, pago, envíos, garantías, devoluciones y protección de datos de PVC Colors.",
  alternates: {
    canonical: "/terminos-y-condiciones",
  },
  openGraph: {
    title: "Términos y Condiciones | PVC Colors",
    description:
      "Información legal sobre compras, pagos, envíos, garantías, devoluciones y uso del sitio web de PVC Colors.",
    url: "/terminos-y-condiciones",
    siteName: "PVC Colors",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto] ">
      <Header />
      <TermsAndConditions />
      <Footer />
    </div>
  );
}