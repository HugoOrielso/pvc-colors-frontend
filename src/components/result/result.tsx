"use client";

import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  Clock,
  FileText,
  MapPin,
  Package,
  RefreshCcw,
  User,
  XCircle,
} from "lucide-react";
import { useInvoiceByInvoiceNumber } from "@/hooks/public/invoices/useInvoices";

const formatCurrency = (value: string | number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(Number(value));

const getPaymentUI = (status: string) => {
  switch (status) {
    case "PAID":
      return {
        label: "Pago confirmado",
        title: "Factura de compra",
        description: "Tu pago fue aprobado correctamente.",
        icon: CheckCircle2,
        textColor: "text-green-300",
        totalLabel: "Total pagado",
      };

    case "CANCELLED":
      return {
        label: "Pago rechazado",
        title: "Pago no aprobado",
        description:
          "La transacción fue rechazada o cancelada. No se generó factura.",
        icon: XCircle,
        textColor: "text-red-300",
        totalLabel: "Total del pedido",
      };

    case "PENDING_PAYMENT":
      return {
        label: "Confirmando pago",
        title: "Estamos confirmando tu pago",
        description: "Esto puede tardar unos segundos.",
        icon: Clock,
        textColor: "text-yellow-300",
        totalLabel: "Total del pedido",
      };

    default:
      return {
        label: "Estado del pedido",
        title: "Resultado del pago",
        description: "Consulta el estado actual de tu pedido.",
        icon: Clock,
        textColor: "text-neutral-300",
        totalLabel: "Total del pedido",
      };
  }
};

export default function PaymentResultPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  const invoiceNumber = params.result as string;
  const wompiTransactionId = searchParams.get("id");
  const env = searchParams.get("env");

  const {
    data: invoice,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useInvoiceByInvoiceNumber(invoiceNumber);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-neutral-50 px-4 py-10">
        <section className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-sm">
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 animate-spin text-neutral-500" />

            <div>
              <h1 className="text-xl font-bold text-neutral-900">
                Estamos confirmando tu pago
              </h1>

              <p className="mt-1 text-sm text-neutral-500">
                Esto puede tardar unos segundos.
              </p>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (isError || !invoice) {
    return (
      <main className="min-h-screen bg-neutral-50 px-4 py-10">
        <section className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-sm">
          <div className="flex items-start gap-3">
            <XCircle className="mt-1 h-6 w-6 text-red-500" />

            <div>
              <h1 className="text-2xl font-bold text-neutral-900">
                Aún no encontramos tu pedido
              </h1>

              <p className="mt-2 text-sm text-neutral-500">
                Es posible que Wompi todavía esté confirmando la transacción.
              </p>

              <div className="mt-5 rounded-2xl bg-neutral-100 p-4 text-sm text-neutral-600">
                <p>
                  <strong>Referencia:</strong> {invoiceNumber}
                </p>

                {wompiTransactionId && (
                  <p>
                    <strong>Transacción Wompi:</strong> {wompiTransactionId}
                  </p>
                )}

                {env && (
                  <p>
                    <strong>Ambiente:</strong> {env}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => refetch()}
                disabled={isFetching}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <RefreshCcw
                  className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
                />
                Volver a consultar
              </button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  const customer = invoice.order?.customer;
  const items = invoice.order?.items ?? [];
  const paymentUI = getPaymentUI(invoice.orderStatus);
  const PaymentIcon = paymentUI.icon;

  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-10 text-neutral-900">
      <section className="mx-auto max-w-5xl space-y-6">
        <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
          <div className="bg-neutral-950 px-8 py-8 text-white">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <div
                  className={`mb-3 flex items-center gap-2 text-sm ${paymentUI.textColor}`}
                >
                  <PaymentIcon
                    className={`h-5 w-5 ${
                      invoice.orderStatus === "PENDING_PAYMENT"
                        ? "animate-spin"
                        : ""
                    }`}
                  />
                  {paymentUI.label}
                </div>

                <h1 className="text-3xl font-bold">{paymentUI.title}</h1>

                <p className="mt-2 text-sm text-neutral-300">
                  {paymentUI.description}
                </p>

                <p className="mt-3 text-sm text-neutral-300">
                  Orden #{invoice.orderNumber}
                </p>

                {invoice.hasInvoice && (
                  <p className="mt-1 text-xs text-neutral-400">
                    Factura #{invoice.invoiceNumber}
                  </p>
                )}

                {wompiTransactionId && (
                  <p className="mt-1 break-all text-xs text-neutral-400">
                    Transacción Wompi: {wompiTransactionId}
                  </p>
                )}
              </div>

              <div className="rounded-2xl bg-white/10 px-5 py-4 text-right">
                <p className="text-sm text-neutral-300">
                  {paymentUI.totalLabel}
                </p>

                <p className="text-3xl font-bold">
                  {formatCurrency(invoice.total)}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 p-8 md:grid-cols-3">
            <div className="rounded-2xl border border-neutral-200 p-5">
              <div className="mb-3 flex items-center gap-2 font-semibold">
                <FileText className="h-5 w-5" />
                Orden
              </div>

              <p className="text-sm text-neutral-500">Número de orden</p>

              <p className="break-all font-medium">
                {invoice.orderNumber ?? invoice.order?.orderNumber}
              </p>

              <p className="mt-4 text-sm text-neutral-500">Estado del pago</p>

              <p className="font-medium">{invoice.orderStatus}</p>

              {invoice.hasInvoice && (
                <>
                  <p className="mt-4 text-sm text-neutral-500">
                    Estado factura
                  </p>

                  <p className="font-medium">
                    {invoice.invoiceStatus ?? "Sin estado"}
                  </p>
                </>
              )}
            </div>

            <div className="rounded-2xl border border-neutral-200 p-5">
              <div className="mb-3 flex items-center gap-2 font-semibold">
                <User className="h-5 w-5" />
                Cliente
              </div>

              <p className="font-medium">{customer?.name ?? "Sin nombre"}</p>

              <p className="break-all text-sm text-neutral-500">
                {customer?.email ?? "Sin email"}
              </p>

              {customer?.phone && (
                <p className="text-sm text-neutral-500">{customer.phone}</p>
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
        </div>

        {invoice.orderStatus === "CANCELLED" && (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-6 shadow-sm">
            <div className="flex items-start gap-3">
              <XCircle className="mt-1 h-5 w-5 text-red-600" />

              <div>
                <h2 className="font-bold text-red-900">
                  Tu pago no fue aprobado
                </h2>

                {invoice.paymentReference && (
                  <p className="mt-3 break-all text-xs text-red-700">
                    Referencia de pago: {invoice.paymentReference}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {invoice.orderStatus === "PENDING_PAYMENT" && (
          <div className="rounded-3xl border border-yellow-200 bg-yellow-50 p-6 shadow-sm">
            <div className="flex items-start gap-3">
              <Clock className="mt-1 h-5 w-5 animate-spin text-yellow-700" />

              <div>
                <h2 className="font-bold text-yellow-900">
                  Seguimos consultando el estado del pago
                </h2>

                <p className="mt-1 text-sm text-yellow-700">
                  Esta pantalla se actualizará automáticamente.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center gap-2">
            <Package className="h-5 w-5" />
            <h2 className="text-xl font-bold">Productos del pedido</h2>
          </div>

          {items.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-neutral-300 p-6 text-sm text-neutral-500">
              Este pedido no tiene productos asociados.
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => {
                const image =
                  item.product?.images?.find((img) => img.isMain)?.url ??
                  item.product?.images?.[0]?.url;

                return (
                  <div
                    key={item.id}
                    className="flex flex-col gap-4 rounded-2xl border border-neutral-200 p-4 md:flex-row md:items-center"
                  >
                    <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-neutral-100">
                      {image ? (
                        <Image
                          src={image}
                          width={96}
                          height={96}
                          alt={item.productName}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-neutral-400">
                          Sin imagen
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold">{item.productName}</h3>

                      <div className="mt-1 flex flex-wrap gap-2 text-sm text-neutral-500">
                        {item.presentationName && (
                          <span>{item.presentationName}</span>
                        )}

                        {item.color && <span>Color: {item.color}</span>}
                      </div>

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

                      <p className="mt-2 text-sm text-neutral-500">Total</p>

                      <p className="text-lg font-bold">
                        {formatCurrency(item.total)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <div className="ml-auto max-w-sm space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-neutral-500">Subtotal</span>

              <span className="font-medium">
                {formatCurrency(invoice.subtotal)}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-neutral-500">Impuestos</span>

              <span className="font-medium">{formatCurrency(invoice.tax)}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-neutral-500">Envío</span>

              <span className="font-medium">
                {formatCurrency(invoice.shipping)}
              </span>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>{formatCurrency(invoice.total)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}