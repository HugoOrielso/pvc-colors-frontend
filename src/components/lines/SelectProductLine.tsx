"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Layers, Loader2, Pencil } from "lucide-react";
import { useProductLines } from "@/hooks/private/lines/useLines";
import EmptyProductLines from "../common/EmptyProductsLines";

export default function SelectProductLineGrid() {
  const router = useRouter();

  const { data, isLoading, isError } = useProductLines();

  const lines = data?.data ?? [];

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 rounded-2xl border bg-white p-6 text-sm text-slate-500">
        <Loader2 className="h-4 w-4 animate-spin" />
        Cargando líneas...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-600">
        No se pudieron cargar las líneas.
      </div>
    );
  }

  if (!lines.length) {
    return (
      <div className="rounded-2xl bg-white p-6 text-sm text-slate-500">
        <EmptyProductLines />
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide  text-blue-700">
          Crear producto
        </p>

        <h1 className="mt-1 text-2xl font-bold  text-blue-700">
          Selecciona una línea
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          El producto quedará asociado a la línea que elijas.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {lines.map((line) => (
          <article
            key={line.id}
            className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="relative h-40 w-full overflow-hidden bg-slate-100">
              {line.image ? (
                <Image
                  src={line.image}
                  alt={line.name}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <Layers className="h-10 w-10 text-slate-300" />
                </div>
              )}
            </div>

            <div className="p-5">
              <div className="mb-2 flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                  <Layers className="h-4 w-4" />
                </span>

                <h2 className="font-bold text-slate-900">{line.name}</h2>
              </div>

              <p className="line-clamp-2 text-sm leading-6 text-slate-500">
                {line.description}
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() =>
                    router.push(`/dashboard/products/create/${line.id}`)
                  }
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#061540] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0a215c] cursor-pointer"
                >
                  <Layers className="h-4 w-4" />
                  Crear producto
                </button>

                <button
                  type="button"
                  onClick={() =>
                    router.push(`/dashboard/lines/${line.id}/edit`)
                  }
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 cursor-pointer"
                >
                  <Pencil className="h-4 w-4" />
                  Editar línea
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}