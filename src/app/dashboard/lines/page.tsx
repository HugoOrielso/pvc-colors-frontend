import SelectProductLineGrid from "@/components/lines/SelectProductLine";

export const metadata = {
  title: "Líneas",
  description: "Lista de todas las líneas registradas",
};

export default function LinesPage() {
  return (
    <main className="p-4">
      <SelectProductLineGrid />
    </main>
  );
}