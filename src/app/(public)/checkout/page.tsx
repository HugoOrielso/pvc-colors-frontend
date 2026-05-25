import { Checkout } from "@/components/checkout/Checkout";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Finalizar compra | PVC Colors",
  description:
    "Completa tu pedido de forma segura y revisa los detalles de facturación, envío y pago de tus productos PVC Colors.",
};

export default function Page() {
  return (
    <div className="min-h-screen">
        <Checkout />
    </div>
  );
}