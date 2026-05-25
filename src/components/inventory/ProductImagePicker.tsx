"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { X, Eye, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useDeleteProductImage } from "@/hooks/private/products/useDeleteImage";
import { useParams } from "next/navigation";

export type ProductImageValue = {
  id?: string;
  url?: string;
  file?: File;
  alt?: string | null;
  position?: number;
  isMain?: boolean;
};

type Props = {
  label?: string;
  value: ProductImageValue[];
  onChange: (images: ProductImageValue[]) => void;
};

export function ProductImagesPicker({
  label = "Imágenes del producto",
  value,
  onChange,
}: Props) {
  const params = useParams();
  const productId = params.id as string;

  const { mutateAsync: deleteImage, isPending: isDeletingImage } = useDeleteProductImage();
  const [imageToDeleteIndex, setImageToDeleteIndex] = useState<number | null>(null);
  async function confirmDeleteImage() {
    if (imageToDeleteIndex === null) return;
    await removeImage(imageToDeleteIndex);
    setImageToDeleteIndex(null);
  }
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const images = useMemo(() => {
    return value.map((image) => {
      if (image.file instanceof File) {
        return {
          ...image,
          src: URL.createObjectURL(image.file),
          isNew: true,
        };
      }

      return {
        ...image,
        src: image.url ?? "",
        isNew: false,
      };
    });
  }, [value]);

  function handleFiles(files: FileList | null) {
    if (!files?.length) return;

    const newImages: ProductImageValue[] = Array.from(files).map(
      (file, index) => ({
        file,
        alt: file.name,
        position: value.length + index,
        isMain: value.length === 0 && index === 0,
      })
    );

    onChange([...value, ...newImages]);
  }

  async function removeImage(index: number) {
    const imageToRemove = value[index];

    // si ya existe en DB la desactivamos
    if (imageToRemove.id) {
      await deleteImage({
        productId,
        imageId: imageToRemove.id,
      });
    }

    // removemos del estado visual
    const updated = value.filter((_, i) => i !== index);

    // asegurar main
    const hasMain = updated.some((image) => image.isMain);

    if (!hasMain && updated.length > 0) {
      updated[0].isMain = true;
    }

    onChange(
      updated.map((image, index) => ({
        ...image,
        position: index,
      }))
    );
  }

  function setMainImage(index: number) {
    onChange(
      value.map((image, i) => ({
        ...image,
        isMain: i === index,
      }))
    );
  }

  return (
    <div className="space-y-3">

      {imageToDeleteIndex !== null && (
        <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-neutral-900">
              Eliminar imagen
            </h2>

            <p className="mt-2 text-sm text-neutral-600">
              ¿Seguro que quieres eliminar esta imagen? Esta acción desactivará la
              imagen del producto.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                className="rounded-lg cursor-pointer border px-4 py-2 text-sm"
                onClick={() => setImageToDeleteIndex(null)}
                disabled={isDeletingImage}
              >
                Cancelar
              </button>

              <button
                type="button"
                className="rounded-lg bg-red-600 cursor-pointer px-4 py-2 text-sm text-white disabled:opacity-50"
                onClick={confirmDeleteImage}
                disabled={isDeletingImage}
              >
                {isDeletingImage ? "Eliminando..." : "Eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <p className="mb-2 block text-xs font-semibold uppercase text-blue-700">{label}</p>

        <Button className="cursor-pointer"
          type="button"
          variant="outline"
          onClick={() => inputRef.current?.click()}
        >
          <Plus className="mr-2 size-4" />
          Agregar imágenes
        </Button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = "";
        }}
      />

      {images.length === 0 ? (
        <div className="flex h-32 items-center justify-center rounded-xl border border-dashed text-sm text-muted-foreground">
          No hay imágenes cargadas
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {images.map((image, index) => (
            <div
              key={image.id ?? image.src ?? index}
              className="relative rounded-xl border p-3"
            >
              <div className="relative h-40 overflow-hidden rounded-lg bg-muted">
                {image.src ? (
                  <Image
                    src={image.src}
                    alt={image.alt ?? "Imagen del producto"}
                    fill
                    className="object-contain"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                    Sin imagen
                  </div>
                )}
              </div>

              <div className="mt-3 flex items-center justify-between gap-2">
                <span className="text-xs text-muted-foreground">
                  {image.isNew ? "Nueva imagen" : "Imagen actual"}
                </span>

                {image.isMain && (
                  <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
                    Principal
                  </span>
                )}
              </div>

              <div className="mt-3 flex gap-2">
                <button className="cursor-pointer border p-1 rounded " title="Ver"
                  type="button"
                  onClick={() => setPreviewImage(image.src)}
                >
                  <Eye className="size-4" />
                </button>

                <Button
                  type="button"
                  size="sm"
                  variant={image.isMain ? "secondary" : "outline"}
                  onClick={() => setMainImage(index)}
                >
                  Principal
                </Button>

                <button
                  type="button"
                  className="bg-red-300 text-red-700 p-1 rounded cursor-pointer disabled:opacity-50"
                  title="Eliminar"
                  disabled={isDeletingImage}
                  onClick={() => setImageToDeleteIndex(index)}
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {previewImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="relative max-h-[90vh] w-full max-w-4xl rounded-xl bg-background p-4">
            <button
              type="button"
              onClick={() => setPreviewImage(null)}
              className="absolute right-4 top-4 z-10 cursor-pointer border rounded  bg-background px-3 py-1 text-sm"
            >
              Cerrar
            </button>

            <div className="relative h-[75vh] w-full overflow-hidden rounded-lg">
              <Image
                src={previewImage}
                alt="Vista previa"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}