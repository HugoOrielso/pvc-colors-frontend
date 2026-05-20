// app/admin/page.tsx
import {
  Boxes,
  ClipboardList,
  FileText,
  Users,
  ShieldCheck,
  BarChart3,
} from "lucide-react";

const adminItems = [
  {
    icon: Boxes,
    title: "Productos",
    text: "Crea, edita, activa o desactiva productos, colores, presentaciones y fichas técnicas.",
  },
  {
    icon: ClipboardList,
    title: "Pedidos",
    text: "Consulta órdenes, estados de pago, productos solicitados y seguimiento general.",
  },
  {
    icon: Users,
    title: "Clientes",
    text: "Administra datos de clientes, historial de compras e información de contacto.",
  },
  {
    icon: FileText,
    title: "Facturas",
    text: "Revisa facturas emitidas, estados de pago y documentos asociados a cada pedido.",
  },
  {
    icon: ShieldCheck,
    title: "Usuarios",
    text: "Controla accesos del equipo mediante roles administrativos y operativos.",
  },
  {
    icon: BarChart3,
    title: "Reportes",
    text: "Visualiza información clave para tomar mejores decisiones sobre ventas y gestión.",
  },
];

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[#f5f8ff] px-4 py-6 text-[#08246b] sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <section className="mx-auto w-full max-w-7xl">
        <div className="rounded-3xl bg-white p-6 shadow-xl shadow-blue-950/10 sm:p-8 md:rounded-[2rem] md:p-12">
          <p className="mb-3 text-xs font-extrabold uppercase tracking-wide text-[#0ea5e9] sm:text-sm">
            Panel administrativo
          </p>

          <h1 className="max-w-3xl text-3xl font-black leading-tight sm:text-4xl md:text-5xl">
            Bienvenido al centro de gestión de PVC Color&apos;s
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:mt-5 sm:text-lg sm:leading-8">
            Desde aquí podrás administrar productos, líneas, clientes, pedidos,
            facturas y usuarios del sistema de forma simple, segura y organizada.
          </p>
        </div>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:mt-8 lg:grid-cols-3 lg:gap-5">
          {adminItems.map((item) => (
            <AdminCard
              key={item.title}
              icon={<item.icon className="h-5 w-5 sm:h-6 sm:w-6" />}
              title={item.title}
              text={item.text}
            />
          ))}
        </section>
      </section>
    </main>
  );
}

function AdminCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm transition sm:rounded-3xl sm:p-6 sm:hover:-translate-y-1 sm:hover:shadow-xl sm:hover:shadow-blue-950/10">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#08246b] text-white sm:mb-5 sm:h-12 sm:w-12 sm:rounded-2xl">
        {icon}
      </div>

      <h2 className="text-lg font-black text-[#08246b] sm:text-xl">
        {title}
      </h2>

      <p className="mt-2 text-sm leading-6 text-slate-600 sm:mt-3">
        {text}
      </p>
    </article>
  );
}