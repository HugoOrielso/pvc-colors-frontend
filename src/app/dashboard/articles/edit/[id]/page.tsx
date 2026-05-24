import type { Metadata } from "next";

import EditArticleForm from "@/components/articles/EditArticle";

export const metadata: Metadata = {
  title: "Editar artículo",
  description:
    "Actualiza contenido educativo y técnico relacionado con pinturas, acabados y aplicaciones de PVC Colors.",
};

export default function EditArticlePage() {

  return (
    <EditArticleForm />
  );
}