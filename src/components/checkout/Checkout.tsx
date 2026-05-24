"use client";

import Link from "next/link";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { ArrowLeft, Loader2, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { useCartStore } from "@/store/cart-store";
import { useCreateWompiCheckout } from "@/hooks/public/checkout/useCheckoutWompi";
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";

const formatPrice = (price: number) =>
    new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0,
    }).format(price);

const documentTypes = [
    { value: "CEDULA_CIUDADANIA", label: "Cédula de ciudadanía" },
    { value: "CEDULA_EXTRANJERIA", label: "Cédula de extranjería" },
    { value: "NIT", label: "NIT" },
    { value: "PASAPORTE", label: "Pasaporte" },
    { value: "TARJETA_IDENTIDAD", label: "Tarjeta de identidad" },
    { value: "OTRO", label: "Otro" },
];

export function Checkout() {
    const { cart, totalPrice, clearCart } = useCartStore();
    const { mutateAsync, isPending } = useCreateWompiCheckout();

    const [form, setForm] = useState({
        fullName: "",
        documentType: "CEDULA_CIUDADANIA",
        documentNumber: "",
        address: "",
        email: "",
        phone: "",
        city: "",
        department: "",
        country: "Colombia",
    });

    const updateField = (field: keyof typeof form, value: string) => {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (cart.length === 0) {
            toast.error("Tu carrito está vacío.");
            return;
        }

        try {
            const response = await mutateAsync({
                customer: form,
                cart,
            });

            const paymentUrl = response.data.paymentUrl;

            if (!paymentUrl) {
                toast.error("No se pudo generar el link de pago.");
                return;
            }

            clearCart();
            window.location.href = paymentUrl;
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Error iniciando el pago."
            );
        }
    };

    if (cart.length === 0) {
        return (
            <main className="min-h-screen bg-[#f4f5f9] px-5 py-16">
                <section className="mx-auto max-w-xl rounded-3xl bg-white p-8 text-center shadow-sm">
                    <ShoppingCart className="mx-auto mb-4 text-[#061540]/25" size={48} />

                    <h1 className="text-2xl font-black text-[#061540]">
                        Tu carrito está vacío
                    </h1>

                    <p className="mt-2 text-sm text-[#061540]/60">
                        Agrega productos antes de ir al checkout.
                    </p>

                    <Link
                        href="/lines"
                        className="mt-6 inline-flex rounded-xl bg-[#061540] px-6 py-3 text-sm font-black text-white"
                    >
                        Ver productos
                    </Link>
                </section>
            </main>
        );
    }

    return (
        <>
            <Header />
            <main className="min-h-screen bg-[#f4f5f9] px-5 py-8">
                <section className="mx-auto max-w-6xl">
                    <Link
                        href="/lines"
                        className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-[#061540]/70 hover:text-[#061540]"
                    >
                        <ArrowLeft size={16} />
                        Seguir comprando
                    </Link>

                    <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
                        <form
                            onSubmit={handleSubmit}
                            className="rounded-3xl bg-white p-6 shadow-sm"
                        >
                            <h1 className="text-3xl font-black text-[#061540]">
                                Datos de compra
                            </h1>

                            <p className="mt-2 text-sm text-[#061540]/55">
                                Completa tus datos para continuar al portal de pagos.
                            </p>

                            <div className="mt-6 grid gap-4 md:grid-cols-2">
                                <Input
                                    label="Nombre completo"
                                    value={form.fullName}
                                    onChange={(value) => updateField("fullName", value)}
                                />

                                <Select
                                    label="Tipo de documento"
                                    value={form.documentType}
                                    onChange={(value) => updateField("documentType", value)}
                                    options={documentTypes}
                                />

                                <Input
                                    label="Número de documento"
                                    value={form.documentNumber}
                                    onChange={(value) => updateField("documentNumber", value)}
                                />

                                <Input
                                    label="Correo electrónico"
                                    type="email"
                                    value={form.email}
                                    onChange={(value) => updateField("email", value)}
                                />

                                <Input
                                    label="Teléfono"
                                    value={form.phone}
                                    onChange={(value) => updateField("phone", value)}
                                />

                                <Input
                                    label="Dirección"
                                    value={form.address}
                                    onChange={(value) => updateField("address", value)}
                                />

                                <Input
                                    label="Ciudad"
                                    value={form.city}
                                    onChange={(value) => updateField("city", value)}
                                />

                                <Input
                                    label="Departamento"
                                    value={form.department}
                                    onChange={(value) => updateField("department", value)}
                                />

                                <Input
                                    label="País"
                                    value={form.country}
                                    onChange={(value) => updateField("country", value)}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isPending}
                                className="mt-8 flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-[#35c791] text-sm font-black text-white transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
                            >
                                {isPending && <Loader2 className="animate-spin" size={18} />}
                                Continuar al pago
                            </button>
                        </form>

                        <aside className="h-fit rounded-3xl bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-black text-[#061540]">
                                Resumen del pedido
                            </h2>

                            <div className="mt-5 space-y-4">
                                {cart.map((item) => (
                                    <div key={item.cartItemId} className="flex gap-3 border-b pb-4">
                                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                                            {item.productImage && (
                                                <Image
                                                    src={item.productImage}
                                                    alt={item.productName}
                                                    fill
                                                    className="object-cover"
                                                />
                                            )}
                                        </div>

                                        <div className="flex-1">
                                            <p className="text-sm font-black text-[#061540]">
                                                {item.productName}
                                            </p>

                                            <p className="mt-1 text-xs text-[#061540]/50">
                                                {item.presentationName} · x{item.quantity}
                                            </p>

                                            {item.colorName && (
                                                <p className="mt-1 text-xs text-[#061540]/50">
                                                    Color: {item.colorName}
                                                </p>
                                            )}
                                        </div>

                                        <p className="text-sm font-black text-[#061540]">
                                            {formatPrice(item.price * item.quantity)}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-5 flex items-center justify-between">
                                <span className="text-sm font-bold text-[#061540]/60">
                                    Total
                                </span>

                                <span className="text-2xl font-black text-[#061540]">
                                    {formatPrice(totalPrice())}
                                </span>
                            </div>
                        </aside>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

function Input({
    label,
    value,
    onChange,
    type = "text",
}: {
    label: string;
    value: string;
    type?: string;
    onChange: (value: string) => void;
}) {
    return (
        <label className="block">
            <span className="mb-1.5 block text-xs font-black uppercase tracking-wide text-[#061540]/50">
                {label}
            </span>

            <input
                required
                type={type}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="h-12 w-full rounded-xl border border-[#061540]/12 bg-[#f4f5f9] px-4 text-sm font-semibold text-[#061540] outline-none transition focus:border-[#061540]"
            />
        </label>
    );
}

function Select({
    label,
    value,
    onChange,
    options,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
}) {
    return (
        <label className="block">
            <span className="mb-1.5 block text-xs font-black uppercase tracking-wide text-[#061540]/50">
                {label}
            </span>

            <select
                required
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="h-12 w-full rounded-xl border border-[#061540]/12 bg-[#f4f5f9] px-4 text-sm font-semibold text-[#061540] outline-none transition focus:border-[#061540]"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </label>
    );
}