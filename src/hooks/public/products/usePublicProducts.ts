import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "@/services/public/products/product-lines.service";

export const useProductByIdPublic = (id: string) => {
  return useQuery<ProductDetail, Error>({
    queryKey: ["public-product", id],
    queryFn: async () => {
      const response = await fetchProductById(id);
      return response.data;
    },
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 5,
  });
};