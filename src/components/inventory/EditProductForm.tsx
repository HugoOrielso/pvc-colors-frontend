"use client";

import { ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { useProductById } from "@/hooks/private/products/useProductById";
import { useUpdateProduct } from "@/hooks/private/products/useUpdateProduct";
import { ProductImagesManager } from "../products/productImagesManager";

type ColorForm = {
    name: string;
    value: string;
};

type ColorGroupForm = {
    name: string;
    description: string;
    colors: ColorForm[];
};

type PresentationForm = {
    name: string;
    price: string;
    stock: string;
    sku: string;
};

type FeatureForm = {
    name: string;
    description: string;
};

type ImageForm = {
    id?: string;
    url?: string;
    file?: File;
    preview: string;
    alt?: string | null;
    isMain?: boolean;
};

type ProductFormState = {
    name: string;
    slug: string;
    description: string;
    recommendations: string;
    coverageMinM2PerGallon: string;
    coverageMaxM2PerGallon: string;
    productLineId: string;
};

const initialForm: ProductFormState = {
    name: "",
    slug: "",
    description: "",
    recommendations: "",
    coverageMinM2PerGallon: "",
    coverageMaxM2PerGallon: "",
    productLineId: "",
};

const initialPresentation: PresentationForm = {
    name: "",
    price: "",
    stock: "",
    sku: "",
};

const initialFeature: FeatureForm = {
    name: "",
    description: "",
};

function makeSlug(value: string) {
    return value
        .toLowerCase()
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}

export default function UpdateProductForm() {
    const params = useParams();
    const productId = params.id as string;

    const { data, isLoading, isError } = useProductById(productId);
    const product = data?.data;

    const { mutate: updateProduct, isPending } = useUpdateProduct(productId);

    const [form, setForm] = useState<ProductFormState>(initialForm);
    const [images, setImages] = useState<ImageForm[]>([]);
    const [technicalSheet, setTechnicalSheet] = useState<File | string | null>(null);
    const [technicalSheetPreview, setTechnicalSheetPreview] = useState("");

    const [colors, setColors] = useState<ColorForm[]>([]);
    const [colorGroups, setColorGroups] = useState<ColorGroupForm[]>([]);
    const [features, setFeatures] = useState<FeatureForm[]>([]);
    const [presentations, setPresentations] = useState<PresentationForm[]>([
        initialPresentation,
    ]);

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
            coverageMinM2PerGallon: product.coverageMinM2PerGallon
                ? String(product.coverageMinM2PerGallon)
                : "",
            coverageMaxM2PerGallon: product.coverageMaxM2PerGallon
                ? String(product.coverageMaxM2PerGallon)
                : "",
            productLineId: product.productLineId,
        });

        setImages(
            product.images?.map((image) => ({
                id: image.id,
                url: image.url,
                preview: image.url,
                alt: image.alt,
                isMain: image.isMain,
            })) ?? []
        );

        setTechnicalSheet(product.technicalSheetUrl ?? null);

        setColors(
            product.colors?.map((color) => ({
                name: color.name ?? "",
                value: color.value,
            })) ?? []
        );

        setColorGroups(
            product.colorGroups?.map((group) => ({
                name: group.name,
                description: group.description ?? "",
                colors:
                    group.colors?.map((color) => ({
                        name: color.name ?? "",
                        value: color.value,
                    })) ?? [],
            })) ?? []
        );

        setFeatures(
            product.features?.map((feature) => ({
                name: feature.name,
                description: feature.description ?? "",
            })) ?? []
        );

        setPresentations(
            product.presentations?.map((presentation) => ({
                name: presentation.name,
                price: String(presentation.price),
                stock: String(presentation.stock),
                sku: presentation.sku ?? "",
            })) ?? [{ ...initialPresentation }]
        );
    }, [product]);

    const hasSimpleColors = colors.some((color) => color.value.trim());


    const isFormValid = useMemo(() => {
        return (
            form.name.trim() &&
            form.slug.trim() &&
            form.description.trim() &&
            form.productLineId &&
            images.length > 0 &&
            presentations.some(
                (presentation) =>
                    presentation.name.trim() &&
                    Number(presentation.price) > 0 &&
                    Number(presentation.stock) >= 0
            )
        );
    }, [form, images.length, presentations]);

    function handleChange(
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
            ...(name === "name" ? { slug: makeSlug(value) } : {}),
        }));
    }


    function handleTechnicalSheetChange(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0] ?? null;

        if (!file) return;

        if (file.type !== "application/pdf") {
            toast.error("La ficha técnica debe ser un PDF");
            e.target.value = "";
            return;
        }

        setTechnicalSheet(file);
        setTechnicalSheetPreview(URL.createObjectURL(file));
    }


    function addColorGroup() {
        if (hasSimpleColors) {
            toast.error("No puedes usar grupos de colores y colores simples al mismo tiempo");
            return;
        }

        setColorGroups((prev) => [
            ...prev,
            {
                name: "",
                description: "",
                colors: [{ name: "", value: "" }],
            },
        ]);
    }

    function removeColorGroup(groupIndex: number) {
        setColorGroups((prev) => prev.filter((_, i) => i !== groupIndex));
    }

    function updateColorGroup(
        groupIndex: number,
        key: keyof Omit<ColorGroupForm, "colors">,
        value: string
    ) {
        setColorGroups((prev) =>
            prev.map((group, i) =>
                i === groupIndex ? { ...group, [key]: value } : group
            )
        );
    }

    function addColorToGroup(groupIndex: number) {
        setColorGroups((prev) =>
            prev.map((group, i) =>
                i === groupIndex
                    ? {
                        ...group,
                        colors: [...group.colors, { name: "", value: "" }],
                    }
                    : group
            )
        );
    }

    function updateColorInGroup(
        groupIndex: number,
        colorIndex: number,
        key: keyof ColorForm,
        value: string
    ) {
        setColorGroups((prev) =>
            prev.map((group, i) =>
                i === groupIndex
                    ? {
                        ...group,
                        colors: group.colors.map((color, j) =>
                            j === colorIndex ? { ...color, [key]: value } : color
                        ),
                    }
                    : group
            )
        );
    }

    function removeColorFromGroup(groupIndex: number, colorIndex: number) {
        setColorGroups((prev) =>
            prev.map((group, i) =>
                i === groupIndex
                    ? {
                        ...group,
                        colors: group.colors.filter((_, j) => j !== colorIndex),
                    }
                    : group
            )
        );
    }

    function addFeature() {
        setFeatures((prev) => [...prev, { ...initialFeature }]);
    }

    function updateFeature(index: number, key: keyof FeatureForm, value: string) {
        setFeatures((prev) =>
            prev.map((feature, i) =>
                i === index ? { ...feature, [key]: value } : feature
            )
        );
    }

    function removeFeature(index: number) {
        setFeatures((prev) => prev.filter((_, i) => i !== index));
    }

    function addPresentation() {
        setPresentations((prev) => [...prev, { ...initialPresentation }]);
    }

    function updatePresentation(
        index: number,
        key: keyof PresentationForm,
        value: string
    ) {
        setPresentations((prev) =>
            prev.map((item, i) => (i === index ? { ...item, [key]: value } : item))
        );
    }

    function removePresentation(index: number) {
        setPresentations((prev) => {
            if (prev.length === 1) return prev;
            return prev.filter((_, i) => i !== index);
        });
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!form.name.trim()) return toast.error("El nombre es obligatorio");
        if (!form.description.trim())
            return toast.error("La descripción es obligatoria");
        if (!images.length)
            return toast.error("Debes conservar o subir al menos una imagen");

        const validPresentations = presentations
            .filter((presentation) => presentation.name.trim())
            .map((presentation) => {
                const price = Number(presentation.price);
                const stock = Number(presentation.stock);

                return {
                    name: presentation.name.trim(),
                    price,
                    stock,
                    sku: presentation.sku.trim() || null,
                };
            });

        if (!validPresentations.length) {
            return toast.error("Debes agregar al menos una presentación");
        }

        const invalidPresentation = validPresentations.find(
            (presentation) =>
                !Number.isInteger(presentation.price) ||
                presentation.price <= 0 ||
                !Number.isInteger(presentation.stock) ||
                presentation.stock < 0
        );

        if (invalidPresentation) {
            return toast.error(
                "Cada presentación debe tener precio entero mayor a 0 y stock mayor o igual a 0"
            );
        }

        const validColors = colors
            .filter((color) => color.value.trim())
            .map((color) => ({
                name: color.name.trim() || null,
                value: color.value.trim(),
            }));

        const validColorGroups = colorGroups
            .filter((group) => group.name.trim())
            .map((group, groupIndex) => ({
                name: group.name.trim(),
                description: group.description.trim() || null,
                position: groupIndex,
                colors: group.colors
                    .filter((color) => color.value.trim())
                    .map((color) => ({
                        name: color.name.trim() || null,
                        value: color.value.trim(),
                    })),
            }))
            .filter((group) => group.colors.length > 0);

        if (validColors.length > 0 && validColorGroups.length > 0) {
            return toast.error(
                "Debes usar colores simples o grupos de colores, no ambos al mismo tiempo"
            );
        }
        const validFeatures = features
            .filter((feature) => feature.name.trim())
            .map((feature) => ({
                name: feature.name.trim(),
                description: feature.description.trim() || undefined,
            }));

        const existingImages = images
            .filter((image) => image.id)
            .map((image, index) => ({
                id: image.id as string,
                alt: image.alt ?? null,
                position: index,
                isMain: image.isMain ?? false,
            }));

        const newImages = images
            .filter((image) => image.file instanceof File)
            .map((image) => image.file as File);

        const payload: UpdateProductFormInput = {
            name: form.name.trim(),
            slug: form.slug.trim(),
            description: form.description.trim(),
            recommendations: form.recommendations.trim() || undefined,
            productLineId: form.productLineId,

            coverageMinM2PerGallon: form.coverageMinM2PerGallon
                ? Number(form.coverageMinM2PerGallon)
                : undefined,

            coverageMaxM2PerGallon: form.coverageMaxM2PerGallon
                ? Number(form.coverageMaxM2PerGallon)
                : undefined,

            existingImages,
            images: newImages,

            technicalSheet:
                technicalSheet instanceof File ? technicalSheet : undefined,

            colors: validColors,
            colorGroups: validColorGroups,
            features: validFeatures,
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
        <div className="p-4">
            <div className="mb-6">
                <p className="text-sm font-semibold uppercase tracking-[0.08em] text-blue-700">
                    Inventario
                </p>

                <h2 className="mt-1 text-3xl font-black text-blue-700">
                    Editar producto
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Actualiza la galería, ficha técnica, colores, características,
                    rendimiento y presentaciones del producto.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 rounded-xl border p-4">
                <div>
                    <label className="mb-2 block text-xs font-semibold uppercase text-blue-700">
                        Nombre
                    </label>

                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="h-12 w-full rounded-xl border px-4 text-sm outline-none"
                        placeholder="Nombre del producto"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-xs font-semibold uppercase text-blue-700">
                        Slug
                    </label>

                    <input
                        name="slug"
                        value={form.slug}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
                        rows={3}
                        className="w-full rounded-xl border px-4 py-3 text-sm outline-none"
                        placeholder="Modo de uso, superficies recomendadas, advertencias..."
                    />
                </div>

                <div className="rounded-xl border p-4">
                    <div className="mb-3">
                        <h3 className="font-semibold text-blue-700">
                            Rendimiento para calculadora
                        </h3>
                        <p className="text-xs text-slate-500">
                            Ejemplo: si la ficha dice 25 - 30 m²/galón, escribe 25 y 30.
                        </p>
                    </div>

                    <div className="grid gap-3 md:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-xs font-semibold uppercase text-blue-700">
                                Cobertura mínima m²/galón
                            </label>

                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                name="coverageMinM2PerGallon"
                                value={form.coverageMinM2PerGallon}
                                onChange={handleChange}
                                className="h-12 w-full rounded-xl border px-4 text-sm outline-none"
                                placeholder="Ej: 25"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-xs font-semibold uppercase text-blue-700">
                                Cobertura máxima m²/galón
                            </label>

                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                name="coverageMaxM2PerGallon"
                                value={form.coverageMaxM2PerGallon}
                                onChange={handleChange}
                                className="h-12 w-full rounded-xl border px-4 text-sm outline-none"
                                placeholder="Ej: 30"
                            />
                        </div>
                    </div>
                </div>

                <ProductImagesManager
                    productId={productId}
                    images={images}
                    setImages={setImages}
                />

                <div>
                    <label className="mb-2 block text-xs font-semibold uppercase text-blue-700">
                        Ficha técnica PDF
                    </label>

                    <Input
                        type="file"
                        accept="application/pdf"
                        onChange={handleTechnicalSheetChange}
                    />

                    {typeof technicalSheet === "string" && (
                        <div className="mt-3 flex items-center justify-between rounded-xl border bg-slate-50 p-3">
                            <div>
                                <p className="text-sm font-semibold text-slate-900">
                                    Ficha técnica actual
                                </p>
                                <p className="text-xs text-slate-500">PDF guardado</p>
                            </div>

                            <a
                                href={technicalSheet}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-lg bg-blue-700 px-3 py-2 text-xs font-semibold text-white"
                            >
                                Ver PDF
                            </a>
                        </div>
                    )}

                    {technicalSheet instanceof File && (
                        <div className="mt-3 flex items-center justify-between rounded-xl border bg-slate-50 p-3">
                            <div>
                                <p className="text-sm font-semibold text-slate-900">
                                    {technicalSheet.name}
                                </p>
                                <p className="text-xs text-slate-500">Nuevo PDF seleccionado</p>
                            </div>

                            {technicalSheetPreview && (
                                <a
                                    href={technicalSheetPreview}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-lg bg-blue-700 px-3 py-2 text-xs font-semibold text-white"
                                >
                                    Ver PDF
                                </a>
                            )}
                        </div>
                    )}
                </div>

                    {/* <div className="rounded-xl border p-4">
                        <div className="mb-3 flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold text-blue-700">Colores simples</h3>
                                <p className="text-xs text-slate-500">
                                    Usa esta opción solo si el producto no maneja grupos de colores.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={addColor}
                                disabled={hasColorGroups}
                                className="cursor-pointer rounded-lg bg-blue-700 px-3 py-2 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Agregar color
                            </button>
                        </div>

                        <div className="space-y-3">
                            {colors.map((color, index) => (
                                <div
                                    key={index}
                                    className="grid gap-3 md:grid-cols-[1fr_160px_48px_auto]"
                                >
                                    <input
                                        value={color.name}
                                        onChange={(e) => updateColor(index, "name", e.target.value)}
                                        placeholder="Nombre del color"
                                        disabled={hasColorGroups}
                                        className="h-11 rounded-xl border px-4 text-sm outline-none disabled:bg-slate-100"
                                    />

                                    <div className="flex h-11 items-center gap-2 rounded-xl border px-3">
                                        <input
                                            type="color"
                                            value={color.value || "#000000"}
                                            onChange={(e) => updateColor(index, "value", e.target.value)}
                                            disabled={hasColorGroups}
                                            className="h-8 w-10 cursor-pointer rounded border-none bg-transparent p-0 disabled:cursor-not-allowed"
                                        />

                                        <span className="text-xs font-medium text-slate-600">
                                            {color.value || "#000000"}
                                        </span>
                                    </div>

                                    <div
                                        className="h-11 rounded-xl border"
                                        style={{ backgroundColor: color.value || "#000000" }}
                                    />

                                    <button
                                        type="button"
                                        onClick={() => removeColor(index)}
                                        className="cursor-pointer rounded-xl border px-4 text-sm hover:bg-slate-50"
                                    >
                                        Quitar
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div> */}

                <div className="rounded-xl border p-4">
                    <div className="mb-3 flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold text-blue-700">Grupos de colores</h3>
                            <p className="text-xs text-slate-500">
                                Úsalo cuando el producto tenga muchos colores separados por
                                familia.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={addColorGroup}
                            disabled={hasSimpleColors}
                            className="cursor-pointer rounded-lg bg-blue-700 px-3 py-2 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Agregar grupo
                        </button>
                    </div>

                    <div className="space-y-4">
                        {colorGroups.map((group, groupIndex) => (
                            <div key={groupIndex} className="rounded-xl border bg-slate-50 p-4">
                                <div className="mb-3 grid gap-3 md:grid-cols-[1fr_1fr_auto]">
                                    <input
                                        value={group.name}
                                        onChange={(e) =>
                                            updateColorGroup(groupIndex, "name", e.target.value)
                                        }
                                        placeholder="Nombre del grupo: Rojos, Azules..."
                                        className="h-11 rounded-xl border px-4 text-sm outline-none"
                                    />

                                    <input
                                        value={group.description}
                                        onChange={(e) =>
                                            updateColorGroup(groupIndex, "description", e.target.value)
                                        }
                                        placeholder="Descripción opcional"
                                        className="h-11 rounded-xl border px-4 text-sm outline-none"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => removeColorGroup(groupIndex)}
                                        className="cursor-pointer rounded-xl border bg-white px-4 text-sm hover:bg-slate-100"
                                    >
                                        Quitar grupo
                                    </button>
                                </div>

                                <div className="mb-3 flex justify-between">
                                    <p className="text-sm font-semibold text-slate-700">
                                        Colores del grupo
                                    </p>

                                    <button
                                        type="button"
                                        onClick={() => addColorToGroup(groupIndex)}
                                        className="cursor-pointer rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white"
                                    >
                                        Agregar color
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    {group.colors.map((color, colorIndex) => (
                                        <div
                                            key={colorIndex}
                                            className="grid gap-3 md:grid-cols-[1fr_160px_48px_auto]"
                                        >
                                            <input
                                                value={color.name}
                                                onChange={(e) =>
                                                    updateColorInGroup(
                                                        groupIndex,
                                                        colorIndex,
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Nombre del color"
                                                className="h-11 rounded-xl border px-4 text-sm outline-none"
                                            />

                                            <div className="flex h-11 items-center gap-2 rounded-xl border bg-white px-3">
                                                <input
                                                    type="color"
                                                    value={color.value || "#000000"}
                                                    onChange={(e) =>
                                                        updateColorInGroup(
                                                            groupIndex,
                                                            colorIndex,
                                                            "value",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="h-8 w-10 cursor-pointer rounded border-none bg-transparent p-0"
                                                />

                                                <span className="text-xs font-medium text-slate-600">
                                                    {color.value || "#000000"}
                                                </span>
                                            </div>

                                            <div
                                                className="h-11 rounded-xl border"
                                                style={{ backgroundColor: color.value || "#000000" }}
                                            />

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeColorFromGroup(groupIndex, colorIndex)
                                                }
                                                className="cursor-pointer rounded-xl border bg-white px-4 text-sm hover:bg-slate-100"
                                            >
                                                Quitar
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-xl border p-4">
                    <div className="mb-3 flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold text-blue-700">Características</h3>
                            <p className="text-xs text-slate-500">
                                Agrega beneficios o atributos destacados del producto.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={addFeature}
                            className="cursor-pointer rounded-lg bg-blue-700 px-3 py-2 text-xs font-semibold text-white"
                        >
                            Agregar característica
                        </button>
                    </div>

                    <div className="space-y-3">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="grid gap-3 md:grid-cols-[1fr_2fr_auto]"
                            >
                                <input
                                    value={feature.name}
                                    onChange={(e) =>
                                        updateFeature(index, "name", e.target.value)
                                    }
                                    placeholder="Ej: Alto cubrimiento"
                                    className="h-11 rounded-xl border px-4 text-sm outline-none"
                                />

                                <input
                                    value={feature.description}
                                    onChange={(e) =>
                                        updateFeature(index, "description", e.target.value)
                                    }
                                    placeholder="Descripción de la característica"
                                    className="h-11 rounded-xl border px-4 text-sm outline-none"
                                />

                                <button
                                    type="button"
                                    onClick={() => removeFeature(index)}
                                    className="cursor-pointer rounded-xl border px-4 text-sm hover:bg-slate-50"
                                >
                                    Quitar
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-xl border p-4">
                    <div className="mb-3 flex items-center justify-between">
                        <h3 className="font-semibold text-blue-700">Presentaciones</h3>

                        <button
                            type="button"
                            onClick={addPresentation}
                            className="cursor-pointer rounded-lg bg-blue-700 px-3 py-2 text-xs font-semibold text-white"
                        >
                            Agregar presentación
                        </button>
                    </div>

                    <div className="space-y-3">
                        {presentations.map((presentation, index) => (
                            <div
                                key={index}
                                className="grid gap-3 md:grid-cols-[1fr_140px_140px_140px_auto]"
                            >
                                <input
                                    value={presentation.name}
                                    onChange={(e) =>
                                        updatePresentation(index, "name", e.target.value)
                                    }
                                    placeholder="Galón, Cuñete, 1/4..."
                                    className="h-11 rounded-xl border px-4 text-sm outline-none"
                                />

                                <input
                                    type="number"
                                    min="1"
                                    step="1"
                                    value={presentation.price}
                                    onChange={(e) =>
                                        updatePresentation(index, "price", e.target.value)
                                    }
                                    placeholder="Precio"
                                    className="h-11 rounded-xl border px-4 text-sm outline-none"
                                />

                                <input
                                    type="number"
                                    min="0"
                                    step="1"
                                    value={presentation.stock}
                                    onChange={(e) =>
                                        updatePresentation(index, "stock", e.target.value)
                                    }
                                    placeholder="Stock"
                                    className="h-11 rounded-xl border px-4 text-sm outline-none"
                                />

                                <input
                                    value={presentation.sku}
                                    onChange={(e) =>
                                        updatePresentation(index, "sku", e.target.value)
                                    }
                                    placeholder="SKU"
                                    className="h-11 rounded-xl border px-4 text-sm outline-none"
                                />

                                <button
                                    type="button"
                                    onClick={() => removePresentation(index)}
                                    className="cursor-pointer rounded-xl border px-4 text-sm hover:bg-slate-50"
                                >
                                    Quitar
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isPending || !isFormValid}
                    className="h-12 w-full cursor-pointer rounded-xl bg-blue-700 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isPending ? (
                        <div className="flex items-center justify-center">
                            <Loader2 className="mr-2 size-4 animate-spin" />
                            Actualizando producto...
                        </div>
                    ) : (
                        "Guardar cambios"
                    )}
                </button>
            </form>
        </div>
    );
}