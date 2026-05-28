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
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  if (isLoading) {
    return (
      <section className="relative overflow-hidden p-4 sm:px-6 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center justify-between">
            <div className="space-y-3">
              <div className="h-4 w-36 animate-pulse rounded bg-slate-200" />
              <div className="h-8 w-72 animate-pulse rounded bg-slate-200" />
            </div>

            <div className="hidden gap-2 md:flex">
              <div className="h-10 w-10 animate-pulse rounded-full bg-slate-200" />
              <div className="h-10 w-10 animate-pulse rounded-full bg-slate-200" />
            </div>
          </div>

          <div className="flex gap-5 overflow-hidden">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-92.5 min-w-65 animate-pulse rounded-2xl bg-slate-200"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!products.length) return null;

  return (
    <section className="relative overflow-hidden p-4 sm:px-6 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="mb-2 text-xl font-semibold uppercase tracking-[0.18em] text-blue-700">
              PVC recomienda
            </p>

            <h2 className="text-3xl font-extrabold tracking-tight text-[#f0c040]">
              Productos que podrían interesarte
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7">
              Descubre productos destacados y recomendados según las compras
              más populares de nuestros clientes.
            </p>
          </div>

          <div className="hidden gap-2 md:flex">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white shadow-sm transition hover:bg-slate-50"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              type="button"
              onClick={() => scroll("right")}
              className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white shadow-sm transition hover:bg-slate-50"
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
            gap-5
            overflow-x-auto
            scroll-smooth
            pb-4
            scrollbar-none
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
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.35,
                  delay: index * 0.04,
                }}
                className="
                  group
                  min-w-65
                  max-w-65
                  snap-start
                  overflow-hidden
                  rounded-3xl
                  border
                  border-slate-200
                  bg-white
                  shadow-sm
                  transition
                  hover:-translate-y-1
                  hover:shadow-xl
                "
              >
                <Link href={`/products/${product.slug}`} className="block">
                  <div className="relative aspect-square overflow-hidden bg-slate-100">
                    <Image
                      src={mainImage}
                      alt={product.name}
                      fill
                      sizes="260px"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-black/10 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                  </div>
                </Link>

                <div className="space-y-4 p-5">
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-blue-700">
                      {product.productLine?.name}
                    </p>

                    <h3 className="line-clamp-2 min-h-14 text-lg font-bold leading-tight text-slate-900">
                      {product.name}
                    </h3>
                  </div>

                  {product.description && (
                    <p className="line-clamp-2 min-h-11 text-sm leading-6 text-slate-500">
                      {product.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between gap-3 pt-2">
                    {price ? (
                      <p className="text-lg font-extrabold text-slate-900">
                        {new Intl.NumberFormat("es-CO", {
                          style: "currency",
                          currency: "COP",
                          maximumFractionDigits: 0,
                        }).format(price)}
                      </p>
                    ) : (
                      <p className="text-sm text-slate-400">
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
                        px-5
                        py-2.5
                        text-xs
                        font-semibold
                        text-white
                        transition
                        hover:bg-blue-800
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