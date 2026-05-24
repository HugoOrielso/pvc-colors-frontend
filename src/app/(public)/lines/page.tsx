import { type Metadata } from "next";

import { Lines } from "@/components/lines/Lines";

export const metadata: Metadata = {
  title: "Líneas de productos | PVC Colors",
  description:
    "Descubre las líneas de productos de PVC Colors y encuentra soluciones especializadas para pintura, acabados y protección.",
};

export default function DistribuidoresPage() {
  return (
    <>
      <Lines />
    </>
  );
}