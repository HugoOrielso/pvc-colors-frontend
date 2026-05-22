"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, MonitorCog, X } from "lucide-react";
import { Separator } from "../ui/separator";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Nosotros", href: "/about" },
    { label: "Líneas", href: "/lines" },
    { label: "Aprende con PVC", href: "/learn" },
    { label: "Distribuidores", href: "/distributors" },
  ];

  const closeMenu = () => setIsOpen(false);

  return (
    <header
      style={{ viewTransitionName: "site-header" }}
      className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white shadow-sm"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" onClick={closeMenu} className="flex items-center gap-3">
          <p>Tienda</p>
          <Separator orientation="vertical" className=" bg-slate-300" />
          <Image
            src="/assets/logo.webp"
            alt="PVC Color's"
            width={80}
            height={55}
            className="object-contain"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[13px] font-semibold tracking-wide  transition-colors duration-200 hover:text-[#08206b]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-xl border border-[#08206b]/15 bg-white px-5 py-2.5 text-[13px] font-bold text-[#08206b] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#08206b] hover:bg-[#f8fafc] hover:shadow-lg"
          >
            <MonitorCog size={15} />
            Portal administrativo
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex items-center justify-center rounded-xl p-2 text-[#08206b] transition-colors hover:bg-slate-100 lg:hidden"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-slate-100 bg-white px-4 py-4 shadow-lg lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={closeMenu}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-[#08206b]"
              >
                {item.label}
              </Link>
            ))}

            <div className="mt-3 grid gap-3 border-t border-slate-100 pt-4 ">

              <Link
                href="/login"
                onClick={closeMenu}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#08206b]/15 bg-white px-5 py-3 text-sm font-bold text-[#08206b] transition hover:border-[#08206b] hover:bg-slate-50"
              >
                <MonitorCog size={16} />
                Portal administrativo
              </Link>
            </div>
          </nav>
        </div>
      )}

      <div
        className="h-0.75 w-full"
        style={{
          background:
            "linear-gradient(90deg, #08206b 0%, #7ec8e3 35%, #f5c518 55%, #e84393 75%, #08206b 100%)",
        }}
      />
    </header>
  );
};