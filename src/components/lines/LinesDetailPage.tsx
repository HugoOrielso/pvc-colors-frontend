"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Boxes,
  Layers3,
  PaintBucket,
  PackageCheck,
  Sparkles,
} from "lucide-react";
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { useParams } from "next/navigation";
import { useProductLineByIdPublic } from "@/hooks/public/lines/usePublicLines";
import { ViewTransition } from "react";
import PvcRecommendationsSlider from "./Recomendations";

export default function LineDetailPage() {
  const params = useParams();
  const id = String(params.id);

  const { data, isLoading } = useProductLineByIdPublic(id);

  const line = data?.data;
  const products = line?.products ?? [];

  return (
    <main className="grid min-h-screen grid-rows-[auto_1fr_auto]">
      <Header />

      <div>
        {isLoading ? (
          <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
            <div className="h-80 animate-pulse rounded-[2rem] bg-slate-100 sm:h-96 lg:h-130" />
          </section>
        ) : !line ? (
          <section className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 lg:px-8">
            <Boxes className="mx-auto mb-5 h-14 w-14 text-[#071d78]" />

            <h1 className="text-3xl font-black sm:text-4xl">
              Línea no encontrada
            </h1>

            <p className="mt-4 text-[#061540]/60">
              La línea que estás buscando no existe o ya no está disponible.
            </p>

            <Link
              href="/lines"
              transitionTypes={["nav-back"]}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#071d78] px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-[#061540]"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver
            </Link>
          </section>
        ) : (
          <>
            <section className="relative overflow-hidden bg-[#071d78]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,204,0,0.24),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(255,46,147,0.20),transparent_30%)]" />

              <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-24">
                <div className="order-2 lg:order-1">
                  <Link
                    transitionTypes={["nav-back"]}
                    href="/lines"
                    className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white backdrop-blur transition hover:bg-white hover:text-[#071d78] lg:mb-8"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Volver
                  </Link>

                  <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#ffcc00] backdrop-blur sm:text-xs">
                    <Sparkles className="h-4 w-4" />
                    Línea PVC Colors
                  </div>

                  <ViewTransition name={`line-title-${line.id}`}>
                    <h1 className="max-w-3xl text-4xl font-black leading-[0.95] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                      {line.name}
                    </h1>
                  </ViewTransition>

                  <p className="mt-5 max-w-2xl text-sm leading-7 text-white/75 sm:text-base md:text-lg md:leading-8">
                    {line.description}
                  </p>

                  <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:mt-10 lg:gap-4">
                    <div className="rounded-2xl bg-white/10 p-4 text-white backdrop-blur sm:rounded-3xl sm:p-5">
                      <PackageCheck className="mb-3 h-5 w-5 text-[#ffcc00] sm:h-6 sm:w-6" />
                      <p className="text-2xl font-black sm:text-3xl">
                        {products.length}
                      </p>
                      <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-white/55 sm:text-xs">
                        Productos
                      </p>
                    </div>

                    <div className="rounded-2xl bg-white/10 p-4 text-white backdrop-blur sm:rounded-3xl sm:p-5">
                      <PaintBucket className="mb-3 h-5 w-5 text-[#ffcc00] sm:h-6 sm:w-6" />
                      <p className="text-2xl font-black sm:text-3xl">
                        {products.reduce((total, product) => {
                          const colors =
                            product.colorGroups?.flatMap(
                              (group) => group.colors ?? []
                            ) ?? [];

                          return total + colors.length;
                        }, 0)}
                      </p>
                      <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-white/55 sm:text-xs">
                        Colores
                      </p>
                    </div>

                    <div className="rounded-2xl bg-white/10 p-4 text-white backdrop-blur sm:rounded-3xl sm:p-5">
                      <Layers3 className="mb-3 h-5 w-5 text-[#ffcc00] sm:h-6 sm:w-6" />
                      <p className="text-2xl font-black sm:text-3xl">
                        {products.reduce(
                          (total, product) =>
                            total + product.presentations.length,
                          0
                        )}
                      </p>
                      <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-white/55 sm:text-xs">
                        Presentaciones
                      </p>
                    </div>
                  </div>
                </div>

                <div className="order-1 lg:order-2">
                  <div className="relative overflow-hidden rounded-[2rem] bg-white/10 p-3 shadow-2xl backdrop-blur sm:rounded-[3rem] sm:p-4">
                    <ViewTransition name={`line-image-${line.id}`}>
                      <div className="relative h-64 overflow-hidden rounded-[1.5rem] sm:h-80 sm:rounded-[2rem] md:h-105 lg:h-130 lg:rounded-[2.4rem]">
                        <Image
                          src={line.image}
                          alt={line.name}
                          fill
                          priority
                          className="object-cover"
                          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 85vw, 50vw"
                        />

                        <div className="absolute inset-0 bg-linear-to-t from-[#061540]/70 via-transparent to-transparent" />
                      </div>
                    </ViewTransition>
                  </div>
                </div>
              </div>

              <div className="h-1.5 bg-linear-to-r from-[#ffcc00] via-[#ff8a00] to-[#ff2e93]" />
            </section>

            <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
              <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end lg:mb-12">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-[#071d78]">
                    Productos relacionados
                  </p>

                  <h2 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl md:text-4xl">
                    Explora esta línea
                  </h2>
                </div>
              </div>

              {products.length === 0 ? (
                <div className="rounded-[2rem] border border-dashed border-[#071d78]/20 bg-white p-8 text-center shadow-sm sm:p-12">
                  <Boxes className="mx-auto mb-4 text-[#071d78]" />

                  <h3 className="text-xl font-black sm:text-2xl">
                    Esta línea aún no tiene productos
                  </h3>

                  <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#061540]/60">
                    Cuando agregues productos a esta línea, aparecerán aquí
                    automáticamente.
                  </p>
                </div>
              ) : (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
                  {products.map((product) => {
                    const mainImage = product.images?.[0];

                    return (
                      <Link
                        key={product.id}
                        href={`/products/${product.id}`}
                        className="group overflow-hidden rounded-[1.6rem] bg-white p-2.5 shadow-sm ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:rounded-[2rem] sm:p-3 lg:hover:-translate-y-2 lg:hover:shadow-2xl"
                      >
                        <div className="relative h-56 overflow-hidden rounded-[1.2rem] bg-[#071d78]/5 sm:h-64 sm:rounded-[1.5rem] lg:h-68">
                          <Image
                            src={mainImage?.url || "/placeholder-product.png"}
                            alt={mainImage?.alt || product.name}
                            fill
                            className="object-cover transition duration-700 group-hover:scale-105 lg:group-hover:scale-110"
                            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 25vw"
                          />

                          <div className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-transparent" />

                          <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-white/95 px-3 py-2 text-[10px] font-black uppercase text-[#071d78] shadow-lg backdrop-blur sm:left-5 sm:top-5 sm:text-xs">
                            <span className="h-2 w-2 rounded-full bg-[#ffcc00]" />
                            {product.presentations.length} presentaciones
                          </div>

                          <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
                            <h3 className="text-base font-black leading-tight text-white sm:text-lg">
                              {product.name}
                            </h3>
                          </div>
                        </div>

                        <div className="p-4 sm:p-5">
                          <p className="line-clamp-3 min-h-20 text-sm leading-7 text-[#061540]/60">
                            {product.description}
                          </p>

                          <div className="mt-5 flex items-center justify-between border-t border-[#061540]/10 pt-5">
                            <span className="rounded-full bg-[#ffcc00]/25 px-3 py-2 text-xs font-black text-[#061540]">
                              Ver producto
                            </span>

                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ffcc00] text-[#061540] transition group-hover:bg-[#071d78] group-hover:text-white sm:h-11 sm:w-11">
                              <ArrowRight className="h-5 w-5" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </section>
          </>
        )}
      </div>

      <PvcRecommendationsSlider />
      <Footer />
    </main>
  );
}