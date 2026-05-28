import axiosClientPublic from "@/lib/axiosPublic";

export async function getProductRecommendations() {
  const { data } = await axiosClientPublic.get(
    "/public/products/recomendations"
  );

  return data.data;
}