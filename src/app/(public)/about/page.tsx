import { AboutPage } from "@/components/about/About";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Nosotros | PVC Colors",
  description:
    "Conoce la historia, experiencia y compromiso de PVC Colors en soluciones de pintura, color y acabados de alta calidad.",
};

export default function Page() {
  return (
    <div >
      <AboutPage />
    </div>
  );
}