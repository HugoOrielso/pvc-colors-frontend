"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

interface ColorEnvironmentVisualizerProps {
  images: Array<{ id: string; url: string; alt?: string; isMain?: boolean }>;
  activeColor: string;
  colorName?: string;
  productName: string;
  mainImage: string;
  onImageSelect: (url: string) => void;
}

// Ambientes de ejemplo — en producción vendrían de la API
const DEMO_ENVIRONMENTS = [
  { id: "env1", label: "Fachada", emoji: "🏠" },
  { id: "env2", label: "Sala", emoji: "🛋️" },
  { id: "env3", label: "Cocina", emoji: "🍳" },
  { id: "env4", label: "Habitación", emoji: "🛏️" },
  { id: "env5", label: "Baño", emoji: "🚿" },
  { id: "env6", label: "Exterior", emoji: "🌿" },
];

export function ColorEnvironmentVisualizer({
  images,
  activeColor,
  colorName,
  productName,
  mainImage,
  onImageSelect,
}: ColorEnvironmentVisualizerProps) {
  const [selectedEnv, setSelectedEnv] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [sliderX, setSliderX] = useState(50); // percentage
  const [showSlider, setShowSlider] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  const gallery = images.length > 0 ? images : [];
  const currentGalleryImage = gallery[selectedEnv] ?? null;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging && !showSlider) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setSliderX(Math.max(5, Math.min(95, x)));
  };

  const scrollStrip = (dir: "left" | "right") => {
    if (!stripRef.current) return;
    stripRef.current.scrollBy({ left: dir === "left" ? -160 : 160, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Color chip */}
      <div className="flex items-center gap-3 self-start rounded-2xl border border-[#061540]/8 bg-white px-4 py-2.5 shadow-sm">
        <span
          className="h-5 w-5 rounded-full border border-black/10 shadow-inner transition-all duration-500"
          style={{ backgroundColor: activeColor }}
        />
        <span className="text-sm font-bold text-[#061540]">{colorName || activeColor}</span>
        <span className="font-mono text-xs uppercase tracking-wide text-[#061540]/40">
          {activeColor}
        </span>
      </div>

      {/* Main visualizer */}
      <div
        ref={containerRef}
        className={`group relative overflow-hidden rounded-3xl border border-white/60 bg-[#f0f1f5] shadow-xl shadow-[#061540]/5 select-none ${
          isFullscreen ? "fixed inset-4 z-50 rounded-3xl" : ""
        }`}
        style={{ minHeight: isFullscreen ? "auto" : "460px", cursor: showSlider ? "col-resize" : "default" }}
        onMouseMove={handleMouseMove}
        onMouseDown={() => showSlider && setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
      >
        {/* Color accent top bar */}
        <div
          className="absolute inset-x-0 top-0 z-10 h-1 rounded-t-3xl transition-colors duration-700"
          style={{ backgroundColor: activeColor }}
        />

        {/* Product image (always shown) */}
        {mainImage && (
          <div className="absolute inset-0 flex items-center justify-center p-10">
            <Image
              src={mainImage}
              alt={productName}
              fill
              priority
              className="object-contain p-10 drop-shadow-2xl"
              sizes="(max-width: 1024px) 100vw, 600px"
            />
          </div>
        )}

        {/* Color overlay on right side — simula el ambiente */}
        {showSlider && currentGalleryImage ? (
          <>
            {/* Before — original */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - sliderX}% 0 0)` }}
            >
              <Image
                src={currentGalleryImage.url}
                alt={currentGalleryImage.alt || "Ambiente original"}
                fill
                className="object-cover"
                sizes="600px"
              />
            </div>

            {/* After — con color aplicado */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{ clipPath: `inset(0 0 0 ${sliderX}%)` }}
            >
              <Image
                src={currentGalleryImage.url}
                alt={currentGalleryImage.alt || "Ambiente con color"}
                fill
                className="object-cover"
                sizes="600px"
              />
              <div
                className="absolute inset-0 mix-blend-multiply opacity-60 transition-colors duration-700"
                style={{ backgroundColor: activeColor }}
              />
            </div>

            {/* Slider line */}
            <div
              className="pointer-events-none absolute inset-y-0 z-20 flex items-center"
              style={{ left: `${sliderX}%`, transform: "translateX(-50%)" }}
            >
              <div className="h-full w-0.5 bg-white/80" />
              <div className="absolute flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-xl">
                <ChevronLeft size={14} className="text-[#061540]" />
                <ChevronRight size={14} className="text-[#061540]" />
              </div>
            </div>

            {/* Labels */}
            <div className="pointer-events-none absolute left-3 top-5 z-20 rounded-full bg-white/90 px-3 py-1 text-xs font-black text-[#061540]/60 backdrop-blur-sm">
              Original
            </div>
            <div className="pointer-events-none absolute right-3 top-5 z-20 rounded-full px-3 py-1 text-xs font-black text-white backdrop-blur-sm" style={{ backgroundColor: activeColor }}>
              Con color
            </div>
          </>
        ) : (
          /* Normal gallery image overlay */
          currentGalleryImage && (
            <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <Image
                src={currentGalleryImage.url}
                alt={currentGalleryImage.alt || "Ambiente"}
                fill
                className="object-cover"
                sizes="600px"
              />
              <div
                className="absolute inset-0 mix-blend-multiply opacity-50 transition-colors duration-700"
                style={{ backgroundColor: activeColor }}
              />
            </div>
          )
        )}

        {/* Fullscreen toggle */}
        <button
          type="button"
          onClick={() => setIsFullscreen((v) => !v)}
          className="absolute right-4 top-5 z-30 rounded-xl bg-white/90 p-2 text-[#061540] shadow-sm backdrop-blur-sm transition hover:bg-white"
        >
          <Maximize2 size={16} />
        </button>

        {/* Toggle slider mode */}
        {gallery.length > 0 && (
          <button
            type="button"
            onClick={() => setShowSlider((v) => !v)}
            className={`absolute left-4 top-5 z-30 rounded-xl px-3 py-2 text-xs font-black shadow-sm backdrop-blur-sm transition ${
              showSlider
                ? "bg-[#061540] text-white"
                : "bg-white/90 text-[#061540] hover:bg-white"
            }`}
          >
            {showSlider ? "✕ Comparar" : "⟺ Comparar color"}
          </button>
        )}

        {/* Env label overlay */}
        {!showSlider && selectedEnv >= 0 && gallery[selectedEnv] && (
          <div className="absolute bottom-20 left-1/2 z-20 -translate-x-1/2 rounded-full bg-white/90 px-4 py-2 text-xs font-black text-[#061540] shadow-sm backdrop-blur-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {DEMO_ENVIRONMENTS[selectedEnv]?.label ?? `Ambiente ${selectedEnv + 1}`}
          </div>
        )}
      </div>

      {/* Gallery strip */}
      {gallery.length > 0 && (
        <div className="relative">
          {/* Scroll buttons */}
          {gallery.length > 4 && (
            <>
              <button
                type="button"
                onClick={() => scrollStrip("left")}
                className="absolute -left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-1.5 shadow-md border border-[#061540]/8 transition hover:bg-[#061540] hover:text-white"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() => scrollStrip("right")}
                className="absolute -right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-1.5 shadow-md border border-[#061540]/8 transition hover:bg-[#061540] hover:text-white"
              >
                <ChevronRight size={16} />
              </button>
            </>
          )}

          <div
            ref={stripRef}
            className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-hide"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {gallery.map((image, idx) => {
              const isActive = selectedEnv === idx;
              const envLabel = DEMO_ENVIRONMENTS[idx]?.label ?? `Amb. ${idx + 1}`;

              return (
                <button
                  key={image.id}
                  type="button"
                  onClick={() => {
                    setSelectedEnv(idx);
                    onImageSelect(image.url);
                  }}
                  style={{ scrollSnapAlign: "start" }}
                  className={`group/thumb relative flex-none overflow-hidden rounded-2xl border-2 transition-all duration-200 hover:-translate-y-0.5 ${
                    isActive
                      ? "border-[#061540] shadow-lg"
                      : "border-transparent hover:border-[#061540]/20"
                  }`}
                >
                  {/* Image */}
                  <div className="relative h-20 w-28 overflow-hidden rounded-[14px] bg-[#f0f1f5]">
                    <Image
                      src={image.url}
                      alt={image.alt || envLabel}
                      fill
                      className="object-cover transition-transform duration-300 group-hover/thumb:scale-105"
                      sizes="112px"
                    />
                    {/* Color tint overlay */}
                    <div
                      className="absolute inset-0 mix-blend-multiply opacity-0 transition-opacity duration-500 group-hover/thumb:opacity-40"
                      style={{ backgroundColor: activeColor }}
                    />
                    {/* Active tint */}
                    {isActive && (
                      <div
                        className="absolute inset-0 mix-blend-multiply opacity-30 transition-colors duration-700"
                        style={{ backgroundColor: activeColor }}
                      />
                    )}
                  </div>

                  {/* Label */}
                  <div
                    className={`mt-1.5 px-1 text-center text-[11px] font-bold transition-colors ${
                      isActive ? "text-[#061540]" : "text-[#061540]/40"
                    }`}
                  >
                    {envLabel}
                  </div>

                  {/* Active dot */}
                  {isActive && (
                    <div
                      className="absolute bottom-7 left-1/2 h-1.5 w-6 -translate-x-1/2 rounded-full transition-colors duration-700"
                      style={{ backgroundColor: activeColor }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}