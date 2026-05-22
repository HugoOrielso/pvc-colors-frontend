import axiosClient from "@/lib/axios";

export async function getDistributors() {
  const res = await axiosClient.get("/distributors");
  return res.data.data as Distributor[];
}

export async function getDistributorById(id: string) {
  const res = await axiosClient.get(`/distributors/${id}`);
  return res.data.data as Distributor;
}

export async function createDistributor(data: DistributorFormValues) {
  const res = await axiosClient.post("/distributors", data);
  return res.data.data as Distributor;
}

export async function updateDistributor(
  id: string,
  data: DistributorFormValues
) {
  const res = await axiosClient.put(`/distributors/${id}`, data);
  return res.data.data as Distributor;
}

export async function deleteDistributor(id: string) {
  const res = await axiosClient.delete(`/distributors/${id}`);
  return res.data;
}