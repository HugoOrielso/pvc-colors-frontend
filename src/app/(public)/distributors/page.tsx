"use client";

import { Footer } from "@/components/home/Footer";
import { Header } from "@/components/home/Header";
import Image from "next/image";
import { useState } from "react";
import { ArrowRight, MapPin, Phone, MessageCircle } from "lucide-react";

const distributors = [
  {
    name: "PVC Color's Cúcuta",
    city: "Cúcuta",
    address: "Calle 11 # 9-29",
    phone: "+57 311 872 7016",
    whatsapp: "573118727016",
    keyword: "CUC",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d988.0241896983734!2d-72.50879533042858!3d7.884944927934246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e6645cea28a7eb5%3A0x34836d2791b5c956!2sDistribuidora%20Pvc%20Colors!5e0!3m2!1ses-419!2sco!4v1708189382327!5m2!1ses-419!2sco",
  },
  {
    name: "PVC Color's Cúcuta - El Callejón",
    city: "Cúcuta",
    address: "Avenida 7 # 2-85",
    phone: "+57 316 628 8243",
    whatsapp: "573166288243",
    keyword: "CUC",
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d988.0026079511339!2d-72.50781483044743!3d7.893976527904715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e664570befc274b%3A0xa4681110cfe3c49b!2sAv.%207%20%232-85%2C%20Carora%2C%20C%C3%BAcuta%2C%20Norte%20de%20Santander!5e0!3m2!1ses-419!2sco!4v1708207891311!5m2!1ses-419!2sco",
  },
];

