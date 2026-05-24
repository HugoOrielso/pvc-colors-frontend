import { fetchInvoiceByInvoiceNumber, fetchInvoices } from "@/services/private/invoices/invoices.service";
import { useQuery } from "@tanstack/react-query";


export const useInvoices = () => {
  return useQuery<InvoiceListItem[], Error>({
    queryKey: ["invoices"],
    queryFn: fetchInvoices,
    staleTime: 1000 * 60 * 2,
  });
};

export const useInvoiceByInvoiceNumber = (invoiceNumber: string) => {
  return useQuery<InvoiceDetail, Error>({
    queryKey: ["invoice-detail", invoiceNumber],
    queryFn: () => fetchInvoiceByInvoiceNumber(invoiceNumber),
    enabled: Boolean(invoiceNumber),
    staleTime: 1000 * 60 * 5,
  });
};