import PaintCalculator from "@/components/calculator/Calculator";
import { type Metadata } from "next";

export const metadata: Metadata = {
    title: "Calculadora de pintura | PVC Colors",
    description:
        "Calcula fácilmente la cantidad de pintura y material necesario según los metros cuadrados de tu proyecto.",
};

export default function Page() {
    return (
        <div>
            <PaintCalculator />
        </div>
    );
}