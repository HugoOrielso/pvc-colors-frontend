import CreateProductLineForm from "@/components/lines/CreateLineForm";

export const metadata = {
  title: "Crea nuevas líneas de productos",
  description:
    "Crea y organiza nuevas líneas de productos para el catálogo de PVC Colors desde el panel administrativo.",
};
export default function ProductLinesPage() {
  return (
    <main className="mx-auto max-w-2xl p-6">
      <CreateProductLineForm />
    </main>
  );
}