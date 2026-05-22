"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  MapPin,
} from "lucide-react";
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";

const stats = [
  { num: "500+", label: "Colores" },
  { num: "15+", label: "Líneas" },
  { num: "20", label: "Años" },
];


const lines = [
  {
    tag: "Línea Arquitectónica",
    items: [
      "Vinilos para exterior e interior",
      "Esmalte Sintético",
      "Base Anticorrosiva",
      "Pasta Fina",
      "Pasta Gruesa",
    ],
  },
  {
    tag: "Línea Maderable",
    items: ["Colbón", "Sellador Catalizado"],
  },
];

const marqueeItems = [
  "Pinturas",
  "Vinilos",
  "Esmaltes",
  "Masillas",
  "Barnices",
  "Selladores",
  "Lacas",
  "Pegamentos",
  "Anticorrosivos",
  "Pasta Fina",
  "Pasta Gruesa",
];

export default function AboutPage() {
  return (
    <>
      <Header />

      <main className="pvc-about min-h-screen bg-white text-[#0d1b3e]">
        <section className="relative overflow-hidden bg-[#061540] text-white">
          <div className="pointer-events-none absolute -left-32 -top-32 h-125 w-125 rounded-full bg-blue-700/20 blur-3xl" />
          <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-2 lg:px-12">
            <div className="space-y-7">
              <div className="fade-up inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-[#f0c040]">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#f0c040]" />
                Línea Premium
              </div>

              <h1 className="fade-up delay-1 text-4xl font-bold leading-tight lg:text-5xl">
                Pinturas
                <br />
                <span className="text-[#f0c040]">PVC Colors</span>
                <br />
                S.A.S
              </h1>

              <p className="fade-up delay-2 max-w-lg text-sm font-light leading-relaxed text-white/70 lg:text-base">
                Empresa colombiana ubicada en Cúcuta, Norte de Santander,
                dedicada a la fabricación de productos para la industria de la
                construcción. Nos presentamos como proveedores y futuros aliados
                en sus negocios.
              </p>

              <div className="fade-up delay-3 flex flex-wrap gap-4">
                <Link
                  href="#mision"
                  className="inline-flex items-center gap-2 rounded-full bg-[#f0c040] px-6 py-3 text-sm font-semibold text-[#061540] transition-colors hover:bg-yellow-300"
                >
                  Conoce más
                  <ArrowRight size={16} />
                </Link>

                <Link
                  href="#contacto"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
                >
                  Contáctanos
                </Link>
              </div>

              <div className="fade-up delay-4 flex gap-10 pt-2">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-3xl font-extrabold text-[#f0c040]">
                      {stat.num}
                    </p>
                    <p className="mt-0.5 text-[11px] font-medium uppercase tracking-widest text-white/50">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
              <p>► Somos fabricantes</p>
            </div>

            <div className="fade-up delay-2 relative">
              <div className="absolute -inset-3 rounded-3xl bg-white/5 blur-xl" />

              <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                <Image
                  src="/assets/about/teamBusinnes.webp"
                  alt="Equipo PVC Colors"
                  width={700}
                  height={500}
                  className="h-85 w-full object-cover lg:h-100"
                />

                <div className="absolute left-4 top-4 flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2 backdrop-blur">
                  <MapPin size={13} className="text-[#f0c040]" />
                  <span className="text-xs font-medium text-white">
                    Cúcuta, Colombia
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="overflow-hidden whitespace-nowrap bg-[#f0c040] py-3">
          <div className="marquee-track inline-flex gap-10">
            {[...marqueeItems, ...marqueeItems].map((item, index) => (
              <span key={`${item}-${index}`} className="inline-flex items-center gap-10">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#061540]">
                  {item}
                </span>
                <span className="text-sm text-[#061540]/30">·</span>
              </span>
            ))}
          </div>
        </div>

        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
          <div className="mb-10 flex items-center gap-3">
            <span className="inline-block h-2 w-2 rounded-full bg-[#f0c040]" />
            <span className="text-[11px] font-semibold uppercase tracking-widest text-[#f0c040]">
              Sobre nosotros
            </span>
          </div>

          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold leading-tight lg:text-4xl">
                Empresa colombiana al servicio
                <br />
                de la{" "}
                <span className="border-b-4 border-[#f0c040]">
                  construcción
                </span>
              </h2>

              <p className="mb-4 text-sm font-light leading-relaxed text-gray-600">
                Empresa Colombiana ubicada en la ciudad de Cúcuta, Norte de
                Santander, dedicada a la fabricación de productos para acabados
                de interior y exterior en la industria de la construcción.
              </p>

              <p className="text-sm font-light leading-relaxed text-gray-600">
                Nos ponemos en contacto para presentarnos como Proveedores y
                futuros aliados en sus negocios. Conozca nuestros productos y
                los beneficios que tenemos para el sector de la construcción.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {lines.map((line) => (
                <div
                  key={line.tag}
                  className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:border-[#f0c040] hover:shadow-md"
                >
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#061540] px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white">
                    {line.tag}
                  </div>

                  <ul className="space-y-2">
                    {line.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm font-light text-gray-700"
                      >
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#f0c040]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>


        <section id="mision" className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div className="relative order-2 lg:order-1">
              <div className="absolute -inset-2 rounded-3xl bg-[#061540]/5 blur-xl" />

              <Image
                src="/assets/about/target.webp"
                alt="Misión PVC Colors"
                width={700}
                height={500}
                className="relative h-85 w-full rounded-2xl object-cover shadow-xl"
              />

              <div className="absolute -bottom-5 -right-5 rounded-2xl bg-[#061540] px-5 py-4 text-white shadow-2xl">
                <p className="text-2xl font-extrabold text-[#f0c040]">
                  Misión
                </p>
                <p className="text-[11px] uppercase tracking-widest text-white/60">
                  Nuestro propósito
                </p>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="mb-6 flex items-center gap-3">
                <span className="inline-block h-2 w-2 rounded-full bg-[#f0c040]" />
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#f0c040]">
                  Nuestra misión
                </span>
              </div>

              <h2 className="mb-6 text-3xl font-bold leading-tight">
                Líderes en la industria de{" "}
                <span className="border-b-4 border-[#f0c040]">
                  pinturas y acabados
                </span>
              </h2>

              <div className="space-y-4 text-sm font-light leading-relaxed text-gray-600">
                <p>
                  Nuestra misión es ser líderes en la industria de pinturas,
                  ofreciendo productos de alta calidad y soluciones, innovando y
                  satisfaciendo las necesidades de nuestros clientes en el
                  sector arquitectónico.
                </p>
                <p>
                  Nos comprometemos a proporcionar pinturas, masillas, vinilos,
                  esmaltes, barnices, pegamentos para ensamblar madera, lacas
                  catalizadas y selladores catalizados que cumplan con los más
                  altos estándares de rendimiento, durabilidad y sostenibilidad.
                </p>
                <p>
                  A través de la excelencia en la fabricación y el compromiso,
                  buscamos ser reconocidos como un socio confiable y preferido
                  por arquitectos, constructores y profesionales de la pintura
                  en todo el mundo.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#061540] py-20 text-white">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:px-12">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <span className="inline-block h-2 w-2 rounded-full bg-[#f0c040]" />
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#f0c040]">
                  Nuestra visión
                </span>
              </div>

              <h2 className="mb-6 text-3xl font-bold leading-tight">
                Referente de excelencia{" "}
                <span className="text-[#f0c040]">
                  nacional e internacional
                </span>
              </h2>

              <div className="space-y-4 text-sm font-light leading-relaxed text-white/70">
                <p>
                  Nuestra visión es convertirnos en un punto referente de
                  excelencia y calidad en la industria de pinturas, siendo
                  reconocidos a nivel nacional e internacional por nuestros
                  productos innovadores y soluciones de vanguardia.
                </p>
                <p>
                  Buscamos ser líderes en el mercado, superando las expectativas
                  de nuestros clientes y estableciendo relaciones duraderas
                  basadas en la confianza y la satisfacción.
                </p>
                <p>
                  Nos esforzamos por ser una empresa sostenible, comprometida
                  con el cuidado del medio ambiente y la responsabilidad social.
                  A través de la inversión en investigación y desarrollo, la
                  mejora continua y el talento de nuestro equipo, aspiramos a
                  marcar la diferencia en la industria de la pintura.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-2 rounded-3xl bg-white/5 blur-xl" />

              <Image
                src="/assets/about/vision.webp"
                alt="Visión PVC Colors"
                width={700}
                height={500}
                className="relative h-95 w-full rounded-2xl border border-white/10 object-cover shadow-2xl"
              />

              <div className="absolute -bottom-5 -left-5 rounded-2xl bg-[#f0c040] px-5 py-4 text-[#061540] shadow-2xl">
                <p className="text-2xl font-extrabold">Visión</p>
                <p className="text-[11px] uppercase tracking-widest text-[#061540]/60">
                  Nuestro futuro
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}