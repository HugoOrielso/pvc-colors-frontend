import axiosClient from "@/lib/axios";

export async function updateProductLine(
  id: string,
  payload: UpdateProductLinePayload
) {
  const formData = new FormData();

  formData.append("slug", payload.slug);
  formData.append("name", payload.name);
  formData.append("description", payload.description);

  if (payload.image) {
    formData.append("image", payload.image);
  }

  const { data } = await axiosClient.patch(`/lines/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
}