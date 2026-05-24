import { type Metadata } from "next";

import ProductDetailPage from "@/components/products/public-product-detail";
import { getApiUrl } from "@/lib/getApiUrl";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getProduct(id: string) {
  try {
    const res = await fetch(`${getApiUrl()}/public/products/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  const product = await getProduct(id);

  const productName =
    product?.data?.name ?? "Producto PVC Colors";

  return {
    title: `${productName} | PVC Colors`,
    description:
      product?.data?.description ??
      `Descubre ${productName} y encuentra soluciones profesionales en pintura y acabados con PVC Colors.`,
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return <ProductDetailPage id={id} />;
}