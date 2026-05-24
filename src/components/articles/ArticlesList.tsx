"use client";

import { useRouter } from "next/navigation";
import { FileText, Plus, CalendarDays, Pencil } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useArticles } from "@/hooks/private/articles/useArticles";

export function ArticlesList() {
  const router = useRouter();

  const { data: articles, isLoading, isError } = useArticles();

  if (isLoading) {
    return (
        
      <div className="rounded-2xl  border bg-white p-8 shadow-sm">
        <p className="text-sm text-slate-500">Cargando artículos...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border bg-white p-8 shadow-sm">
        <p className="text-sm text-red-500">
          No se pudieron cargar los artículos.
        </p>
      </div>
    );
  }

  return (
    <section className="space-y-8 p-4">
      <div className="flex flex-col gap-4 rounded-3xl border bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            <FileText size={14} />
            Markdown Articles
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-slate-950">
            Artículos
          </h1>

          <p className="mt-1 max-w-2xl text-sm text-slate-500">
            Crea, edita y gestiona artículos escritos en Markdown.
          </p>
        </div>

        <button
          type="button"
          onClick={() => router.push("/dashboard/articles/create")}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800"
        >
          <Plus size={17} />
          Nuevo artículo
        </button>
      </div>

      {!articles?.length ? (
        <div className="flex min-h-65 flex-col items-center justify-center rounded-3xl border border-dashed bg-white p-10 text-center shadow-sm">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-600">
            <FileText size={24} />
          </div>

          <h2 className="text-lg font-semibold text-slate-950">
            Todavía no hay artículos
          </h2>

          <p className="mt-2 max-w-md text-sm text-slate-500">
            Crea tu primer artículo en Markdown para empezar a construir tu
            contenido.
          </p>

          <button
            type="button"
            onClick={() => router.push("/dashboard/articles/create")}
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            <Plus size={17} />
            Crear artículo
          </button>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article.id}
              onClick={() =>
                router.push(`/dashboard/articles/edit/${article.id}`)
              }
              className="group cursor-pointer rounded-3xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 transition group-hover:bg-slate-950 group-hover:text-white">
                  <FileText size={20} />
                </div>

                <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                  <Pencil size={13} />
                  Editar
                </div>
              </div>

              <h2 className="line-clamp-2 text-base font-semibold leading-snug text-slate-950">
                {article.title}
              </h2>

              <div className="mt-4 h-28 overflow-hidden rounded-2xl border bg-slate-50 p-4">
                <div className="prose prose-sm max-w-none text-slate-600 prose-headings:my-1 prose-headings:text-sm prose-p:my-1 prose-p:text-xs prose-li:text-xs prose-strong:text-slate-800">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {article.markdown || "Sin contenido todavía."}
                  </ReactMarkdown>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                <CalendarDays size={14} />
                <span>
                  Actualizado{" "}
                  {new Date(article.updatedAt).toLocaleDateString("es-CO", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}