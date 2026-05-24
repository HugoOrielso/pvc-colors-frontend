import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  cartItemId: string;

  productId: string;
  productName: string;
  productSlug?: string;
  productImage?: string | null;

  presentationId: string;
  presentationName: string;
  price: number;
  stock: number;
  sku?: string | null;

  colorId?: string | null;
  colorName?: string | null;
  colorValue?: string | null;

  quantity: number;
}

export interface AddToCartInput {
  productId: string;
  productName: string;
  productSlug?: string;
  productImage?: string | null;

  presentationId: string;
  presentationName: string;
  price: number;
  stock: number;
  sku?: string | null;

  colorId?: string | null;
  colorName?: string | null;
  colorValue?: string | null;

  quantity?: number;
}

interface CartState {
  cart: CartItem[];
  isOpen: boolean;

  addToCart: (item: AddToCartInput) => { ok: boolean; message?: string };
  removeFromCart: (cartItemId: string) => void;
  increaseQuantity: (cartItemId: string) => { ok: boolean; message?: string };
  decreaseQuantity: (cartItemId: string) => void;
  clearCart: () => void;

  totalItems: () => number;
  totalPrice: () => number;
  openCart: () => void;
  closeCart: () => void;
}

const buildCartItemId = (item: AddToCartInput) =>
  `${item.productId}-${item.presentationId}-${item.colorId ?? "no-color"}`;

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      isOpen: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      addToCart: (item) => {
        const quantityToAdd = item.quantity ?? 1;

        if (!item.presentationId) {
          return { ok: false, message: "Selecciona una presentación." };
        }

        if (item.stock <= 0) {
          return { ok: false, message: "Este producto no tiene stock disponible." };
        }

        const cartItemId = buildCartItemId(item);
        const existing = get().cart.find((p) => p.cartItemId === cartItemId);

        if (existing) {
          const nextQuantity = existing.quantity + quantityToAdd;

          if (nextQuantity > existing.stock) {
            return {
              ok: false,
              message: `Solo hay ${existing.stock} unidades disponibles.`,
            };
          }

          set((state) => ({
            cart: state.cart.map((p) =>
              p.cartItemId === cartItemId
                ? { ...p, quantity: nextQuantity }
                : p
            ),
            isOpen: true,
          }));

          return { ok: true };
        }

        if (quantityToAdd > item.stock) {
          return {
            ok: false,
            message: `Solo hay ${item.stock} unidades disponibles.`,
          };
        }

        set((state) => ({
          cart: [
            ...state.cart,
            {
              cartItemId,
              ...item,
              quantity: quantityToAdd,
            },
          ],
          isOpen: true,
        }));

        return { ok: true };
      },

      removeFromCart: (cartItemId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.cartItemId !== cartItemId),
        })),

      increaseQuantity: (cartItemId) => {
        const item = get().cart.find((p) => p.cartItemId === cartItemId);

        if (!item) {
          return { ok: false, message: "Producto no encontrado." };
        }

        if (item.quantity >= item.stock) {
          return {
            ok: false,
            message: `Solo hay ${item.stock} unidades disponibles.`,
          };
        }

        set((state) => ({
          cart: state.cart.map((p) =>
            p.cartItemId === cartItemId
              ? { ...p, quantity: p.quantity + 1 }
              : p
          ),
        }));

        return { ok: true };
      },

      decreaseQuantity: (cartItemId) =>
        set((state) => ({
          cart: state.cart
            .map((item) =>
              item.cartItemId === cartItemId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0),
        })),

      clearCart: () => set({ cart: [] }),

      totalItems: () =>
        get().cart.reduce((acc, item) => acc + item.quantity, 0),

      totalPrice: () =>
        get().cart.reduce((acc, item) => acc + item.quantity * item.price, 0),
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({
        cart: state.cart,
      }),
    }
  )
);