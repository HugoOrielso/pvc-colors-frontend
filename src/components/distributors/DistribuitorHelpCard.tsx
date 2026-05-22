"use client";

import Image from "next/image";

export function DistributorHelpCard() {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_15px_45px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)]">
      <div className="relative overflow-hidden bg-slate-100">
        <Image
          src="/assets/mujerCall.webp"
          width={700}
          height={500}
          alt="Atención al cliente PVC Colors"
          className="w-full transition-transform duration-700 hover:scale-105"
        />

        <div className="absolute inset-0 bg-linear-to-t from-[#061540]/85 via-[#061540]/20 to-transparent" />
      </div>

      <div className="bg-[#061540] px-6 py-5 text-white">
        <h3 className="text-base lg:text-lg font-bold">¿Necesitas ayuda?</h3>

        <p className="mt-2 text-xs lg:text-base leading-relaxed text-white/75">
          Nuestro servicio al cliente está listo para asesorarte con atención
          personalizada y acompañamiento en cada proyecto.
        </p>
      </div>
    </div>
  );
}