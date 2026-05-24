import type { Metadata } from "next";

import { EditDistributorForm } from "@/components/distributors/EditDistributors";

export const metadata: Metadata = {
  title: "Editar distribuidor",
  description:
    "Actualiza la información comercial, ubicación y datos de contacto de un distribuidor autorizado de PVC Colors.",
};

export default function EditDistributorPage() {
  return <EditDistributorForm />;
}