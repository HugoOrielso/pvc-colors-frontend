import axiosClientPublic from "@/lib/axiosPublic";

export const fetchInvoiceByInvoiceNumber = async (
  invoiceNumber: string
) => {
  const res = await axiosClientPublic.get(
    `/public/invoices/${invoiceNumber}`
  );

  return res.data.data as InvoiceDetail;
};

export interface InvoiceDetail {
  id: string;

  invoiceNumber: string;
  orderNumber: string;

  orderStatus: "DRAFT" | "PENDING_PAYMENT" | "PAID" | "CANCELLED" | "REFUNDED";

  invoiceStatus:
    | "DRAFT"
    | "ISSUED"
    | "PAID"
    | "CANCELLED"
    | null;

  paymentProvider?: string | null;
  paymentReference?: string | null;

  subtotal: string;
  tax: string;
  shipping: string;
  total: string;

  currency: string;

  pdfUrl?: string | null;

  issuedAt?: string | null;
  paidAt?: string | null;

  hasInvoice: boolean;

  order: {
    id: string;
    orderNumber: string;
    status: string;

    customer?: {
      id: string;
      name: string;
      email: string;
      phone?: string | null;
      document?: string | null;
      address?: string | null;
    } | null;

    items: {
      id: string;

      productName: string;
      presentationName?: string | null;
      color?: string | null;

      quantity: number;

      unitPrice: string;
      total: string;

      product?: {
        id: string;
        name: string;
        slug: string;

        images: {
          id: string;
          url: string;
          alt?: string | null;
          isMain: boolean;
        }[];
      };

      presentation?: {
        id: string;
        name: string;
        price: number;
        stock: number;
      } | null;
    }[];
  };
}