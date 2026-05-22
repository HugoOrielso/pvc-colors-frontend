"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { usePublicDistributors } from "@/hooks/public/distributors/usePublicDistributors";
import { PublicDistributor } from "@/services/public/distributors/distributors.service";
import { DistributorSelect } from "./DistribuitorSelect";
import { DistributorHelpCard } from "./DistribuitorHelpCard";
import { DistributorMapCard } from "./DistributorMapCard";

export function DistributorLocations() {
    const { data: distributors = [], isLoading, isError } =
        usePublicDistributors();

    const [selectedDistributor, setSelectedDistributor] =
        useState<PublicDistributor | null>(null);

    const initialized = useRef(false);

    useEffect(() => {
        if (distributors.length > 0 && !initialized.current) {
            initialized.current = true;
            setSelectedDistributor(distributors[0]);
        }
    }, [distributors]);
    const selectedOption = useMemo(() => {
        if (!selectedDistributor) return null;

        return {
            value: selectedDistributor.id,
            label: `${selectedDistributor.name} - ${selectedDistributor.city}`,
        };
    }, [selectedDistributor]);

    const options = useMemo(() => {
        return distributors.map((item) => ({
            value: item.id,
            label: `${item.name} - ${item.city}`,
        }));
    }, [distributors]);

    const handleChangeDistributor = (id: string) => {
        const distributor = distributors.find((item) => item.id === id);

        if (distributor) {
            setSelectedDistributor(distributor);
        }
    };

    return (
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
                    Elige una ubicación para ver el mapa, dirección, teléfono de contacto
                    y acceso directo a WhatsApp.
                </p>
            </div>

            <div className="block lg:hidden mb-4">
                <DistributorHelpCard />
            </div>

            {isLoading && (
                <div className="flex min-h-80 items-center justify-center rounded-3xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex items-center gap-3 text-sm font-semibold text-slate-500">
                        <Loader2 className="animate-spin" size={18} />
                        Cargando distribuidores...
                    </div>
                </div>
            )}

            {isError && !isLoading && (
                <div className="rounded-3xl border border-red-100 bg-red-50 p-8 text-center">
                    <h3 className="text-lg font-bold text-red-700">
                        No pudimos cargar los distribuidores
                    </h3>
                    <p className="mt-2 text-sm text-red-500">
                        Intenta nuevamente más tarde.
                    </p>
                </div>
            )}

            {!isLoading && !isError && distributors.length === 0 && (
                <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                    <h3 className="text-lg font-bold text-[#061540]">
                        No hay distribuidores disponibles
                    </h3>
                    <p className="mt-2 text-sm text-slate-500">
                        Pronto agregaremos nuevas ubicaciones.
                    </p>
                </div>
            )}

            {!isLoading && !isError && selectedDistributor && (
                <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
                    <aside className="fade-up delay-1 space-y-5">
                        <DistributorSelect
                            options={options}
                            value={selectedOption}
                            onChange={handleChangeDistributor}
                        />
                        <div className="hidden lg:block">
                            <DistributorHelpCard />
                        </div>
                    </aside>

                    <DistributorMapCard distributor={selectedDistributor} />
                </div>
            )}
        </section>
    );
}