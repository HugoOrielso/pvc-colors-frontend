// hooks/private/distributors/useDistributors.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createDistributor,
  deleteDistributor,
  getDistributorById,
  getDistributors,
  updateDistributor,
} from "@/services/private/distributors/distributors.service";

export function useDistributors() {
  return useQuery({
    queryKey: ["distributors"],
    queryFn: getDistributors,
  });
}

export function useDistributorById(id?: string) {
  return useQuery({
    queryKey: ["distributor", id],
    queryFn: () => getDistributorById(id!),
    enabled: Boolean(id),
  });
}

export function useCreateDistributor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDistributor,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["distributors"],
      });
    },
  });
}

export function useUpdateDistributor(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DistributorFormValues) =>
      updateDistributor(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["distributors"],
      });

      queryClient.invalidateQueries({
        queryKey: ["distributor", id],
      });
    },
  });
}

export function useDeleteDistributor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteDistributor,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["distributors"],
      });
    },
  });
}