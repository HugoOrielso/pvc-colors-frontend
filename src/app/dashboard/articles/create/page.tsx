import type { Metadata } from "next";

import ArticleForm from "@/components/articles/CreateArticle";

export const metadata: Metadata = {
  title: "Crear artículo",
  description:
    "Redacta y publica contenido educativo sobre pintura, acabados, color y aplicaciones técnicas para PVC Colors.",
};

export default function CreateArticlePage() {
  return <ArticleForm />;
}