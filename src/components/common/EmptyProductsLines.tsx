import { Plus } from "lucide-react";

const EmptyProductLines = () => {
  return (
    <section className="flex  items-center justify-center px-4">
      <div className="w-full max-w-xl rounded-3xl  p-10 text-center shadow-sm">
        <div className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-blue-50">
          <svg
            viewBox="0 0 200 200"
            className="h-24 w-24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="45" y="55" width="110" height="90" rx="18" fill="#DBEAFE" />
            <path
              d="M70 82H130M70 105H115M70 128H100"
              stroke="#2563EB"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <circle cx="150" cy="55" r="22" fill="#BFDBFE" />
            <path
              d="M150 45V65M140 55H160"
              stroke="#1D4ED8"
              strokeWidth="7"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-semibold text-neutral-900">
          Todavía no hay líneas creadas
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-neutral-500">
          Crea tu primera línea de productos para organizar mejor tu catálogo,
          agregar productos y mostrarlos en la tienda.
        </p>

        <a href="/dashboard/lines/create"
          className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          Crear línea
        </a>
      </div>
    </section>
  );
};

export default EmptyProductLines;