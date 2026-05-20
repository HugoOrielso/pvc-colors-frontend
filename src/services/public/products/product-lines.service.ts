import axiosClientPublic from "@/lib/axiosPublic";

type ProductDetailResponse = {
  ok: boolean;
  data: ProductDetail;
};

export const fetchProductById = async (id: string): Promise<ProductDetail> => {
  const res = await axiosClientPublic.get<ProductDetailResponse>(
    `/public/products/${id}`
  );

  return res.data.data;
};