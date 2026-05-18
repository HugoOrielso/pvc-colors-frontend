import { getProductsService } from "@/services/private/products/get-products.service";
import { useQuery } from "@tanstack/react-query";

export function useProducts(productLineId?: string) {
  return useQuery({
    queryKey: ["products", productLineId],
    queryFn: () => getProductsService(productLineId),
  });
}