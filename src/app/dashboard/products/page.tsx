"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Layers, Package, PackagePlus } from "lucide-react";

import { getProductColumns } from "@/components/inventory/columns";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/inventory/tableProducts";
import { useProductLines } from "@/hooks/private/lines/useLines";
import { useProducts } from "@/hooks/private/products/useGetProducts";

export default function ProductsPage() {
  const [selectedLineId, setSelectedLineId] = useState<string>("");

  const { data, isLoading } = useProducts(selectedLineId || undefined);
  const { data: linesData } = useProductLines();

  const products = data?.data ?? [];
  const lines = linesData?.data ?? [];

  const columns = useMemo(() => getProductColumns(), []);

  const totalProducts = products.length;
  const activeProducts = products.filter((p) => p.isActive).length;

  const totalLines = new Set(
    products.map((p) => p.productLineId).filter(Boolean)
  ).size;

  return (
    <div className="space-y-6 p-3">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.08em]  text-blue-700">
            Inventario
          </p>

          <h1 className="mt-1 text-3xl font-black  text-blue-700">
            Gestión de productos
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Consulta productos por nombre, línea, precio y stock.
          </p>
        </div>

        <Button className="bg-(--color-brand-orange) text-white hover:bg-(--color-brand-orange-dark)">
          <Link
            href="/dashboard/products/create"
            className="flex items-center gap-2"
          >
            <PackagePlus className="size-4" />
            Crear producto
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="rounded-sm">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-xl bg-emerald-50 p-3">
              <Package className="size-5 text-emerald-700" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Total productos</p>
              <p className="text-2xl font-bold text-slate-900">
                {totalProducts}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-sm">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-xl bg-blue-50 p-3">
              <Package className="size-5 text-blue-700" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Activos</p>
              <p className="text-2xl font-bold text-slate-900">
                {activeProducts}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-sm">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-xl bg-orange-50 p-3">
              <Layers className="size-5 text-orange-700" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Líneas usadas</p>
              <p className="text-2xl font-bold text-slate-900">
                {totalLines}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-sm">
        <CardContent className="p-6">
          {isLoading ? (
            <div className="py-12 text-center text-sm text-slate-500">
              Cargando productos...
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={products}
              lines={lines}
              selectedLineId={selectedLineId}
              onLineChange={setSelectedLineId}
              filterPlaceholder="Buscar por nombre..."
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}