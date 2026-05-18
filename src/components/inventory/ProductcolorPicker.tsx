// components/products/ProductColorsPicker.tsx
"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDeleteProductColor } from "@/hooks/private/products/useDeleteColor";


type ProductColorValue = {
    id?: string;
    name?: string | null;
    value: string;
};

type Props = {
    value: ProductColorValue[];
    onChange: (colors: ProductColorValue[]) => void;
};

export function ProductColorsPicker({
    value,
    onChange,
}: Props) {
    console.log(value)
    const params = useParams();
    const productId = params.id as string;

    const [colorToDeleteIndex, setColorToDeleteIndex] =
        useState<number | null>(null);

    const {
        mutateAsync: deleteColor,
        isPending: isDeletingColor,
    } = useDeleteProductColor();

    function addColor() {
        onChange([
            ...value,
            {
                name: "",
                value: "",
            },
        ]);
    }

    function updateColor(
        index: number,
        field: keyof ProductColorValue,
        fieldValue: string
    ) {
        const updated = [...value];

        updated[index] = {
            ...updated[index],
            [field]: fieldValue,
        };

        onChange(updated);
    }

    async function removeColor(index: number) {
        const colorToRemove = value[index];
        console.log("asidjsdaijij")
        console.log("COLOR TO REMOVE:", colorToRemove);
        console.log("PRODUCT ID:", productId);

        if (!colorToRemove?.id) {
            console.log("Este color no tiene id, no se llama la API");
            onChange(value.filter((_, i) => i !== index));
            return;
        }

        await deleteColor({
            productId,
            colorId: colorToRemove.id,
        });

        onChange(value.filter((_, i) => i !== index));
    }

    async function confirmDeleteColor() {
        if (colorToDeleteIndex === null) return;

        await removeColor(colorToDeleteIndex);

        setColorToDeleteIndex(null);
    }

    return (
        <>
            <div className="space-y-4 rounded-md border p-4">
                <div className="flex items-center justify-between">
                    <h3 className="mb-2 block text-xs font-semibold uppercase text-blue-700">
                        Colores
                    </h3>

                    <Button
                        type="button"
                        variant="outline"
                        onClick={addColor}
                    >
                        Agregar color
                    </Button>
                </div>

                {value.length === 0 && (
                    <p className="text-sm text-slate-500">
                        No hay colores agregados.
                    </p>
                )}

                {value.map((color, index) => (
                    <div
                        key={color.id ?? index}
                        className="flex items-center gap-4"
                    >
                        <Input
                            placeholder="Nombre"
                            value={color.name ?? ""}
                            onChange={(e) =>
                                updateColor(index, "name", e.target.value)
                            }
                        />

                        <div className="flex items-center gap-2">
                            <Input
                                type="color"
                                value={color.value || "#000000"}
                                onChange={(e) =>
                                    updateColor(index, "value", e.target.value)
                                }
                                className="h-11 w-16 cursor-pointer p-1"
                            />

                            <Input
                                placeholder="#000000"
                                value={color.value}
                                onChange={(e) =>
                                    updateColor(index, "value", e.target.value)
                                }
                            />
                        </div>

                        <div
                            className="h-11 min-w-11 rounded-xl border"
                            style={{
                                backgroundColor:
                                    color.value || "#000000",
                            }}
                        />

                        <Button className="cursor-pointer"
                            type="button"
                            variant="destructive"
                            disabled={isDeletingColor}
                            onClick={() =>
                                setColorToDeleteIndex(index)
                            }
                        >
                            Eliminar
                        </Button>
                    </div>
                ))}
            </div>

            {colorToDeleteIndex !== null && (
                <div className="fixed inset-0 z-50 h-full w-full flex items-center justify-center bg-black/50 px-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                        <h2 className="text-lg font-semibold text-neutral-900">
                            Eliminar color
                        </h2>

                        <p className="mt-2 text-sm text-neutral-600">
                            ¿Seguro que quieres eliminar este color?
                        </p>

                        <div className="mt-6 flex justify-end gap-3 cursor-pointer">
                            <Button className="cursor-pointer"
                                type="button"
                                variant="outline"
                                onClick={() =>
                                    setColorToDeleteIndex(null)
                                }
                                disabled={isDeletingColor}
                            >
                                Cancelar
                            </Button>

                            <Button className="cursor-pointer"
                                type="button"
                                variant="destructive"
                                onClick={confirmDeleteColor}
                                disabled={isDeletingColor}
                            >
                                {isDeletingColor
                                    ? "Eliminando..."
                                    : "Eliminar"}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}