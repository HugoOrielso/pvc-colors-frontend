"use client";

import Image from "next/image";
import Link from "next/link";
import {
    ArrowLeft,
    ArrowRight,
    Boxes,
    Layers3,
    PaintBucket,
    PackageCheck,
    Sparkles,
} from "lucide-react";
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";
import { useParams } from "next/navigation";
import { useProductLineByIdPublic } from "@/hooks/public/lines/usePublicLines";
import { ViewTransition } from "react";

export default function LineDetailPage() {
    const params = useParams();
    const id = String(params.id);

    const { data, isLoading } = useProductLineByIdPublic(id);

    const line = data?.data;
    const products = line?.products ?? [];
    return (
        <main className="min-h-screen grid grid-rows-[auto_1fr_auto]">
            <Header />
            <div>
                {isLoading ? (
                    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
                        <div className="h-130 animate-pulse rounded-[3rem] bg-white" />
                    </section>
                ) : !line ? (
                    <section className="mx-auto max-w-4xl px-6 py-28 text-center lg:px-8">
                        <Boxes className="mx-auto mb-5 h-14 w-14 text-[#071d78]" />

                        <h1 className="text-4xl font-black">Línea no encontrada</h1>

                        <p className="mt-4 text-[#061540]/60">
                            La línea que estás buscando no existe o ya no está disponible.
                        </p>

                        <Link
                            href="/lines"
                            transitionTypes={["nav-back"]}
                            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white backdrop-blur transition hover:bg-white hover:text-[#071d78]"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Volver
                        </Link>
                    </section>
                ) : (
                    <>
                        <section className="relative overflow-hidden bg-[#071d78]">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,204,0,0.24),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(255,46,147,0.20),transparent_30%)]" />

                            <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-24">
                                <div className="order-2 lg:order-1">
                                    <Link transitionTypes={['nav-back']}
                                        href="/lines"
                                        className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white backdrop-blur transition hover:bg-white hover:text-[#071d78]"
                                    >
                                        <ArrowLeft className="h-4 w-4" />
                                        Volver
                                    </Link>

                                    <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#ffcc00] backdrop-blur">
                                        <Sparkles className="h-4 w-4" />
                                        Línea PVC Colors
                                    </div>
                                    <ViewTransition name={`line-title-${line.id}`}>
                                        <h1 className="max-w-3xl text-5xl font-black leading-[0.95] tracking-tight text-white md:text-7xl">
                                            {line.name}
                                        </h1>
                                    </ViewTransition>

                                    <p className="mt-6 max-w-2xl text-base leading-8 text-white/75 md:text-lg">
                                        {line.description}
                                    </p>

                                    <div className="mt-10 grid gap-4 sm:grid-cols-3">
                                        <div className="rounded-3xl bg-white/10 p-5 text-white backdrop-blur">
                                            <PackageCheck className="mb-3 h-6 w-6 text-[#ffcc00]" />
                                            <p className="text-3xl font-black">{products.length}</p>
                                            <p className="mt-1 text-xs font-bold uppercase tracking-widest text-white/55">
                                                Productos
                                            </p>
                                        </div>

                                        <div className="rounded-3xl bg-white/10 p-5 text-white backdrop-blur">
                                            <PaintBucket className="mb-3 h-6 w-6 text-[#ffcc00]" />
                                            <p className="text-3xl font-black">
                                                {products.reduce((total, product) => {
                                                    const colors =
                                                        product.colorGroups?.flatMap((group) => group.colors ?? []) ?? [];

                                                    return total + colors.length;
                                                }, 0)}
                                            </p>
                                            <p className="mt-1 text-xs font-bold uppercase tracking-widest text-white/55">
                                                Colores
                                            </p>
                                        </div>

                                        <div className="rounded-3xl bg-white/10 p-5 text-white backdrop-blur">
                                            <Layers3 className="mb-3 h-6 w-6 text-[#ffcc00]" />
                                            <p className="text-3xl font-black">
                                                {products.reduce(
                                                    (total, product) =>
                                                        total + product.presentations.length,
                                                    0
                                                )}
                                            </p>
                                            <p className="mt-1 text-xs font-bold uppercase tracking-widest text-white/55">
                                                Presentaciones
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="order-1 lg:order-2">
                                    <div className="relative overflow-hidden rounded-[3rem] bg-white/10 p-4 shadow-2xl backdrop-blur">
                                        <div className="relative h-90 overflow-hidden rounded-[2.4rem] md:h-130">

                                            <ViewTransition name={`line-image-${line.id}`}>
                                                <div className="relative h-90 overflow-hidden rounded-[2.4rem] md:h-130">
                                                    <Image
                                                        src={line.image}
                                                        alt={line.name}
                                                        fill
                                                        priority
                                                        className="object-cover"
                                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                                    />
                                                </div>
                                            </ViewTransition>

                                            <div className="absolute inset-0 bg-linear-to-t from-[#061540]/70 via-transparent to-transparent" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="h-1.5 bg-linear-to-r from-[#ffcc00] via-[#ff8a00] to-[#ff2e93]" />
                        </section>

                        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
                            <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                                <div>
                                    <p className="text-xs font-black uppercase tracking-[0.22em] text-[#071d78]">
                                        Productos relacionados
                                    </p>

                                    <h2 className="mt-3 text-2xl font-black tracking-tight md:text-4xl">
                                        Explora esta línea
                                    </h2>
                                </div>


                            </div>

                            {products.length === 0 ? (
                                <div className="rounded-[2rem] border border-dashed border-[#071d78]/20 bg-white p-12 text-center shadow-sm">
                                    <Boxes className="mx-auto mm-4 text-[#071d78]" />

                                    <h3 className="text-2xl font-black">
                                        Esta línea aún no tiene productos
                                    </h3>

                                    <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#061540]/60">
                                        Cuando agregues productos a esta línea, aparecerán aquí
                                        automáticamente.
                                    </p>
                                </div>
                            ) : (
                                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                                    {products.map((product) => {
                                        const mainImage = product.images?.[0];
                                        return (
                                            <Link
                                                key={product.id}
                                                href={`/products/${product.id}`}
                                                className="group overflow-hidden rounded-[2rem] bg-white p-3 shadow-sm ring-1 ring-black/5 transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
                                            >
                                                <div className="relative h-68 overflow-hidden rounded-[1.5rem] bg-[#071d78]/5">
                                                    <Image
                                                        src={mainImage?.url || "/placeholder-product.png"}
                                                        alt={mainImage?.alt || product.name}
                                                        fill
                                                        className="object-cover transition duration-700 group-hover:scale-110"
                                                        sizes="(max-width: 668px) 100vw, 28vw"
                                                    />

                                                    <div className="absolute inset-0 bg-linear-to-t from-[#061540]/80 via-[#061540]/15 to-transparent" />

                                                    <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-black uppercase text-[#071d78] shadow-lg backdrop-blur">
                                                        <span className="h-2 w-2 rounded-full bg-[#ffcc00]" />
                                                        {product.presentations.length} presentaciones
                                                    </div>

                                                    <div className="absolute bottom-5 left-5 right-5">
                                                        <h3 className="text-2xl font-black leading-tight text-white">
                                                            {product.name}
                                                        </h3>
                                                    </div>
                                                </div>

                                                <div className="p-5">
                                                    <p className="line-clamp-3 min-h-20 text-sm leading-7 text-[#061540]/60">
                                                        {product.description}
                                                    </p>

                                                    {/* <div className="mt-5 flex flex-wrap gap-2">
                                                        {colors.slice(0, 5).map((color) => (
                                                            <span
                                                                key={color.id}
                                                                className="h-6 w-6 rounded-full border border-black/10 shadow-sm"
                                                                style={{ backgroundColor: color.value }}
                                                                title={color.name || color.value}
                                                            />
                                                        ))}

                                                        {colors.length > 5 && (
                                                            <span className="flex h-6 items-center rounded-full bg-[#071d78]/8 px-2 text-xs font-black text-[#071d78]">
                                                                +{colors.length - 5}
                                                            </span>
                                                        )}
                                                    </div> */}

                                                    <div className="mt-6 flex items-center justify-between border-t border-[#061540]/10 pt-5">
                                                        <div className="flex items-center gap-3">
                                                            <span className="rounded-full bg-[#ffcc00]/25 px-3 py-2 text-xs font-black text-[#061540]">
                                                                Ver producto
                                                            </span>
                                                        </div>

                                                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#ffcc00] text-[#061540] transition group-hover:bg-[#071d78] group-hover:text-white">
                                                            <ArrowRight className="h-5 w-5" />
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            )}
                        </section>
                    </>
                )}
            </div>
            <Footer />
        </main>
    );
}