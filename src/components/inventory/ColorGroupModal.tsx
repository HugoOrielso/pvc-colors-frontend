"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, CheckCircle2, ChevronRight, X } from "lucide-react";

interface ProductColorInput {
  id: string;
  name?: string | null;
  value: string;
}

interface ProductColorGroup {
  id: string;
  name: string;
  description?: string | null;
  colors: ProductColorInput[];
}

interface ColorGroupModalProps {
  groups: ProductColorGroup[];
  selectedColorId: string | null;
  onSelect: (colorId: string) => void;
  onClose: () => void;
}

export function ColorGroupModal({
  groups,
  selectedColorId,
  onSelect,
  onClose,
}: ColorGroupModalProps) {
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);

  const selectedGroup = useMemo(
    () => groups.find((group) => group.id === selectedGroupId) ?? null,
    [groups, selectedGroupId],
  );

  const selectedColor = useMemo(
    () =>
      groups
        .flatMap((group) => group.colors)
        .find((color) => color.id === selectedColorId) ?? null,
    [groups, selectedColorId],
  );

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

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
            <h3 className="text-lg font-black text-[#061540]">
              {selectedGroup ? selectedGroup.name : "Elige un grupo de color"}
            </h3>

            <p className="mt-0.5 text-xs text-[#061540]/50">
              {selectedGroup
                ? "Ahora selecciona el color exacto."
                : "Selecciona primero una familia o grupo de colores."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f4f5f9] text-[#061540]/50 transition hover:bg-[#061540]/10 hover:text-[#061540]"
          >
            <X size={16} />
          </button>
        </div>

        {!selectedGroup ? (
          <div className="max-h-[60vh] space-y-3 overflow-y-auto pr-1">
            {groups.map((group) => (
              <button
                key={group.id}
                type="button"
                onClick={() => setSelectedGroupId(group.id)}
                className="flex w-full items-center justify-between rounded-2xl border border-[#061540]/10 bg-white px-4 py-4 text-left transition hover:border-[#061540]/30 hover:bg-[#f4f5f9]"
              >
                <div>
                  <p className="text-sm font-black text-[#061540]">
                    {group.name}
                  </p>

                  <p className="mt-0.5 text-xs text-[#061540]/45">
                    {group.colors.length} colores disponibles
                  </p>
                </div>

                <ChevronRight size={18} className="text-[#061540]/35" />
              </button>
            ))}
          </div>
        ) : (
          <>
            <button
              type="button"
              onClick={() => setSelectedGroupId(null)}
              className="mb-4 inline-flex items-center gap-2 text-xs font-black uppercase tracking-wide text-[#061540]/60 transition hover:text-[#061540]"
            >
              <ArrowLeft size={14} />
              Volver a grupos
            </button>

            <div className="grid max-h-[50vh] grid-cols-5 gap-3 overflow-y-auto pr-1 sm:grid-cols-6">
              {selectedGroup.colors.map((color) => {
                const isSelected = selectedColorId === color.id;

                return (
                  <button
                    key={color.id}
                    type="button"
                    onClick={() => onSelect(color.id)}
                    title={color.name ?? color.value}
                    className={`relative aspect-square rounded-2xl border-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                      isSelected
                        ? "scale-110 border-[#061540] shadow-lg"
                        : "border-transparent hover:border-[#061540]/20"
                    }`}
                    style={{ backgroundColor: color.value }}
                  >
                    {isSelected && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white shadow">
                          <CheckCircle2 size={13} className="text-[#061540]" />
                        </span>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {selectedColor && (
          <div className="mt-4 flex items-center gap-2.5 rounded-xl bg-[#f4f5f9] px-4 py-3">
            <div
              className="h-4 w-4 shrink-0 rounded-full border border-black/10"
              style={{ backgroundColor: selectedColor.value }}
            />

            <p className="text-sm text-[#061540]/70">
              {selectedColor.name && (
                <strong className="font-black text-[#061540]">
                  {selectedColor.name}
                </strong>
              )}

              <span className="ml-1.5 font-mono text-xs text-[#061540]/40">
                {selectedColor.value}
              </span>
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={onClose}
          disabled={!selectedColorId}
          className="mt-4 h-11 w-full rounded-xl bg-[#061540] text-sm font-black text-white transition hover:bg-[#061540]/85 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Confirmar selección
        </button>
      </div>
    </div>
  );
}