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

type ColorGroupForm = {
  name: string;
  description: string;
  colors: ColorForm[];
};

type PresentationForm = {
  name: string;
  price: string;
  stock: string;
  sku: string;
};

type FeatureForm = {
  name: string;
  description: string;
};

const initialFeature: FeatureForm = {
  name: "",
  description: "",
};



const initialForm = {
  name: "",
  slug: "",
  description: "",
  recommendations: "",
  coverageMinM2PerGallon: "",
  coverageMaxM2PerGallon: "",
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
  const [features, setFeatures] = useState<FeatureForm[]>([]);
  const [colors, setColors] = useState<ColorForm[]>([
    {
      name: "",
      value: "",
    },
  ]);
  const [colorGroups, setColorGroups] = useState<ColorGroupForm[]>([]);
  function addColorGroup() {
    setColorGroups((prev) => [
      ...prev,
      {
        name: "",
        description: "",
        colors: [{ name: "", value: "" }],
      },
    ]);
  }

  function removeColorGroup(groupIndex: number) {
    setColorGroups((prev) => prev.filter((_, i) => i !== groupIndex));
  }

  function updateColorGroup(
    groupIndex: number,
    key: keyof Omit<ColorGroupForm, "colors">,
    value: string
  ) {
    setColorGroups((prev) =>
      prev.map((group, i) =>
        i === groupIndex ? { ...group, [key]: value } : group
      )
    );
  }

  function addColorToGroup(groupIndex: number) {
    setColorGroups((prev) =>
      prev.map((group, i) =>
        i === groupIndex
          ? {
            ...group,
            colors: [...group.colors, { name: "", value: "" }],
          }
          : group
      )
    );
  }

  function updateColorInGroup(
    groupIndex: number,
    colorIndex: number,
    key: keyof ColorForm,
    value: string
  ) {
    setColorGroups((prev) =>
      prev.map((group, i) =>
        i === groupIndex
          ? {
            ...group,
            colors: group.colors.map((color, j) =>
              j === colorIndex ? { ...color, [key]: value } : color
            ),
          }
          : group
      )
    );
  }

  function removeColorFromGroup(groupIndex: number, colorIndex: number) {
    setColorGroups((prev) =>
      prev.map((group, i) =>
        i === groupIndex
          ? {
            ...group,
            colors: group.colors.filter((_, j) => j !== colorIndex),
          }
          : group
      )
    );
  }

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

  function addFeature() {
    setFeatures((prev) => [...prev, { ...initialFeature }]);
  }

  function updateFeature(
    index: number,
    key: keyof FeatureForm,
    value: string
  ) {
    setFeatures((prev) =>
      prev.map((feature, i) =>
        i === index ? { ...feature, [key]: value } : feature
      )
    );
  }

  function removeFeature(index: number) {
    setFeatures((prev) => prev.filter((_, i) => i !== index));
  }

  function resetForm() {
    setForm(initialForm);
    setColors([{ name: "", value: "" }]);
    setPresentations([{ ...initialPresentation }]);
    images.forEach((image) => {
      URL.revokeObjectURL(image.preview);
    });
    setFeatures([]);
    setColorGroups([]);
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

    const validFeatures = features
      .filter((feature) => feature.name.trim())
      .map((feature) => ({
        name: feature.name.trim(),
        description: feature.description.trim() || undefined,
      }));

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
        coverageMinM2PerGallon: form.coverageMinM2PerGallon
          ? Number(form.coverageMinM2PerGallon)
          : undefined,

        coverageMaxM2PerGallon: form.coverageMaxM2PerGallon
          ? Number(form.coverageMaxM2PerGallon)
          : undefined,
        productLineId: String(lineId).trim(),
        features: validFeatures,
        images: images.map((image) => image.file),
        technicalSheet: technicalSheet ?? undefined,

        colors: colors
          .filter((color) => color.value.trim())
          .map((color) => ({
            name: color.name.trim() || undefined,
            value: color.value.trim(),
          })),
        colorGroups: colorGroups
          .filter((group) => group.name.trim())
          .map((group, groupIndex) => ({
            name: group.name.trim(),
            description: group.description.trim() || undefined,
            position: groupIndex,
            colors: group.colors
              .filter((color) => color.value.trim())
              .map((color) => ({
                name: color.name.trim() || undefined,
                value: color.value.trim(),
              })),
          }))
          .filter((group) => group.colors.length > 0),
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

        <div className="rounded-xl border p-4">
          <div className="mb-3">
            <h3 className="font-semibold text-blue-700">
              Rendimiento para calculadora
            </h3>
            <p className="text-xs text-slate-500">
              Ejemplo: si la ficha dice 25 - 30 m²/galón, escribe 25 y 30.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase text-blue-700">
                Cobertura mínima m²/galón
              </label>

              <input
                type="number"
                min="0"
                step="0.01"
                name="coverageMinM2PerGallon"
                value={form.coverageMinM2PerGallon}
                onChange={handleChange}
                className="h-12 w-full rounded-xl border px-4 text-sm outline-none"
                placeholder="Ej: 25"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase text-blue-700">
                Cobertura máxima m²/galón
              </label>

              <input
                type="number"
                min="0"
                step="0.01"
                name="coverageMaxM2PerGallon"
                value={form.coverageMaxM2PerGallon}
                onChange={handleChange}
                className="h-12 w-full rounded-xl border px-4 text-sm outline-none"
                placeholder="Ej: 30"
              />
            </div>
          </div>
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
            <div>
              <h3 className="font-semibold text-blue-700">Grupos de colores</h3>
              <p className="text-xs text-slate-500">
                Úsalo cuando el producto tenga muchos colores.
              </p>
            </div>

            <button
              type="button"
              onClick={addColorGroup}
              className="cursor-pointer rounded-lg bg-blue-700 px-3 py-2 text-xs font-semibold text-white"
            >
              Agregar grupo
            </button>
          </div>

          <div className="space-y-4">
            {colorGroups.map((group, groupIndex) => (
              <div key={groupIndex} className="rounded-xl border bg-slate-50 p-4">
                <div className="mb-3 grid gap-3 md:grid-cols-[1fr_1fr_auto]">
                  <input
                    value={group.name}
                    onChange={(e) =>
                      updateColorGroup(groupIndex, "name", e.target.value)
                    }
                    placeholder="Nombre del grupo: Rojos, Azules..."
                    className="h-11 rounded-xl border px-4 text-sm outline-none"
                  />

                  <input
                    value={group.description}
                    onChange={(e) =>
                      updateColorGroup(groupIndex, "description", e.target.value)
                    }
                    placeholder="Descripción opcional"
                    className="h-11 rounded-xl border px-4 text-sm outline-none"
                  />

                  <button
                    type="button"
                    onClick={() => removeColorGroup(groupIndex)}
                    className="cursor-pointer rounded-xl border bg-white px-4 text-sm hover:bg-slate-100"
                  >
                    Quitar grupo
                  </button>
                </div>

                <div className="mb-3 flex justify-between">
                  <p className="text-sm font-semibold text-slate-700">
                    Colores del grupo
                  </p>

                  <button
                    type="button"
                    onClick={() => addColorToGroup(groupIndex)}
                    className="cursor-pointer rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white"
                  >
                    Agregar color
                  </button>
                </div>

                <div className="space-y-3">
                  {group.colors.map((color, colorIndex) => (
                    <div
                      key={colorIndex}
                      className="grid gap-3 md:grid-cols-[1fr_160px_48px_auto]"
                    >
                      <input
                        value={color.name}
                        onChange={(e) =>
                          updateColorInGroup(
                            groupIndex,
                            colorIndex,
                            "name",
                            e.target.value
                          )
                        }
                        placeholder="Nombre del color"
                        className="h-11 rounded-xl border px-4 text-sm outline-none"
                      />

                      <div className="flex h-11 items-center gap-2 rounded-xl border bg-white px-3">
                        <input
                          type="color"
                          value={color.value || "#000000"}
                          onChange={(e) =>
                            updateColorInGroup(
                              groupIndex,
                              colorIndex,
                              "value",
                              e.target.value
                            )
                          }
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
                        onClick={() => removeColorFromGroup(groupIndex, colorIndex)}
                        className="cursor-pointer rounded-xl border bg-white px-4 text-sm hover:bg-slate-100"
                      >
                        Quitar
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border p-4">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-blue-700">Características</h3>
              <p className="text-xs text-slate-500">
                Agrega beneficios o atributos destacados del producto.
              </p>
            </div>

            <button
              type="button"
              onClick={addFeature}
              className="cursor-pointer rounded-lg bg-blue-700 px-3 py-2 text-xs font-semibold text-white"
            >
              Agregar característica
            </button>
          </div>

          <div className="space-y-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="grid gap-3 md:grid-cols-[1fr_2fr_auto]"
              >
                <input
                  value={feature.name}
                  onChange={(e) =>
                    updateFeature(index, "name", e.target.value)
                  }
                  placeholder="Ej: Alto cubrimiento"
                  className="h-11 rounded-xl border px-4 text-sm outline-none"
                />

                <input
                  value={feature.description}
                  onChange={(e) =>
                    updateFeature(index, "description", e.target.value)
                  }
                  placeholder="Descripción de la característica"
                  className="h-11 rounded-xl border px-4 text-sm outline-none"
                />

                <button
                  type="button"
                  onClick={() => removeFeature(index)}
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