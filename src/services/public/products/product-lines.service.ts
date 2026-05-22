import axiosClientPublic from "@/lib/axiosPublic";

// services/public/products.service.ts
export const fetchProductById = async (id: string): Promise<PublicProductDetail> => {
  const res = await axiosClientPublic.get<PublicProductResponse>(
    `/public/products/${id}`
  );
  return res.data.data;
};