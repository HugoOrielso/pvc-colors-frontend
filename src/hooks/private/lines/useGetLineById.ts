import { getProductLineById } from "@/services/private/lines/getLineById.service";
import { useQuery } from "@tanstack/react-query";

export function useProductLineById(id?: string) {
  return useQuery({
    queryKey: ["product-line", id],
    queryFn: () => getProductLineById(id as string),
    enabled: !!id,
  });
}