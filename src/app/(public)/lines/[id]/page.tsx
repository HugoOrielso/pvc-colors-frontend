// app/(public)/lines/[id]/page.tsx

import type { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import LineDetailPage from "@/components/lines/LinesDetailPage";
import { getApiUrl } from "@/lib/getApiUrl";

async function getLine(id: string) {
  const res = await fetch(`${getApiUrl()}/public/lines/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const line = await getLine(id);

  const lineName = line?.data?.name ?? "Línea de productos PVC Colors";

  return {
    title: `${lineName} | PVC Colors`,
    description:
      line?.data?.description ??
      `Descubre la línea ${lineName} y encuentra productos especializados de PVC Colors para tus proyectos.`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["public-product-line", id],
    queryFn: async () => {
      const line = await getLine(id);

      if (!line) {
        throw new Error("No se pudo cargar la línea");
      }

      return line;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LineDetailPage />
    </HydrationBoundary>
  );
}