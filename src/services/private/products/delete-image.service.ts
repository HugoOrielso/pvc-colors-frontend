// services/products/delete-product-image.service.ts

import axiosClient from "@/lib/axios";

export async function deleteProductImageService(productId: string, imageId: string) {
  const res = await axiosClient.delete(`/products/${productId}/image/${imageId}`);
  return res.data;
}