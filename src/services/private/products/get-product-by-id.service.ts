import axiosClient from "@/lib/axios";

export async function getProductByIdService(id: string) {
  const res = await axiosClient.get<ProductResponse>(`/products/${id}`);

  return res.data;
}