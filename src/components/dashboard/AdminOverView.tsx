// app/admin/page.tsx
import {
  Boxes,
  ClipboardList,
  FileText,
  Users,
  ShieldCheck,
  BarChart3,
} from "lucide-react";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[#f5f8ff] px-6 py-10 text-[#08246b]">
      <section className="mx-auto max-w-7xl">
        <div className="rounded-[2rem] bg-white p-8 shadow-xl shadow-blue-950/10 md:p-12">
          <p className="mb-3 text-sm font-extrabold uppercase tracking-wide text-[#0ea5e9]">
            Panel administrativo
          </p>

          <h1 className="max-w-3xl text-4xl font-black leading-tight md:text-5xl">
            Bienvenido al centro de gestión de PVC Color&apos;s
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Desde aquí podrás administrar productos, líneas, clientes, pedidos,
            facturas y usuarios del sistema de forma simple, segura y organizada.
          </p>
        </div>

        <section className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AdminCard
            icon={<Boxes />}
            title="Productos"
            text="Crea, edita, activa o desactiva productos, colores, presentaciones y fichas técnicas."
          />

          <AdminCard
            icon={<ClipboardList />}
            title="Pedidos"
            text="Consulta órdenes, estados de pago, productos solicitados y seguimiento general."
          />

          <AdminCard
            icon={<Users />}
            title="Clientes"
            text="Administra datos de clientes, historial de compras e información de contacto."
          />

          <AdminCard
            icon={<FileText />}
            title="Facturas"
            text="Revisa facturas emitidas, estados de pago y documentos asociados a cada pedido."
          />

          <AdminCard
            icon={<ShieldCheck />}
            title="Usuarios"
            text="Controla accesos del equipo mediante roles administrativos y operativos."
          />

          <AdminCard
            icon={<BarChart3 />}
            title="Reportes"
            text="Visualiza información clave para tomar mejores decisiones sobre ventas y gestión."
          />
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
    <article className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-950/10">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#08246b] text-white">
        {icon}
      </div>

      <h2 className="text-xl font-black text-[#08246b]">{title}</h2>

      <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
    </article>
  );
}