import axiosClient from "@/lib/axios";


export type GetProductLineByIdResponse = {
  success: boolean;
  data: ProductLine;
};

export async function getProductLineById(id: string) {
  const { data } = await axiosClient.get<GetProductLineByIdResponse>(
    `/lines/${id}`
  );

  return data;
}