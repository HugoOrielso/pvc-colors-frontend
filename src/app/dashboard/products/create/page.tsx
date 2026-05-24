import SelectProductLineGrid from "@/components/lines/SelectProductLine";

export const metadata = {
  title: "Crear producto | Dashboard",
};

export default function CreateProductPage() {

  return (
    <div className="p-4">
      <SelectProductLineGrid  />
    </div>
  )
}