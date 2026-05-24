"use client";

import { useParams } from "next/navigation";


import { useDistributorById } from "@/hooks/private/distributors/useDistributors";
import DistributorForm from "@/components/distributors/DistributorsForm";

export  function EditDistributorForm() {
  const params = useParams();

  const id = params.id as string;

  const { data, isLoading, isError } =
    useDistributorById(id);

  if (isLoading) {
    return <p>Cargando distribuidor...</p>;
  }

  if (isError || !data) {
    return <p>No se pudo cargar el distribuidor.</p>;
  }

  return (
    <DistributorForm
      distributorId={data.id}
      initialData={{
        name: data.name,
        city: data.city,
        address: data.address,
        phone: data.phone,
        whatsapp: data.whatsapp,
        keyword: data.keyword,
        lat: data.lat,
        lng: data.lng,
      }}
    />
  );
}