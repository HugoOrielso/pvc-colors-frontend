"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { usePublicArticles } from "@/hooks/public/articles/usePublicArticles";
import { PublicArticle } from "@/services/public/articles/articles.service";

export function AprendeConPvc() {
  const [selectedItem, setSelectedItem] = useState<PublicArticle | null>(null);

  const { data: articles = [], isLoading, isError } = usePublicArticles();

  return (
    <>
      <Header />

      <main className="pvc-page overflow-hidden bg-white text-[#061540]">
        <section className="relative overflow-hidden bg-[#061540] px-4 py-16 text-white sm:px-6 lg:px-12 lg:py-20">
          <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-700/20 blur-3xl" />
          <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 right-20 h-72 w-72 rounded-full bg-[#f0c040]/10 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
            <div className="text-center lg:text-left">
              <div className="fade-up mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f0c040] sm:text-xs">
                <span className="size-1.5 rounded-full bg-[#f0c040]" />
                Aprende con PVC
              </div>

              <h1 className="fade-up delay-1 mx-auto max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:mx-0 lg:text-6xl">
                Aprende a pintar mejor{" "}
                <span className="text-[#f0c040]">tus espacios</span>
              </h1>

              <p className="fade-up delay-2 mx-auto mt-6 max-w-xl text-sm font-light leading-relaxed text-white/70 sm:text-base lg:mx-0">
                Consejos prácticos para preparar superficies, elegir colores,
                aplicar pintura correctamente y proteger cada proyecto con
                mejores acabados.
              </p>

              <div className="fade-up delay-3 mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <Link
                  href="/lines"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f0c040] px-6 py-3 text-sm font-semibold text-[#061540] transition hover:bg-yellow-300"
                >
                  Ver productos
                  <ArrowRight size={16} />
                </Link>

                <a
                  href="#guias"
                  className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
                >
                  Leer guías
                </a>
              </div>
            </div>

            <div className="fade-up delay-2 relative mx-auto w-full max-w-xl lg:max-w-none">
              <div className="absolute -inset-3 rounded-3xl bg-white/5 blur-xl" />

              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-3 shadow-2xl backdrop-blur">
                <Image
                  src="/assets/paletaDeColores.webp"
                  alt="PVC Colors"
                  width={900}
                  height={700}
                  className="h-80 w-full rounded-xl object-cover sm:h-105 lg:h-120"
                  priority
                />

                <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/15 bg-[#061540]/75 p-4 backdrop-blur">
                  <p className="text-sm font-bold">Color, técnica y acabado</p>
                  <p className="mt-1 text-xs text-white/65">
                    Todo empieza con una buena preparación.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="guias"
          className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-12 lg:py-20"
        >
          <div className="fade-up mb-12 text-center lg:text-left">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f0c040] shadow-sm sm:text-xs">
              <span className="size-2 rounded-full bg-[#f0c040]" />
              Guías y consejos
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-[#061540] sm:text-3xl lg:text-4xl">
              Todo lo que necesitas saber antes de pintar
            </h2>

            <p className="mt-5 text-sm font-light leading-relaxed text-slate-500 sm:text-base">
              Explora recomendaciones útiles para elegir mejor tus productos,
              preparar cada superficie y lograr acabados más duraderos.
            </p>
          </div>

          {isLoading && (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
              <p className="text-sm text-slate-500">Cargando artículos...</p>
            </div>
          )}

          {isError && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
              <p className="text-sm font-medium text-red-600">
                No se pudieron cargar los artículos.
              </p>
            </div>
          )}

          {!isLoading && !isError && articles.length === 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
              <p className="text-sm text-slate-500">
                Todavía no hay artículos publicados.
              </p>
            </div>
          )}

          {!isLoading && !isError && articles.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedItem(item)}
                  className="group flex min-h-56 cursor-pointer flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#f0c040] hover:shadow-xl"
                >
                  <div>
                    <span className="mb-4 inline-flex rounded-full bg-[#f0c040]/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#061540]">
                      Guía
                    </span>

                    <h3 className="text-xl font-extrabold leading-tight text-[#061540]">
                      {item.title}
                    </h3>

                    <p className="mt-4 text-sm font-light leading-6 text-slate-500">
                      Haz clic para abrir la información completa.
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
                    <span className="text-sm font-bold text-[#061540]">
                      Leer guía completa
                    </span>

                    <span className="grid size-10 place-items-center rounded-full bg-[#061540] text-lg font-black text-white transition group-hover:bg-[#f0c040] group-hover:text-[#061540]">
                      →
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </section>

        <AnimatePresence>
          {selectedItem && (
            <motion.div
              className="fixed inset-0 z-50 flex items-end justify-center bg-[#061540]/75 px-4 backdrop-blur-sm sm:items-center"
              onClick={() => setSelectedItem(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <motion.div
                className="relative max-h-[88vh] w-full max-w-4xl overflow-hidden rounded-t-[2rem] bg-white shadow-2xl sm:rounded-2xl"
                onClick={(e) => e.stopPropagation()}
                initial={{
                  opacity: 0,
                  y: 60,
                  scale: 0.96,
                  filter: "blur(8px)",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  y: 40,
                  scale: 0.96,
                  filter: "blur(8px)",
                }}
                transition={{
                  duration: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="sticky top-0 z-10 border-b border-slate-100 bg-white p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-5">
                    <motion.div
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.25, delay: 0.08 }}
                    >
                      <span className="mb-3 inline-flex rounded-full bg-[#f0c040]/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#061540]">
                        Guía
                      </span>

                      <h3 className="text-2xl font-extrabold leading-tight text-[#061540] sm:text-3xl">
                        {selectedItem.title}
                      </h3>
                    </motion.div>

                    <button
                      type="button"
                      onClick={() => setSelectedItem(null)}
                      className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-full bg-[#061540] text-xl font-black text-white transition hover:bg-[#f0c040] hover:text-[#061540]"
                    >
                      ×
                    </button>
                  </div>
                </div>

                <motion.div
                  className="max-h-[68vh] overflow-y-auto p-5 sm:p-8"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.3, delay: 0.12 }}
                >
                  <div className="prose prose-slate max-w-none prose-h1:text-3xl prose-h1:font-extrabold prose-h1:text-[#061540] prose-h2:mt-8 prose-h2:text-2xl prose-h2:font-extrabold prose-h2:text-[#061540] prose-h3:mt-8 prose-h3:text-xl prose-h3:font-extrabold prose-h3:text-[#061540] prose-p:leading-8 prose-p:text-slate-600 prose-strong:text-[#061540] prose-li:my-2 prose-li:text-slate-600">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {selectedItem.markdown}
                    </ReactMarkdown>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </>
  );
}