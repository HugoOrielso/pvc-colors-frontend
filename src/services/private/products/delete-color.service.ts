// services/products/delete-product-color.service.ts

import axiosClient from "@/lib/axios";

export async function deleteProductColorService(
  productId: string,
  colorId: string
) {
  const res = await axiosClient.delete(
    `/products/${productId}/color/${colorId}`
  );

  return res.data;
}