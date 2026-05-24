"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  CreditCard,
  FileEdit,
  FileText,
  MapPin,
  Package,
  Receipt,
  RefreshCw,
  Truck,
  User,
  XCircle,
} from "lucide-react";

import { useOrderByOrderNumber } from "@/hooks/private/orders/useOrders";

const formatCurrency = (value: string | number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(Number(value));

const formatDate = (date?: string | null) => {
  if (!date) return "—";

  return new Intl.DateTimeFormat("es-CO", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
};

const StatusBadge = ({ status }: { status: OrderStatus }) => {
  const base = "inline-flex items-center gap-2 text-sm font-semibold";

  switch (status) {
    case "PAID":
      return (
        <span className={`${base} text-green-300`}>
          <CheckCircle2 className="h-5 w-5" />
          Orden pagada
        </span>
      );

    case "CANCELLED":
      return (
        <span className={`${base} text-red-300`}>
          <XCircle className="h-5 w-5" />
          Orden cancelada
        </span>
      );

    case "REFUNDED":
      return (
        <span className={`${base} text-purple-300`}>
          <RefreshCw className="h-5 w-5" />
          Orden reembolsada
        </span>
      );

    case "PENDING_PAYMENT":
      return (
        <span className={`${base} text-yellow-300`}>
          <Clock className="h-5 w-5" />
          Pendiente de pago
        </span>
      );

    default:
      return (
        <span className={`${base} text-neutral-300`}>
          <FileEdit className="h-5 w-5" />
          Borrador
        </span>
      );
  }
};

export default function OrderDetailPage() {
  const params = useParams();
  const orderNumber = params.orderNumber as string;

  const { data: order, isLoading, isError } =
    useOrderByOrderNumber(orderNumber);

  if (isLoading) {
    return (
      <main className="p-4">
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <p className="text-sm text-neutral-500">
            Cargando detalle de la orden...
          </p>
        </div>
      </main>
    );
  }

  if (isError || !order) {
    return (
      <main className="p-4">
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <XCircle className="h-8 w-8 text-red-500" />

          <h1 className="mt-3 text-xl font-bold">
            Orden no encontrada
          </h1>

          <Link
            href="/dashboard/orders"
            className="mt-5 inline-flex rounded-full bg-neutral-950 px-5 py-2 text-sm font-bold text-white"
          >
            Volver
          </Link>
        </div>
      </main>
    );
  }

  const customer = order.customer;
  const items = order.items ?? [];
  const invoice = order.invoice;

  return (
    <main className="space-y-6 p-4">
      <Link
        href="/dashboard/orders"
        className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-600 hover:text-neutral-950"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a órdenes
      </Link>

      <section className="overflow-hidden rounded-3xl bg-white shadow-sm">
        <div className="bg-neutral-950 p-4 text-white">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-3">
                <StatusBadge status={order.status} />
              </div>

              <h1 className="break-all text-xl font-bold">
                Detalle de orden
              </h1>

              <p className="mt-2 break-all text-sm text-neutral-300">
                Orden #{order.orderNumber}
              </p>

              <p className="mt-1 text-sm text-neutral-400">
                Creada el {formatDate(order.createdAt)}
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-3 text-right">
              <p className="text-neutral-300">Total orden</p>

              <p className="font-bold">
                {formatCurrency(order.total)}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 p-3 md:grid-cols-2">
          <div className="rounded-2xl border border-neutral-200 p-5">
            <div className="mb-3 flex items-center gap-2 font-semibold">
              <User className="h-5 w-5" />
              Cliente
            </div>

            <p className="font-medium">
              {customer?.name ?? "Sin nombre"}
            </p>

            <p className="break-all text-sm text-neutral-500">
              {customer?.email ?? "Sin email"}
            </p>

            {customer?.phone && (
              <p className="text-sm text-neutral-500">
                {customer.phone}
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-neutral-200 p-5">
            <div className="mb-3 flex items-center gap-2 font-semibold">
              <MapPin className="h-5 w-5" />
              Dirección
            </div>

            <p className="text-sm text-neutral-600">
              {customer?.address ?? "Sin dirección registrada"}
            </p>

            {customer?.document && (
              <p className="mt-3 text-sm text-neutral-500">
                Documento: {customer.document}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="rounded-3xl bg-white p-4 shadow-sm">
        <div className="mb-6 flex items-center gap-2">
          <Package className="h-5 w-5" />

          <h2 className="text-xl font-bold">
            Productos de la orden
          </h2>
        </div>

        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-4 rounded-2xl border border-neutral-200 p-4 md:flex-row md:items-center"
            >
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-violet-50 text-violet-700">
                <Package className="h-6 w-6" />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold">
                  {item.productName}
                </h3>

                <p className="mt-1 text-sm text-neutral-500">
                  {item.presentationName ?? "Sin presentación"}
                </p>

                {item.color && (
                  <p className="text-sm text-neutral-500">
                    Color: {item.color}
                  </p>
                )}

                <p className="mt-2 text-sm text-neutral-500">
                  Cantidad: {item.quantity}
                </p>
              </div>

              <div className="text-left md:text-right">
                <p className="text-sm text-neutral-500">
                  Precio unitario
                </p>

                <p className="font-medium">
                  {formatCurrency(item.unitPrice)}
                </p>

                <p className="mt-2 text-sm text-neutral-500">
                  Total
                </p>

                <p className="text-lg font-bold">
                  {formatCurrency(item.total)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <div className="ml-auto max-w-sm space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-neutral-500">
                Subtotal
              </span>

              <span className="font-medium">
                {formatCurrency(order.subtotal)}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-neutral-500">
                Impuestos
              </span>

              <span className="font-medium">
                {formatCurrency(order.tax)}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-neutral-500">
                Envío
              </span>

              <span className="font-medium">
                {formatCurrency(order.shipping)}
              </span>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>

                <span>
                  {formatCurrency(order.total)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2 font-semibold">
              <CreditCard className="h-5 w-5" />
              Pago
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <p className="text-neutral-500">
                  Proveedor
                </p>

                <p className="font-bold text-neutral-950">
                  {order.paymentProvider ?? "—"}
                </p>
              </div>

              <div>
                <p className="text-neutral-500">
                  Referencia
                </p>

                <p className="break-all font-medium text-neutral-800">
                  {order.paymentReference ?? "—"}
                </p>
              </div>

              <div>
                <p className="text-neutral-500">
                  Fecha de pago
                </p>

                <p className="font-medium text-neutral-800">
                  {formatDate(order.paidAt)}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2 font-semibold">
              <Truck className="h-5 w-5" />
              Envío
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <p className="text-neutral-500">
                  Costo de envío
                </p>

                <p className="font-bold text-neutral-950">
                  {formatCurrency(order.shipping)}
                </p>
              </div>

              <div>
                <p className="text-neutral-500">
                  Moneda
                </p>

                <p className="font-medium text-neutral-800">
                  {order.currency}
                </p>
              </div>
            </div>
          </div>

          {invoice && (
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-2 font-semibold">
                <Receipt className="h-5 w-5" />
                Factura
              </div>

              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-neutral-500">
                    Número
                  </p>

                  <p className="break-all font-bold text-neutral-950">
                    {invoice.invoiceNumber}
                  </p>
                </div>

                <div>
                  <p className="text-neutral-500">
                    Estado
                  </p>

                  <p className="font-medium text-neutral-800">
                    {invoice.status}
                  </p>
                </div>

                <div>
                  <p className="text-neutral-500">
                    Total factura
                  </p>

                  <p className="font-bold text-neutral-950">
                    {formatCurrency(invoice.total)}
                  </p>
                </div>

                <div>
                  <p className="text-neutral-500">
                    Emitida
                  </p>

                  <p className="font-medium text-neutral-800">
                    {formatDate(invoice.issuedAt)}
                  </p>
                </div>

                <div>
                  <p className="text-neutral-500">
                    Pagada
                  </p>

                  <p className="font-medium text-neutral-800">
                    {formatDate(invoice.paidAt)}
                  </p>
                </div>

                <Link
                  href={`/dashboard/invoices/${invoice.invoiceNumber}`}
                  className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-neutral-950 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
                >
                  Ver factura
                </Link>

                {invoice.pdfUrl && (
                  <a
                    href={invoice.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center rounded-xl border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-50"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Ver PDF
                  </a>
                )}
              </div>
            </div>
          )}

          {order.notes && (
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-2 font-semibold">
                <FileText className="h-5 w-5" />
                Notas
              </div>

              <p className="text-sm leading-6 text-neutral-700">
                {order.notes}
              </p>
            </div>
          )}
        </aside>
      </section>
    </main>
  );
}