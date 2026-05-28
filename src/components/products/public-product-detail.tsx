"use client";

import Image from "next/image";
import Link from "next/link";
import { ViewTransition, useMemo, useState } from "react";
import {
  ArrowLeft,
  Calculator,
  CheckCircle2,
  ChevronRight,
  Download,
  Minus,
  Package,
  Plus,
  ShoppingCart,
  Sparkles,
  Tag,
} from "lucide-react";

import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { useProductByIdPublic } from "@/hooks/public/products/usePublicProducts";
import { ColorGroupModal } from "../inventory/ColorGroupModal";
import { ProductCalculatorModal } from "./calculatorModal";
import { useCartStore } from "@/store/cart-store";
import { toast } from "sonner";
import PvcRecommendationsSlider from "../lines/Recomendations";

interface ProductDetailPageProps {
  id: string;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(price);

const isLightColor = (hex: string): boolean => {
  let color = hex.replace("#", "");

  // Expandir formato corto #fff → ffffff
  if (color.length === 3) {
    color = color.split("").map((c) => c + c).join("");
  }

  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.85;
};

export default function ProductDetailPage({ id }: ProductDetailPageProps) {
  const { data: product, isLoading } = useProductByIdPublic(id);
  const addToCart = useCartStore((state) => state.addToCart);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [selectedColorId, setSelectedColorId] = useState<string | null>(null);
  const [selectedPresentationName, setSelectedPresentationName] =
    useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [openGroupId, setOpenGroupId] = useState<string | null>(null);

  const flatColors = useMemo(
    () => product?.colors ?? [],
    [product?.colors]
  );

  const colorGroups = useMemo(
    () => product?.colorGroups ?? [],
    [product?.colorGroups]
  );

  const presentations = useMemo(
    () => product?.presentations ?? [],
    [product?.presentations]
  );

  const hasGroups = colorGroups.some((group) => group.colors.length > 0);
  const hasColors = !hasGroups && flatColors.length > 0;

  const selectedColor = useMemo(() => {
    if (!selectedColorId) return null;

    const fromFlat = flatColors.find((color) => color.id === selectedColorId);
    if (fromFlat) return fromFlat;

    for (const group of colorGroups) {
      const found = group.colors.find((color) => color.id === selectedColorId);
      if (found) return found;
    }

    return null;
  }, [selectedColorId, flatColors, colorGroups]);

  const selectedPresentation = useMemo(() => {
    if (!presentations.length) return null;

    return (
      presentations.find(
        (presentation) => presentation.name === selectedPresentationName
      ) || presentations[0]
    );
  }, [presentations, selectedPresentationName]);

  const totalPrice = selectedPresentation
    ? selectedPresentation.price * quantity
    : 0;

  const mainImage =
    selectedImage ||
    product?.images?.find((image) => image.isMain)?.url ||
    product?.images?.[0]?.url ||
    "/placeholder-product.png";

  const activeColorValue = selectedColor?.value ?? "#102a73";

  const lineName = product?.productLine?.name ?? "Línea PVC Colors";

  const lineHref = product?.productLine?.id
    ? `/lines/${product.productLine.id}`
    : "/lines";

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
      <div className="min-h-screen bg-[#f4f5f9]">
        <Header />
        <section className="mx-auto max-w-7xl px-5 py-12">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="h-150 animate-pulse rounded-3xl bg-white" />
            <div className="h-150 animate-pulse rounded-3xl bg-white" />
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen  grid grid-rows-[auto_1fr_auto]">
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
      </div>
    );
  }

  const gallery = product.images ?? [];

  const renderPurchaseCard = (className = "") => {
    if (!selectedPresentation) return null;

    const isOutOfStock = selectedPresentation.stock <= 0;

    return (
      <div
        className={`rounded-2xl border border-[#061540]/8 bg-white p-6 shadow-sm ${className}`}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-3xl font-black text-[#061540]">
              {formatPrice(totalPrice)}
            </p>

            <p className="mt-1 text-xs font-bold uppercase tracking-wide text-[#061540]/45">
              {formatPrice(selectedPresentation.price)} por unidad · Stock:{" "}
              {selectedPresentation.stock}
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
            <button
              type="button"
              onClick={decreaseQuantity}
              disabled={quantity <= 1}
              className="flex w-12 items-center justify-center text-[#061540]/40 transition hover:bg-[#061540]/8 hover:text-[#061540] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Minus size={15} />
            </button>

            <div className="flex w-12 items-center justify-center border-x border-[#061540]/10 text-base font-black text-[#061540]">
              {quantity}
            </div>

            <button
              type="button"
              onClick={increaseQuantity}
              disabled={isOutOfStock || quantity >= selectedPresentation.stock}
              className="flex w-12 items-center justify-center text-[#061540] transition hover:bg-[#061540]/8 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Plus size={15} />
            </button>
          </div>

          <button
            type="button"
            disabled={isOutOfStock}
            onClick={() => {
              if (!selectedPresentation) {
                toast.error("Selecciona una presentación.");
                return;
              }

              if ((hasColors || hasGroups) && !selectedColor) {
                toast.error("Selecciona un color.");
                return;
              }

              const result = addToCart({
                productId: product.id,
                productName: product.name,
                productSlug: product.slug,
                productImage: mainImage,

                presentationId: selectedPresentation.id,
                presentationName: selectedPresentation.name,
                price: selectedPresentation.price,
                stock: selectedPresentation.stock,
                sku: selectedPresentation.sku,

                colorId: selectedColor?.id ?? null,
                colorName: selectedColor?.name ?? null,
                colorValue: selectedColor?.value ?? null,

                quantity,
              });

              if (!result.ok) {
                toast.error(result.message);
                return;
              }

              toast.success("Producto agregado al carrito.");
              setQuantity(1);
            }}
            className="inline-flex h-12 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#35c791] text-base font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ShoppingCart size={18} />
            Agregar al carrito
          </button>
        </div>




      </div>


    );
  };

  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto] bg-[#f4f5f9]">
      <Header />

      <div>
        <section className="mx-auto max-w-7xl p-4">
          <div className="mb-4 flex flex-wrap items-center gap-3">
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

          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] xl:grid-cols-[1.15fr_0.85fr]">
            <div className="flex flex-col gap-4 lg:sticky lg:top-6 lg:self-start">
              <ViewTransition name={`product-image-${product.id}`}>
                <div
                  className="relative overflow-hidden rounded-3xl bg-white shadow-xl shadow-[#061540]/8"
                  style={{ minHeight: 460 }}
                >
                  <div
                    className="absolute inset-x-0 top-0 h-1.5 rounded-t-3xl transition-colors duration-500"
                    style={{ backgroundColor: activeColorValue }}
                  />

                  <div className="relative flex min-h-105 items-center justify-center p-10 lg:p-16">
                    <Image
                      src={mainImage}
                      alt={`Imagen de ${product.name}`}
                      fill
                      priority
                      className="object-contain p-10 drop-shadow-2xl"
                      sizes="(max-width: 1024px) 100vw, 600px"
                    />
                  </div>
                </div>
              </ViewTransition>


              {gallery.length > 1 && (
                <div className="flex gap-3">
                  {gallery.map((image) => (
                    <button
                      key={image.id}
                      type="button"
                      onClick={() => setSelectedImage(image.url)}
                      className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 bg-white transition hover:scale-105 ${mainImage === image.url
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



              {product.features && product.features.length > 0 && (
                <div className="overflow-hidden rounded-2xl border border-[#061540]/8 bg-white shadow-sm">
                  <div className="border-b border-[#061540]/8 px-5 py-4">
                    <h3 className="text-sm font-black uppercase tracking-wide text-[#061540]">
                      Características
                    </h3>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <tbody>
                        {product.features.map((feature) => (
                          <tr
                            key={feature.id}
                            className="border-b border-[#061540]/8 last:border-b-0"
                          >
                            <th className="w-1/3 bg-[#f4f5f9] px-5 py-4 align-top font-black text-[#061540]">
                              {feature.name}
                            </th>

                            <td className="px-5 py-4 leading-6 text-[#061540]/70">
                              {feature.description || "—"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

            </div>

            <aside className="flex flex-col gap-0">
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

              {hasColors && (
                <div className="mt-4 rounded-2xl border border-[#061540]/8 bg-white p-7 shadow-sm">
                  <div className="mb-5 flex items-center justify-between">
                    <h3 className="font-black tracking-tight text-[#061540]">
                      Elige un color
                    </h3>

                    <span className="text-xs font-bold text-[#061540]/45">
                      {flatColors.length}{" "}
                      {flatColors.length === 1 ? "opción" : "opciones"}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {flatColors.map((color) => {
                      const isSelected = selectedColor?.id === color.id;

                      return (
                        <button
                          key={color.id}
                          type="button"
                          onClick={() => setSelectedColorId(color.id)}
                          title={color.name ?? color.value}
                          className={`relative h-12 w-12 rounded-2xl border-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${isSelected
                            ? "scale-110 border-[#061540] shadow-lg"
                            : isLightColor(color.value)
                              ? "border-[#061540]/25 hover:border-[#061540]/50"
                              : "border-transparent hover:border-[#061540]/20"
                            }`}
                          style={{ backgroundColor: color.value }}
                        >
                          {isSelected && (
                            <span className="absolute inset-0 flex items-center justify-center">
                              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white shadow">
                                <CheckCircle2
                                  size={13}
                                  className="text-[#061540]"
                                />
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
                        {selectedColor.name && (
                          <strong className="font-black text-[#061540]">
                            {selectedColor.name}
                          </strong>
                        )}

                        <span className="ml-1.5 font-mono text-xs text-[#061540]/40">
                          {selectedColor.value}
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              )}

              {hasGroups && (
                <div className="mt-4 rounded-2xl border border-[#061540]/8 bg-white p-7 shadow-sm">
                  <div className="mb-5 flex items-center justify-between">
                    <h3 className="font-black tracking-tight text-[#061540]">
                      Color del producto
                    </h3>

                    <span className="text-xs font-bold text-[#061540]/45">
                      {colorGroups.reduce(
                        (total, group) => total + group.colors.length,
                        0
                      )}{" "}
                      colores
                    </span>
                  </div>

                  {selectedColor && (
                    <div className="mb-4 flex items-center gap-3 rounded-xl bg-[#f4f5f9] px-4 py-3">
                      <div
                        className="h-8 w-8 rounded-full border border-black/10"
                        style={{ backgroundColor: selectedColor.value }}
                      />

                      <div>
                        <p className="text-sm font-black text-[#061540]">
                          {selectedColor.name ?? "Color seleccionado"}
                        </p>

                        <p className="font-mono text-xs text-[#061540]/40">
                          {selectedColor.value}
                        </p>
                      </div>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => setOpenGroupId("all")}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#061540] px-5 py-3 text-sm font-black text-white transition hover:bg-[#061540]/90"
                  >
                    Elegir color
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}

              {presentations.length > 0 && (
                <div className="mt-4 rounded-2xl border border-[#061540]/8 bg-white p-7 shadow-sm">
                  <h3 className="mb-5 font-black tracking-tight text-[#061540]">
                    Elige un tamaño
                  </h3>

                  <div className="flex flex-wrap gap-2.5">
                    {presentations.map((presentation) => {
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
                          className={`cursor-pointer rounded-xl border-2 px-5 py-2.5 text-sm font-black transition-all hover:-translate-y-0.5 ${isSelected
                            ? "border-[#061540] bg-[#061540] text-white shadow-md"
                            : "border-[#061540]/15 bg-[#f4f5f9] text-[#061540] hover:border-[#061540]/40 hover:bg-white"
                            }`}
                        >
                          {presentation.name}
                        </button>
                      );
                    })}
                  </div>

                  {selectedPresentation && (
                    <div className="mt-4 flex items-center gap-2 text-xs font-bold text-[#061540]/45">
                      <Package size={13} />
                      <span>
                        {selectedPresentation.stock} unidades disponibles
                      </span>
                    </div>
                  )}
                </div>
              )}
              <button
                type="button"
                onClick={() => setIsCalculatorOpen(true)}
                className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#061540]/10 bg-[#f4f5f9] text-sm font-black text-[#061540] transition hover:bg-[#061540] hover:text-white mb-4 cursor-pointer"
              >
                <Calculator size={16} />
                Calcula cuánto producto necesitas
              </button>
              {renderPurchaseCard("")}
              {product.technicalSheetUrl && (
                <a
                  href={product.technicalSheetUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#061540]/10 bg-[#f4f5f9] text-sm font-black text-[#061540] transition hover:bg-[#061540] hover:text-white mb-4 cursor-pointer"
                >
                  <Download size={18} />
                  Descargar ficha técnica
                </a>
              )}
            </aside>
          </div>
        </section>

        {product.recommendations && (
          <section className="mx-auto max-w-7xl py-10">
            <div className="overflow-hidden rounded-3xl border border-[#061540]/8 bg-white shadow-sm">
              <div className="grid gap-0 lg:grid-cols-[280px_1fr]">
                <div className="flex flex-col items-center justify-center border-b border-[#061540]/8 bg-[#061540] p-4 lg:border-b-0 lg:border-r lg:border-r-transparent">
                  <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-[#eeff00] px-4 py-1.5 text-xs font-black uppercase tracking-wide text-[#061540]">
                    <Sparkles size={12} />
                    Uso recomendado
                  </span>

                  <h2 className="text-2xl font-black leading-tight text-white">
                    Antes de aplicar
                  </h2>
                </div>

                <div className="flex items-start gap-4 p-4">
                  <p className="text-[15px] leading-7 text-[#061540]/75">
                    {product.recommendations}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
      <PvcRecommendationsSlider />
      <Footer />

      {isCalculatorOpen && (
        <ProductCalculatorModal
          productName={product.name}
          coverageMinM2PerGallon={product.coverageMinM2PerGallon ?? 25}
          coverageMaxM2PerGallon={product.coverageMaxM2PerGallon ?? 30}
          onClose={() => setIsCalculatorOpen(false)}
        />
      )}

      {hasGroups && openGroupId && (
        <ColorGroupModal
          groups={colorGroups}
          selectedColorId={selectedColorId}
          onSelect={(colorId) => setSelectedColorId(colorId)}
          onClose={() => setOpenGroupId(null)}
        />
      )}
    </div>
  );
}