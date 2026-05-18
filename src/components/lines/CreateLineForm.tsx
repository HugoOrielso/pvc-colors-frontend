"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { useCreateProductLine } from "@/hooks/private/lines/useLines";
import { createSlug } from "@/utils/slug";

const initialForm = {
    name: "",
    slug: "",
    description: "",
};



export default function CreateProductLineForm() {
    const [form, setForm] = useState(initialForm);
    const [image, setImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string>("");

    const createProductLineMutation = useCreateProductLine();

    const isLoading = createProductLineMutation.isPending;

    const isFormValid = useMemo(() => {
        return (
            form.name.trim() &&
            form.slug.trim() &&
            form.description.trim() &&
            image
        );
    }, [form, image]);

    function handleChange(
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
            ...(name === "name" ? { slug: createSlug(value) } : {}),
        }));
    }

    function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0] ?? null;

        if (!file) return;

        const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

        if (!allowedTypes.includes(file.type)) {
            toast.error("Solo se permiten imágenes PNG, JPG o WEBP");
            e.target.value = "";
            return;
        }

        setImage(file);
        setPreviewImage(URL.createObjectURL(file));
    }

    function resetForm() {
        setForm(initialForm);
        setImage(null);
        setPreviewImage("");
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!form.name.trim()) {
            toast.error("El nombre es obligatorio");
            return;
        }

        if (!form.slug.trim()) {
            toast.error("El slug es obligatorio");
            return;
        }

        if (!form.description.trim()) {
            toast.error("La descripción es obligatoria");
            return;
        }

        if (!image) {
            toast.error("La imagen es obligatoria");
            return;
        }

        createProductLineMutation.mutate(
            {
                name: form.name.trim(),
                slug: form.slug.trim(),
                description: form.description.trim(),
                image,
            },
            {
                onSuccess: () => {
                    resetForm();
                },
            }
        );
    }

    return (
        <section className="w-full rounded-2xl border bg-white p-6 shadow-sm">
            <div className="mb-6">
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                    Líneas de producto
                </p>

                <h1 className="mt-1 text-2xl font-bold text-slate-900">
                    Crear línea
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    Registra una categoría principal para agrupar productos.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Nombre
                    </label>

                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Industrial"
                        className="h-11 w-full rounded-xl border px-4 text-sm outline-none focus:border-slate-900"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Slug
                    </label>

                    <input
                        name="slug"
                        value={form.slug}
                        onChange={handleChange}
                        placeholder="industrial"
                        readOnly
                        disabled
                        className="h-11 w-full rounded-xl border px-4 text-sm outline-none focus:border-slate-900"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Descripción
                    </label>

                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Productos diseñados para uso industrial..."
                        className="w-full resize-none rounded-xl border px-4 py-3 text-sm outline-none focus:border-slate-900"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Imagen
                    </label>

                    <input
                        type="file"
                        accept="image/png,image/jpeg,image/jpg,image/webp"
                        onChange={handleImageChange}
                        className="block w-full rounded-xl border bg-white px-4 py-3 text-sm"
                    />
                </div>

                {previewImage && (
                    <div className="rounded-xl border p-3">
                        <p className="mb-2 text-xs font-semibold uppercase text-slate-500">
                            Vista previa
                        </p>
                        <div className="h-40 relative">
                            <Image
                                src={previewImage}
                                fill alt="Vista previa"
                                className=" w-full absolute rounded-lg object-contain"
                            />
                        </div>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isLoading || !isFormValid}
                    className="h-11 w-full rounded-xl bg-blue-700 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                >
                    {isLoading ? "Creando línea..." : "Crear línea de productos"}
                </button>
            </form>
        </section>
    );
}