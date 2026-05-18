// hooks/products/useDeleteProductImage.ts
import { deleteProductImageService } from "@/services/private/products/delete-image.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type DeleteProductImageParams = {
  productId: string;
  imageId: string;
};

export function useDeleteProductImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, imageId }: DeleteProductImageParams) =>
      deleteProductImageService(productId, imageId),

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