import { updateProductLine } from "@/services/private/lines/updateLine.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export function useUpdateProductLine(id: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: UpdateProductLinePayload) =>
            updateProductLine(id, payload),

        onSuccess: (response) => {
            queryClient.invalidateQueries({
                queryKey: ["product-lines"],
            });

            queryClient.invalidateQueries({
                queryKey: ["product-line", id],
            });

            toast.success(
                response?.message || "Línea actualizada correctamente"
            );
        },

        onError: (error: AxiosError<{ message: string }>) => {
            const message =
                error.response?.data?.message ||
                "Error actualizando la línea";

            toast.error(message);
        },
    });
}