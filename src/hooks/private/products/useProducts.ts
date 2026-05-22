import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getApiErrorMessage,
  getProductByIdService,
  updateProductService,
} from "@/services/private/products/products.service";
import { toast } from "sonner";
import { ProductByIdResponse } from "@/types/hooks/products/productbyid";


export function useProduct(productId?: string) {
  return useQuery<ProductByIdResponse, Error>({
    queryKey: ["product-id", productId],
    queryFn: () => getProductByIdService(productId!),
    enabled: Boolean(productId),
  });
}

export function useUpdateProduct(productId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProductFormInput) =>
      updateProductService(productId, data),

    onSuccess: (res) => {
      toast.success(res?.message || "Producto actualizado correctamente");

      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", productId] });
      queryClient.invalidateQueries({ queryKey: ["product-lines"] });
    },

    onError: (error) => {
      toast.error(
        getApiErrorMessage(error, "No se pudo actualizar el producto")
      );
    },
  });
}