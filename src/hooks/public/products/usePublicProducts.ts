import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "@/services/public/products/product-lines.service";

// hooks/public/products/usePublicProducts.ts
export const useProductByIdPublic = (id: string) => {
  return useQuery<PublicProductDetail, Error>({
    queryKey: ["public-product", id],
    queryFn: () => fetchProductById(id),
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 5,
  });
};


