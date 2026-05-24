"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { useCartStore } from "@/store/cart-store";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(price);

export function FloatingCart() {
  const {
    cart,
    isOpen,
    openCart,
    closeCart,
    totalItems,
    totalPrice,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCartStore();

  const count = totalItems();

  return (
    <>
      <button
        type="button"
        onClick={openCart}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#061540] text-white shadow-xl transition hover:scale-105"
      >
        <ShoppingCart size={22} />

        {count > 0 && (
          <span className="absolute -right-1 -top-1 flex h-6 min-w-6 items-center justify-center rounded-full bg-[#35c791] px-1 text-xs font-black text-white">
            {count}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            onClick={closeCart}
            className="absolute inset-0 bg-black/40"
          />

          <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b px-5 py-4">
              <h2 className="text-lg font-black text-[#061540]">
                Tu carrito
              </h2>

              <button
                type="button"
                onClick={closeCart}
                className="rounded-full p-2 text-[#061540]/60 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                <ShoppingCart size={42} className="mb-4 text-[#061540]/25" />
                <p className="text-lg font-black text-[#061540]">
                  Tu carrito está vacío
                </p>
                <p className="mt-2 text-sm text-[#061540]/55">
                  Agrega productos para continuar.
                </p>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-5 py-4">
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div
                        key={item.cartItemId}
                        className="rounded-2xl border border-[#061540]/10 p-3"
                      >
                        <div className="flex gap-3">
                          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                            {item.productImage && (
                              <Image
                                src={item.productImage}
                                alt={item.productName}
                                fill
                                className="object-cover"
                              />
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="line-clamp-2 text-sm font-black text-[#061540]">
                              {item.productName}
                            </p>

                            <p className="mt-1 text-xs font-bold text-[#061540]/50">
                              {item.presentationName}
                            </p>

                            {item.colorValue && (
                              <div className="mt-2 flex items-center gap-2">
                                <span
                                  className="h-4 w-4 rounded-full border"
                                  style={{
                                    backgroundColor: item.colorValue,
                                  }}
                                />
                                <span className="text-xs text-[#061540]/50">
                                  {item.colorName ?? item.colorValue}
                                </span>
                              </div>
                            )}

                            <p className="mt-2 text-sm font-black text-[#061540]">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeFromCart(item.cartItemId)}
                            className="h-fit rounded-lg p-2 text-red-500 hover:bg-red-50"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                          <div className="inline-flex overflow-hidden rounded-xl border">
                            <button
                              type="button"
                              onClick={() =>
                                decreaseQuantity(item.cartItemId)
                              }
                              className="flex h-9 w-9 items-center justify-center hover:bg-slate-100"
                            >
                              <Minus size={14} />
                            </button>

                            <div className="flex h-9 w-10 items-center justify-center border-x text-sm font-black">
                              {item.quantity}
                            </div>

                            <button
                              type="button"
                              onClick={() => {
                                const result = increaseQuantity(
                                  item.cartItemId
                                );

                                if (!result.ok) {
                                  toast.error(result.message);
                                }
                              }}
                              className="flex h-9 w-9 items-center justify-center hover:bg-slate-100"
                            >
                              <Plus size={14} />
                            </button>
                          </div>

                          <p className="text-xs font-bold text-[#061540]/45">
                            Stock: {item.stock}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t bg-white p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm font-bold text-[#061540]/60">
                      Total
                    </span>

                    <span className="text-xl font-black text-[#061540]">
                      {formatPrice(totalPrice())}
                    </span>
                  </div>

                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="flex h-12 w-full items-center justify-center rounded-xl bg-[#35c791] text-sm font-black text-white transition hover:brightness-95"
                  >
                    Ir a checkout
                  </Link>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </>
  );
}