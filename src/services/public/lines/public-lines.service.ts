// services/public/lines/public-lines.service.ts

import axiosClientPublic from "@/lib/axiosPublic";

export async function getProductLinesServicePublic() {
  const res = await axiosClientPublic.get<{
    data: ProductLine[];
  }>("/public/lines");

  return res.data;
}

export async function getProductLinesByIdServicePublic(id: string) {
  const res = await axiosClientPublic.get<{
    data: ProductLineById;
  }>(`/public/lines/${id}`);

  return res.data;
}