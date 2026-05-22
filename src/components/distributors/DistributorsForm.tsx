"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    Building2,
    MapPin,
    Phone,
    MessageCircle,
    Save,
} from "lucide-react";

import { toast } from "sonner";

import {
    useCreateDistributor,
    useUpdateDistributor,
} from "@/hooks/private/distributors/useDistributors";

interface DistributorFormProps {
    distributorId?: string;
    initialData?: {
        name: string;
        city: string;
        address: string;
        phone: string;
        whatsapp: string;
        keyword: string;
        lat: number;
        lng: number;
    };
}

export default function DistributorForm({
    distributorId,
    initialData,
}: DistributorFormProps) {
    const router = useRouter();

    const createMutation = useCreateDistributor();
    const updateMutation = useUpdateDistributor(distributorId ?? "");

    const isEditing = Boolean(distributorId);

    const [form, setForm] = useState({
        name: "",
        city: "",
        address: "",
        phone: "",
        whatsapp: "",
        keyword: "",
        lat: "",
        lng: "",
    });

    const isFirstRender = useRef(true);

    useEffect(() => {
        if (!initialData) return;

        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        setForm({
            name: initialData.name,
            city: initialData.city,
            address: initialData.address,
            phone: initialData.phone,
            whatsapp: initialData.whatsapp,
            keyword: initialData.keyword,
            lat: String(initialData.lat),
            lng: String(initialData.lng),
        });
    }, [initialData]);
    const isLoading =
        createMutation.isPending || updateMutation.isPending;

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (
            !form.name ||
            !form.city ||
            !form.address ||
            !form.phone
        ) {
            toast.error("Completa todos los campos obligatorios");
            return;
        }

        try {
            const payload = {
                name: form.name,
                city: form.city,
                address: form.address,
                phone: form.phone,
                whatsapp: form.whatsapp,
                keyword: form.keyword,
                lat: Number(form.lat),
                lng: Number(form.lng),
            };

            if (isEditing && distributorId) {
                await updateMutation.mutateAsync(payload);

                toast.success("Distribuidor actualizado");
            } else {
                await createMutation.mutateAsync(payload);

                toast.success("Distribuidor creado");
            }

            router.push("/dashboard/distributors");
            router.refresh();
        } catch {
            toast.error("Error guardando distribuidor");
        }
    };

    return (
        <section className="space-y-6 p-4">
            <div className="flex items-center justify-between rounded-3xl border bg-white p-6 shadow-sm">
                <div>
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="mb-4 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900"
                    >
                        <ArrowLeft size={16} />
                        Volver
                    </button>

                    <h1 className="text-2xl font-semibold text-slate-950">
                        {isEditing
                            ? "Editar distribuidor"
                            : "Crear distribuidor"}
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Gestiona información, contacto y ubicación.
                    </p>
                </div>

                <button
                    type="submit"
                    form="distributor-form"
                    disabled={isLoading}
                    className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800"
                >
                    <Save size={16} />

                    {isLoading
                        ? "Guardando..."
                        : isEditing
                            ? "Actualizar"
                            : "Guardar"}
                </button>
            </div>

            <form
                id="distributor-form"
                onSubmit={handleSubmit}
                className="grid gap-6 lg:grid-cols-2"
            >
                <div className="space-y-6 rounded-3xl border bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                            <Building2 size={20} />
                        </div>

                        <div>
                            <h2 className="font-semibold text-slate-950">
                                Información general
                            </h2>

                            <p className="text-sm text-slate-500">
                                Datos principales del distribuidor.
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-4">
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Nombre"
                            className="rounded-2xl border px-4 py-3 text-sm"
                        />

                        <input
                            name="city"
                            value={form.city}
                            onChange={handleChange}
                            placeholder="Ciudad"
                            className="rounded-2xl border px-4 py-3 text-sm"
                        />

                        <input
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            placeholder="Dirección"
                            className="rounded-2xl border px-4 py-3 text-sm"
                        />

                        <input
                            name="keyword"
                            value={form.keyword}
                            onChange={handleChange}
                            placeholder="Keyword"
                            className="rounded-2xl border px-4 py-3 text-sm"
                        />
                    </div>
                </div>

                <div className="space-y-6 rounded-3xl border bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                            <MapPin size={20} />
                        </div>

                        <div>
                            <h2 className="font-semibold text-slate-950">
                                Ubicación y contacto
                            </h2>

                            <p className="text-sm text-slate-500">
                                Coordenadas y datos de contacto.
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-4">
                        <div className="relative">
                            <Phone
                                size={16}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                            />

                            <input
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="Teléfono"
                                className="w-full rounded-2xl border py-3 pl-11 pr-4 text-sm"
                            />
                        </div>

                        <div className="relative">
                            <MessageCircle
                                size={16}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                            />

                            <input
                                name="whatsapp"
                                value={form.whatsapp}
                                onChange={handleChange}
                                placeholder="WhatsApp"
                                className="w-full rounded-2xl border py-3 pl-11 pr-4 text-sm"
                            />
                        </div>

                        <input
                            name="lat"
                            value={form.lat}
                            onChange={handleChange}
                            placeholder="Latitud"
                            className="rounded-2xl border px-4 py-3 text-sm"
                        />

                        <input
                            name="lng"
                            value={form.lng}
                            onChange={handleChange}
                            placeholder="Longitud"
                            className="rounded-2xl border px-4 py-3 text-sm"
                        />
                    </div>
                </div>
            </form>
        </section>
    );
}