"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import { useLogin } from "@/hooks/auth/useLogin";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";

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
    <>
      <Header />

      <main className="pvc-page relative flex min-h-screen items-center justify-center overflow-hidden bg-[#061540] px-4 py-10">
        <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-700/20 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#f0c040]/20 blur-3xl" />

        <section className="fade-up relative grid w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-white shadow-2xl lg:grid-cols-[1fr_0.95fr]">
          <div className="relative hidden overflow-hidden bg-[#061540] lg:block">
            <div className="absolute inset-0 bg-linear-to-br from-[#061540]/95 via-[#061540]/75 to-[#061540]/40" />

            <div className="absolute bottom-10 left-10 right-10">
              <div className="fade-up delay-1 mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#f0c040] backdrop-blur">
                <ShieldCheck size={16} />
                Panel seguro
              </div>

              <h1 className="fade-up delay-2 max-w-md text-5xl font-black leading-tight text-white">
                Administra PVC Colors con control y claridad
              </h1>

              <p className="fade-up delay-3 mt-5 max-w-md text-sm leading-7 text-white/70">
                Gestiona productos, líneas, pedidos y procesos internos desde un
                panel diseñado para tu operación.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center bg-white px-5 py-10 sm:px-8 lg:px-12">
            <div className="w-full max-w-md">
              <div className="text-center">
                <div className="fade-up delay-1 mx-auto mb-5 grid size-14 place-items-center rounded-2xl bg-[#061540] text-white shadow-lg">
                  <Lock size={24} />
                </div>

                <h2 className="fade-up delay-2 text-4xl font-black tracking-tight text-[#061540]">
                  Bienvenido
                </h2>

                <p className="fade-up delay-3 mt-3 text-sm leading-6 text-slate-500">
                  Ingresa tus credenciales para acceder al panel administrativo.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="fade-up delay-4 mt-10 space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-bold text-[#061540]">
                    Correo electrónico
                  </label>

                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                    <input
                      name="email"
                      type="email"
                      placeholder="admin@pvccolors.com"
                      required
                      autoComplete="email"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 pl-12 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#061540] focus:bg-white focus:ring-4 focus:ring-[#061540]/10"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-[#061540]">
                    Contraseña
                  </label>

                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      required
                      autoComplete="current-password"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 pl-12 pr-12 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#061540] focus:bg-white focus:ring-4 focus:ring-[#061540]/10"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 transition hover:text-[#061540]"
                      aria-label={
                        showPassword
                          ? "Ocultar contraseña"
                          : "Mostrar contraseña"
                      }
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
                  className="group inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#061540] px-6 py-4 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#092469] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isPending ? "Ingresando..." : "Entrar al panel"}

                  {!isPending && (
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  )}
                </button>
              </form>

              <p className="fade-up delay-4 mt-6 text-center text-xs text-slate-400">
                © PVC Color&apos;s - Panel administrativo
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}