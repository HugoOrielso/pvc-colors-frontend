"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useProductById } from "@/hooks/private/products/useProductById";
import { useUpdateProduct } from "@/hooks/private/products/useUpdateProduct";
import { useParams } from "next/navigation";
import {
    ProductImagesPicker,
    ProductImageValue,
} from "./ProductImagePicker";
import { ProductColorsPicker } from "./ProductcolorPicker";

interface ProductFormState {
    name: string;
    slug: string;
    description: string;
    recommendations: string;
    productLineId: string;
    images: ProductImageValue[];
    technicalSheet: File | string | null;
    colors: ProductColorInput[];
    presentations: ProductPresentationInput[];
}

const EMPTY_FORM: ProductFormState = {
    name: "",
    slug: "",
    description: "",
    recommendations: "",
    productLineId: "",
    images: [],
    technicalSheet: null,
    colors: [],
    presentations: [],
};

export default function UpdateProductForm() {
    const params = useParams();
    const productId = params.id as string;

    const { data, isLoading, isError } = useProductById(productId);
    const product = data?.data;

    const { mutate: updateProduct, isPending } = useUpdateProduct(productId);

    const [form, setForm] = useState<ProductFormState>(EMPTY_FORM);

    const prevProductIdRef = useRef<string | null>(null);

    useEffect(() => {
        if (!product) return;
        if (prevProductIdRef.current === product.id) return;
        prevProductIdRef.current = product.id;

        setForm({
            name: product.name,
            slug: product.slug,
            description: product.description,
            recommendations: product.recommendations ?? "",
            productLineId: product.productLineId,
            images:
                product.images?.map((image) => ({
                    id: image.id,
                    url: image.url,
                    alt: image.alt,
                    position: image.position,
                    isMain: image.isMain,
                })) ?? [],
            technicalSheet: product.technicalSheetUrl ?? null,
            colors:
                product.colors?.map((color) => ({
                    name: color.name ?? "",
                    value: color.value,
                    id: color.id,
                })) ?? [],
            presentations:
                product.presentations?.map((presentation) => ({
                    name: presentation.name,
                    price: presentation.price,
                    stock: presentation.stock,
                    sku: presentation.sku ?? "",
                })) ?? [],
        });
    }, [product]);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const validColors = form.colors
            .filter((color) => color.value.trim())
            .map((color) => ({
                name: color.name?.trim() || null,
                value: color.value.trim(),
            }));

        const validPresentations = form.presentations
            .filter((presentation) => presentation.name.trim())
            .map((presentation) => ({
                name: presentation.name.trim(),
                price: Number(presentation.price),
                stock: Number(presentation.stock),
                sku: presentation.sku?.trim() || null,
            }));

        const existingImages = form.images
            .filter((image) => image.id)
            .map((image, index) => ({
                id: image.id as string,
                alt: image.alt ?? null,
                position: index,
                isMain: image.isMain ?? false,
            }));


        const payload: UpdateProductFormInput = {
            name: form.name.trim(),
            slug: form.slug.trim(),
            description: form.description.trim(),
            recommendations: form.recommendations.trim() || undefined,
            productLineId: form.productLineId,

            existingImages,

            images: form.images
                .filter((image) => image.file instanceof File)
                .map((image) => image.file as File),

            technicalSheet:
                form.technicalSheet instanceof File
                    ? form.technicalSheet
                    : undefined,

            colors: validColors,
            presentations: validPresentations,
        };

        updateProduct(payload);
    }

    if (isLoading) {
        return (
            <div className="flex min-h-75 items-center justify-center text-sm text-slate-500">
                <Loader2 className="mr-2 size-4 animate-spin" />
                Cargando producto...
            </div>
        );
    }

    if (isError || !product) {
        return (
            <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                No se pudo cargar el producto.
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="mb-2 block text-xs font-semibold uppercase text-blue-700">
                    Nombre
                </label>
                <input
                    value={form.name}
                    onChange={(e) =>
                        setForm((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="Nombre del producto"
                    className="h-12 w-full rounded-xl border px-4 text-sm outline-none"
                />
            </div>

            <div>
                <label className="mb-2 block text-xs font-semibold uppercase text-blue-700">
                    Slug
                </label>
                <input
                    value={form.slug}
                    onChange={(e) =>
                        setForm((prev) => ({ ...prev, slug: e.target.value }))
                    }
                    placeholder="slug-producto"
                    readOnly
                    className="h-12 w-full cursor-not-allowed rounded-xl border bg-gray-100 px-4 text-sm text-gray-500 outline-none"
                />
            </div>

            <div>
                <label className="mb-2 block text-xs font-semibold uppercase text-blue-700">
                    Descripción
                </label>
                <textarea
                    name="description"
                    value={form.description}
                    onChange={(e) =>
                        setForm((prev) => ({
                            ...prev,
                            description: e.target.value,
                        }))
                    }
                    rows={4}
                    className="w-full rounded-xl border px-4 py-3 text-sm outline-none"
                    placeholder="Descripción comercial del producto..."
                />
            </div>

            <div>
                <label className="mb-2 block text-xs font-semibold uppercase text-blue-700">
                    Recomendaciones
                </label>
                <textarea
                    name="recommendations"
                    value={form.recommendations}
                    onChange={(e) =>
                        setForm((prev) => ({
                            ...prev,
                            recommendations: e.target.value,
                        }))
                    }
                    rows={3}
                    className="w-full rounded-xl border px-4 py-3 text-sm outline-none"
                    placeholder="Modo de uso, superficies recomendadas, advertencias..."
                />
            </div>

            <ProductImagesPicker
                value={form.images}
                onChange={(images) =>
                    setForm((prev) => ({ ...prev, images }))
                }
            />

            <div className="space-y-2">
                <label className="mb-2 block text-xs font-semibold uppercase text-blue-700">
                    Ficha técnica PDF
                </label>
                <Input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        setForm((prev) => ({ ...prev, technicalSheet: file }));
                    }}
                />
                {typeof form.technicalSheet === "string" && (
                    <div className="mt-3 flex items-center justify-between rounded-xl border bg-slate-50 p-3">
                        <div>
                            <p className="text-sm font-semibold text-slate-900">
                                Ficha técnica actual
                            </p>
                        </div>
                        <a
                            href={form.technicalSheet}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg bg-blue-700 px-3 py-2 text-xs font-semibold text-white"
                        >
                            Ver PDF
                        </a>
                    </div>
                )}
                {form.technicalSheet instanceof File && (
                    <p className="text-sm text-slate-500">
                        Nuevo PDF seleccionado: {form.technicalSheet.name}
                    </p>
                )}
            </div>

            <ProductColorsPicker
                value={form.colors}
                onChange={(colors) =>
                    setForm((prev) => ({ ...prev, colors }))
                }
            />

            <div className="space-y-4 rounded-md border p-4">
                <div className="flex items-center justify-between">
                    <h3 className="mb-2 block text-xs font-semibold uppercase text-blue-700">
                        Presentaciones
                    </h3>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                            setForm((prev) => ({
                                ...prev,
                                presentations: [
                                    ...prev.presentations,
                                    { name: "", price: 0, stock: 0, sku: "" },
                                ],
                            }))
                        }
                    >
                        Agregar presentación
                    </Button>
                </div>

                {form.presentations.length === 0 && (
                    <p className="text-sm text-slate-500">
                        No hay presentaciones agregadas.
                    </p>
                )}

                {form.presentations.map((presentation, index) => (
                    <div
                        key={index}
                        className="grid gap-4 md:grid-cols-[1fr_1fr_1fr_1fr_auto]"
                    >
                        {/* FIX 2 — All handlers use prev to avoid stale closure */}
                        <Input
                            placeholder="Nombre"
                            value={presentation.name}
                            onChange={(e) => {
                                const value = e.target.value;
                                setForm((prev) => {
                                    const updated = [...prev.presentations];
                                    updated[index] = {
                                        ...updated[index],
                                        name: value,
                                    };
                                    return { ...prev, presentations: updated };
                                });
                            }}
                        />

                        <Input
                            type="number"
                            placeholder="Precio"
                            value={presentation.price}
                            onChange={(e) => {
                                const value = Number(e.target.value);
                                setForm((prev) => {
                                    const updated = [...prev.presentations];
                                    updated[index] = {
                                        ...updated[index],
                                        price: value,
                                    };
                                    return { ...prev, presentations: updated };
                                });
                            }}
                        />

                        <Input
                            type="number"
                            placeholder="Stock"
                            value={presentation.stock}
                            onChange={(e) => {
                                const value = Number(e.target.value);
                                setForm((prev) => {
                                    const updated = [...prev.presentations];
                                    updated[index] = {
                                        ...updated[index],
                                        stock: value,
                                    };
                                    return { ...prev, presentations: updated };
                                });
                            }}
                        />

                        <Input
                            placeholder="SKU"
                            value={presentation.sku ?? ""}
                            onChange={(e) => {
                                const value = e.target.value;
                                setForm((prev) => {
                                    const updated = [...prev.presentations];
                                    updated[index] = {
                                        ...updated[index],
                                        sku: value,
                                    };
                                    return { ...prev, presentations: updated };
                                });
                            }}
                        />

                        <Button
                            type="button"
                            variant="destructive"
                            onClick={() =>
                                setForm((prev) => ({
                                    ...prev,
                                    presentations: prev.presentations.filter(
                                        (_, i) => i !== index
                                    ),
                                }))
                            }
                        >
                            Eliminar
                        </Button>
                    </div>
                ))}
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="h-12 w-full cursor-pointer rounded-xl bg-blue-700 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
                {isPending ? (
                    <div className="flex items-center justify-center w-full">
                        <Loader2 className="mr-2 size-4 animate-spin" />
                        Actualizando...
                    </div>
                ) : (
                    <>Guardar cambios</>
                )}
            </button>
        </form>
    );
}