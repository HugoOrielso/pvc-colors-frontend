/* eslint-disable react-hooks/incompatible-library */
"use client";
import { ColumnDef, SortingState, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo, useState } from "react";

type DataTableProps<TData extends { name?: string }> = {
  columns: ColumnDef<TData>[];
  data: TData[];
  lines?: ProductListItem[];
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
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <input
          placeholder={filterPlaceholder}
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          className="p-2 max-w-sm border rounded"
        />

        <select
          value={selectedLineId}
          onChange={(e) => onLineChange?.(e.target.value)}
          className="p-2 rounded border bg-white px-3 text-sm outline-none"
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
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left font-semibold text-slate-600"
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
                    <td key={cell.id} className="px-4 py-3">
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
    </div>
  );
}