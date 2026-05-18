import axiosClient from "@/lib/axios";

export async function login(data: LoginInput) {
  const response = await axiosClient.post("/auth/login", data);
  return response.data;
}

export async function logout() {
  const response = await axiosClient.post("/auth/logout");
  return response.data;
}