import axiosClient from "@/lib/axios";

export const setMainProductImageService = async (
  productId: string,
  imageId: string
) => {
  const res = await axiosClient.patch(
    `/products/${productId}/images/${imageId}/main`
  );

  return res.data;
};

export const deactivateProductImageService = async (
  productId: string,
  imageId: string
) => {
  const res = await axiosClient.patch(
    `/products/${productId}/images/${imageId}/deactivate`
  );

  return res.data;
};


export const replaceProductImageService = async (
  productId: string,
  imageId: string,
  file: File
) => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await axiosClient.patch(
    `/products/${productId}/images/${imageId}/replace`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};