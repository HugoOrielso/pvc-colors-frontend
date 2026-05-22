"use client";

import { PublicDistributor } from "@/services/public/distributors/distributors.service";
import { MapPin, Phone } from "lucide-react";
interface DistributorMapCardProps {
  distributor: PublicDistributor;
}

const getGoogleMapsEmbedUrl = (lat: number, lng: number) => {
  return `https://www.google.com/maps?q=${lat},${lng}&z=16&output=embed`;
};

const getGoogleMapsOpenUrl = (lat: number, lng: number) => {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
};

export function DistributorMapCard({ distributor }: DistributorMapCardProps) {
  return (
    <div className="fade-up delay-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
      <div className="flex flex-col justify-between gap-5 border-b border-slate-100 bg-[#f8fafc] p-5 sm:p-6 md:flex-row md:items-center">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#061540]/50 sm:text-xs">
            Ubicación seleccionada
          </p>

          <h3 className="mt-2 text-xl font-extrabold text-[#061540] sm:text-2xl">
            {distributor.name}
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {distributor.address}, {distributor.city}
          </p>
        </div>

        <a
          href={`https://wa.me/${distributor.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f0c040] px-5 py-3 text-sm font-bold text-[#061540] transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          WhatsApp
          <Phone size={16} />
        </a>
      </div>

      <div className="grid lg:grid-cols-[1fr_0.45fr]">
        <div className="h-85 bg-slate-100 sm:h-110 lg:h-130">
          <iframe
            src={getGoogleMapsEmbedUrl(distributor.lat, distributor.lng)}
            width="100%"
            height="100%"
            className="h-full w-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="space-y-4 bg-white p-5 sm:p-6">
          <div className="rounded-2xl border border-slate-200 p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Dirección
            </p>
            <p className="mt-2 font-semibold text-[#061540]">
              {distributor.address}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Teléfono
            </p>
            <p className="mt-2 font-semibold text-[#061540]">
              {distributor.phone}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Ciudad
            </p>
            <p className="mt-2 font-semibold text-[#061540]">
              {distributor.city}
            </p>
          </div>

          <a
            href={getGoogleMapsOpenUrl(distributor.lat, distributor.lng)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-2xl bg-[#061540] px-5 py-4 text-center text-sm font-bold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            Abrir en Google Maps
            <MapPin size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}