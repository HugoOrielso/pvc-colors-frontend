import { useQuery } from "@tanstack/react-query";
import { fetchInvoiceByInvoiceNumber } from "@/services/public/invoices/invoices.service";

export const useInvoiceByInvoiceNumber = (
  invoiceNumber: string
) => {
  return useQuery({
    queryKey: ["invoice-detail", invoiceNumber],
    queryFn: () => fetchInvoiceByInvoiceNumber(invoiceNumber),
    enabled: Boolean(invoiceNumber),

    refetchInterval: (query) => {
      const data = query.state.data;

      if (!data) return 3000;

      if (data.orderStatus === "PENDING_PAYMENT") {
        return 3000;
      }

      return false;
    },

    staleTime: 0,
    retry: 3,
  });
};