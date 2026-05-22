"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface ProductCalculatorModalProps {
  productName: string;
  coverageMinM2PerGallon: number;
  coverageMaxM2PerGallon: number;
  onClose: () => void;
}

export function ProductCalculatorModal({
  productName,
  coverageMinM2PerGallon,
  coverageMaxM2PerGallon,
  onClose,
}: ProductCalculatorModalProps) {
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [manualM2, setManualM2] = useState("");

  const averageCoverage =
    (coverageMinM2PerGallon + coverageMaxM2PerGallon) / 2;

  const calculatedArea =
    Number(height) > 0 && Number(width) > 0
      ? Number(height) * Number(width)
      : 0;

  const area = Number(manualM2) > 0 ? Number(manualM2) : calculatedArea;

  const gallonsNeeded =
    area > 0 && averageCoverage > 0
      ? Math.ceil(area / averageCoverage)
      : 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h3 className="text-xl font-black text-[#061540]">
              Calcula cuánto producto necesitas
            </h3>

            <p className="mt-1 text-sm text-[#061540]/60">
              Ingresa los m² directamente o calcula con alto y ancho.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 cursor-pointer w-8 items-center justify-center rounded-full bg-[#f4f5f9] text-[#061540]/50"
          >
            <X size={16} />
          </button>
        </div>

        <div className="rounded-2xl bg-[#f4f8ff] p-4 text-sm leading-6 text-[#061540]/70">
          Con un galón de{" "}
          <strong className="text-[#061540]">{productName}</strong> puedes
          cubrir aproximadamente{" "}
          <strong className="text-[#061540]">
            {averageCoverage.toFixed(1)} m²
          </strong>
          .
          <br />
          <span className="text-xs text-[#061540]/50">
            Rango técnico: {coverageMinM2PerGallon} -{" "}
            {coverageMaxM2PerGallon} m²/galón.
          </span>
        </div>

        <div className="mt-5">
          <label className="mb-2 block text-xs font-black uppercase text-[#061540]/60">
            Ya sé los m²
          </label>

          <input
            type="number"
            min="0"
            step="0.01"
            value={manualM2}
            onChange={(e) => setManualM2(e.target.value)}
            placeholder="Ej: 24"
            className="h-12 w-full rounded-xl border border-[#061540]/15 px-4 text-sm outline-none focus:border-[#061540]"
          />
        </div>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-[#061540]/10" />
          <span className="text-xs font-black uppercase text-[#061540]/40">
            o calcula por medidas
          </span>
          <div className="h-px flex-1 bg-[#061540]/10" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-xs font-black uppercase text-[#061540]/60">
              Alto / largo
            </label>

            <input
              type="number"
              min="0"
              step="0.01"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Ej: 4"
              className="h-12 w-full rounded-xl border border-[#061540]/15 px-4 text-sm outline-none focus:border-[#061540]"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-black uppercase text-[#061540]/60">
              Ancho
            </label>

            <input
              type="number"
              min="0"
              step="0.01"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              placeholder="Ej: 3"
              className="h-12 w-full rounded-xl border border-[#061540]/15 px-4 text-sm outline-none focus:border-[#061540]"
            />
          </div>
        </div>

        <div className="mt-5 rounded-2xl bg-[#061540] p-5 text-white">
          {area > 0 ? (
            <>
              <p className="text-sm text-white/60">Resultado estimado</p>

              <p className="mt-2 text-3xl font-black">
                {gallonsNeeded} galón{gallonsNeeded === 1 ? "" : "es"}
              </p>

              <p className="mt-2 text-sm text-white/70">
                Área calculada: {area.toFixed(2)} m²
              </p>
            </>
          ) : (
            <p className="text-lg font-black">Ingresa las medidas</p>
          )}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-5 h-11 w-full rounded-xl bg-[#061540] text-sm font-black text-white cursor-pointer"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}