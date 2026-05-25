"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  MapPin,
  Package,
  User,
  XCircle,
} from "lucide-react";
import { useInvoiceByInvoiceNumber } from "@/hooks/private/invoices/useInvoices";
import Image from "next/image";

const formatCurrency = (value: string | number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(Number(value));

export default function DashboardInvoiceDetailPage() {
  const params = useParams();
  const invoiceNumber = params.invoiceNumber as string;

  const { data: invoice, isLoading, isError } =
    useInvoiceByInvoiceNumber(invoiceNumber);
  if (isLoading) {
    return (
      <main className="rounded-3xl bg-white p-8 shadow-sm">
        <p className="text-sm text-neutral-500">Cargando factura...</p>
      </main>
    );
  }

  if (isError || !invoice) {
    return (
      <main className="rounded-3xl bg-white p-8 shadow-sm">
        <XCircle className="h-8 w-8 text-red-500" />
        <h1 className="mt-3 text-xl font-bold">Factura no encontrada</h1>
        <Link
          href="/dashboard/facturas"
          className="mt-5 inline-flex rounded-full bg-neutral-950 px-5 py-2 text-sm font-bold text-white"
        >
          Volver
        </Link>
      </main>
    );
  }

  const customer = invoice.order?.customer;
  const items = invoice.order?.items ?? [];
  return (
    <main className="space-y-6 p-4">
      <Link
        href="/dashboard/invoices"
        className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-600 hover:text-neutral-950"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a facturas
      </Link>

      <section className="overflow-hidden rounded-3xl bg-white shadow-sm">
        <div className="bg-neutral-950 p-4 text-white">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2 text-sm text-green-300">
                <CheckCircle2 className="h-5 w-5" />
                Pago confirmado
              </div>

              <h1 className="text-xl font-bold">Detalle de factura</h1>

              <p className="mt-2 text-sm text-neutral-300">
                Factura #{invoice.invoiceNumber}
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-3 text-right">
              <p className=" text-neutral-300">Total pagado</p>
              <p className=" font-bold">
                {formatCurrency(invoice.total)}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 p-3 md:grid-cols-2">
          <div className="rounded-2xl  border border-neutral-200 p-5">
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
      </section>

      <section className="rounded-3xl bg-white p-4 shadow-sm">
        <div className="mb-6 flex items-center gap-2">
          <Package className="h-5 w-5" />
          <h2 className="text-xl font-bold">Productos comprados</h2>
        </div>

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
                <div className="h-24 w-24 overflow-hidden rounded-2xl bg-neutral-100">
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
                  <p className="text-sm text-neutral-500">Precio unitario</p>
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
      </section>

      <section className="rounded-3xl bg-white p-8 shadow-sm">
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
      </section>
    </main>
  );
}