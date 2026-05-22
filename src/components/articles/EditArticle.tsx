"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    Save,
    FileText,
    Eye,
    PencilLine,
} from "lucide-react";

import { toast } from "sonner";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import {
    useArticleById,
    useUpdateArticle,
} from "@/hooks/private/articles/useArticles";

interface EditArticleFormProps {
    articleId: string;
}

export default function EditArticleForm({
    articleId,
}: EditArticleFormProps) {
    const router = useRouter();

    const { data: article, isLoading, isError } =
        useArticleById(articleId);

    const updateMutation = useUpdateArticle(articleId);

    const [title, setTitle] = useState("");
    const [markdown, setMarkdown] = useState("");

    const [previewMode, setPreviewMode] = useState(false);
    const initialized = useRef(false);

    useEffect(() => {
        if (article && !initialized.current) {
            initialized.current = true;
            setTitle(article.title);
            setMarkdown(article.markdown);
        }
    }, [article]);

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
            await updateMutation.mutateAsync({
                title,
                markdown,
            });

            toast.success("Artículo actualizado correctamente");
        } catch {
            toast.error("Error actualizando el artículo");
        }
    };

    if (isLoading) {
        return (
            <div className="rounded-3xl border bg-white p-8 shadow-sm">
                <p className="text-sm text-slate-500">
                    Cargando artículo...
                </p>
            </div>
        );
    }

    if (isError || !article) {
        return (
            <div className="rounded-3xl border bg-white p-8 shadow-sm">
                <p className="text-sm text-red-500">
                    No se pudo cargar el artículo.
                </p>
            </div>
        );
    }

    return (
        <section className="space-y-6 p-4">
            <div className="flex flex-col gap-4 rounded-3xl border bg-white p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="mb-4 inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-slate-900"
                    >
                        <ArrowLeft size={16} />
                        Volver
                    </button>

                    <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                        <PencilLine size={14} />
                        Editando artículo
                    </div>

                    <h1 className="text-2xl font-semibold tracking-tight text-slate-950">
                        {title || "Sin título"}
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Modifica el contenido en Markdown y visualízalo en
                        tiempo real.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => setPreviewMode(!previewMode)}
                        className="inline-flex items-center gap-2 rounded-2xl border px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                    >
                        {previewMode ? (
                            <>
                                <FileText size={16} />
                                Editor
                            </>
                        ) : (
                            <>
                                <Eye size={16} />
                                Preview
                            </>
                        )}
                    </button>

                    <button
                        type="submit"
                        form="edit-article-form"
                        disabled={updateMutation.isPending}
                        className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <Save size={16} />

                        {updateMutation.isPending
                            ? "Guardando..."
                            : "Guardar cambios"}
                    </button>
                </div>
            </div>

            <form
                id="edit-article-form"
                onSubmit={handleSubmit}
                className="grid gap-6 lg:grid-cols-2"
            >
                <div className="rounded-3xl border bg-white p-6 shadow-sm">
                    <div className="space-y-6">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Título
                            </label>

                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Título del artículo..."
                                className="w-full rounded-2xl border px-4 py-3 text-sm outline-none transition focus:border-slate-950"
                            />
                        </div>

                        {!previewMode && (
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Markdown
                                </label>

                                <textarea
                                    value={markdown}
                                    onChange={(e) =>
                                        setMarkdown(e.target.value)
                                    }
                                    rows={24}
                                    placeholder={`# Hola mundo

Este es un artículo en Markdown.

## Subtítulo

- Punto uno
- Punto dos

**Texto importante**
`}
                                    className="min-h-175 w-full resize-none rounded-2xl border bg-slate-50 px-4 py-4 font-mono text-sm outline-none transition focus:border-slate-950"
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className="rounded-3xl border bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                            <Eye size={18} />
                        </div>

                        <div>
                            <h2 className="text-sm font-semibold text-slate-950">
                                Vista previa
                            </h2>

                            <p className="text-xs text-slate-500">
                                Renderizado Markdown en tiempo real
                            </p>
                        </div>
                    </div>

                    <div className="prose prose-slate max-w-none rounded-2xl border bg-slate-50 p-6 prose-headings:tracking-tight">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {markdown || "Empieza a escribir contenido..."}
                        </ReactMarkdown>
                    </div>
                </div>
            </form>
        </section>
    );
}