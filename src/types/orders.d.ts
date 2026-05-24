type OrderStatus =
    | "DRAFT"
    | "PENDING_PAYMENT"
    | "PAID"
    | "CANCELLED"
    | "REFUNDED";

interface OrderCustomer {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    document: string | null;
    address: string | null;
}

interface OrderInvoice {
    id: string;
    invoiceNumber: string;
    status: "DRAFT" | "ISSUED" | "PAID" | "CANCELLED";
    total: string | number;
    issuedAt: string;
    paidAt: string | null;
    pdfUrl: string | null;
}

interface OrderItem {
    id: string;
    productName: string;
    presentationName: string | null;
    color: string | null;
    quantity: number;
    unitPrice: string | number;
    total: string | number;
}

interface OrderListItem {
    id: string;
    orderNumber: string;
    status: OrderStatus;
    subtotal: string | number;
    tax: string | number;
    shipping: string | number;
    total: string | number;
    currency: string;
    paymentProvider: string | null;
    paymentReference: string | null;
    createdAt: string;
    updatedAt: string;
    paidAt: string | null;
    customer: OrderCustomer | null;
    items: OrderItem[];
    invoice: OrderInvoice | null;
}

interface OrderDetail extends OrderListItem {
    notes?: string | null;
}