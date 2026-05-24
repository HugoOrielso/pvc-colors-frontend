"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Calculator, CheckCircle2, Ruler, Sparkles } from "lucide-react";
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";

const products = [
    {
        nombreProducto: "Esmalte sintético esmalcolor",
        imagenProducto: "/assets/calculator/emalcolor.webp",
        dimensionPorLitro: 5,
    },
    {
        nombreProducto: "Pasta profesional",
        imagenProducto: "/assets/calculator/pasta.webp",
        dimensionPorLitro: 6,
    },
    {
        nombreProducto: "Base anticorrosivo alquídico",
        imagenProducto: "/assets/calculator/anticorrosivo.webp",
        dimensionPorLitro: 8,
    },
    {
        nombreProducto: "Vinilo tipo 1",
        imagenProducto: "/assets/calculator/viniloTipoUno.webp",
        dimensionPorLitro: 10,
    },
    {
        nombreProducto: "Vinilo tipo 2",
        imagenProducto: "/assets/calculator/viniloTipoDos.webp",
        dimensionPorLitro: 4,
    },
    {
        nombreProducto: "Vinilo tipo 3",
        imagenProducto: "/assets/calculator/viniloTipoTres.webp",
        dimensionPorLitro: 3,
    },
    {
        nombreProducto: "Waterproofing",
        imagenProducto: "/assets/calculator/waterproofing.webp",
        dimensionPorLitro: 2,
    },
];

export default function PaintCalculator() {
    const [selectedProductName, setSelectedProductName] = useState(
        products[0].nombreProducto
    );
    const [height, setHeight] = useState("");
    const [width, setWidth] = useState("");

    const selectedProduct = useMemo(
        () =>
            products.find(
                (product) => product.nombreProducto === selectedProductName
            ) ?? products[0],
        [selectedProductName]
    );

    const area = Number(height) * Number(width);
    const liters = area > 0 ? area / selectedProduct.dimensionPorLitro : null;

    return (
        <>
            <Header />
            <div  className="fade-up delay-2">
                <section className="overflow-hidden bg-[#f5f8ff] px-4 py-10 text-[#061540] sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-8 text-center">
                            <p className="fade-up inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-wide text-blue-700 shadow-sm">
                                <Sparkles className="h-4 w-4" />
                                Calculadora PVC Color&apos;s
                            </p>

                            <h1 className="fade-up delay-1 mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                                Calcula cuánta pintura necesitas
                            </h1>

                            <p className="fade-up delay-2 mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                                Selecciona el producto, ingresa las medidas de la superficie y
                                obtén una estimación rápida de litros necesarios.
                            </p>
                        </div>

                        <div className="fade-up delay-3 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                            <article className="rounded-[2rem] border border-blue-100 bg-white p-5 shadow-xl shadow-blue-950/10 sm:p-6">
                                <div className="mb-5 flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#061540] text-white">
                                        <CheckCircle2 className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
                                            Paso 1
                                        </p>
                                        <h2 className="text-xl font-black">
                                            Selecciona el producto
                                        </h2>
                                    </div>
                                </div>

                                <div className="rounded-3xl bg-[#f8fafc] p-5">
                                    <div className="relative mx-auto h-64 w-full max-w-xs overflow-hidden">
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={selectedProduct.nombreProducto}
                                                initial={{ opacity: 0, scale: 0.92, y: 18 }}
                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.92, y: -18 }}
                                                transition={{ duration: 0.35, ease: "easeOut" }}
                                                className="absolute inset-0"
                                            >
                                                <Image
                                                    src={selectedProduct.imagenProducto}
                                                    alt={selectedProduct.nombreProducto}
                                                    fill
                                                    className="object-contain"
                                                    priority
                                                />
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>

                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={selectedProduct.nombreProducto}
                                            initial={{ opacity: 0, y: 12 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -12 }}
                                            transition={{ duration: 0.25 }}
                                            className="mt-5 text-center"
                                        >
                                            <h3 className="text-lg font-black">
                                                {selectedProduct.nombreProducto}
                                            </h3>

                                            <p className="mt-1 text-sm text-slate-500">
                                                Cubre aproximadamente{" "}
                                                <strong>{selectedProduct.dimensionPorLitro} m²</strong>{" "}
                                                por litro.
                                            </p>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                <div className="mt-5">
                                    <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                                        Producto
                                    </label>

                                    <select
                                        value={selectedProductName}
                                        onChange={(e) => setSelectedProductName(e.target.value)}
                                        className="h-12 w-full rounded-2xl border border-blue-100 bg-white px-4 text-sm font-semibold text-[#061540] outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                    >
                                        {products.map((product) => (
                                            <option
                                                key={product.nombreProducto}
                                                value={product.nombreProducto}
                                            >
                                                {product.nombreProducto}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </article>

                            <article className="rounded-[2rem] border border-blue-100 bg-white p-5 shadow-xl shadow-blue-950/10 sm:p-6">
                                <div className="mb-5 flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-700 text-white">
                                        <Ruler className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
                                            Paso 2
                                        </p>
                                        <h2 className="text-xl font-black">
                                            Dimensiones y medidas
                                        </h2>
                                    </div>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                                            Alto / largo
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={height}
                                            onChange={(e) => setHeight(e.target.value)}
                                            placeholder="Ej: 4"
                                            className="h-12 w-full rounded-2xl border border-blue-100 px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                                            Ancho
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={width}
                                            onChange={(e) => setWidth(e.target.value)}
                                            placeholder="Ej: 3"
                                            className="h-12 w-full rounded-2xl border border-blue-100 px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                        />
                                    </div>
                                </div>

                                <div className="mt-6 rounded-3xl bg-linear-to-br from-[#061540] to-blue-700 p-6 text-white">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                                            <Calculator className="h-6 w-6" />
                                        </div>

                                        <div>
                                            <p className="text-sm text-white/70">
                                                Resultado estimado
                                            </p>
                                            <h3 className="text-2xl font-black">
                                                {liters
                                                    ? `${liters.toFixed(2)} litros`
                                                    : "Ingresa medidas"}
                                            </h3>
                                        </div>
                                    </div>

                                    {liters && (
                                        <p className="mt-5 text-sm leading-6 text-white/90">
                                            Necesitas aproximadamente{" "}
                                            <strong>{liters.toFixed(2)} litros</strong> de{" "}
                                            <strong>{selectedProduct.nombreProducto}</strong> para
                                            cubrir <strong>{area} m²</strong> de superficie.
                                        </p>
                                    )}
                                </div>

                                <div className="mt-5 rounded-3xl border border-blue-100 bg-blue-50/60 p-5">
                                    <p className="text-sm leading-6 text-slate-700">
                                        <strong>Rendimiento estándar:</strong> con 1 litro de{" "}
                                        <strong>{selectedProduct.nombreProducto}</strong> puedes
                                        cubrir aproximadamente{" "}
                                        <strong>{selectedProduct.dimensionPorLitro} m²</strong> de
                                        superficie.
                                    </p>
                                </div>
                            </article>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}