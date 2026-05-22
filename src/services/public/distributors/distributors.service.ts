import axiosClientPublic from "@/lib/axiosPublic";

export interface PublicDistributor {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  whatsapp: string;
  keyword: string;
  lat: number;
  lng: number;
  createdAt: string;
  updatedAt: string;
}

export const fetchPublicDistributors = async () => {
  const res = await axiosClientPublic.get("/public/distributors");
  return res.data.data as PublicDistributor[];
};