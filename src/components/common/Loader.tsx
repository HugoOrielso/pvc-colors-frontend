"use client";

import { Loader2 } from "lucide-react";

export default function FullScreenLoader() {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3 rounded-2xl bg-white px-6 py-5 shadow-xl">
        <Loader2 className="h-6 w-6 animate-spin text-slate-900" />
        <p className="text-sm font-medium text-slate-700">
          Procesando...
        </p>
      </div>
    </div>
  );
}