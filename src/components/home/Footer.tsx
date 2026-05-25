import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Nosotros", href: "/about" },
  { label: "Líneas de producto", href: "/lines" },
  { label: "Distribuidores", href: "/distributors" },
  { label: "Aprende con PVC", href: "/learn" },
  { label: "Calculadora", href: "/calculator" },
];

export const Footer = () => {
  return (
    <footer className="bg-[#0a0f2e] text-white/60">

      {/* Top accent strip */}
      <div
        className="h-1 w-full"
        style={{
          background: "linear-gradient(90deg, #08206b, #7ec8e3, #f5c518, #e84393, #08206b)",
        }}
      />

      <div className="mx-auto max-w-6xl px-6">

        {/* Main content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-14">

          {/* Brand col */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <Image
                src="/assets/logo.webp"
                alt="PVC Color's"
                width={100}
                height={70}
                className="object-contain"
              />
            </div>
            <p className="text-[13px] leading-relaxed text-white/45 max-w-55 mb-6">
              Pinturas y recubrimientos especializados para Colombia. Calidad, color y confianza desde Cúcuta.
            </p>

            {/* Social icons */}
            <div className="flex gap-2">
              {[
                {
                  label: "Facebook",
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  ),
                },
                {
                  label: "Instagram",
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                    </svg>
                  ),
                },
                {
                  label: "WhatsApp",
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                      <path d="M12.05 2.003C6.495 2.003 2 6.498 2 12.054c0 1.77.46 3.448 1.265 4.909L2 22.003l5.232-1.237A10.01 10.01 0 0 0 12.05 22.1c5.555 0 10.05-4.495 10.05-10.05S17.605 2.003 12.05 2.003z" />
                    </svg>
                  ),
                },
              ].map((s) => (
                <Link
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:bg-[#7ec8e3] hover:text-[#08206b] hover:border-[#7ec8e3] transition-all duration-200"
                >
                  {s.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Nav col */}
          <div>
            <h3 className="text-[11px] font-bold text-white tracking-[0.12em] uppercase mb-5">
              Navegación
            </h3>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[14px] text-white/45 hover:text-[#7ec8e3] transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="block w-0 group-hover:w-3 h-px bg-[#7ec8e3] transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact col */}
          <div>
            <h3 className="text-[11px] font-bold text-white tracking-[0.12em] uppercase mb-5">
              Contáctanos
            </h3>

            <div className="flex flex-col gap-4">
              {[
                {
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" /><circle cx="12" cy="10" r="3" />
                    </svg>
                  ),
                  text: "Calle 11 # 9-29 barrio El llano, Cúcuta - Norte de Santander",
                },
                {
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41a2 2 0 0 1 1.993-2.18h3A2 2 0 0 1 8.6 2.98l.917 4.585a2 2 0 0 1-.45 1.67L7.28 10.53a16 16 0 0 0 6.19 6.19l1.278-1.788a2 2 0 0 1 1.67-.45L20.98 15.4a2 2 0 0 1 1.74 1.76z" />
                    </svg>
                  ),
                  text: "316 466 6866  ·  316 628 8243",
                },
                {
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                    </svg>
                  ),
                  text: "administracion@pvccolors.com",
                },
                {
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                    </svg>
                  ),
                  text: "ventas@pvccolors.com",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="shrink-0 mt-0.5 text-[#7ec8e3]">{item.icon}</div>
                  <span className="text-[13px] text-white/45 leading-relaxed">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.07] py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px] text-white/25">
            © {new Date().getFullYear()} PVC Color&apos;s · Todos los derechos reservados
          </p>
          <div className="flex items-center gap-2 text-[12px] text-white/25">
            <span className="w-2 h-2 rounded-full bg-[#4caf50]" />
            Cúcuta, Colombia 🇨🇴
          </div>
        </div>
      </div>
    </footer>
  );
};