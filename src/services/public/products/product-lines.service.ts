import axiosClientPublic from "@/lib/axiosPublic";

export const fetchProductById = async (id: string) => {
  const res = await axiosClientPublic.get(`/public/products/${id}`);
  return res.data as ProductDetail;
};
