import { fetchPublicArticles, PublicArticle } from "@/services/public/articles/articles.service";
import { useQuery } from "@tanstack/react-query";


export const usePublicArticles = () => {
  return useQuery<PublicArticle[], Error>({
    queryKey: ["public-articles"],
    queryFn: fetchPublicArticles,
    staleTime: 1000 * 60 * 5,
  });
};