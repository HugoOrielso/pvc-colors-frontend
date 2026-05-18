// app/lines/page.tsx
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import LinesPage from "@/components/lines/LinesPage";
import { getApiUrl } from "@/lib/getApiUrl";

export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["product-lines"],
    queryFn: async () => {
      const res = await fetch(`${getApiUrl()}/public/lines`);
      if (!res.ok) throw new Error("Failed to fetch lines");
      return res.json();
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LinesPage />
    </HydrationBoundary>
  );
}