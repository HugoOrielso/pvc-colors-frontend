import axiosClientPublic from "@/lib/axiosPublic";
import axios from "axios";
import axiosClient from "@/lib/axios";

export async function getPublicProducts(): Promise<ProductCardItem[]> {
  try {
    const res = await axiosClientPublic.get("/products");
    const data: ProductApiResponse[] = res.data;

    return data
      .map((product) => ({
        id: product.id,
        name: product.name,
        description:
          product.details?.trim() || "Producto disponible en inventario.",
        image: product.imageUrl ?? "/assets/product-placeholder.jpg",
        presentation: [
          product.packageLabel,
          product.unitsPerPackage
            ? `${product.unitsPerPackage} unidades`
            : null,
          product.unitWeightGrams
            ? `${product.unitWeightGrams} g`
            : null,
        ]
          .filter(Boolean)
          .join(" · "),
        price: product.price,
        stock: product.stock,
      }));
  } catch {
    return [];
  }
}



export async function getProductByIdService(
  productId: string
): Promise<ProductByIdResponse> {
  const { data } = await axiosClient.get<ProductByIdResponse>(`/products/${productId}`);
  return data;
}

export async function updateProductService(
  id: string,
  data: UpdateProductFormInput
) {
  const formData = buildProductFormData(data, false);

  const res = await axiosClient.patch(`/products/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
}

function buildProductFormData(
  data: UpdateProductFormInput,
  imageRequired: boolean
) {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("slug", data.slug);
  formData.append("description", data.description);
  formData.append("productLineId", data.productLineId);

  if (data.recommendations?.trim()) {
    formData.append("recommendations", data.recommendations.trim());
  } else {
    formData.append("recommendations", "");
  }

  if (data.images instanceof File) {
    formData.append("image", data.images);
  }

  if (data.technicalSheet instanceof File) {
    formData.append("technicalSheet", data.technicalSheet);
  }

  formData.append("colors", JSON.stringify(data.colors ?? []));
  formData.append("presentations", JSON.stringify(data.presentations ?? []));

  if (imageRequired && !(data.images instanceof File)) {
    throw new Error("La imagen del producto es obligatoria");
  }

  return formData;
}

export function getApiErrorMessage(error: unknown, fallback: string) {
  if (axios.isAxiosError(error)) {
    const responseData = error.response?.data;

    const firstIssue = responseData?.errors?.[0]?.message;

    return firstIssue || responseData?.message || fallback;
  }

  return "Ocurrió un error inesperado";
}