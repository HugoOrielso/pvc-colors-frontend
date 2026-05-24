type InvoiceStatus = "DRAFT" | "ISSUED" | "PAID" | "CANCELLED";

type OrderStatus =
    | "DRAFT"
    | "PENDING_PAYMENT"
    | "PAID"
    | "CANCELLED"
    | "REFUNDED";

interface InvoiceCustomer {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    document: string | null;
    address: string | null;
    createdAt: string;
    updatedAt: string;
}

interface InvoiceProductImage {
    id: string;
    url: string;
    publicId: string | null;
    alt: string | null;
    position: number;
    isMain: boolean;
    productId: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
}

interface InvoiceProduct {
    id: string;
    slug: string;
    name: string;
    description: string;
    image: string | null;
    recommendations: string | null;
    technicalSheetUrl: string | null;
    coverageMinM2PerGallon: number | null;
    coverageMaxM2PerGallon: number | null;
    productLineId: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    images: InvoiceProductImage[];
}

interface InvoicePresentation {
    id: string;
    name: string;
    price: number;
    stock: number;
    sku: string | null;
    productId: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
}

interface InvoiceOrderItem {
    id: string;
    orderId: string;
    productId: string;
    presentationId: string | null;
    productName: string;
    presentationName: string | null;
    color: string | null;
    quantity: number;
    unitPrice: string;
    total: string;
    product?: InvoiceProduct;
    presentation?: InvoicePresentation | null;
}

interface InvoiceOrder {
    id: string;
    orderNumber: string;
    status: OrderStatus;
    customerId: string | null;
    subtotal: string;
    tax: string;
    shipping: string;
    total: string;
    currency: string;
    paymentProvider: string | null;
    paymentReference: string | null;
    createdAt: string;
    updatedAt: string;
    paidAt: string | null;
    customer: InvoiceCustomer | null;
    items: InvoiceOrderItem[];
}

interface InvoiceDetail {
    id: string;
    invoiceNumber: string;
    orderId: string;
    status: InvoiceStatus;
    subtotal: string;
    tax: string;
    shipping: string;
    total: string;
    pdfUrl: string | null;
    issuedAt: string;
    paidAt: string | null;
    order: InvoiceOrder;
}

type InvoiceListItem = InvoiceDetail;

interface ApiResponse<T> {
    ok: boolean;
    data: T;
    message?: string;
}