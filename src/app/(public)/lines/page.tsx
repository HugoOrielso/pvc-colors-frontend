"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Boxes, Sparkles } from "lucide-react";
import { ViewTransition } from "react";

import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { useProductLinesPublic } from "@/hooks/public/lines/usePublicLines";
import EmptyLinesAnimation from "@/components/lines/LottieLineAnimation";


export default function LinesPage() {
  const { data, isLoading } = useProductLinesPublic();
  const lines = Array.isArray(data?.data) ? data.data : [];

  return (
    <>
      <Header />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

        .pvc-page,
        .pvc-page * {
          font-family: 'Poppins', sans-serif !important;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(22px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fade-up {
          animation: fadeUp 0.65s ease both;
        }

        .delay-1 {
          animation-delay: 0.12s;
        }

        .delay-2 {
          animation-delay: 0.24s;
        }

        .delay-3 {
          animation-delay: 0.36s;
        }

        .delay-4 {
          animation-delay: 0.48s;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .marquee-track {
          animation: marquee 24s linear infinite;
        }
      `}</style>

      <main className="pvc-page overflow-hidden bg-white text-[#061540]">
        <section className="relative overflow-hidden bg-[#061540] px-4 py-16 text-white sm:px-6 lg:px-12 lg:py-20">
          <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-700/20 blur-3xl" />
          <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 right-20 h-72 w-72 rounded-full bg-[#f0c040]/10 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
            <div className="text-center lg:text-left">
              <div className="fade-up mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f0c040] sm:text-xs">
                <span className="size-1.5 rounded-full bg-[#f0c040]" />
                Líneas PVC Colors
              </div>

              <h1 className="fade-up delay-1 mx-auto max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:mx-0 lg:text-6xl">
                Encuentra la línea ideal{" "}
                <span className="text-[#f0c040]">para cada proyecto</span>
              </h1>

              <p className="fade-up delay-2 mx-auto mt-6 max-w-xl text-sm font-light leading-relaxed text-white/70 sm:text-base lg:mx-0">
                Explora nuestras líneas de productos, colores, presentaciones y
                soluciones especializadas para diferentes superficies y
                necesidades.
              </p>

              <div className="fade-up delay-3 mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <a
                  href="#lineas"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f0c040] px-6 py-3 text-sm font-semibold text-[#061540] transition hover:bg-yellow-300"
                >
                  Ver líneas
                  <ArrowRight size={16} />
                </a>

                <Link
                  href="/calculator"
                  className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
                >
                  Calculadora
                </Link>
              </div>

              <div className="fade-up delay-4 mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-8 sm:max-w-md lg:max-w-lg">
                <div>
                  <p className="text-2xl font-extrabold text-[#f0c040]">
                    {lines.length || 0}+
                  </p>
                  <p className="mt-1 text-[10px] font-medium uppercase tracking-widest text-white/50">
                    Líneas
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-extrabold text-[#f0c040]">
                    PVC
                  </p>
                  <p className="mt-1 text-[10px] font-medium uppercase tracking-widest text-white/50">
                    Colors
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-extrabold text-[#f0c040]">
                    500+
                  </p>
                  <p className="mt-1 text-[10px] font-medium uppercase tracking-widest text-white/50">
                    Colores
                  </p>
                </div>
              </div>
            </div>

            <div className="fade-up delay-2 relative mx-auto hidden w-full max-w-xl lg:block lg:max-w-none">
              <div className="absolute -inset-3 rounded-3xl bg-white/5 blur-xl" />

              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur">
                <div className="absolute -right-5 -top-5 rounded-2xl bg-white px-5 py-4 shadow-xl">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#061540]/50">
                    Productos
                  </p>
                  <p className="text-3xl font-extrabold text-[#061540]">
                    {lines.length || 0}+
                  </p>
                </div>

                <div className="flex h-[420px] w-full items-center justify-center rounded-xl bg-white/5">
                  <EmptyLinesAnimation />
                </div>
              </div>
            </div>
          </div>
        </section>


        <section
          id="lineas"
          className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-12 lg:py-20"
        >
          <div className="pointer-events-none absolute left-0 top-10 h-72 w-72 rounded-full bg-[#f0c040]/20 blur-3xl" />
          <div className="pointer-events-none absolute bottom-20 right-0 h-96 w-96 rounded-full bg-[#061540]/10 blur-3xl" />

          <div className="relative mx-auto max-w-7xl">
            <div className="fade-up mb-12 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f0c040] shadow-sm sm:text-xs">
                  <span className="size-2 rounded-full bg-[#f0c040]" />
                  Nuestras líneas
                </div>

                <h2 className="max-w-2xl text-3xl font-extrabold tracking-tight text-[#061540] sm:text-4xl lg:text-5xl">
                  Productos para cada superficie
                </h2>

                <p className="mt-5 max-w-xl text-sm font-light leading-relaxed text-slate-500 sm:text-base">
                  Selecciona una línea para ver sus productos, colores
                  disponibles, presentaciones y fichas técnicas.
                </p>
              </div>

              <div className="overflow-hidden rounded-2xl bg-[#061540] p-6 text-white shadow-xl">
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/55">
                  Líneas disponibles
                </p>

                <div className="mt-2 flex items-end gap-2">
                  <p className="text-5xl font-extrabold text-[#f0c040]">
                    {lines.length}
                  </p>
                  <p className="pb-2 text-sm font-semibold text-white/70">
                    categorías
                  </p>
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-[390px] animate-pulse rounded-2xl bg-slate-100 shadow-sm"
                  />
                ))}
              </div>
            ) : lines.length === 0 ? (
              <div className="relative overflow-hidden rounded-2xl border border-dashed border-[#061540]/20 bg-white p-12 text-center shadow-sm">
                <div className="absolute inset-x-0 top-0 h-1 bg-[#f0c040]" />

                <Boxes className="mx-auto mb-4 h-12 w-12 text-[#061540]" />

                <h3 className="text-2xl font-extrabold text-[#061540]">
                  Aún no hay líneas creadas
                </h3>

                <p className="mx-auto mt-3 max-w-md text-sm font-light leading-7 text-slate-500">
                  Cuando agregues líneas de producto, aparecerán aquí de forma
                  automática.
                </p>
              </div>
            ) : (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {lines.map((line, index) => (
                  <Link
                    key={line.id}
                    href={`/lines/${line.id}`}
                    transitionTypes={["nav-forward"]}
                    className="group relative rounded-2xl bg-white p-3 shadow-sm ring-1 ring-black/5 transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
                  >
                    <div className="absolute -inset-px rounded-2xl bg-[#f0c040]/0 opacity-0 transition group-hover:bg-[#f0c040]/20 group-hover:opacity-100" />

                    <div className="relative overflow-hidden rounded-[1.5rem] bg-[#061540]/5">
                      <div className="relative h-72 overflow-hidden">
                        <ViewTransition name={`line-image-${line.id}`}>
                          <div className="relative h-72 overflow-hidden">
                            <Image
                              src={line.image}
                              alt={line.name}
                              fill
                              priority={index < 3}
                              className="object-cover transition duration-700 group-hover:scale-110"
                              sizes="(max-width: 768px) 100vw, 33vw"
                            />
                          </div>
                        </ViewTransition>

                        <div className="absolute inset-0 bg-gradient-to-t from-[#061540]/90 via-[#061540]/25 to-transparent" />

                        <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-bold uppercase text-[#061540] shadow-lg backdrop-blur">
                          <span className="size-2 rounded-full bg-[#f0c040]" />
                          {line._count?.products ?? 0} productos
                        </div>

                        <div className="absolute right-5 top-5 flex size-11 items-center justify-center rounded-full bg-[#061540]/90 text-sm font-bold text-white shadow-lg">
                          {String(index + 1).padStart(2, "0")}
                        </div>

                        <div className="absolute bottom-5 left-5 right-5">
                          <ViewTransition name={`line-title-${line.id}`}>
                            <h3 className="text-3xl font-extrabold leading-none text-white">
                              {line.name}
                            </h3>
                          </ViewTransition>
                        </div>
                      </div>

                      <div className="bg-white p-6">
                        <p className="min-h-14 text-sm font-light leading-7 text-slate-500">
                          {line.description}
                        </p>

                        <div className="mt-6 flex items-center justify-between border-t border-[#061540]/10 pt-5">
                          <span className="text-sm font-bold text-[#061540]">
                            Ver colores y presentaciones
                          </span>

                          <span className="flex size-11 items-center justify-center rounded-full bg-[#f0c040] text-[#061540] shadow-md transition group-hover:translate-x-1 group-hover:bg-[#061540] group-hover:text-white">
                            <ArrowRight className="h-5 w-5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}