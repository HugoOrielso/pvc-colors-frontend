import { type Metadata } from "next";

import Login from "@/components/login/Login";

export const metadata: Metadata = {
  title: "Iniciar sesión | PVC Colors",
  description:
    "Accede al panel administrativo de PVC Colors para gestionar productos, pedidos, distribuidores y contenido.",
};

export default function DistribuidoresPage() {
  return (
    <>
      <Login />
    </>
  );
}