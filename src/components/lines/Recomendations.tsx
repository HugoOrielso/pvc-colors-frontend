"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { useProductRecommendations } from "@/hooks/public/lines/useRecomendations";

export default function PvcRecommendationsSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data, isLoading } = useProductRecommendations();

  const products = data?.products ?? [];

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -280 : 280,
      behavior: "smooth",
    });
  };

  if (isLoading) {
    return (
      <section className="relative overflow-hidden px-4 py-12 sm:px-6 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center justify-between">
            <div className="space-y-3">
              <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />
              <div className="h-7 w-64 animate-pulse rounded bg-slate-200" />
            </div>

            <div className="hidden gap-2 md:flex">
              <div className="h-10 w-10 animate-pulse rounded-full bg-slate-200" />
              <div className="h-10 w-10 animate-pulse rounded-full bg-slate-200" />
            </div>
          </div>

          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-80 min-w-55 animate-pulse rounded-2xl bg-slate-200 sm:min-w-62.5"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!products.length) return null;

  return (
    <section className="relative overflow-hidden px-4 py-12 sm:px-6 lg:px-12 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-7 flex items-end justify-between gap-4 sm:mb-8">
          <div>
            <p className="mb-2 text-sm font-black uppercase tracking-[0.18em] text-blue-700 sm:text-base lg:text-xl">
              PVC recomienda
            </p>

            <h2 className="max-w-3xl text-2xl font-extrabold tracking-tight text-[#f0c040] sm:text-3xl lg:text-4xl">
              Productos que podrían interesarte
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              Descubre productos destacados y recomendados según las compras más
              populares de nuestros clientes.
            </p>
          </div>

          <div className="hidden gap-2 md:flex">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white shadow-sm transition hover:bg-slate-50"
              aria-label="Ver productos anteriores"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              type="button"
              onClick={() => scroll("right")}
              className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white shadow-sm transition hover:bg-slate-50"
              aria-label="Ver productos siguientes"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="
            flex
            snap-x
            snap-mandatory
            gap-4
            overflow-x-auto
            scroll-smooth
            pb-4
            scrollbar-none
            sm:gap-5
            [&::-webkit-scrollbar]:hidden
          "
        >
          {products.map((product, index) => {
            const mainImage =
              product.images?.find((img) => img.isMain)?.url ||
              product.images?.[0]?.url ||
              product.image ||
              "/assets/logo.webp";

            const price = product.presentations?.[0]?.price;

            return (
              <motion.article
                key={product.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.35,
                  delay: index * 0.04,
                }}
                className="
                  group
                  min-w-55
                  max-w-55
                  snap-start
                  overflow-hidden
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  shadow-sm
                  transition
                  hover:-translate-y-1
                  hover:shadow-xl
                  sm:min-w-62.5
                  sm:max-w-62.5
                  sm:rounded-3xl
                  lg:min-w-66.25
                  lg:max-w-66.25
                "
              >
                <Link href={`/products/${product.id}`} className="block">
                  <div className="relative h-48 overflow-hidden bg-slate-100 sm:h-56 lg:h-60">
                    <Image
                      src={mainImage}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 220px, (max-width: 1024px) 250px, 265px"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-black/10 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                  </div>
                </Link>

                <div className="space-y-3 p-4 sm:p-5">
                  <div>
                    <p className="mb-2 line-clamp-1 text-[10px] font-semibold uppercase tracking-wide text-blue-700 sm:text-xs">
                      {product.productLine?.name}
                    </p>

                    <h3 className="line-clamp-2 min-h-12 text-base font-bold leading-tight text-slate-900 sm:min-h-14 sm:text-lg">
                      {product.name}
                    </h3>
                  </div>

                  {product.description && (
                    <p className="line-clamp-2 min-h-10 text-xs leading-5 text-slate-500 sm:min-h-11 sm:text-sm sm:leading-6">
                      {product.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between gap-3 pt-2">
                    {price ? (
                      <p className="text-sm font-extrabold text-slate-900 sm:text-base lg:text-lg">
                        {new Intl.NumberFormat("es-CO", {
                          style: "currency",
                          currency: "COP",
                          maximumFractionDigits: 0,
                        }).format(price)}
                      </p>
                    ) : (
                      <p className="text-xs text-slate-400 sm:text-sm">
                        Consultar precio
                      </p>
                    )}

                    <Link
                      href={`/products/${product.id}`}
                      className="
                        inline-flex
                        items-center
                        justify-center
                        rounded-full
                        bg-blue-700
                        px-4
                        py-2
                        text-xs
                        font-semibold
                        text-white
                        transition
                        hover:bg-blue-800
                        sm:px-5
                        sm:py-2.5
                      "
                    >
                      Ver
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}