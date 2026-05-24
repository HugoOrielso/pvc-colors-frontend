"use client";

import type { Metadata } from "next";

import EditArticleForm from "@/components/articles/EditArticle";
import { useParams } from "next/navigation";

export const metadata: Metadata = {
  title: "Editar artículo",
  description:
    "Actualiza contenido educativo y técnico relacionado con pinturas, acabados y aplicaciones de PVC Colors.",
};

export default function EditArticlePage() {
  const params = useParams();

  return (
    <EditArticleForm articleId={params.id as string} />
  );
}