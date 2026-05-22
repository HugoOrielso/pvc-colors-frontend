// hooks/articles/useArticles.ts
import { createArticle, getArticleById, getArticles, updateArticle } from "@/services/private/articles/articles.service";
import { useMutation, useQuery } from "@tanstack/react-query";


export function useCreateArticle() {
  return useMutation({
    mutationFn: createArticle,
  });
}

export function useUpdateArticle(id: string) {
  return useMutation({
    mutationFn: (data: ArticleFormValues) => updateArticle(id, data),
  });
}

export function useArticleById(id?: string) {
  return useQuery({
    queryKey: ["article", id],
    queryFn: () => getArticleById(id!),
    enabled: Boolean(id),
  });
}


export function useArticles() {
  return useQuery({
    queryKey: ["articles"],
    queryFn: getArticles,
  });
}