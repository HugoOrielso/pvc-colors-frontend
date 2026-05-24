import type { Metadata } from "next";
import CreateProductForm from "@/components/inventory/ProductForm";

export const metadata: Metadata = {
  title: "Crear producto | Dashboard",
  description: "Crea un nuevo producto desde el panel administrativo.",
};

export default function CreateProductWithLinePage() {
  return (
    <main className="p-6">
      <CreateProductForm />
    </main>
  );
}