import axiosClient from "@/lib/axios";


export const fetchInvoices = async (): Promise<InvoiceListItem[]> => {
  const res = await axiosClient.get<ApiResponse<InvoiceListItem[]>>(
    "/invoices"
  );

  return res.data.data;
};

export const fetchInvoiceByInvoiceNumber = async (
  invoiceNumber: string
): Promise<InvoiceDetail> => {
  const res = await axiosClient.get<ApiResponse<InvoiceDetail>>(
    `/invoices/${invoiceNumber}`
  );

  return res.data.data;
};