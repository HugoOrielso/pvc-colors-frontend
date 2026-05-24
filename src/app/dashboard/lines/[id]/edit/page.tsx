import type { Metadata } from "next";

import EditProductLineForm from "@/components/lines/UpdateLine";

export const metadata: Metadata = {
  title: "Editar línea de producto",
  description:
    "Actualiza la información, identidad visual y configuración de una línea de productos de PVC Colors.",
};

export default function EditProductLinePage() {
  return <EditProductLineForm />;
}