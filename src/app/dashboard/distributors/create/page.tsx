import type { Metadata } from "next";

import DistributorForm from "@/components/distributors/DistributorsForm";

export const metadata: Metadata = {
  title: "Registrar distribuidor",
  description:
    "Agrega nuevos distribuidores autorizados para ampliar la red comercial y de distribución de PVC Colors.",
};

export default function CreateDistributorPage() {
  return <DistributorForm />;
}