import { type Metadata } from "next";

import { AprendeConPvc } from "@/components/learn/Learn";

export const metadata: Metadata = {
  title: "Aprende con PVC Colors | PVC Colors",
  description:
    "Explora guías, consejos y contenido educativo sobre pinturas, acabados, color y aplicaciones profesionales con PVC Colors.",
};

export default function DistribuidoresPage() {
  return (
    <>
      <AprendeConPvc />
    </>
  );
}