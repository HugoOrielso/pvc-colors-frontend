"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  HeartHandshake,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const stats = [
  { num: "500+", label: "Colores" },
  { num: "15+",  label: "Líneas" },
  { num: "20",   label: "Años" },
];

const values = [
  {
    num: "01",
    icon: ShieldCheck,
    title: "Calidad",
    text: "Productos confiables para acabados duraderos y profesionales en cada proyecto.",
  },
  {
    num: "02",
    icon: HeartHandshake,
    title: "Compromiso",
    text: "Nos presentamos como proveedores y aliados estratégicos en sus negocios.",
  },
  {
    num: "03",
    icon: Sparkles,
    title: "Innovación",
    text: "Mejoramos constantemente nuestros productos para responder al sector.",
  },
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
  "Pinturas", "Vinilos", "Esmaltes", "Masillas",
  "Barnices", "Selladores", "Lacas", "Pegamentos",
  "Anticorrosivos", "Pasta Fina", "Pasta Gruesa",
];

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
export default function AboutPage() {
  return (
    <>
      <Header />

      {/* Poppins via Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
        .pvc-about, .pvc-about * { font-family: 'Poppins', sans-serif !important; }

        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track { animation: marquee 24s linear infinite; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up  { animation: fadeUp 0.6s ease both; }
        .delay-1  { animation-delay: 0.12s; }
        .delay-2  { animation-delay: 0.24s; }
        .delay-3  { animation-delay: 0.36s; }
        .delay-4  { animation-delay: 0.48s; }
      `}</style>

      <main className="pvc-about bg-white text-[#0d1b3e] min-h-screen">

        {/* ══════════════════════════════════
            HERO — azul marino igual que home
        ══════════════════════════════════ */}
        <section className="bg-[#061540] text-white relative overflow-hidden">
          {/* glow blobs */}
          <div className="absolute -top-32 -left-32 w-125 h-125 rounded-full bg-blue-700/20 blur-3xl pointer-events-none" />
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-20 grid lg:grid-cols-2 gap-14 items-center">

            {/* LEFT */}
            <div className="space-y-7">
              <div className="fade-up inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 text-xs font-medium tracking-widest uppercase text-[#f0c040]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f0c040] inline-block" />
                Línea Premium
              </div>

              <h1 className="fade-up delay-1 text-4xl lg:text-5xl font-bold leading-tight">
                Distribuidora
                <br />
                <span className="text-[#f0c040]">PVC Colors</span>
                <br />
                S.A.S
              </h1>

              <p className="fade-up delay-2 text-sm lg:text-base text-white/70 leading-relaxed font-light max-w-lg">
                Empresa colombiana ubicada en Cúcuta, Norte de Santander,
                dedicada a la fabricación de productos para la industria de
                la construcción. Nos presentamos como proveedores y futuros
                aliados en sus negocios.
              </p>

              <div className="fade-up delay-3 flex flex-wrap gap-4">
                <Link
                  href="#mision"
                  className="inline-flex items-center gap-2 bg-[#f0c040] text-[#061540] font-semibold text-sm px-6 py-3 rounded-full hover:bg-yellow-300 transition-colors"
                >
                  Conoce más
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="#contacto"
                  className="inline-flex items-center gap-2 border border-white/25 text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-white/10 transition-colors"
                >
                  Contáctanos
                </Link>
              </div>

              {/* stats — mismos que home */}
              <div className="fade-up delay-4 flex gap-10 pt-2">
                {stats.map((s) => (
                  <div key={s.label}>
                    <p className="text-3xl font-extrabold text-[#f0c040]">{s.num}</p>
                    <p className="text-[11px] tracking-widest uppercase text-white/50 font-medium mt-0.5">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — imagen */}
            <div className="relative fade-up delay-2">
              <div className="absolute -inset-3 rounded-3xl bg-white/5 blur-xl" />
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <Image
                  src="/assets/about/teamBusinnes.webp"
                  alt="Equipo PVC Colors"
                  width={700}
                  height={500}
                  className="w-full h-85 lg:h-100 object-cover"
                />
                <div className="absolute top-4 left-4 bg-white/10 backdrop-blur border border-white/20 rounded-xl px-4 py-2 flex items-center gap-2">
                  <MapPin size={13} className="text-[#f0c040]" />
                  <span className="text-xs font-medium text-white">Cúcuta, Colombia</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            MARQUEE — franja dorada
        ══════════════════════════════════ */}
        <div className="bg-[#f0c040] py-3 overflow-hidden whitespace-nowrap">
          <div className="marquee-track inline-flex gap-10">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="inline-flex items-center gap-10">
                <span className="text-[11px] font-semibold tracking-widest uppercase text-[#061540]">
                  {item}
                </span>
                <span className="text-[#061540]/30 text-sm">·</span>
              </span>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════
            SOBRE NOSOTROS
        ══════════════════════════════════ */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
          <div className="flex items-center gap-3 mb-10">
            <span className="w-2 h-2 rounded-full bg-[#f0c040] inline-block" />
            <span className="text-[11px] font-semibold tracking-widest uppercase text-[#f0c040]">
              Sobre nosotros
            </span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* texto */}
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold leading-tight mb-6">
                Empresa colombiana al servicio
                <br />
                de la{" "}
                <span className="border-b-4 border-[#f0c040]">construcción</span>
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-4 font-light">
                Empresa Colombiana ubicada en la ciudad de Cúcuta, Norte de
                Santander, dedicada a la fabricación de productos para acabados
                de interior y exterior en la industria de la construcción.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed font-light">
                Nos ponemos en contacto para presentarnos como Proveedores y
                futuros aliados en sus negocios. Conozca nuestros productos y
                los beneficios que tenemos para el sector de la construcción.
              </p>
            </div>

            {/* líneas de producto */}
            <div className="grid sm:grid-cols-2 gap-5">
              {lines.map((line) => (
                <div
                  key={line.tag}
                  className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md hover:border-[#f0c040] transition-all duration-300"
                >
                  <div className="inline-flex items-center gap-2 bg-[#061540] text-white text-[10px] font-semibold tracking-widest uppercase rounded-full px-3 py-1 mb-5">
                    {line.tag}
                  </div>
                  <ul className="space-y-2">
                    {line.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-gray-700 font-light">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#f0c040] shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            VALORES
        ══════════════════════════════════ */}
        <section className="bg-gray-50 border-y border-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid md:grid-cols-3 gap-6">
              {values.map((v) => {
                const Icon = v.icon;
                return (
                  <div
                    key={v.title}
                    className="group bg-white rounded-2xl border border-gray-100 p-7 hover:border-[#f0c040] hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl bg-[#061540] flex items-center justify-center group-hover:bg-[#f0c040] transition-colors">
                        <Icon size={22} className="text-white group-hover:text-[#061540] transition-colors" />
                      </div>
                      <span className="text-3xl font-extrabold text-gray-100 group-hover:text-[#f0c040]/30 transition-colors">
                        {v.num}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-[#061540] mb-2">{v.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed font-light">{v.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            MISIÓN
        ══════════════════════════════════ */}
        <section id="mision" className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* imagen */}
            <div className="relative order-2 lg:order-1">
              <div className="absolute -inset-2 rounded-3xl bg-[#061540]/5 blur-xl" />
              <Image
                src="/assets/about/target.webp"
                alt="Misión PVC Colors"
                width={700}
                height={500}
                className="relative rounded-2xl w-full h-85 object-cover shadow-xl"
              />
              <div className="absolute -bottom-5 -right-5 bg-[#061540] text-white rounded-2xl px-5 py-4 shadow-2xl">
                <p className="text-2xl font-extrabold text-[#f0c040]">Misión</p>
                <p className="text-[11px] text-white/60 uppercase tracking-widest">Nuestro propósito</p>
              </div>
            </div>

            {/* texto */}
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#f0c040] inline-block" />
                <span className="text-[11px] font-semibold tracking-widest uppercase text-[#f0c040]">
                  Nuestra misión
                </span>
              </div>

              <h2 className="text-3xl font-bold leading-tight mb-6">
                Líderes en la industria de{" "}
                <span className="border-b-4 border-[#f0c040]">pinturas y acabados</span>
              </h2>

              <div className="space-y-4 text-sm text-gray-600 leading-relaxed font-light">
                <p>
                  Nuestra misión es ser líderes en la industria de pinturas,
                  ofreciendo productos de alta calidad y soluciones, innovando y
                  satisfaciendo las necesidades de nuestros clientes en el sector
                  arquitectónico.
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

        {/* ══════════════════════════════════
            VISIÓN — sección azul (2.° uso del azul)
        ══════════════════════════════════ */}
        <section className="bg-[#061540] text-white py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-14 items-center">

            {/* texto */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#f0c040] inline-block" />
                <span className="text-[11px] font-semibold tracking-widest uppercase text-[#f0c040]">
                  Nuestra visión
                </span>
              </div>

              <h2 className="text-3xl font-bold leading-tight mb-6">
                Referente de excelencia{" "}
                <span className="text-[#f0c040]">nacional e internacional</span>
              </h2>

              <div className="space-y-4 text-sm text-white/70 leading-relaxed font-light">
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

            {/* imagen */}
            <div className="relative">
              <div className="absolute -inset-2 rounded-3xl bg-white/5 blur-xl" />
              <Image
                src="/assets/about/vision.webp"
                alt="Visión PVC Colors"
                width={700}
                height={500}
                className="relative rounded-2xl w-full h-95 object-cover shadow-2xl border border-white/10"
              />
              <div className="absolute -bottom-5 -left-5 bg-[#f0c040] text-[#061540] rounded-2xl px-5 py-4 shadow-2xl">
                <p className="text-2xl font-extrabold">Visión</p>
                <p className="text-[11px] text-[#061540]/60 uppercase tracking-widest">Nuestro futuro</p>
              </div>
            </div>
          </div>
        </section>


      </main>

      <Footer />
    </>
  );
}