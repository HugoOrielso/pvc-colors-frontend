import { createProductService } from "@/services/private/products/create.service";
import { getApiErrorMessage } from "@/services/private/products/products.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProductFormInput) => createProductService(data),

    onSuccess: (res) => {
      toast.success(res?.message || "Producto creado correctamente");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },

    onError: (error) => {
      toast.error(getApiErrorMessage(error, "No se pudo crear el producto"));
    },
  });
}
