import {
  deactivateProductImageService,
  setMainProductImageService,
} from "@/services/private/productImages/productImages.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import { replaceProductImageService } from "@/services/private/productImages/productImages.service";

type ReplaceProductImagePayload = {
  imageId: string;
  file: File;
};

type ApiErrorResponse = {
  success: false;
  message: string;
};

type ApiSuccessResponse<T> = {
  success: true;
  message: string;
  data: T;
};

type ProductImageResponse = {
  id: string;
  url: string;
  publicId?: string | null;
  alt?: string | null;
  position: number;
  isMain: boolean;
  productId: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

type DeactivateImageResponse = {
  deactivatedImageId: string;
  newMainImage: ProductImageResponse | null;
};

export const useSetMainProductImage = (productId: string) => {
  const queryClient = useQueryClient();

  return useMutation<
    ApiSuccessResponse<ProductImageResponse>,
    AxiosError<ApiErrorResponse>,
    string
  >({
    mutationFn: (imageId) => setMainProductImageService(productId, imageId),

    onSuccess: () => {
      toast.success("Imagen principal actualizada");

      queryClient.invalidateQueries({
        queryKey: ["product-by-id", productId],
      });
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Error actualizando la imagen principal"
      );
    },
  });
};

export const useDeactivateProductImage = (productId: string) => {
  const queryClient = useQueryClient();

  return useMutation<
    ApiSuccessResponse<DeactivateImageResponse>,
    AxiosError<ApiErrorResponse>,
    string
  >({
    mutationFn: (imageId) => deactivateProductImageService(productId, imageId),

    onSuccess: () => {
      toast.success("Imagen desactivada");

      queryClient.invalidateQueries({
        queryKey: ["product-by-id", productId],
      });
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Error desactivando la imagen"
      );
    },
  });
};

export const useReplaceProductImage = (productId: string) => {
  const queryClient = useQueryClient();

  return useMutation<
    ApiSuccessResponse<ProductImageResponse>,
    AxiosError<ApiErrorResponse>,
    ReplaceProductImagePayload
  >({
    mutationFn: ({ imageId, file }) =>
      replaceProductImageService(productId, imageId, file),

    onSuccess: () => {
      toast.success("Imagen reemplazada correctamente");

      queryClient.invalidateQueries({
        queryKey: ["product-by-id", productId],
      });
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Error reemplazando la imagen"
      );
    },
  });
};