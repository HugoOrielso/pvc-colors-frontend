"use client";

import { Player } from "@lottiefiles/react-lottie-player";

export default function EmptyLinesAnimation() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-[320px] md:w-52">
        <Player
          autoplay
          loop
          src="/assets/lineas.json"
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      <div className="mt-6 text-center">
        <h2 className="text-2xl font-bold text-white">
          Próximamente nuevas líneas
        </h2>

        <p className="mt-2 max-w-md text-sm text-neutral-300">
          Estamos preparando nuevas soluciones, colores y productos
          especializados para ti.
        </p>
      </div>
    </div>
  );
}