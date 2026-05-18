import axiosClient from "@/lib/axios";
import axios from "axios";

export async function createProductLineService(data: CreateProductLineInput) {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("slug", data.slug);
  formData.append("description", data.description);
  formData.append("image", data.image);

  const response = await axiosClient.post("/lines", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}

export async function getProductLinesService() {
  const res = await axiosClient.get<{ data: ProductLine[] }>("/lines");
  return res.data;
}

export function getProductLineErrorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.errors?.[0]?.message ||
      error.response?.data?.message ||
      "No se pudo crear la línea de producto"
    );
  }

  return "Error inesperado creando la línea de producto";
}