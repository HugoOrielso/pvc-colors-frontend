// app/lines/[id]/page.tsx
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import LineDetailPage from "@/components/lines/LinesDetailPage";
import { getApiUrl } from "@/lib/getApiUrl";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["public-product-line", id],
    queryFn: async () => {
      const res = await fetch(`${getApiUrl()}/public/lines/${id}`);
      if (!res.ok) throw new Error("Failed to fetch line");
      return res.json();
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LineDetailPage />
    </HydrationBoundary>
  );
}