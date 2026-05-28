import { getProductRecommendations } from "@/services/public/lines/recomendations.service";
import { useQuery } from "@tanstack/react-query";

export function useProductRecommendations() {
  return useQuery<ProductRecommendationsResponse>({
    queryKey: ["product-recommendations"],
    queryFn: getProductRecommendations,
  });
}