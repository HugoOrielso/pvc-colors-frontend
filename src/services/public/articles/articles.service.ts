import axiosClientPublic from "@/lib/axiosPublic";

export interface PublicArticle {
  id: string;
  title: string;
  markdown: string;
  createdAt: string;
  updatedAt: string;
}

export const fetchPublicArticles = async () => {
  const res = await axiosClientPublic.get("/public/articles");

  return res.data.data as PublicArticle[];
};