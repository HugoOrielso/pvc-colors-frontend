// services/articles/articles.service.ts

import axiosClient from "@/lib/axios";


export async function createArticle(data: ArticleFormValues) {
  const res = await axiosClient.post("/articles", data);
  return res.data.data as Article;
}

export async function updateArticle(id: string, data: ArticleFormValues) {
  const res = await axiosClient.put(`/articles/${id}`, data);
  return res.data.data as Article;
}

export async function getArticleById(id: string) {
  const res = await axiosClient.get(`/articles/${id}`);
  return res.data.data as Article;
}

export async function getArticles() {
  const res = await axiosClient.get("/articles");
  return res.data.data as Article[];
}