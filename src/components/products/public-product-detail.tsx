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
  Package,
  Tag,
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
    const productColors = product?.colors ?? [];
    if (!productColors.length) return null;
    return (
      productColors.find((color) => color.id === selectedColorId) ||
      productColors[0]
    );
  }, [product, selectedColorId]);

  const selectedPresentation = useMemo(() => {
    const productPresentations = product?.presentations ?? [];
    if (!productPresentations.length) return null;
    return (
      productPresentations.find(
        (presentation) => presentation.name === selectedPresentationName
      ) || productPresentations[0]
    );
  }, [product, selectedPresentationName]);

  const totalPrice = selectedPresentation
    ? selectedPresentation.price * quantity
    : 0;

  const decreaseQuantity = () => setQuantity((c) => Math.max(1, c - 1));
  const increaseQuantity = () => {
    if (!selectedPresentation) return;
    setQuantity((c) =>
      Math.min(selectedPresentation.stock || c + 1, c + 1)
    );
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#f4f5f9]">
        <Header />
        <section className="mx-auto max-w-7xl px-5 py-12">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="h-150 animate-pulse rounded-3xl bg-white" />
            <div className="h-150 animate-pulse rounded-3xl bg-white" />
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-[#f4f5f9]">
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
  const colors = product.colors ?? [];
  const presentations = product.presentations ?? [];
  const mainImage =
    selectedImage ||
    product.images?.find((img) => img.isMain)?.url ||
    product.images?.[0]?.url ||
    "/placeholder-product.png";

  const activeColorValue = selectedColor?.value || "#102a73";
  const lineName = product.productLine?.name || "Línea PVC Colors";
  const lineHref = product.productLine?.id
    ? `/lines/${product.productLine.id}`
    : "/lines";

  return (
    <main className="min-h-screen grid grid-rows-[auto_1fr_auto] bg-[#f4f5f9]">
      <Header />

      <div>
        {/* Breadcrumb */}
        <section className="border-b border-[#061540]/8 bg-white/80 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-5 py-4">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#061540]/35">
              <Link href="/" className="transition hover:text-[#061540]/70">Home</Link>
              <span className="text-[#061540]/20">›</span>
              <Link href="/lines" className="transition hover:text-[#061540]/70">Líneas</Link>
              <span className="text-[#061540]/20">›</span>
              <Link href={lineHref} className="transition hover:text-[#061540]/70">{lineName}</Link>
              <span className="text-[#061540]/20">›</span>
              <span className="text-[#061540]/55">{product.name}</span>
            </div>
          </div>
        </section>

        {/* Main Product Section */}
        <section className="mx-auto max-w-7xl px-5 py-8">

          {/* Back + badge row */}
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <Link
              href={lineHref}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#061540]/12 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wide text-[#061540] shadow-sm transition hover:bg-[#061540] hover:text-white"
            >
              <ArrowLeft size={12} />
              Volver
            </Link>
            <span className="rounded-lg bg-[#eeff00] px-4 py-2 text-xs font-black uppercase tracking-wide text-[#061540]">
              {lineName}
            </span>
          </div>

          {/* Two-column layout */}
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] xl:grid-cols-[1.15fr_0.85fr]">

            {/* ── LEFT COLUMN: sticky image stack ── */}
            <div className="flex flex-col gap-4 lg:sticky lg:top-6 lg:self-start">

              {/* Main image card */}
              <ViewTransition name={`product-image-${product.id}`}>
                <div
                  className="relative overflow-hidden rounded-3xl bg-white shadow-xl shadow-[#061540]/8"
                  style={{ minHeight: 460 }}
                >
                  {/* Color accent strip */}
                  <div
                    className="absolute inset-x-0 top-0 h-1.5 rounded-t-3xl transition-colors duration-500"
                    style={{ backgroundColor: activeColorValue }}
                  />

                  <div className="relative flex min-h-105 items-center justify-center p-10 lg:p-16">
                    <Image
                      src={mainImage}
                      alt={"Imagen de " + product.name}
                      fill
                      priority
                      className="object-contain p-10 drop-shadow-2xl"
                      sizes="(max-width: 1024px) 100vw, 600px"
                    />
                  </div>
                </div>
              </ViewTransition>

              {/* Thumbnails */}
              {gallery.length > 1 && (
                <div className="flex gap-3">
                  {gallery.map((image) => (
                    <button
                      key={image.id}
                      type="button"
                      onClick={() => setSelectedImage(image.url)}
                      className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 bg-white transition hover:scale-105 ${
                        mainImage === image.url
                          ? "border-[#061540] shadow-md"
                          : "border-[#061540]/10 hover:border-[#061540]/30"
                      }`}
                    >
                      <Image
                        src={image.url}
                        alt={image.alt || product.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Purchase card — shows on desktop below image */}
              {selectedPresentation && (
                <div className="hidden lg:block rounded-2xl border border-[#061540]/8 bg-white p-6 shadow-sm">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-3xl font-black text-[#061540]">
                        {formatPrice(totalPrice)}
                      </p>
                      <p className="mt-1 text-xs font-bold uppercase tracking-wide text-[#061540]/45">
                        {formatPrice(selectedPresentation.price)} por unidad · Stock: {selectedPresentation.stock}
                      </p>
                    </div>
                    {selectedPresentation.sku && (
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#f4f5f9] px-3 py-1.5 text-xs font-bold text-[#061540]/60">
                        <Tag size={11} />
                        {selectedPresentation.sku}
                      </span>
                    )}
                  </div>

                  <div className="mt-5 flex items-center gap-3">
                    {/* Quantity picker */}
                    <div className="inline-flex h-12 overflow-hidden rounded-xl border border-[#061540]/15 bg-[#f4f5f9]">
                      <button
                        type="button"
                        onClick={decreaseQuantity}
                        className="flex w-12 items-center justify-center text-[#061540]/40 transition hover:bg-[#061540]/8 hover:text-[#061540]"
                      >
                        <Minus size={15} />
                      </button>
                      <div className="flex w-12 items-center justify-center border-x border-[#061540]/10 text-base font-black text-[#061540]">
                        {quantity}
                      </div>
                      <button
                        type="button"
                        onClick={increaseQuantity}
                        className="flex w-12 items-center justify-center text-[#061540] transition hover:bg-[#061540]/8"
                      >
                        <Plus size={15} />
                      </button>
                    </div>

                    {/* Buy button */}
                    <button
                      type="button"
                      className="inline-flex h-12 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#35c791] text-base font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
                    >
                      <ShoppingCart size={18} />
                      Comprar
                    </button>
                  </div>

                  {product.technicalSheetUrl && (
                    <a
                      href={product.technicalSheetUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#061540]/50 transition hover:text-[#061540]"
                    >
                      <Download size={14} />
                      Descargar ficha técnica
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* ── RIGHT COLUMN: info + options ── */}
            <aside className="flex flex-col gap-0">

              {/* Product name & description */}
              <div className="rounded-2xl border border-[#061540]/8 bg-white p-7 shadow-sm">
                <h1 className="text-4xl font-black leading-tight tracking-tight text-[#061540] md:text-5xl">
                  {product.name}
                </h1>
                {product.description && (
                  <p className="mt-4 text-[15px] leading-7 text-[#061540]/70">
                    {product.description}
                  </p>
                )}
              </div>

              {/* Color picker */}
              {colors.length > 0 && (
                <div className="mt-4 rounded-2xl border border-[#061540]/8 bg-white p-7 shadow-sm">
                  <div className="mb-5 flex items-center justify-between">
                    <h3 className="font-black tracking-tight text-[#061540]">
                      Elige un color
                    </h3>
                    <span className="text-xs font-bold text-[#061540]/45">
                      {colors.length} {colors.length === 1 ? "opción" : "opciones"}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {colors.map((color) => {
                      const isSelected = selectedColor?.id === color.id;
                      return (
                        <button
                          key={color.id || color.value}
                          type="button"
                          onClick={() => setSelectedColorId(color.id || null)}
                          className={`relative h-12 w-12 rounded-2xl border-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                            isSelected
                              ? "border-[#061540] shadow-lg scale-110"
                              : "border-transparent hover:border-[#061540]/20"
                          }`}
                          style={{ backgroundColor: color.value }}
                        >
                          {isSelected && (
                            <span className="absolute inset-0 flex items-center justify-center">
                              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white shadow">
                                <CheckCircle2 size={13} className="text-[#061540]" />
                              </span>
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {selectedColor && (
                    <div className="mt-4 flex items-center gap-2.5 rounded-xl bg-[#f4f5f9] px-4 py-3">
                      <div
                        className="h-4 w-4 shrink-0 rounded-full border border-black/10"
                        style={{ backgroundColor: selectedColor.value }}
                      />
                      <p className="text-sm text-[#061540]/70">
                        <strong className="font-black text-[#061540]">{selectedColor.name}</strong>
                        <span className="ml-1.5 font-mono text-xs text-[#061540]/40">{selectedColor.value}</span>
                      </p>
                    </div>
                  )}

                  <p className="mt-3 text-xs text-[#061540]/35">
                    *Los colores mostrados son referenciales y pueden variar según tu pantalla.
                  </p>
                </div>
              )}

              {/* Presentation / size picker */}
              {presentations.length > 0 && (
                <div className="mt-4 rounded-2xl border border-[#061540]/8 bg-white p-7 shadow-sm">
                  <h3 className="mb-5 font-black tracking-tight text-[#061540]">
                    Elige un tamaño
                  </h3>

                  <div className="flex flex-wrap gap-2.5">
                    {presentations.map((presentation) => {
                      const isSelected = selectedPresentation?.name === presentation.name;
                      return (
                        <button
                          key={presentation.name}
                          type="button"
                          onClick={() => {
                            setSelectedPresentationName(presentation.name);
                            setQuantity(1);
                          }}
                          className={`cursor-pointer rounded-xl border-2 px-5 py-2.5 text-sm font-black transition-all hover:-translate-y-0.5 ${
                            isSelected
                              ? "border-[#061540] bg-[#061540] text-white shadow-md"
                              : "border-[#061540]/15 bg-[#f4f5f9] text-[#061540] hover:border-[#061540]/40 hover:bg-white"
                          }`}
                        >
                          {presentation.name}
                        </button>
                      );
                    })}
                  </div>

                  {/* Stock indicator */}
                  {selectedPresentation && (
                    <div className="mt-4 flex items-center gap-2 text-xs font-bold text-[#061540]/45">
                      <Package size={13} />
                      <span>{selectedPresentation.stock} unidades disponibles</span>
                    </div>
                  )}
                </div>
              )}

              {/* Mobile purchase card */}
              {selectedPresentation && (
                <div className="mt-4 rounded-2xl border border-[#061540]/8 bg-white p-6 shadow-sm lg:hidden">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-3xl font-black text-[#061540]">
                        {formatPrice(totalPrice)}
                      </p>
                      <p className="mt-1 text-xs font-bold uppercase tracking-wide text-[#061540]/45">
                        {formatPrice(selectedPresentation.price)} por unidad
                      </p>
                    </div>
                    {selectedPresentation.sku && (
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#f4f5f9] px-3 py-1.5 text-xs font-bold text-[#061540]/60">
                        <Tag size={11} />
                        {selectedPresentation.sku}
                      </span>
                    )}
                  </div>

                  <div className="mt-5 flex items-center gap-3">
                    <div className="inline-flex h-12 overflow-hidden rounded-xl border border-[#061540]/15 bg-[#f4f5f9]">
                      <button type="button" onClick={decreaseQuantity}
                        className="flex w-12 items-center justify-center text-[#061540]/40 transition hover:bg-[#061540]/8 hover:text-[#061540]">
                        <Minus size={15} />
                      </button>
                      <div className="flex w-12 items-center justify-center border-x border-[#061540]/10 text-base font-black text-[#061540]">
                        {quantity}
                      </div>
                      <button type="button" onClick={increaseQuantity}
                        className="flex w-12 items-center justify-center text-[#061540] transition hover:bg-[#061540]/8">
                        <Plus size={15} />
                      </button>
                    </div>

                    <button type="button"
                      className="inline-flex h-12 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#35c791] text-base font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
                      <ShoppingCart size={18} />
                      Comprar
                    </button>
                  </div>

                  {product.technicalSheetUrl && (
                    <a href={product.technicalSheetUrl} target="_blank" rel="noreferrer"
                      className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#061540]/50 transition hover:text-[#061540]">
                      <Download size={14} />
                      Descargar ficha técnica
                    </a>
                  )}
                </div>
              )}
            </aside>
          </div>
        </section>

        {/* Recommendations */}
        {product.recommendations && (
          <section className="mx-auto max-w-7xl px-5 pb-16">
            <div className="overflow-hidden rounded-3xl border border-[#061540]/8 bg-white shadow-sm">
              <div className="grid gap-0 lg:grid-cols-[280px_1fr]">
                <div className="flex flex-col justify-center border-b border-[#061540]/8 bg-[#061540] p-8 lg:border-b-0 lg:border-r lg:border-r-transparent">
                  <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-[#eeff00] px-4 py-1.5 text-xs font-black uppercase tracking-wide text-[#061540]">
                    <Sparkles size={12} />
                    Uso recomendado
                  </span>
                  <h2 className="text-2xl font-black leading-tight text-white">
                    Antes de aplicar
                  </h2>
                </div>

                <div className="flex items-start gap-4 p-8">
                  <FileText className="mt-0.5 shrink-0 text-[#061540]/30" size={22} />
                  <p className="text-[15px] leading-7 text-[#061540]/75">
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