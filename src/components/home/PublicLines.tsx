"use client";

import { useProductLinesPublic } from "@/hooks/public/lines/usePublicLines";
import { ArrowRight, Boxes } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { RainbowButton } from "../ui/rainbow-button";

const PublicLines = () => {
    const { data, isLoading } = useProductLinesPublic();

    const lines = data?.data ?? [];

    return (
        <section
            id="lineas"
            className="relative overflow-hidden  px-6 py-24 lg:px-8"
        >
            <div className="absolute left-0 top-10 h-72 w-72 rounded-full bg-[#ffcc00]/20 blur-3xl" />
            <div className="absolute bottom-20 right-0 h-96 w-96 rounded-full bg-[#071d78]/10 blur-3xl" />

            <div className="relative mx-auto max-w-7xl">
                <div className="mb-14 grid gap-8  md:items-end">
                    <div>
                        <div className="mb-4 inline-flex items-center gap-3 rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-black/5">
                            <span className="h-2 w-2 rounded-full bg-[#ffcc00]" />
                            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#071d78]">
                                Nuestras líneas
                            </p>
                        </div>

                        <h2 className=" text-3xl font-black tracking-tight text-[#061540] md:text-6xl">
                            Productos para cada superficie
                        </h2>

                        <p className="my-3  text-sm leading-7 text-[#061540]/60">
                            Selecciona una línea para ver sus productos, colores disponibles,
                            presentaciones y fichas técnicas.
                        </p>
                        <Link href="/lines" >
                            <RainbowButton variant="outline">Ver todas las líneas</RainbowButton>
                        </Link>
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
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {lines.map((line, index) => (
                            <Link
                                key={line.id}
                                href={`/lines/${line.id}`}
                                className="group relative rounded-[2rem] bg-white p-3 shadow-sm ring-1 ring-black/5 transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
                            >
                                <div className="absolute -inset-px rounded-[2rem] bg-linear-to-br from-[#ffcc00]/0 via-[#071d78]/0 to-[#ff2e93]/0 opacity-0 transition group-hover:from-[#ffcc00]/35 group-hover:via-[#071d78]/15 group-hover:to-[#ff2e93]/35 group-hover:opacity-100" />

                                <div className="relative overflow-hidden rounded-[1.5rem] bg-[#071d78]/5">
                                    <div className="relative h-72 overflow-hidden">
                                        <Image
                                            src={line.image}
                                            alt={line.name}
                                            fill
                                            className="object-cover transition duration-700 group-hover:scale-110"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />

                                        <div className="absolute inset-0 bg-linear-to-t from-[#061540]/90 via-[#061540]/25 to-transparent" />

                                        <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-black uppercase text-[#071d78] shadow-lg backdrop-blur">
                                            <span className="h-2 w-2 rounded-full bg-[#ffcc00]" />
                                            {line._count?.products ?? 0} productos
                                        </div>

                                        <div className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#071d78]/90 text-sm font-black text-white shadow-lg">
                                            {String(index + 1).padStart(2, "0")}
                                        </div>

                                        <div className="absolute bottom-5 left-5 right-5">
                                            <h3 className="text-3xl font-black leading-none text-white">
                                                {line.name}
                                            </h3>
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

    );
};

export default PublicLines;