"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { useParams } from "next/navigation";
import FullScreenLoader from "../common/Loader";
import { useCreateProduct } from "@/hooks/private/products/useCreateProducts";

type ColorForm = {
  name: string;
  value: string;
};

type PresentationForm = {
  name: string;
  price: string;
  stock: string;
  sku: string;
};

const initialForm = {
  name: "",
  slug: "",
  description: "",
  recommendations: "",
};

const initialPresentation: PresentationForm = {
  name: "",
  price: "",
  stock: "",
  sku: "",
};

function makeSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function CreateProductForm() {
  const params = useParams();
  const lineId = params.id;

  const [form, setForm] = useState(initialForm);

  const [colors, setColors] = useState<ColorForm[]>([
    {
      name: "",
      value: "",
    },
  ]);

  const [presentations, setPresentations] = useState<PresentationForm[]>([
    initialPresentation,
  ]);

  type ImagePreview = {
    file: File;
    preview: string;
  };

  const [images, setImages] = useState<ImagePreview[]>([]);

  const [technicalSheet, setTechnicalSheet] = useState<File | null>(null);
  const [technicalSheetPreview, setTechnicalSheetPreview] = useState("");

  const createProductMutation = useCreateProduct();
  const isLoading = createProductMutation.isPending;

  const isFormValid = useMemo(() => {
    return (
      form.name.trim() &&
      form.slug.trim() &&
      form.description.trim() &&
      lineId &&
      images.length > 0 &&
      presentations.some(
        (presentation) =>
          presentation.name.trim() &&
          Number(presentation.price) > 0 &&
          Number(presentation.stock) >= 0
      )
    );
  }, [form, images.length, lineId, presentations]);

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "name" ? { slug: makeSlug(value) } : {}),
    }));
  }

  function handleImagesChange(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);

    if (!files.length) return;

    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
    ];

    const invalidFile = files.find(
      (file) => !allowedTypes.includes(file.type)
    );

    if (invalidFile) {
      toast.error("Solo se permiten imágenes PNG, JPG o WEBP");
      e.target.value = "";
      return;
    }

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);

    e.target.value = "";
  }

  function handleTechnicalSheetChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;

    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("La ficha técnica debe ser un PDF");
      e.target.value = "";
      return;
    }

    setTechnicalSheet(file);
    setTechnicalSheetPreview(URL.createObjectURL(file));
  }

  function updateColor(index: number, key: keyof ColorForm, value: string) {
    setColors((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [key]: value } : item))
    );
  }

  function addColor() {
    setColors((prev) => [...prev, { name: "", value: "" }]);
  }

  function removeColor(index: number) {
    setColors((prev) => prev.filter((_, i) => i !== index));
  }

  function updatePresentation(
    index: number,
    key: keyof PresentationForm,
    value: string
  ) {
    setPresentations((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [key]: value } : item))
    );
  }

  function addPresentation() {
    setPresentations((prev) => [...prev, { ...initialPresentation }]);
  }

  function removePresentation(index: number) {
    setPresentations((prev) => {
      if (prev.length === 1) return prev;
      return prev.filter((_, i) => i !== index);
    });
  }

  function removeImage(index: number) {
    setImages((prev) => {
      const imageToRemove = prev[index];

      URL.revokeObjectURL(imageToRemove.preview);

      return prev.filter((_, i) => i !== index);
    });
  }

  function resetForm() {
    setForm(initialForm);
    setColors([{ name: "", value: "" }]);
    setPresentations([{ ...initialPresentation }]);
    images.forEach((image) => {
      URL.revokeObjectURL(image.preview);
    });
    setImages([]);
    setTechnicalSheet(null);
    setTechnicalSheetPreview("");
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!lineId) return toast.error("El id de la línea es obligatorio");
    if (!form.name.trim()) return toast.error("El nombre es obligatorio");
    if (!form.description.trim())
      return toast.error("La descripción es obligatoria");
    if (!images.length)
      return toast.error("Debes subir al menos una imagen del producto");

    const validPresentations = presentations
      .filter((presentation) => presentation.name.trim())
      .map((presentation) => {
        const price = Number(presentation.price);
        const stock = Number(presentation.stock);

        return {
          name: presentation.name.trim(),
          price,
          stock,
          sku: presentation.sku.trim() || undefined,
        };
      });

    if (!validPresentations.length) {
      return toast.error("Debes agregar al menos una presentación");
    }

    const invalidPresentation = validPresentations.find(
      (presentation) =>
        !Number.isInteger(presentation.price) ||
        presentation.price <= 0 ||
        !Number.isInteger(presentation.stock) ||
        presentation.stock < 0
    );

    if (invalidPresentation) {
      return toast.error(
        "Cada presentación debe tener precio entero mayor a 0 y stock mayor o igual a 0"
      );
    }

    createProductMutation.mutate(
      {
        name: form.name.trim(),
        slug: form.slug.trim(),
        description: form.description.trim(),
        recommendations: form.recommendations.trim() || undefined,
        productLineId: String(lineId).trim(),

        images: images.map((image) => image.file),

        technicalSheet: technicalSheet ?? undefined,

        colors: colors
          .filter((color) => color.value.trim())
          .map((color) => ({
            name: color.name.trim() || undefined,
            value: color.value.trim(),
          })),

        presentations: validPresentations,
      },
      {
        onSuccess: () => {
          resetForm();
        },
      }
    );
  }

  return (
    <div>
      {isLoading && <FullScreenLoader />}

      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.08em] text-blue-700">
          Inventario
        </p>

        <h2 className="mt-1 text-3xl font-black text-blue-700">
          Crear producto
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Registra un producto con galería, ficha técnica, colores y
          presentaciones con precio y stock.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 rounded-xl border p-4">
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase text-blue-700">
            Nombre
          </label>

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="h-12 w-full rounded-xl border px-4 text-sm outline-none"
            placeholder="Pintura Premium Blanco"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase text-blue-700">
            Slug
          </label>

          <input
            name="slug"
            value={form.slug}
            readOnly
            className="h-12 w-full cursor-not-allowed rounded-xl border bg-gray-100 px-4 text-sm text-gray-500 outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase text-blue-700">
            Descripción
          </label>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-xl border px-4 py-3 text-sm outline-none"
            placeholder="Descripción comercial del producto..."
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase text-blue-700">
            Recomendaciones
          </label>

          <textarea
            name="recommendations"
            value={form.recommendations}
            onChange={handleChange}
            rows={3}
            className="w-full rounded-xl border px-4 py-3 text-sm outline-none"
            placeholder="Modo de uso, superficies recomendadas, advertencias..."
          />
        </div>

        <div>
          <label className="mb-2  text-xs font-semibold uppercase text-blue-700">
            Imágenes del producto
          </label>

          <label className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 transition hover:border-blue-500 hover:bg-blue-50">
            <span className="text-sm font-semibold text-slate-700">
              Agregar imágenes
            </span>

            <span className="mt-1 text-xs text-slate-500">
              PNG, JPG o WEBP
            </span>

            <input
              type="file"
              multiple
              accept="image/png,image/jpeg,image/jpg,image/webp"
              onChange={handleImagesChange}
              className="hidden"
            />
          </label>

          <p className="mt-1 text-xs text-slate-500">
            La primera imagen seleccionada será la principal.
          </p>
        </div>

        {images.length > 0 && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6">
            {images.map((image, index) => (
              <div
                key={image.preview}
                className="group relative overflow-hidden rounded-xl border bg-white"
              >
                <Image
                  src={image.preview}
                  width={120}
                  height={120}
                  alt={`Preview producto ${index + 1}`}
                  className="h-32 w-full object-cover"
                />

                {index === 0 && (
                  <span className="absolute left-2 top-2 rounded-full bg-blue-700 px-2 py-1 text-[10px] font-bold text-white">
                    Principal
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-sm font-bold text-white cursor-pointer opacity-0 transition group-hover:opacity-100"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase text-blue-700">
            Ficha técnica PDF
          </label>

          <input
            type="file"
            accept="application/pdf"
            onChange={handleTechnicalSheetChange}
            className="block w-full rounded-xl border bg-white px-4 py-3 text-sm"
          />

          {technicalSheetPreview && (
            <div className="mt-3 flex items-center justify-between rounded-xl border bg-slate-50 p-3">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {technicalSheet?.name}
                </p>
                <p className="text-xs text-slate-500">PDF seleccionado</p>
              </div>

              <a
                href={technicalSheetPreview}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-blue-700 px-3 py-2 text-xs font-semibold text-white"
              >
                Ver PDF
              </a>
            </div>
          )}
        </div>

        <div className="rounded-xl border p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-semibold text-blue-700">Colores</h3>

            <button
              type="button"
              onClick={addColor}
              className="cursor-pointer rounded-lg bg-blue-700 px-3 py-2 text-xs font-semibold text-white"
            >
              Agregar color
            </button>
          </div>

          <div className="space-y-3">
            {colors.map((color, index) => (
              <div
                key={index}
                className="grid gap-3 md:grid-cols-[1fr_160px_48px_auto]"
              >
                <input
                  value={color.name}
                  onChange={(e) => updateColor(index, "name", e.target.value)}
                  placeholder="Nombre del color"
                  className="h-11 rounded-xl border px-4 text-sm outline-none"
                />

                <div className="flex h-11 items-center gap-2 rounded-xl border px-3">
                  <input
                    type="color"
                    value={color.value || "#000000"}
                    onChange={(e) => updateColor(index, "value", e.target.value)}
                    className="h-8 w-10 cursor-pointer rounded border-none bg-transparent p-0"
                  />

                  <span className="text-xs font-medium text-slate-600">
                    {color.value || "#000000"}
                  </span>
                </div>

                <div
                  className="h-11 rounded-xl border"
                  style={{
                    backgroundColor: color.value || "#000000",
                  }}
                />

                <button
                  type="button"
                  onClick={() => removeColor(index)}
                  className="cursor-pointer rounded-xl border px-4 text-sm hover:bg-slate-50"
                >
                  Quitar
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-semibold text-blue-700">Presentaciones</h3>

            <button
              type="button"
              onClick={addPresentation}
              className="cursor-pointer rounded-lg bg-blue-700 px-3 py-2 text-xs font-semibold text-white"
            >
              Agregar presentación
            </button>
          </div>

          <div className="space-y-3">
            {presentations.map((presentation, index) => (
              <div
                key={index}
                className="grid gap-3 md:grid-cols-[1fr_140px_140px_140px_auto]"
              >
                <input
                  value={presentation.name}
                  onChange={(e) =>
                    updatePresentation(index, "name", e.target.value)
                  }
                  placeholder="Galón, Cuñete, 1/4..."
                  className="h-11 rounded-xl border px-4 text-sm outline-none"
                />

                <input
                  type="number"
                  min="1"
                  step="1"
                  value={presentation.price}
                  onChange={(e) =>
                    updatePresentation(index, "price", e.target.value)
                  }
                  placeholder="Precio"
                  className="h-11 rounded-xl border px-4 text-sm outline-none"
                />

                <input
                  type="number"
                  min="0"
                  step="1"
                  value={presentation.stock}
                  onChange={(e) =>
                    updatePresentation(index, "stock", e.target.value)
                  }
                  placeholder="Stock"
                  className="h-11 rounded-xl border px-4 text-sm outline-none"
                />

                <input
                  value={presentation.sku}
                  onChange={(e) =>
                    updatePresentation(index, "sku", e.target.value)
                  }
                  placeholder="SKU"
                  className="h-11 rounded-xl border px-4 text-sm outline-none"
                />

                <button
                  type="button"
                  onClick={() => removePresentation(index)}
                  className="cursor-pointer rounded-xl border px-4 text-sm hover:bg-slate-50"
                >
                  Quitar
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !isFormValid}
          className="h-12 w-full cursor-pointer rounded-xl bg-blue-700 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Creando producto..." : "Crear producto"}
        </button>
      </form>
    </div>
  );
}