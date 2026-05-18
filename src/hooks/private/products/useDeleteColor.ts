// hooks/products/useDeleteProductColor.ts
import { deleteProductColorService } from "@/services/private/products/delete-color.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type DeleteProductColorParams = {
  productId: string;
  colorId: string;
};

export function useDeleteProductColor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productId,
      colorId,
    }: DeleteProductColorParams) =>
      deleteProductColorService(productId, colorId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["product", variables.productId],
      });

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
}