export default function DistribuidoresPage() {
  const [selectedDistributor, setSelectedDistributor] = useState(
    distributors[0]
  );

  return (
    <>
      <Header />

      <main className="pvc-page overflow-hidden bg-white text-[#061540]">
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
                Encuentra{" "}
                <span className="text-[#f0c040]">PVC Colors</span>
                <br />
                cerca de ti
              </h1>

              <p className="fade-up delay-2 mx-auto mt-6 max-w-xl text-sm font-light leading-relaxed text-white/70 sm:text-base lg:mx-0">
                Nuestros distribuidores están listos para asesorarte, mostrarte
                nuestros productos y ayudarte a elegir la mejor solución para
                cada proyecto.
              </p>

              <div className="fade-up delay-3 mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <a
                  href="#ubicaciones"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f0c040] px-6 py-3 text-sm font-semibold text-[#061540] transition hover:bg-yellow-300"
                >
                  Ver ubicaciones
                  <ArrowRight size={16} />
                </a>

                <a
                  href={`https://wa.me/${selectedDistributor.whatsapp}`}
                  target="_blank"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
                >
                  Contactar ahora
                  <MessageCircle size={16} />
                </a>
              </div>

              <div className="fade-up delay-4 mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-8 sm:max-w-md lg:max-w-lg">
                <div>
                  <p className="text-2xl font-extrabold text-[#f0c040]">2</p>
                  <p className="mt-1 text-[10px] font-medium uppercase tracking-widest text-white/50">
                    Sedes
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-extrabold text-[#f0c040]">
                    CUC
                  </p>
                  <p className="mt-1 text-[10px] font-medium uppercase tracking-widest text-white/50">
                    Ciudad
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-extrabold text-[#f0c040]">
                    +57
                  </p>
                  <p className="mt-1 text-[10px] font-medium uppercase tracking-widest text-white/50">
                    Contacto
                  </p>
                </div>
              </div>
            </div>

            <div className="fade-up delay-2 mx-auto w-full max-w-xl lg:max-w-none">
              <div className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_25px_70px_rgba(0,0,0,0.12)]">

                {/* Imagen */}
                <div className="relative overflow-hidden bg-slate-100">
                  <Image
                    src="/assets/hombreCasco.webp"
                    alt="Distribuidores PVC Colors"
                    width={900}
                    height={700}
                    className="w-full object-cover "
                    priority
                  />

                  {/* Overlay suave */}
                  <div className="absolute inset-0 bg-linear-to-t from-[#061540]/75 via-[#061540]/20 to-transparent" />
                </div>

                {/* Contenido */}
                <div className="flex flex-col gap-4 bg-[#061540] p-6 text-white">

                  <div className="flex items-center gap-2 text-sm text-white/80">
                    <MapPin size={16} className="text-[#f0c040]" />
                    <span>Cúcuta, Colombia</span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold">
                      Atención cercana y especializada
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-white/70">
                      Productos de calidad para hogares, obras y proyectos
                      con acompañamiento técnico y atención personalizada.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        <section
          id="ubicaciones"
          className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-12 lg:py-20"
        >
          <div className="fade-up mb-12 max-w-3xl text-center lg:text-left">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f0c040] shadow-sm sm:text-xs">
              <span className="size-2 rounded-full bg-[#f0c040]" />
              Nuestras sedes
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-[#061540] sm:text-4xl lg:text-5xl">
              Selecciona tu distribuidor
            </h2>

            <p className="mt-5 max-w-2xl text-sm font-light leading-relaxed text-slate-500 sm:text-base">
              Elige una ubicación para ver el mapa, dirección, teléfono de
              contacto y acceso directo a WhatsApp.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
            <aside className="fade-up delay-1 space-y-4">
              {distributors.map((item) => {
                const isActive = selectedDistributor.name === item.name;

                return (
                  <button
                    key={item.name}
                    onClick={() => setSelectedDistributor(item)}
                    className={`w-full cursor-pointer rounded-2xl border p-6 text-left transition-all duration-300 ${isActive
                      ? "border-[#061540] bg-[#061540] text-white shadow-xl"
                      : "border-slate-200 bg-white text-[#061540] shadow-sm hover:-translate-y-1 hover:border-[#f0c040] hover:shadow-lg"
                      }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span
                          className={`mb-3 inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] ${isActive
                            ? "bg-[#f0c040] text-[#061540]"
                            : "bg-[#f0c040]/20 text-[#061540]"
                            }`}
                        >
                          {item.keyword}
                        </span>

                        <h3 className="text-lg font-bold sm:text-xl">
                          {item.name}
                        </h3>

                        <p
                          className={`mt-3 text-sm leading-6 ${isActive ? "text-white/70" : "text-slate-500"
                            }`}
                        >
                          {item.address}
                        </p>

                        <p
                          className={`mt-1 text-sm ${isActive ? "text-white/70" : "text-slate-500"
                            }`}
                        >
                          {item.city}
                        </p>
                      </div>

                      <span
                        className={`grid size-10 shrink-0 place-items-center rounded-full text-lg font-black ${isActive
                          ? "bg-[#f0c040] text-[#061540]"
                          : "bg-[#061540] text-white"
                          }`}
                      >
                        →
                      </span>
                    </div>
                  </button>
                );
              })}
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_15px_45px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)]">

                {/* Imagen */}
                <div className="relative overflow-hidden bg-slate-100">
                  <Image
                    src="/assets/mujerCall.webp"
                    width={700}
                    height={500}
                    alt="Atención al cliente PVC Colors"
                    className=" w-full transition-transform duration-700 hover:scale-105"
                  />

                  {/* Overlay elegante */}
                  <div className="absolute inset-0 bg-linear-to-t from-[#061540]/85 via-[#061540]/20 to-transparent" />
                </div>

                {/* Contenido */}
                <div className="bg-[#061540] px-6 py-5 text-white">
                  <h3 className="text-xl font-bold">
                    ¿Necesitas ayuda?
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-white/75">
                    Nuestro servicio al cliente está listo para asesorarte
                    con atención personalizada y acompañamiento en cada proyecto.
                  </p>
                </div>
              </div>
            </aside>

            <div className="fade-up delay-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
              <div className="flex flex-col justify-between gap-5 border-b border-slate-100 bg-[#f8fafc] p-5 sm:p-6 md:flex-row md:items-center">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#061540]/50 sm:text-xs">
                    Ubicación seleccionada
                  </p>

                  <h3 className="mt-2 text-xl font-extrabold text-[#061540] sm:text-2xl">
                    {selectedDistributor.name}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {selectedDistributor.address}, {selectedDistributor.city}
                  </p>
                </div>

                <a
                  href={`https://wa.me/${selectedDistributor.whatsapp}`}
                  target="_blank"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f0c040] px-5 py-3 text-sm font-bold text-[#061540] transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  WhatsApp
                  <Phone size={16} />
                </a>
              </div>

              <div className="grid lg:grid-cols-[1fr_0.45fr]">
                <div className="h-85 bg-slate-100 sm:h-110 lg:h-130">
                  <iframe
                    src={selectedDistributor.map}
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
                      {selectedDistributor.address}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                      Teléfono
                    </p>
                    <p className="mt-2 font-semibold text-[#061540]">
                      {selectedDistributor.phone}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                      Ciudad
                    </p>
                    <p className="mt-2 font-semibold text-[#061540]">
                      {selectedDistributor.city}
                    </p>
                  </div>

                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `${selectedDistributor.address}, ${selectedDistributor.city}`
                    )}`}
                    target="_blank"
                    className="flex items-center justify-center gap-2 rounded-2xl bg-[#061540] px-5 py-4 text-center text-sm font-bold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    Abrir en Google Maps
                    <MapPin size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}