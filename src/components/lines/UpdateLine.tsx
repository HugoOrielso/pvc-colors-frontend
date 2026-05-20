"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { useProductLineById } from "@/hooks/private/lines/useGetLineById";
import { useUpdateProductLine } from "@/hooks/private/lines/useUpdateLine";

interface ProductLineFormState {
    name: string;
    slug: string;
    description: string;
    image: File | string | null;
}

const EMPTY_FORM: ProductLineFormState = {
    name: "",
    slug: "",
    description: "",
    image: null,
};

export default function EditProductLineForm() {
    const params = useParams();
    const lineId = params.id as string;

    const { data, isLoading, isError } = useProductLineById(lineId);
    const line = data?.data;

    const { mutate: updateLine, isPending } = useUpdateProductLine(lineId);

    const [form, setForm] = useState<ProductLineFormState>(EMPTY_FORM);

    const prevLineIdRef = useRef<string | null>(null);

    useEffect(() => {
        if (!line) return;
        if (prevLineIdRef.current === line.id) return;

        prevLineIdRef.current = line.id;

        setForm({
            name: line.name,
            slug: line.slug,
            description: line.description,
            image: line.image,
        });
    }, [line]);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        updateLine({
            name: form.name.trim(),
            slug: form.slug.trim(),
            description: form.description.trim(),
            image: form.image instanceof File ? form.image : undefined,
        });
    }

    const previewImage =
        form.image instanceof File
            ? URL.createObjectURL(form.image)
            : form.image;

    if (isLoading) {
        return (
            <div className="flex min-h-75 items-center justify-center text-sm text-slate-500">
                <Loader2 className="mr-2 size-4 animate-spin" />
                Cargando línea...
            </div>
        );
    }

    if (isError || !line) {
        return (
            <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                No se pudo cargar la línea.
            </div>
        );
    }

    return (
        <div className=" flex items-center justify-center w-full ">
            <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-5xl m-2 border p-2 rounded">
                <div>
                    <label className="mb-2 block text-xs font-semibold uppercase text-blue-700">
                        Nombre
                    </label>
                    <input
                        value={form.name}
                        onChange={(e) =>
                            setForm((prev) => ({ ...prev, name: e.target.value }))
                        }
                        placeholder="Nombre de la línea"
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
                        placeholder="slug-linea"
                        readOnly
                        className="h-12 w-full cursor-not-allowed rounded-xl border bg-gray-100 px-4 text-sm text-gray-500 outline-none"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-xs font-semibold uppercase text-blue-700">
                        Descripción
                    </label>
                    <textarea
                        value={form.description}
                        onChange={(e) =>
                            setForm((prev) => ({
                                ...prev,
                                description: e.target.value,
                            }))
                        }
                        rows={4}
                        className="w-full rounded-xl border px-4 py-3 text-sm outline-none"
                        placeholder="Descripción de la línea..."
                    />
                </div>

                <div className="space-y-2">
                    <label className="mb-2 block text-xs font-semibold uppercase text-blue-700">
                        Imagen de la línea
                    </label>

                    <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;

                            setForm((prev) => ({
                                ...prev,
                                image: file,
                            }));
                        }}
                    />

                    {previewImage && (
                        <div className="mt-3 overflow-hidden rounded-xl border bg-slate-50">
                            <div className="relative h-56 w-full">
                                <Image
                                    src={previewImage}
                                    alt={form.name || "Imagen de la línea"}
                                    fill
                                    className="object-contain"
                                />
                            </div>

                            <div className="p-3">
                                {form.image instanceof File ? (
                                    <p className="text-sm text-slate-500">
                                        Nueva imagen seleccionada: {form.image.name}
                                    </p>
                                ) : (
                                    <p className="text-sm text-slate-500">Imagen actual</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isPending}
                    className="h-12 w-full cursor-pointer rounded-xl bg-blue-700 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isPending ? (
                        <div className="flex w-full items-center justify-center">
                            <Loader2 className="mr-2 size-4 animate-spin" />
                            Actualizando...
                        </div>
                    ) : (
                        <>Guardar cambios</>
                    )}
                </button>
            </form>
        </div>
    );
}