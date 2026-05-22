"use client";

import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";

export function DistributorHero() {
  return (
    <section className="relative overflow-hidden bg-[#061540] px-4 py-16 text-white sm:px-6 lg:px-12 lg:py-20">
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-700/20 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-20 h-72 w-72 rounded-full bg-[#f0c040]/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
        <div className="text-center lg:text-left">
          <div className="fade-up mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f0c040] sm:text-xs">
            <span className="size-1.5 rounded-full bg-[#f0c040]" />
            Distribuidores oficiales
          </div>

          <h1 className="fade-up delay-1 mx-auto max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:mx-0 lg:text-6xl">
            Encuentra <span className="text-[#f0c040]">PVC Colors</span>
            <br />
            cerca de ti
          </h1>

          <p className="fade-up delay-2 mx-auto mt-6 max-w-xl text-sm font-light leading-relaxed text-white/70 sm:text-base lg:mx-0">
            Nuestros distribuidores están listos para asesorarte, mostrarte
            nuestros productos y ayudarte a elegir la mejor solución para cada
            proyecto.
          </p>

          <div className="fade-up delay-3 mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <a
              href="#ubicaciones"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f0c040] px-6 py-3 text-sm font-semibold text-[#061540] transition hover:bg-yellow-300"
            >
              Ver ubicaciones
              <ArrowRight size={16} />
            </a>
          </div>
        </div>

        <div className="fade-up delay-2 mx-auto w-full max-w-xl lg:max-w-none">
          <div className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_25px_70px_rgba(0,0,0,0.12)]">
            <div className="relative overflow-hidden bg-slate-100">
              <Image
                src="/assets/hombreCasco.webp"
                alt="Distribuidores PVC Colors"
                width={900}
                height={700}
                className="w-full object-cover"
                priority
              />

              <div className="absolute inset-0 bg-linear-to-t from-[#061540]/75 via-[#061540]/20 to-transparent" />
            </div>

            <div className="flex flex-col gap-4 bg-[#061540] p-6 text-white">
              <div className="flex items-center gap-2 text-sm text-white/80">
                <MapPin size={16} className="text-[#f0c040]" />
                <span>Colombia</span>
              </div>

              <div>
                <h3 className="text-xl font-bold">
                  Atención cercana y especializada
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  Productos de calidad para hogares, obras y proyectos con
                  acompañamiento técnico y atención personalizada.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}