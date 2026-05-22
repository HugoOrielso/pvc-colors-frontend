"use client";

import EditArticleForm from "@/components/articles/EditArticle";
import { useParams } from "next/navigation";

export default function EditArticlePage() {
  const params = useParams();

  return (
    <EditArticleForm articleId={params.id as string} />
  );
}