"use client";

import Image from "next/image";
import { useState } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useLogin } from "@/hooks/auth/useLogin";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { mutateAsync, isPending } = useLogin();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);

      await mutateAsync({
        email: String(formData.get("email") || ""),
        password: String(formData.get("password") || ""),
      });

      toast.success("Inicio de sesión correcto");
      router.push("/dashboard");
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;

      toast.error(
        axiosError.response?.data?.message || "No se pudo iniciar sesión"
      );
    }
  }
  return (
    <main className="min-h-screen bg-[#08246b] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl">
        <div className="flex justify-center mb-8">
          <Image
            src="/assets/logo.webp"
            alt="PVC Color's"
            width={150}
            height={90}
            className="object-contain"
          />
        </div>

        <section className="grid overflow-hidden rounded-sm bg-white shadow-2xl md:grid-cols-2">
          <div className="relative hidden min-h-130 md:block">
            <Image
              src="/assets/logo.webp"
              alt="Pinturas PVC Color's"
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 bg-[#08246b]/20" />

            <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-[#08246b]/90 to-transparent p-10">
              <h1 className="text-4xl font-extrabold text-white">
                PVC Color&apos;s
              </h1>
              <p className="mt-3 max-w-sm text-white/90">
                Gestión interna de productos, líneas, pedidos y administración.
              </p>
            </div>
          </div>

          <div className="flex min-h-130 items-center justify-center px-6 py-10 sm:px-12">
            <div className="w-full max-w-md">
              <h2 className="text-center text-4xl font-extrabold text-[#08246b]">
                Iniciar sesión
              </h2>

              <p className="mt-3 text-center text-sm text-gray-600">
                Ingresa tus credenciales para acceder al panel administrativo.
              </p>

              <form onSubmit={handleSubmit} className="mt-10 space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-bold text-[#08246b]">
                    Correo electrónico
                  </label>

                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                    <input
                      name="email"
                      type="email"
                      placeholder="admin@pvccolors.com"
                      required
                      className="w-full rounded-md border border-gray-300 py-3 pl-12 pr-4 text-sm outline-none transition focus:border-[#0ea5e9] focus:ring-2 focus:ring-[#0ea5e9]/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-[#08246b]">
                    Contraseña
                  </label>

                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      required
                      className="w-full rounded-md border border-gray-300 py-3 pl-12 pr-12 text-sm outline-none transition focus:border-[#0ea5e9] focus:ring-2 focus:ring-[#0ea5e9]/20"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#08246b]"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full rounded-md bg-[#08246b] py-3 text-base font-extrabold text-white transition hover:bg-[#061b52] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isPending ? "Ingresando..." : "Entrar"}
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-xs text-gray-500">
                  © PVC Color&apos;s - Panel administrativo
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}