"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    image: "/assets/coloresRadiantes.webp",
    badge: "Línea Premium",
    title: "Colores que",
    highlight: "Transforman",
    titleEnd: "Espacios",
    description:
      "Nuestro equipo de expertos en colores y diseño está aquí para guiarte en cada paso del camino.",
    accent: "#7ec8e3",
  },
  {
    id: 2,
    image: "/assets/paleta.webp",
    badge: "Más de 500 tonos",
    title: "Para cada",
    highlight: "Espacio",
    titleEnd: "y Proyecto",
    description:
      "Encuentra tonos ideales para transformar tus proyectos con calidad y estilo profesional.",
    accent: "#f5c518",
  },
  {
    id: 3,
    image: "/assets/hombrePintando.webp",
    badge: "Soluciones Pro",
    title: "Calidad",
    highlight: "Industrial",
    titleEnd: "y Hogares",
    description:
      "Productos pensados para hogares, industrias y proyectos arquitectónicos de toda escala.",
    accent: "#ff0000",
  },
];

const stats = [
  { num: "500+", label: "Colores" },
  { num: "15+", label: "Líneas" },
  { num: "20", label: "Años" },
];

export const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative bg-[#08206b] overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Big circle top right */}
        <div
          className="absolute -top-32 -right-32 w-125 h-125 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #7ec8e3, transparent 70%)" }}
        />
        {/* Small circle bottom left */}
        <div
          className="absolute -bottom-20 -left-20 w-75 h-75 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #f5c518, transparent 70%)" }}
        />
        {/* Grid dots pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* LEFT — Text */}
          <div>
            {/* Badge */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`badge-${current}`}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.35 }}
                className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full border text-xs font-bold tracking-widest uppercase"
                style={{
                  borderColor: `${slide.accent}50`,
                  color: slide.accent,
                  background: `${slide.accent}18`,
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: slide.accent }}
                />
                {slide.badge}
              </motion.div>
            </AnimatePresence>

            {/* Title */}
            <AnimatePresence mode="wait">
              <motion.h1
                key={`title-${current}`}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.5 }}
                className="text-white leading-[0.93] mb-5"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(52px, 6vw, 76px)",
                  letterSpacing: "1px",
                }}
              >
                {slide.title}
                <br />
                <span style={{ color: slide.accent }}>{slide.highlight}</span>
                <br />
                {slide.titleEnd}
              </motion.h1>
            </AnimatePresence>

            {/* Description */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`desc-${current}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-white/60 text-[15px] leading-relaxed max-w-sm mb-8"
              >
                {slide.description}
              </motion.p>
            </AnimatePresence>

            {/* CTAs */}
            <div className="flex gap-3 items-center mb-10">
              <Link
                href="#"
                className="flex items-center gap-2 text-[#08206b] font-bold text-sm px-6 py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: slide.accent }}
              >
                Ver Productos
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
              <Link
                href="#"
                className="text-white/70 hover:text-white font-semibold text-sm px-5 py-3 rounded-xl border border-white/15 hover:border-white/35 transition-all duration-200"
              >
                Calculadora
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-7 pt-7 border-t border-white/10">
              {stats.map((s) => (
                <div key={s.label}>
                  <div
                    className="font-black leading-none mb-1"
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "32px",
                      color: slide.accent,
                    }}
                  >
                    {s.num}
                  </div>
                  <div className="text-[11px] text-white/40 uppercase tracking-widest font-semibold">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Image */}
          <div className="relative">
            {/* Outer glow ring */}
            <div
              className="absolute inset-0 rounded-2xl opacity-30 blur-xl transition-all duration-700"
              style={{ background: slide.accent }}
            />

            {/* Image container */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl" style={{ height: "380px" }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={slides[current].id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={slides[current].image}
                    alt={slides[current].highlight}
                    fill
                    priority
                    className="object-cover"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-linear-to-t from-[#08206b]/60 via-transparent to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Slide info card inside image */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-md border border-white/15 rounded-xl px-4 py-3 z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-semibold text-sm">{slide.highlight}</div>
                    <div className="text-white/50 text-xs mt-0.5">{slide.badge}</div>
                  </div>
                  {/* Dots */}
                  <div className="flex gap-1.5">
                    {slides.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className="transition-all duration-300 rounded-full"
                        style={{
                          height: "6px",
                          width: i === current ? "28px" : "6px",
                          background: i === current ? slide.accent : "rgba(255,255,255,0.25)",
                        }}
                        aria-label={`Slide ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating color chip */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2.5 border border-slate-100"
            >
              <div
                className="w-8 h-8 rounded-lg"
                style={{ background: `linear-gradient(135deg, ${slide.accent}, #08206b)` }}
              />
              <div>
                <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Color activo</div>
                <div className="text-[13px] text-slate-700 font-bold">{slide.highlight}</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Color strip bottom */}
      <div
        className="h-1.5 w-full"
        style={{
          background: `linear-gradient(90deg, #08206b, ${slide.accent}, #f5c518, #e84393, #08206b)`,
          backgroundSize: "200% 100%",
          transition: "background 0.6s ease",
        }}
      />
    </section>
  );
};