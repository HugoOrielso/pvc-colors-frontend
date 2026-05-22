import axiosClient from "@/lib/axios";

export async function updateProductService(
  id: string,
  data: UpdateProductFormInput
) {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("slug", data.slug);
  formData.append("description", data.description);
  formData.append("productLineId", data.productLineId);
  formData.append("recommendations", data.recommendations?.trim() ?? "");

  if (data.coverageMinM2PerGallon !== undefined) {
    formData.append(
      "coverageMinM2PerGallon",
      String(data.coverageMinM2PerGallon)
    );
  }

  if (data.coverageMaxM2PerGallon !== undefined) {
    formData.append(
      "coverageMaxM2PerGallon",
      String(data.coverageMaxM2PerGallon)
    );
  }

  formData.append("colors", JSON.stringify(data.colors ?? []));
  formData.append("colorGroups", JSON.stringify(data.colorGroups ?? []));
  formData.append("features", JSON.stringify(data.features ?? []));
  formData.append("presentations", JSON.stringify(data.presentations ?? []));

  formData.append(
    "existingImages",
    JSON.stringify(data.existingImages ?? [])
  );

  if (data.images?.length) {
    data.images.forEach((image) => {
      if (image instanceof File) {
        formData.append("images", image);
      }
    });
  }

  if (data.technicalSheet instanceof File) {
    formData.append("technicalSheet", data.technicalSheet);
  }

  const res = await axiosClient.patch<ProductResponse>(
    `/products/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
}