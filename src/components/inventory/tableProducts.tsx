/* eslint-disable react-hooks/incompatible-library */
"use client";

import {
  ColumnDef,
  SortingState,
  PaginationState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";

type DataTableProps<TData extends { name?: string }> = {
  columns: ColumnDef<TData>[];
  data: TData[];
  lines?: ProductLine[];
  selectedLineId?: string;
  onLineChange?: (lineId: string) => void;
  filterPlaceholder?: string;
};

export function DataTable<TData extends { name?: string }>({
  columns,
  data,
  lines = [],
  selectedLineId = "",
  onLineChange,
  filterPlaceholder = "Buscar...",
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [nameFilter, setNameFilter] = useState("");

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      item.name?.toLowerCase().includes(nameFilter.toLowerCase())
    );
  }, [data, nameFilter]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      pagination,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(() => {
    table.setPageIndex(0);
  }, [nameFilter, selectedLineId, table]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <input
          placeholder={filterPlaceholder}
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          className="w-full max-w-sm rounded border p-2 text-sm outline-none focus:border-blue-500"
        />

        <select
          value={selectedLineId}
          onChange={(e) => onLineChange?.(e.target.value)}
          className="w-full rounded border bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 md:w-auto"
        >
          <option value="">Todas las líneas</option>

          {lines.map((line) => (
            <option key={line.id} value={line.id}>
              {line.name}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-hidden rounded-xl border">
        <div className="overflow-x-auto">
          <table className="w-full min-w-200 text-sm">
            <thead className="bg-slate-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="whitespace-nowrap px-4 py-3 text-left font-semibold text-slate-600"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="border-t hover:bg-slate-50">
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="whitespace-nowrap px-4 py-3"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-10 text-center text-slate-500"
                  >
                    No hay productos para mostrar.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-3 border-t bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-slate-500">
            Mostrando{" "}
            <span className="font-semibold text-slate-900">
              {table.getRowModel().rows.length}
            </span>{" "}
            de{" "}
            <span className="font-semibold text-slate-900">
              {filteredData.length}
            </span>{" "}
            productos
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
              className="rounded border bg-white px-2 py-1 text-sm outline-none"
            >
              {[5, 10, 20, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize} por página
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              className="rounded border px-3 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              Primero
            </button>

            <button
              type="button"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="rounded border px-3 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              Anterior
            </button>

            <span className="px-2 text-sm text-slate-600">
              Página{" "}
              <strong>{table.getState().pagination.pageIndex + 1}</strong> de{" "}
              <strong>{table.getPageCount() || 1}</strong>
            </span>

            <button
              type="button"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="rounded border px-3 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              Siguiente
            </button>

            <button
              type="button"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              className="rounded border px-3 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              Último
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}