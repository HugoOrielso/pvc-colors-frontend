"use client";

import { useRouter } from "next/navigation";
import {
  Building2,
  Plus,
  MapPin,
  Phone,
  ArrowRight,
} from "lucide-react";

import { useDistributors } from "@/hooks/private/distributors/useDistributors";

export default function DistributorList() {
  const router = useRouter();

  const { data, isLoading, isError } = useDistributors();

  if (isLoading) {
    return (
      <div className="rounded-3xl border bg-white p-8 shadow-sm">
        <p className="text-sm text-slate-500">
          Cargando distribuidores...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-3xl border bg-white p-8 shadow-sm">
        <p className="text-sm text-red-500">
          No se pudieron cargar los distribuidores.
        </p>
      </div>
    );
  }

  return (
    <section className="space-y-8 p-4">
      <div className="flex items-center justify-between rounded-3xl border bg-white p-6 shadow-sm">
        <div>
          <h1 className="text-2xl font-semibold text-slate-950">
            Distribuidores
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Gestiona ubicaciones y puntos de venta.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            router.push("/dashboard/distributors/create")
          }
          className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800"
        >
          <Plus size={16} />
          Nuevo distribuidor
        </button>
      </div>

      {!data?.length ? (
        <div className="rounded-3xl border border-dashed bg-white p-10 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
            <Building2 size={24} />
          </div>

          <h2 className="text-lg font-semibold text-slate-950">
            No hay distribuidores
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Crea tu primer distribuidor.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {data.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() =>
                router.push(
                  `/dashboard/distributors/edit/${item.id}`
                )
              }
              className="group rounded-3xl border bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold uppercase text-slate-700">
                  {item.keyword}
                </span>

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-950 text-white">
                  <ArrowRight size={18} />
                </div>
              </div>

              <h2 className="text-xl font-bold text-slate-950">
                {item.name}
              </h2>

              <div className="mt-5 space-y-3">
                <div className="flex items-start gap-3 text-sm text-slate-500">
                  <MapPin
                    size={16}
                    className="mt-0.5 shrink-0"
                  />

                  <div>
                    <p>{item.address}</p>
                    <p>{item.city}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-500">
                  <Phone size={16} />

                  <p>{item.phone}</p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Coordenadas
                </p>

                <p className="mt-2 text-sm text-slate-700">
                  {item.lat}, {item.lng}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}