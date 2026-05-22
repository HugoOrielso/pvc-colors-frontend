// hooks/public/lines/usePublicLines.ts

import { useQuery } from "@tanstack/react-query";
import {
  getProductLinesByIdServicePublic,
  getProductLinesServicePublic,
} from "@/services/public/lines/public-lines.service";



export function useProductLinesPublic() {
  return useQuery({
    queryKey: ["product-lines"],
    queryFn: getProductLinesServicePublic,
  });
}

export function useProductLineByIdPublic(id: string) {
  return useQuery({
    queryKey: ["public-product-line", id],
    queryFn: () => getProductLinesByIdServicePublic(id),
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 5,
  });
}