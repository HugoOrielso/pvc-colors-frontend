import axiosClient from "@/lib/axios";

export async function getProductsService(productLineId?: string) {
  const res = await axiosClient.get<ProductsResponse>("/products", {
    params: productLineId ? { productLineId } : undefined,
  });

  return res.data;
}
