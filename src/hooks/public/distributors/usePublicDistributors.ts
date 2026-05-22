// hooks/public/distributors/usePublicDistributors.ts
import { fetchPublicDistributors, PublicDistributor } from "@/services/public/distributors/distributors.service";
import { useQuery } from "@tanstack/react-query";


export const usePublicDistributors = () => {
  return useQuery<PublicDistributor[], Error>({
    queryKey: ["public-distributors"],
    queryFn: fetchPublicDistributors,
    staleTime: 1000 * 60 * 5,
  });
};