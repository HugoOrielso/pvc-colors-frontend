// app/product/[id]/page.tsx

import ProductDetailPage from "@/components/products/public-product-detail";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return <ProductDetailPage id={id} />;
}