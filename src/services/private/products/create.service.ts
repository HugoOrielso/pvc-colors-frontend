import axiosClient from "@/lib/axios";

export async function createProductService(
  data: CreateProductFormInput
) {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("slug", data.slug);
  formData.append("description", data.description);
  formData.append("productLineId", data.productLineId);
  if (data.coverageMinM2PerGallon) {
    formData.append("coverageMinM2PerGallon", String(data.coverageMinM2PerGallon));
  }
  if (data.coverageMaxM2PerGallon) {
    formData.append("coverageMaxM2PerGallon", String(data.coverageMaxM2PerGallon));
  }

  if (data.recommendations?.trim()) {
    formData.append(
      "recommendations",
      data.recommendations.trim()
    );
  }

  formData.append("colors", JSON.stringify(data.colors ?? []));
  formData.append("colorGroups", JSON.stringify(data.colorGroups ?? []));
  formData.append("presentations", JSON.stringify(data.presentations ?? []));
  formData.append("features", JSON.stringify(data.features ?? []));

  if (data.technicalSheet instanceof File) {
    formData.append(
      "technicalSheet",
      data.technicalSheet
    );
  }

  if (!data.images?.length) {
    throw new Error(
      "Debes subir al menos una imagen"
    );
  }

  data.images.forEach((image) => {
    formData.append("images", image);
  });

  const res = await axiosClient.post(
    "/products",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
}