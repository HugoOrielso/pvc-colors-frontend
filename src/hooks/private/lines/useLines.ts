import { useQuery } from "@tanstack/react-query";
import { createProductLineService, getProductLineErrorMessage, getProductLinesService } from "@/services/private/lines/lines.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

export function useCreateProductLine() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProductLineInput) =>
      createProductLineService(data),

    onSuccess: (response) => {
      toast.success(response?.message || "Línea creada correctamente");

      queryClient.invalidateQueries({
        queryKey: ["product-lines"],
      });
    },

    onError: (error) => {
      toast.error(getProductLineErrorMessage(error));
    },
  });
}

export function useProductLines() {
  return useQuery({
    queryKey: ["product-lines"],
    queryFn: getProductLinesService,
  });
}