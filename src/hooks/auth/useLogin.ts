// src/hooks/auth/useLogin.ts
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { login } from "@/services/auth/auth.service";

type ApiError = {
  message?: string;
};

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: LoginInput) => login(data),

    onSuccess: () => {
      router.push("/admin");
    },

    onError: (error: AxiosError<ApiError>) => {
      console.error(error.response?.data?.message || "Error iniciando sesión");
    },
  });
}