"use client";

import Image from "next/image";
import Link from "next/link";
import { ViewTransition, useMemo, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Download,
  FileText,
  Minus,
  Plus,
  ShoppingCart,
  Sparkles,
} from "lucide-react";

import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { useProductByIdPublic } from "@/hooks/public/products/usePublicProducts";

interface ProductDetailPageProps {
  id: string;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(price);
};

export default function ProductDetailPage({ id }: ProductDetailPageProps) {
  const { data: product, isLoading } = useProductByIdPublic(id);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedColorId, setSelectedColorId] = useState<string | null>(null);
  const [selectedPresentationName, setSelectedPresentationName] =
    useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const selectedColor = useMemo(() => {
    if (!product?.colors?.length) return null;

    return (
      product.colors.find((color) => color.id === selectedColorId) ||
      product.colors[0]
    );
  }, [product, selectedColorId]);

  const selectedPresentation = useMemo(() => {
    if (!product?.presentations?.length) return null;

    return (
      product.presentations.find(
        (presentation) => presentation.name === selectedPresentationName
      ) || product.presentations[0]
    );
  }, [product, selectedPresentationName]);

  const totalPrice = selectedPresentation
    ? selectedPresentation.price * quantity
    : 0;

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const increaseQuantity = () => {
    if (!selectedPresentation) return;

    setQuantity((current) =>
      Math.min(selectedPresentation.stock || current + 1, current + 1)
    );
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#f6f7fb]">
        <Header />
        <section className="mx-auto max-w-7xl px-5 py-12">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="h-140 animate-pulse rounded-3xl bg-white" />
            <div className="h-140 animate-pulse rounded-3xl bg-white" />
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-[#f6f7fb]">
        <Header />
        <section className="mx-auto max-w-4xl px-5 py-24 text-center">
          <h1 className="text-3xl font-black text-[#061540]">
            Producto no encontrado
          </h1>

          <Link
            href="/lines"
            className="mt-6 inline-flex rounded-full bg-[#061540] px-6 py-3 text-sm font-black text-white"
          >
            Volver a líneas
          </Link>
        </section>
        <Footer />
      </main>
    );
  }

  const gallery = product.images ?? [];

  const mainImage =
    selectedImage ||
    product.images?.find((image) => image.isMain)?.url ||
    product.images?.[0]?.url ||
    "/placeholder-product.png";

  const activeColorValue = selectedColor?.value || "#102a73";

  const lineName = product.productLine?.name || "Línea PVC Colors";

  const lineHref = product.productLine?.id
    ? `/lines/${product.productLine.id}`
    : "/lines";

  return (
    <main className="min-h-screen grid grid-rows-[auto_1fr_auto] bg-[#f4f5f9] ">
      <Header />
      <div>


        <section className="border-b border-[#061540]/8 bg-white/80 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-5 py-4">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#061540]/35">
              <Link href="/" className="transition hover:text-[#061540]/70">
                Home
              </Link>
              <span className="text-[#061540]/20">›</span>
              <Link href="/lines" className="transition hover:text-[#061540]/70">
                Líneas
              </Link>
              <span className="text-[#061540]/20">›</span>
              <Link
                href={lineHref}
                className="transition hover:text-[#061540]/70"
              >
                {lineName}
              </Link>
              <span className="text-[#061540]/20">›</span>
              <span className="text-[#061540]/55">{product.name}</span>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-4">
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <Link
              href={lineHref}
              className="inline-flex items-center gap-1.5 rounded border border-[#061540]/12 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wide text-[#061540] shadow-sm transition hover:bg-[#061540] hover:text-white"
            >
              <ArrowLeft size={12} />
              Volver
            </Link>

            <span className="rounded bg-[#eeff00] px-4 py-2 text-xs font-black uppercase tracking-wide text-[#061540]">
              {lineName}
            </span>

          </div>

          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] xl:grid-cols-[1.1fr_0.9fr]">
            <div className="flex flex-col gap-4">
              <ViewTransition name={`product-image-${product.id}`}>
                <div
                  className="relative overflow-hidden rounded-3xl border border-white/60 bg-white shadow-xl shadow-[#061540]/5"
                  style={{ minHeight: "480px" }}
                >
                  <div
                    className="absolute inset-x-0 top-0 h-4 rounded-t-3xl"
                    style={{ backgroundColor: activeColorValue }}
                  />

                  <div className="relative flex h-full min-h-120 items-center justify-center p-10 lg:p-14">
                    <Image
                      src={mainImage}
                      alt={product.name}
                      fill
                      priority
                      className="object-contain p-10 drop-shadow-2xl"
                      sizes="(max-width: 1024px) 100vw, 600px"
                    />
                  </div>

                  {gallery.length > 1 && (
                    <div className="absolute inset-x-5 bottom-5 flex items-center gap-2">
                      {gallery.map((image) => (
                        <button
                          key={image.id}
                          type="button"
                          onClick={() => setSelectedImage(image.url)}
                          className={`relative h-14 w-14 overflow-hidden rounded-xl border-2 bg-white transition hover:scale-105 ${mainImage === image.url
                            ? "border-[#061540] shadow-md"
                            : "border-[#061540]/10 hover:border-[#061540]/30"
                            }`}
                        >
                          <Image
                            src={image.url}
                            alt={image.alt || product.name}
                            fill
                            className="object-cover"
                            sizes="56px"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </ViewTransition>

              {selectedPresentation && (
                <div className="lg:flex flex-col hidden">
                  <p className="text-2xl font-black text-[#061540]">
                    {formatPrice(totalPrice)}
                  </p>

                  <p className="mt-1 text-xs font-bold uppercase tracking-wide text-[#061540]/45">
                    {formatPrice(selectedPresentation.price)} por unidad ·
                    Stock: {selectedPresentation.stock}
                  </p>

                  <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="inline-flex h-12 w-fit overflow-hidden rounded border border-[#061540] bg-white">
                      <button
                        type="button"
                        onClick={decreaseQuantity}
                        className="flex w-12 items-center justify-center text-[#061540]/40 transition hover:bg-[#061540]/5 hover:text-[#061540]"
                      >
                        <Minus size={16} />
                      </button>

                      <div className="flex w-14 items-center justify-center border-x border-[#061540] text-base font-black text-[#061540]">
                        {quantity}
                      </div>

                      <button
                        type="button"
                        onClick={increaseQuantity}
                        className="flex w-12 items-center justify-center text-[#061540] transition hover:bg-[#061540]/5"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <button
                      type="button"
                      className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded bg-[#35c791] px-7 text-base font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg cursor-pointer"
                    >
                      <ShoppingCart size={19} />
                      Comprar
                    </button>
                  </div>

                  <div className="mt-6 flex items-center gap-4 text-xs font-medium text-[#061540]/45">
                    {selectedPresentation.sku && (
                      <span>SKU: {selectedPresentation.sku}</span>
                    )}

                    {product.technicalSheetUrl && (
                      <a
                        href={product.technicalSheetUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-[#061540] transition hover:opacity-70"
                      >
                        <Download size={17} />
                        Ficha técnica
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

            <aside className="flex flex-col justify-start pt-2">
              <h1 className="text-4xl font-black leading-tight tracking-tight  md:text-5xl">
                {product.name}
              </h1>

              <p className="mt-5 max-w-lg text-[15px] leading-7 ">
                {product.description}
              </p>

              <div className="my-7 h-px bg-[#061540]/8" />

              {product.colors.length > 0 && (
                <div>
                  <div className="mb-4 flex items-start lg:items-center flex-col lg:flex-row justify-between gap-4">
                    <h3 className="text-lg font-black tracking-tight ">
                      Elige un color:
                    </h3>

                    <span className="text-sm font-bold text-[#061540]/70">
                      {product.colors.length} opciones disponibles
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {product.colors.map((color) => {
                      const isSelected = selectedColor?.id === color.id;

                      return (
                        <button
                          key={color.id || color.value}
                          type="button"
                          onClick={() => setSelectedColorId(color.id || null)}
                          className={`group relative h-20 w-20 overflow-hidden rounded-2xl border-2 transition-all duration-200 hover:-translate-y-1 ${isSelected
                            ? "border-[#061540] shadow-xl"
                            : "border-[#dbe2ef] hover:border-[#061540]/30"
                            }`}
                          style={{ backgroundColor: color.value }}
                        >
                          {isSelected && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/15">
                              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-lg">
                                <CheckCircle2
                                  size={19}
                                  className="text-[#061540]"
                                />
                              </div>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-4 rounded-xl border border-[#061540]/10 bg-white px-5 py-3">
                    <p className="text-sm text-[#061540]/65">
                      <strong className="text-[#061540]">
                        {selectedColor?.name || "Color seleccionado"}
                      </strong>{" "}
                      - Código: {selectedColor?.value}
                    </p>
                  </div>

                  <p className="mt-3 text-xs leading-5 text-[#061540]/45">
                    *Los colores mostrados son referenciales y pueden variar según
                    tu pantalla.
                  </p>
                </div>
              )}

              {product.presentations.length > 0 && (
                <div className="my-8">
                  <h3 className="mb-4 text-lg font-black ">
                    Elige un tamaño:
                  </h3>

                  <div className="flex flex-wrap gap-3">
                    {product.presentations.map((presentation) => {
                      const isSelected =
                        selectedPresentation?.name === presentation.name;

                      return (
                        <button
                          key={presentation.name}
                          type="button"
                          onClick={() => {
                            setSelectedPresentationName(presentation.name);
                            setQuantity(1);
                          }}
                          className={` cursor-pointer rounded border p-3 text-center text-base font-black transition hover:-translate-y-0.5 ${isSelected
                            ? "border-[#061540] bg-[#061540] text-white shadow-md"
                            : "border-[#061540] bg-white text-[#061540] hover:bg-[#061540]/5"
                            }`}
                        >
                          {presentation.name}
                        </button>
                      );
                    })}
                  </div>

                  {selectedPresentation && (
                    <div className="flex flex-col lg:hidden">
                      <p className="text-2xl font-black text-[#061540]">
                        {formatPrice(totalPrice)}
                      </p>

                      <p className="mt-1 text-xs font-bold uppercase tracking-wide text-[#061540]/45">
                        {formatPrice(selectedPresentation.price)} por unidad ·
                        Stock: {selectedPresentation.stock}
                      </p>

                      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center">
                        <div className="inline-flex h-12 w-fit overflow-hidden rounded border border-[#061540] bg-white">
                          <button
                            type="button"
                            onClick={decreaseQuantity}
                            className="flex w-12 items-center justify-center text-[#061540]/40 transition hover:bg-[#061540]/5 hover:text-[#061540]"
                          >
                            <Minus size={16} />
                          </button>

                          <div className="flex w-14 items-center justify-center border-x border-[#061540] text-base font-black text-[#061540]">
                            {quantity}
                          </div>

                          <button
                            type="button"
                            onClick={increaseQuantity}
                            className="flex w-12 items-center justify-center text-[#061540] transition hover:bg-[#061540]/5"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        <button
                          type="button"
                          className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded bg-[#35c791] p-3 text-base font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg cursor-pointer "
                        >
                          <ShoppingCart size={19} />
                          Comprar
                        </button>
                      </div>

                      <div className="mt-6 flex items-center gap-4 text-xs font-medium text-[#061540]/45">
                        {selectedPresentation.sku && (
                          <span>SKU: {selectedPresentation.sku}</span>
                        )}

                        {product.technicalSheetUrl && (
                          <a
                            href={product.technicalSheetUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 text-[#061540] transition hover:opacity-70"
                          >
                            <Download size={17} />
                            Ficha técnica
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </aside>
          </div>
        </section>

        {product.recommendations && (
          <section className="mx-auto max-w-7xl px-5 pb-16">
            <div className="overflow-hidden rounded-3xl border border-[#061540]/8 bg-white shadow-sm">
              <div className="grid gap-0 lg:grid-cols-[320px_1fr]">
                <div className="border-b border-[#061540]/8 bg-[#f8f9fc] p-8 lg:border-b-0 lg:border-r">
                  <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#eeff00] px-4 py-1.5 text-xs font-black uppercase tracking-wide text-[#061540]">
                    <Sparkles size={12} />
                    Uso recomendado
                  </span>

                  <h2 className="text-2xl font-black leading-tight ">
                    Antes de aplicar
                  </h2>
                </div>

                <div className="flex items-start gap-4 p-8">
                  <FileText
                    className="mt-0.5 shrink-0"
                    size={22}
                  />

                  <p className="text-[15px] leading-7">
                    {product.recommendations}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
      <Footer />
    </main>
  );
}