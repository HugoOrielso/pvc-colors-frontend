"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

import { Header } from "@/components/home/Header";
import { Footer } from "@/components/home/Footer";

const aprendeItems = [
  {
    title: "Preparación de la superficie",
    tag: "Antes de pintar",
    content: (
      <>
        <p>
          Si la superficie a pintar tiene imperfectos como golpes, grietas u
          otros, aplicar una capa delgada de masilla con una espátula, dejar
          secar de 12 a 24 horas y después lijar de manera uniforme con una lija
          de grano no muy grueso 220. Eliminar todas las impurezas y/o defectos
          sobre la superficie; luego limpiar para quitar todo el polvo producido.
        </p>

        <p>
          Para determinar la cantidad de pintura a utilizar, sumar el ancho de
          todas las paredes y multiplicar el resultado por la altura del piso al
          techo. Un galón de pintura rinde aproximadamente 35 metros cuadrados.
        </p>

        <p>
          Si se desea un mejor acabado en aquellas partes donde hay más contacto,
          alrededor de tomacorrientes, interruptores, pasamanos, etc.,
          recomendamos antes de pintar limpiar con agua y jabón, pasar la lija y
          dejar secar; esto permite eliminar más a fondo las impurezas y grasa de
          la superficie.
        </p>
      </>
    ),
  },
  {
    title: "Aplicación",
    tag: "Paso a paso",
    content: (
      <>
        <p>
          Escoger el color correcto y la mejor manera de hacerlo es examinar los
          muebles existentes en la habitación, la decoración de las ventanas y
          otros accesorios; junto con esto buscar los colores de preferencia y
          hacer combinaciones.
        </p>

        <p>
          Si el color a cambiar es muy oscuro se recomienda primero dar una mano
          de blanco para aclarar un poco el tono existente y dar más nitidez al
          nuevo color.
        </p>

        <p>
          Para hacer esta remodelación se utilizan pinturas a base de agua.
          Recomendamos SANTANDER TIPO I de PINTURAS PVC COLORS, que cuenta con
          rápido secado, excelente cubrimiento y es lavable.
        </p>

        <p>
          Preparar la pintura máximo con ¼ de agua por galón y mezclar muy bien.
          Recortar con brocha los bordes y ángulos de las paredes donde es
          difícil pintar con rodillo. Para finalizar, pintar con rodillo el resto
          de la superficie. Si queremos mayor cubrimiento, aplicar dos manos con
          un intervalo de 60 minutos entre manos.
        </p>

        <p>
          Para su limpieza, recomendamos utilizar agua y jabón después de 30 días
          de su aplicación, tiempo prudencial para que la pintura cumpla su
          proceso de curado y demuestre su lavabilidad.
        </p>
      </>
    ),
  },
  {
    title: "Formas de darles nueva vida a tus espacios",
    tag: "Inspiración",
    content: (
      <p>
        Al momento de dotar a un espacio de personalidad suele confundirse el
        interiorismo con la decoración. Sin embargo, el primero consiste en
        construir el espacio, mientras que el segundo interviene sobre el
        ambiente ya construido. ¿Qué elementos debemos considerar para
        transformar cualquier entorno del hogar y cómo lograr una estética
        uniforme que genere armonía?
      </p>
    ),
  },
  {
    title: "Cuartos para bebé",
    tag: "Decoración",
    content: (
      <>
        <h3>Los mejores consejos para decorarlo</h3>

        <p>
          Cuando pensamos en tendencias de diseño de ambientes, solemos fijarnos
          en lo último para espacios exteriores, fachadas modernas o zonas
          sociales. También se nos vienen a la mente áreas especializadas del
          hogar, como una oficina en casa. O, incluso, entornos casi de lujo como
          un cine en casa. Sin embargo, la decoración también puede hacer la
          diferencia en un espacio tan especial como el cuarto para bebé. Te
          mostramos los mejores consejos para que este lugar sea todo lo que has
          soñado.
        </p>

        <h3>Colores de cuarto para bebé</h3>

        <p>
          Las tendencias en este campo muestran algo para todos los gustos. Por
          un lado, los tonos pasteles son siempre populares en estas
          habitaciones. Los hay tanto cálidos como fríos. Uno de los más
          aplicados hoy es el lavanda, pues es tanto llamativo como sereno.
        </p>

        <p>
          Por otro lado, también se dan variaciones del tradicional esquema de
          rosa para niñas y azul para niños. Las opciones modernas son más
          saturadas. Así, se encuentran ambientes decorados con tonos frambuesa,
          como otros que combinan tonos azul y turquesa.
        </p>

        <h3>Estilo monocromático</h3>

        <p>
          Este abordaje sutil también es muy popular para decorar un cuarto para
          bebé. Se trata de una paleta con un par de tonos similares, como blanco
          y gris. El secreto para que no luzca plano es crear interés visual con
          alfombras, muebles y decoraciones que usen distintas texturas y
          patrones.
        </p>

        <p>
          Es recomendable que estos muebles quepan adecuadamente dejando espacio
          para moverse fácilmente. También que estén alejados de riesgos de
          seguridad como ventanas o instalaciones eléctricas, por ejemplo.
        </p>

        <p>
          Si estos elementos esenciales hacen ver el cuarto más pequeño,
          implementa estos trucos para ampliar la percepción del espacio:
          procura la mayor iluminación posible, ya sea natural o artificial; usa
          colores claros, ya que reflejan la luz y hacen ver los muros y pisos
          más alejados que en la realidad; y utiliza tonos o patrones de piso a
          techo para llevar la mirada hacia arriba y crear sensación de amplitud.
        </p>
      </>
    ),
  },
  {
    title: "Guía para elegir la tonalidad correcta",
    tag: "Color",
    content: (
      <>
        <p>
          ¿Trabajas de manera remota?, ¿te gustaría remodelar un rincón de tu
          hogar y convertirlo en una oficina en casa? Recuerda que para crear un
          ambiente agradable y propicio para el trabajo necesitas elegir la
          tonalidad correcta.
        </p>

        <p>
          Los colores son aliados perfectos y sirven para estimular la mente.
          ¿Qué tonos fomentan la concentración y eficiencia?, ¿cuáles podrían
          marcar la diferencia entre tu rendimiento y bienestar? Quédate para
          descubrir cómo adecuar correctamente tu espacio de trabajo en casa.
        </p>

        <h3>La oficina en casa, un espacio que se adecúa a tus necesidades</h3>

        <p>
          Disponer de un espacio para trabajar en casa te brinda innumerables
          beneficios. Uno de los más destacados es que puedes hacerlo de manera
          híbrida o remota. En esta área personalizada, consigues preservar tu
          salud mental y física. En tal sentido, debes diseñar un ambiente
          ergonómico, que se amolde a tu estilo y ritmo de trabajo.
        </p>

        <h3>¿Cuáles son los mejores colores para tu oficina en casa?</h3>

        <p>
          No todos los colores funcionan bien en un espacio de trabajo. Si
          quieres que este sea agradable, estimulante y que marque la diferencia,
          ten en cuenta las siguientes recomendaciones.
        </p>

        <h3>Planificación, un paso necesario</h3>

        <p>
          Antes de empezar a pintar, planifica el diseño. Considera la
          disposición del mobiliario, la iluminación natural o artificial
          disponibles, y las necesidades específicas según las tareas a realizar.
        </p>

        <h3>Elige tus tonos favoritos en la paleta de colores</h3>

        <p>
          La elección de las tonalidades es una decisión importante, tanto para
          espacios exteriores como para crear un ambiente adecuado en tu nueva
          zona de trabajo. PVC Colors ofrece una paleta de colores que puedes
          utilizar para producir diferentes sensaciones.
        </p>

        <ul>
          <li>
            <strong>Neutros:</strong> los tonos blancos, beiges o grises brindan
            una sensación de amplitud y luminosidad. Son ideales para espacios
            pequeños.
          </li>
          <li>
            <strong>Cálidos:</strong> los rojos, naranjas y amarillos aportan
            energía y estimulan la creatividad. Suelen ser perfectos para tareas
            que requieren inspiración.
          </li>
          <li>
            <strong>Fríos:</strong> los azules y verdes generan tranquilidad y
            concentración. Facilitan un ambiente de trabajo agradable.
          </li>
          <li>
            <strong>Pasteles:</strong> se caracterizan por ser suaves y
            relajantes. Contribuyen a reducir el estrés y fomentan la serenidad.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "Pinturas anticorrosivas, ¿conoces qué función poseen?",
    tag: "Protección",
    content: (
      <>
        <p>
          Las estructuras metálicas son elementos fundamentales en la construcción
          de diversos proyectos, desde puentes y edificios hasta tanques y
          maquinaria industrial. Sin embargo, estas estructuras están expuestas a
          diversos factores ambientales que pueden acelerar su deterioro. Aquí
          entran en juego las pinturas anticorrosivas: una solución eficaz para
          proteger y prolongar su vida útil.
        </p>

        <p>
          Si ya has conocido un tema como la pintura electrostática, aquí veremos
          la importancia de las anticorrosivas, sus características y las mejores
          opciones para estructuras metálicas.
        </p>

        <h3>¿Cuál es la función e importancia de las pinturas anticorrosivas?</h3>

        <p>
          Desempeñan un papel fundamental en la protección de estructuras
          metálicas contra la corrosión, que es un proceso químico natural que
          puede dañar y debilitar los metales. Esto podría traer consecuencias
          graves en términos de seguridad, estabilidad y durabilidad de las
          estructuras.
        </p>

        <p>
          La función principal de este tipo de pintura es crear una barrera
          física y química entre el metal y el entorno corrosivo. De esta manera,
          se evita que el metal entre en contacto directo con sustancias
          corrosivas, como el agua, el oxígeno y los productos químicos. Esto
          ayuda a prevenir la corrosión y a extender la vida útil de las
          estructuras metálicas.
        </p>

        <h3>Sus principales características</h3>

        <ul>
          <li>
            <strong>Aplicación:</strong> están diseñadas para aplicarse
            directamente sobre la superficie metálica, mediante brocha, rodillo o
            pulverización.
          </li>
          <li>
            <strong>Adherencia:</strong> una buena adherencia asegura que la
            pintura forme una capa protectora duradera y resistente.
          </li>
          <li>
            <strong>Secado:</strong> suelen tener un tiempo de secado
            relativamente rápido, protegiendo la superficie durante el proceso.
          </li>
          <li>
            <strong>Colores y acabados:</strong> están disponibles en una amplia
            gama de colores y acabados, aportando protección y estética.
          </li>
          <li>
            <strong>Protección:</strong> contienen aditivos anticorrosivos que
            reaccionan químicamente con la superficie metálica.
          </li>
          <li>
            <strong>Dilución:</strong> algunas requieren dilución antes de ser
            aplicadas, según el tipo de pintura y las instrucciones del
            fabricante.
          </li>
          <li>
            <strong>De epoxi:</strong> son reconocidas por su excelente
            adherencia, resistencia a la corrosión y durabilidad.
          </li>
          <li>
            <strong>De zinc:</strong> ofrecen protección eficaz al formar una
            capa de zinc que actúa como sacrificio anódico.
          </li>
        </ul>

        <h3>Recomendaciones y medidas de seguridad</h3>

        <p>
          Lee y cumple cuidadosamente las instrucciones de aplicación y seguridad
          proporcionadas por el fabricante.
        </p>

        <p>
          Prepara la superficie metálica correctamente antes de aplicar la
          pintura. Esto puede incluir la eliminación de óxido, grasa, polvo u
          otras impurezas.
        </p>

        <p>
          Utiliza equipos de protección personal como guantes, gafas de seguridad
          y ropa adecuada durante la aplicación.
        </p>

        <p>
          Asegúrate de trabajar en un área bien ventilada para evitar la
          inhalación de vapores o gases nocivos de la pintura.
        </p>

        <p>
          Conserva las pinturas en un lugar fresco, seco y seguro. Recuerda
          seguir siempre las indicaciones del fabricante para evitar cualquier
          riesgo.
        </p>

        <p>
          La elección adecuada de las pinturas anticorrosivas es esencial para
          proteger las estructuras metálicas de zonas industriales. Aplicar
          pinturas de calidad garantiza la prolongación de la vida útil de las
          estructuras y reduce los costos de mantenimiento y reparación.
        </p>
      </>
    ),
  },
];



export default function AprendeConPvcPage() {
  const [selectedItem, setSelectedItem] = useState<
    (typeof aprendeItems)[0] | null
  >(null);

  return (
    <>
      <Header />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

        .pvc-page,
        .pvc-page * {
          font-family: 'Poppins', sans-serif !important;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(22px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fade-up {
          animation: fadeUp 0.65s ease both;
        }

        .delay-1 {
          animation-delay: 0.12s;
        }

        .delay-2 {
          animation-delay: 0.24s;
        }

        .delay-3 {
          animation-delay: 0.36s;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .marquee-track {
          animation: marquee 24s linear infinite;
        }
      `}</style>

      <main className="pvc-page overflow-hidden bg-white text-[#061540]">
        <section className="relative overflow-hidden bg-[#061540] px-4 py-16 text-white sm:px-6 lg:px-12 lg:py-20">
          <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-700/20 blur-3xl" />
          <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 right-20 h-72 w-72 rounded-full bg-[#f0c040]/10 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
            <div className="text-center lg:text-left">
              <div className="fade-up mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f0c040] sm:text-xs">
                <span className="size-1.5 rounded-full bg-[#f0c040]" />
                Aprende con PVC
              </div>

              <h1 className="fade-up delay-1 mx-auto max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:mx-0 lg:text-6xl">
                Aprende a pintar mejor{" "}
                <span className="text-[#f0c040]">tus espacios</span>
              </h1>

              <p className="fade-up delay-2 mx-auto mt-6 max-w-xl text-sm font-light leading-relaxed text-white/70 sm:text-base lg:mx-0">
                Consejos prácticos para preparar superficies, elegir colores,
                aplicar pintura correctamente y proteger cada proyecto con
                mejores acabados.
              </p>

              <div className="fade-up delay-3 mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <Link
                  href="/lines"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f0c040] px-6 py-3 text-sm font-semibold text-[#061540] transition hover:bg-yellow-300"
                >
                  Ver productos
                  <ArrowRight size={16} />
                </Link>

                <a
                  href="#guias"
                  className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
                >
                  Leer guías
                </a>
              </div>
            </div>

            <div className="fade-up delay-2 relative mx-auto w-full max-w-xl lg:max-w-none">
              <div className="absolute -inset-3 rounded-3xl bg-white/5 blur-xl" />

              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-3 shadow-2xl backdrop-blur">
                <Image
                  src="/assets/paletaDeColores.webp"
                  alt="PVC Colors"
                  width={900}
                  height={700}
                  className="h-80 w-full rounded-xl object-cover sm:h-105 lg:h-120"
                  priority
                />

                <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/15 bg-[#061540]/75 p-4 backdrop-blur">
                  <p className="text-sm font-bold">Color, técnica y acabado</p>
                  <p className="mt-1 text-xs text-white/65">
                    Todo empieza con una buena preparación.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="guias"
          className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-12 lg:py-20"
        >
          <div className="fade-up mb-12 max-w-3xl text-center lg:text-left">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f0c040] shadow-sm sm:text-xs">
              <span className="size-2 rounded-full bg-[#f0c040]" />
              Guías y consejos
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-[#061540] sm:text-4xl lg:text-5xl">
              Todo lo que necesitas saber antes de pintar
            </h2>

            <p className="mt-5 max-w-2xl text-sm font-light leading-relaxed text-slate-500 sm:text-base">
              Explora recomendaciones útiles para elegir mejor tus productos,
              preparar cada superficie y lograr acabados más duraderos.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {aprendeItems.map((item) => (
              <button
                key={item.title}
                type="button"
                onClick={() => setSelectedItem(item)}
                className="group flex min-h-56 cursor-pointer flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#f0c040] hover:shadow-xl"
              >
                <div>
                  <span className="mb-4 inline-flex rounded-full bg-[#f0c040]/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#061540]">
                    {item.tag}
                  </span>

                  <h3 className="text-xl font-extrabold leading-tight text-[#061540]">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-sm font-light leading-6 text-slate-500">
                    Haz clic para abrir la información completa.
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
                  <span className="text-sm font-bold text-[#061540]">
                    Leer guía completa
                  </span>

                  <span className="grid size-10 place-items-center rounded-full bg-[#061540] text-lg font-black text-white transition group-hover:bg-[#f0c040] group-hover:text-[#061540]">
                    →
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {selectedItem && (
          <div
            className="fixed inset-0 z-50 flex items-end justify-center bg-[#061540]/75 px-4 backdrop-blur-sm sm:items-center"
            onClick={() => setSelectedItem(null)}
          >
            <div
              className="relative max-h-[88vh] w-full max-w-4xl overflow-hidden rounded-t-[2rem] bg-white shadow-2xl sm:rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 z-10 border-b border-slate-100 bg-white p-5 sm:p-6">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <span className="mb-3 inline-flex rounded-full bg-[#f0c040]/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#061540]">
                      {selectedItem.tag}
                    </span>

                    <h3 className="text-2xl font-extrabold leading-tight text-[#061540] sm:text-3xl">
                      {selectedItem.title}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedItem(null)}
                    className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-full bg-[#061540] text-xl font-black text-white transition hover:bg-[#f0c040] hover:text-[#061540]"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="max-h-[68vh] overflow-y-auto p-5 sm:p-8">
                <div className="prose prose-slate max-w-none prose-h3:mt-8 prose-h3:text-xl prose-h3:font-extrabold prose-h3:text-[#061540] prose-p:leading-8 prose-p:text-slate-600 prose-strong:text-[#061540] prose-li:my-2 prose-li:text-slate-600">
                  {selectedItem.content}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}