import { useQuery } from "@tanstack/react-query";
import { getProductByIdService } from "@/services/private/products/get-product-by-id.service";

export function useProductById(productId: string) {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductByIdService(productId),
    enabled: Boolean(productId),
  });
}