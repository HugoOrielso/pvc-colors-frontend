import { createProductService } from "@/services/private/products/create.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
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




export function getApiErrorMessage(error: unknown, fallback: string) {
  if (axios.isAxiosError(error)) {
    const responseData = error.response?.data;

    const fieldErrors = responseData?.errors?.fieldErrors;

    if (fieldErrors && typeof fieldErrors === "object") {
      const firstFieldError = Object.values(fieldErrors)
        .flat()
        .find(Boolean);

      if (firstFieldError) {
        return String(firstFieldError);
      }
    }

    const formErrors = responseData?.errors?.formErrors;

    if (Array.isArray(formErrors) && formErrors.length > 0) {
      return String(formErrors[0]);
    }

    return responseData?.message || fallback;
  }

  return "Ocurrió un error inesperado";
}