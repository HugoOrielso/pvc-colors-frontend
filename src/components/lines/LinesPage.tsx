"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Boxes, Sparkles } from "lucide-react";
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { useProductLinesPublic } from "@/hooks/public/lines/usePublicLines";
import EmptyLinesAnimation from "@/components/lines/LottieLineAnimation";
import { ViewTransition } from 'react'

export default function LinesPage() {
    const { data, isLoading } = useProductLinesPublic();

    const lines = Array.isArray(data?.data) ? data.data : [];
    return (
        <main className="min-h-screen grid grid-rows-[auto_1fr_auto]">
            <Header />
            <div>
                <section className="relative overflow-hidden bg-[#071d78]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,204,0,0.25),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,0,122,0.22),transparent_28%)]" />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-size-[32px_32px]" />

                    <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-28">
                        <div>
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.2em] text-[#ffcc00] backdrop-blur">
                                <Sparkles className="h-4 w-4" />
                                Líneas PVC Colors
                            </div>

                            <h1 className="max-w-3xl text-5xl font-black leading-[0.95] tracking-tight text-white md:text-7xl">
                                Encuentra la línea ideal para cada proyecto
                            </h1>

                            <p className="mt-6 max-w-2xl text-base leading-8 text-white/75 md:text-lg">
                                Explora nuestras líneas de productos, colores, presentaciones y
                                soluciones especializadas para diferentes superficies y
                                necesidades.
                            </p>

                            <div className="mt-10 flex flex-wrap gap-4">
                                <a
                                    href="#lineas"
                                    className="inline-flex items-center gap-2 rounded-2xl bg-[#ffcc00] px-6 py-4 text-sm font-black text-[#061540] shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-white"
                                >
                                    Ver líneas
                                    <ArrowRight className="h-4 w-4" />
                                </a>

                                <Link
                                    href="/calculator"
                                    className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-6 py-4 text-sm font-bold text-white backdrop-blur transition hover:bg-white hover:text-[#061540]"
                                >
                                    Calculadora
                                </Link>
                            </div>
                        </div>

                        <div className="relative hidden items-center justify-center lg:flex">
                            <div className="relative  rounded-[3rem] bg-white/10 p-5 shadow-2xl backdrop-blur">
                                <div className="absolute -right-8 -top-8 rounded-3xl bg-white px-5 py-4 shadow-xl">
                                    <p className="text-xs font-black uppercase text-[#071d78]/50">
                                        Productos
                                    </p>
                                    <p className="text-3xl font-black text-[#071d78]">
                                        {lines.length || "0"}+
                                    </p>
                                </div>

                                <div className="flex h-full w-full items-center justify-center rounded-[2.4rem] bg-linear-to-br from-white/20 to-white/5">
                                    <EmptyLinesAnimation />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="h-1.5 bg-linear-to-r from-[#ffcc00] via-[#ff8a00] to-[#ff2e93]" />
                </section>

                <section
                    id="lineas"
                    className="relative overflow-hidden  px-6 py-24 lg:px-8"
                >
                    <div className="absolute left-0 top-10 h-72 w-72 rounded-full bg-[#ffcc00]/20 blur-3xl" />
                    <div className="absolute bottom-20 right-0 h-96 w-96 rounded-full bg-[#071d78]/10 blur-3xl" />

                    <div className="relative mx-auto max-w-7xl">
                        <div className="mb-14 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
                            <div>
                                <div className="mb-4 inline-flex items-center gap-3 rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-black/5">
                                    <span className="h-2 w-2 rounded-full bg-[#ffcc00]" />
                                    <p className="text-xs font-black uppercase tracking-[0.22em] text-[#071d78]">
                                        Nuestras líneas
                                    </p>
                                </div>

                                <h2 className="max-w-2xl text-4xl font-black tracking-tight text-[#061540] md:text-6xl">
                                    Productos para cada superficie
                                </h2>

                                <p className="mt-5 max-w-xl text-sm leading-7 text-[#061540]/60">
                                    Selecciona una línea para ver sus productos, colores disponibles,
                                    presentaciones y fichas técnicas.
                                </p>
                            </div>

                            <div className="relative overflow-hidden rounded-[1.75rem] bg-[#071d78] p-5 text-white shadow-xl">
                                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#ffcc00]/30 blur-xl" />

                                <p className="relative text-xs font-bold uppercase tracking-widest text-white/55">
                                    Líneas disponibles
                                </p>

                                <div className="relative mt-2 flex items-end gap-2">
                                    <p className="text-5xl font-black text-[#ffcc00]">{lines.length}</p>
                                    <p className="pb-2 text-sm font-bold text-white/70">categorías</p>
                                </div>
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <div
                                        key={index}
                                        className="h-97.5 animate-pulse rounded-[2rem] bg-white shadow-sm"
                                    />
                                ))}
                            </div>
                        ) : lines.length === 0 ? (
                            <div className="relative overflow-hidden rounded-[2rem] border border-dashed border-[#071d78]/20 bg-white p-12 text-center shadow-sm">
                                <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-[#ffcc00] via-[#ff8a00] to-[#ff2e93]" />

                                <Boxes className="mx-auto mb-4 h-12 w-12 text-[#071d78]" />

                                <h3 className="text-2xl font-black text-[#061540]">
                                    Aún no hay líneas creadas
                                </h3>

                                <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#061540]/60">
                                    Cuando agregues líneas de producto, aparecerán aquí de forma
                                    automática.
                                </p>
                            </div>
                        ) : (
                            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                                {lines.map((line, index) => (
                                    <Link
                                        key={line.id}
                                        href={`/lines/${line.id}`}
                                        transitionTypes={["nav-forward"]}
                                        className="group relative rounded-[2rem] bg-white p-3 shadow-sm ring-1 ring-black/5 transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
                                    >
                                        <div className="absolute -inset-px rounded-[2rem] bg-linear-to-br from-[#ffcc00]/0 via-[#071d78]/0 to-[#ff2e93]/0 opacity-0 transition group-hover:from-[#ffcc00]/35 group-hover:via-[#071d78]/15 group-hover:to-[#ff2e93]/35 group-hover:opacity-100" />

                                        <div className="relative overflow-hidden rounded-[1.5rem] bg-[#071d78]/5">
                                            <div className="relative h-72 overflow-hidden">
                                                <ViewTransition name={`line-image-${line.id}`}>
                                                    <div className="relative h-72 overflow-hidden">
                                                        <Image
                                                            src={line.image}
                                                            alt={line.name}
                                                            fill
                                                            priority={index < 3}
                                                            className="object-cover transition duration-700 group-hover:scale-110"
                                                            sizes="(max-width: 768px) 100vw, 33vw"
                                                        />
                                                    </div>
                                                </ViewTransition>

                                                <div className="absolute inset-0 bg-linear-to-t from-[#061540]/90 via-[#061540]/25 to-transparent" />

                                                <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-black uppercase text-[#071d78] shadow-lg backdrop-blur">
                                                    <span className="h-2 w-2 rounded-full bg-[#ffcc00]" />
                                                    {line._count?.products ?? 0} productos
                                                </div>

                                                <div className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#071d78]/90 text-sm font-black text-white shadow-lg">
                                                    {String(index + 1).padStart(2, "0")}
                                                </div>

                                                <div className="absolute bottom-5 left-5 right-5">
                                                    <ViewTransition name={`line-title-${line.id}`}>
                                                        <h3 className="text-3xl font-black leading-none text-white">
                                                            {line.name}
                                                        </h3>
                                                    </ViewTransition>
                                                </div>
                                            </div>

                                            <div className="bg-white p-6">
                                                <p className="line-clamp-2 min-h-14 text-sm leading-7 text-[#061540]/60">
                                                    {line.description}
                                                </p>

                                                <div className="mt-6 flex items-center justify-between border-t border-[#061540]/10 pt-5">
                                                    <span className="text-sm font-black text-[#071d78]">
                                                        Ver colores y presentaciones
                                                    </span>

                                                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#ffcc00] text-[#061540] shadow-md transition group-hover:translate-x-1 group-hover:bg-[#071d78] group-hover:text-white">
                                                        <ArrowRight className="h-5 w-5" />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
                    <div className="overflow-hidden rounded-[2rem] bg-[#071d78] p-8 shadow-xl md:p-10">
                        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
                            <div>
                                <p className="text-sm font-black uppercase tracking-[0.2em] text-[#ffcc00]">
                                    ¿Necesitas asesoría?
                                </p>
                                <h2 className="mt-3 text-3xl font-black text-white">
                                    Te ayudamos a elegir la línea correcta
                                </h2>
                                <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70">
                                    Cuéntanos qué superficie quieres trabajar y te orientamos con la
                                    mejor opción.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <Link
                                    href="/contact"
                                    className="rounded-2xl bg-white px-6 py-4 text-sm font-black text-[#071d78] transition hover:bg-[#ffcc00]"
                                >
                                    Contactar ahora
                                </Link>

                                <Link
                                    href="/calculator"
                                    className="rounded-2xl border border-white/20 px-6 py-4 text-sm font-black text-white transition hover:bg-white hover:text-[#071d78]"
                                >
                                    Usar calculadora
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </main>
    );
}