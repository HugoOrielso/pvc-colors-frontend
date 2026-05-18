import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/services/private/products/products.service";
import { updateProductService } from "@/services/private/products/update-product.service";

export function useUpdateProduct(productId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProductFormInput) =>
      updateProductService(productId, data),

    onSuccess: (res) => {
      toast.success(res?.message || "Producto actualizado correctamente");

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      queryClient.invalidateQueries({
        queryKey: ["product", productId],
      });

      setTimeout(() => { location.reload() }, 350)
    },

    onError: (error) => {
      toast.error(
        getApiErrorMessage(error, "No se pudo actualizar el producto")
      );
    },
  });
}