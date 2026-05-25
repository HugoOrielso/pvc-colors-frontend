"use client";

import { ChangeEvent, useState } from "react";
import Image from "next/image";
import { ImagePlus, Loader2, Star, Trash2 } from "lucide-react";
import { toast } from "sonner";

import {
  useDeactivateProductImage,
  useReplaceProductImage,
  useSetMainProductImage,
} from "@/hooks/private/productImages/useProductImages";

type ProductImageItem = {
  id?: string;
  url?: string;
  preview: string;
  alt?: string | null;
  isMain?: boolean;
  file?: File;
};

interface ProductImagesManagerProps {
  productId: string;
  images: ProductImageItem[];
  setImages: React.Dispatch<React.SetStateAction<ProductImageItem[]>>;
}

type ConfirmAction =
  | { type: "main"; image: ProductImageItem; index: number }
  | { type: "deactivate"; image: ProductImageItem; index: number }
  | null;

const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

export function ProductImagesManager({
  productId,
  images,
  setImages,
}: ProductImagesManagerProps) {
  const [confirmAction, setConfirmAction] = useState<ConfirmAction>(null);

  const { mutate: setMainImage, isPending: isSettingMain } =
    useSetMainProductImage(productId);

  const { mutate: deactivateImage, isPending: isDeactivating } =
    useDeactivateProductImage(productId);

  const { mutate: replaceImage, isPending: isReplacing } =
    useReplaceProductImage(productId);

  const isPending = isSettingMain || isDeactivating || isReplacing;

  function validateImage(file: File) {
    return allowedTypes.includes(file.type);
  }

  function handleImagesChange(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;

    const invalidFile = files.find((file) => !validateImage(file));

    if (invalidFile) {
      toast.error("Solo se permiten imágenes PNG, JPG o WEBP");
      e.target.value = "";
      return;
    }

    const newImages: ProductImageItem[] = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      alt: file.name,
      isMain: false,
    }));

    setImages((prev) => {
      const next = [...prev, ...newImages];

      if (!next.some((image) => image.isMain) && next.length > 0) {
        next[0].isMain = true;
      }

      return next;
    });

    e.target.value = "";
  }

  function handleReplaceImage(
    e: ChangeEvent<HTMLInputElement>,
    image: ProductImageItem,
    index: number
  ) {
    const file = e.target.files?.[0] ?? null;

    if (!file) return;

    if (!validateImage(file)) {
      toast.error("Solo se permiten imágenes PNG, JPG o WEBP");
      e.target.value = "";
      return;
    }

    if (image.id) {
      replaceImage({
        imageId: image.id,
        file,
      });
    } else {
      const preview = URL.createObjectURL(file);

      setImages((prev) =>
        prev.map((item, i) => {
          if (i !== index) return item;

          if (item.file && item.preview) {
            URL.revokeObjectURL(item.preview);
          }

          return {
            ...item,
            file,
            preview,
            alt: file.name,
          };
        })
      );
    }

    e.target.value = "";
  }

  function removeLocalImage(index: number) {
    setImages((prev) => {
      const imageToRemove = prev[index];

      if (imageToRemove.file && imageToRemove.preview) {
        URL.revokeObjectURL(imageToRemove.preview);
      }

      const next = prev.filter((_, i) => i !== index);

      if (!next.some((image) => image.isMain) && next.length > 0) {
        next[0].isMain = true;
      }

      return next;
    });
  }

  function setLocalMainImage(index: number) {
    setImages((prev) =>
      prev.map((item, i) => ({
        ...item,
        isMain: i === index,
      }))
    );
  }

  function executeConfirmedAction() {
    if (!confirmAction) return;

    const { type, image, index } = confirmAction;

    if (type === "main") {
      if (image.id) {
        setMainImage(image.id, {
          onSuccess: () => setConfirmAction(null),
        });
      } else {
        setLocalMainImage(index);
        setConfirmAction(null);
      }

      return;
    }

    if (type === "deactivate") {
      if (image.id) {
        deactivateImage(image.id, {
          onSuccess: () => setConfirmAction(null),
        });
      } else {
        removeLocalImage(index);
        setConfirmAction(null);
      }
    }
  }

  return (
    <div>
      <label className="mb-2 block text-xs font-semibold uppercase text-blue-700">
        Imágenes del producto
      </label>

      <label className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-blue-300 bg-slate-50 transition hover:border-blue-600 hover:bg-blue-50">
        <span className="text-sm font-semibold text-slate-700">
          Agregar imágenes
        </span>

        <span className="mt-1 text-xs text-slate-500">PNG, JPG o WEBP</span>

        <input
          type="file"
          multiple
          accept="image/png,image/jpeg,image/jpg,image/webp"
          onChange={handleImagesChange}
          className="hidden"
        />
      </label>

      {images.length > 0 && (
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6">
          {images.map((image, index) => (
            <div
              key={image.id ?? image.preview}
              className="group relative overflow-hidden rounded-xl border bg-white shadow-sm"
            >
              <Image
                src={image.preview}
                width={180}
                height={180}
                alt={image.alt ?? `Imagen producto ${index + 1}`}
                className="h-36 w-full object-cover"
              />

              {image.isMain && (
                <span className="absolute left-2 top-2 rounded-full bg-blue-700 px-2 py-1 text-[10px] font-bold text-white">
                  Principal
                </span>
              )}

              {!image.id && (
                <span className="absolute right-2 top-2 rounded-full bg-amber-500 px-2 py-1 text-[10px] font-bold text-white">
                  Nueva
                </span>
              )}

              <div className="absolute inset-x-2 bottom-2 flex gap-1 opacity-0 transition group-hover:opacity-100">
                <button
                  type="button"
                  disabled={isPending || image.isMain}
                  onClick={() =>
                    setConfirmAction({ type: "main", image, index })
                  }
                  className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-blue-700 px-2 py-1.5 text-[10px] font-semibold text-white disabled:opacity-60 cursor-pointer"
                >
                  <Star className="size-3" />
                  Principal
                </button>

                <label className="flex cursor-pointer items-center justify-center rounded-lg bg-slate-900 px-2 py-1.5 text-[10px] font-semibold text-white">
                  {isReplacing ? (
                    <Loader2 className="size-3 animate-spin" />
                  ) : (
                    <ImagePlus className="size-3" />
                  )}

                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    className="hidden"
                    disabled={isPending}
                    onChange={(e) => handleReplaceImage(e, image, index)}
                  />
                </label>

                <button
                  type="button"
                  disabled={isPending}
                  onClick={() =>
                    setConfirmAction({ type: "deactivate", image, index })
                  }
                  className="flex items-center justify-center rounded-lg bg-red-600 px-2 py-1.5 text-[10px] font-semibold text-white disabled:opacity-60 cursor-pointer"
                >
                  <Trash2 className="size-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {confirmAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl">
            <h3 className="text-lg font-bold text-slate-900">
              {confirmAction.type === "main"
                ? "Cambiar imagen principal"
                : "Desactivar imagen"}
            </h3>

            <p className="mt-2 text-sm text-slate-600">
              {confirmAction.type === "main"
                ? "¿Estás seguro de que quieres marcar esta imagen como principal?"
                : "¿Estás seguro de que quieres desactivar esta imagen? No se mostrará más en el producto."}
            </p>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                disabled={isPending}
                onClick={() => setConfirmAction(null)}
                className="rounded-xl border px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60 cursor-pointer"
              >
                Cancelar
              </button>

              <button
                type="button"
                disabled={isPending}
                onClick={executeConfirmedAction}
                className={`rounded-xl px-4 py-2 cursor-pointer text-sm font-semibold text-white disabled:opacity-60 ${
                  confirmAction.type === "main"
                    ? "bg-blue-700"
                    : "bg-red-600"
                }`}
              >
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="size-4 animate-spin" />
                    Procesando...
                  </span>
                ) : confirmAction.type === "main" ? (
                  "Sí, cambiar"
                ) : (
                  "Sí, desactivar"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}