"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useCreateArticle, useUpdateArticle } from "@/hooks/private/articles/useArticles";


interface ArticleFormProps {
    articleId?: string;
    initialData?: {
        title: string;
        markdown: string;
    };
}

export default function ArticleForm({
    articleId,
    initialData,
}: ArticleFormProps) {
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [markdown, setMarkdown] = useState("");

    const createMutation = useCreateArticle();
    const updateMutation = useUpdateArticle(articleId ?? "");

    const isEditing = Boolean(articleId);
    const isLoading = createMutation.isPending || updateMutation.isPending;

    const initialized = useRef(false);

    useEffect(() => {
        if (initialData && !initialized.current) {
            initialized.current = true;
            setTitle(initialData.title);
            setMarkdown(initialData.markdown);
        }
    }, [initialData]);
    
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!title.trim()) {
            toast.error("El título es obligatorio");
            return;
        }

        if (!markdown.trim()) {
            toast.error("El contenido es obligatorio");
            return;
        }

        try {
            const payload = {
                title: title.trim(),
                markdown,
            };

            if (isEditing && articleId) {
                await updateMutation.mutateAsync(payload);

                toast.success("Artículo actualizado correctamente");
            } else {
                await createMutation.mutateAsync(payload);

                toast.success("Artículo creado correctamente");
                setTitle("");
                setMarkdown("");
            }

            router.push("/dashboard/articles");
            router.refresh();
        } catch {
            toast.error("Error guardando el artículo");
        }
    };

    return (
        <div className="p-4">
            <form
                onSubmit={handleSubmit}
                className="mx-auto max-w-4xl space-y-6 rounded-2xl border bg-white p-6 shadow-sm"
            >
                <div>
                    <h1 className="text-2xl font-semibold text-slate-900">
                        {isEditing ? "Editar artículo" : "Crear artículo"}
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Escribe el contenido en formato Markdown.
                    </p>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">
                        Título
                    </label>

                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Ej: Cómo preparar una superficie antes de pintar"
                        className="w-full rounded-xl border px-4 py-3 text-sm outline-none focus:border-slate-900"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">
                        Contenido Markdown
                    </label>

                    <textarea
                        value={markdown}
                        onChange={(e) => setMarkdown(e.target.value)}
                        placeholder={`# Título del artículo

Escribe aquí el contenido...

## Subtítulo

- Punto uno
- Punto dos

**Texto en negrita**
`}
                        rows={18}
                        className="w-full resize-y rounded-xl border px-4 py-3 font-mono text-sm outline-none focus:border-slate-900"
                    />
                </div>

                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="rounded-xl border px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isLoading
                            ? "Guardando..."
                            : isEditing
                                ? "Actualizar artículo"
                                : "Crear artículo"}
                    </button>
                </div>
            </form>
        </div>
    );
}