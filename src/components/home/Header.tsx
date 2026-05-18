import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  const navItems = [
    { label: "Nosotros", href: "/about" },
    { label: "Dudas", href: "#" },
    { label: "Líneas", href: "#" },
    { label: "Aprende con PVC", href: "#" },
    { label: "Distribuidores", href: "#" },
  ];

  return (
    <header style={{ viewTransitionName: 'site-header' }} className="w-full bg-white border-b border-slate-100 sticky top-0 z-50 shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/assets/logo.webp"
            alt="PVC Color's"
            width={80}
            height={55}
            className="object-contain ml-1"
          />
        </Link>

        {/* Nav */}
        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[13px] font-semibold text-slate-500 hover:text-[#08206b] transition-colors duration-200 tracking-wide"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <Link
          href="#"
          className="hidden md:flex items-center gap-2 bg-[#08206b] hover:bg-[#0a2d96] text-white text-[13px] font-bold px-5 py-2.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#08206b]/25"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2"/>
            <path d="M8 21h8M12 17v4"/>
          </svg>
          Calculadora
        </Link>

        {/* Mobile menu btn */}
        <button className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#08206b" strokeWidth="2.5" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
      </div>

      {/* Color accent strip */}
      <div
        className="h-0.75 w-full"
        style={{
          background: "linear-gradient(90deg, #08206b 0%, #7ec8e3 35%, #f5c518 55%, #e84393 75%, #08206b 100%)",
        }}
      />
    </header>
  );
};