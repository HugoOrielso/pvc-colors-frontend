"use client";

import { useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { toast } from "sonner";
import axiosClientPublic from "@/lib/axiosPublic";

export function FloatingContactForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.message) {
      toast.error("Completa todos los campos");
      return;
    }

    try {
      setIsSending(true);

      await axiosClientPublic.post("/public/contact", form);

      toast.success("Mensaje enviado correctamente");

      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
      });

      setIsOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("No se pudo enviar el mensaje");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#F8C52C] text-[#061540] shadow-xl transition hover:scale-105"
      >
        <MessageCircle size={24} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/40"
          />

          <div className="absolute bottom-24 right-6 w-[calc(100%-3rem)] max-w-sm rounded-3xl bg-white shadow-2xl">
            <div className="flex items-start justify-between rounded-t-3xl bg-[#061540] px-5 py-5 text-white">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#F8C52C]">
                  Contacto
                </p>

                <h2 className="mt-1 text-lg font-black">
                  ¿Necesitas asesoría?
                </h2>

                <p className="mt-1 text-sm text-white/70">
                  Déjanos tus datos y te contactamos.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full cursor-pointer p-2 text-white/70 hover:bg-white/10 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 p-5">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Nombre completo"
                className="h-11 w-full rounded-xl border border-[#061540]/10 px-4 text-sm outline-none focus:border-[#F8C52C]"
              />

              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Correo electrónico"
                className="h-11 w-full rounded-xl border border-[#061540]/10 px-4 text-sm outline-none focus:border-[#F8C52C]"
              />

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Teléfono"
                className="h-11 w-full rounded-xl border border-[#061540]/10 px-4 text-sm outline-none focus:border-[#F8C52C]"
              />

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Cuéntanos qué necesitas"
                rows={4}
                className="w-full resize-none rounded-xl border border-[#061540]/10 px-4 py-3 text-sm outline-none focus:border-[#F8C52C]"
              />

              <button
                type="submit"
                disabled={isSending}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#061540] text-sm font-black text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
              >
                <Send size={17} />
                {isSending ? "Enviando..." : "Enviar mensaje"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}