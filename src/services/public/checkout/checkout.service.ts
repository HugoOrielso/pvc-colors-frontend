import axiosClientPublic from "@/lib/axiosPublic";
import { CartItem } from "@/store/cart-store";

export interface CheckoutCustomerPayload {
  fullName: string;
  documentType: string;
  documentNumber: string;
  address: string;
  email: string;
  phone: string;
  city: string;
  department: string;
  country: string;
}

export async function createWompiCheckout(
  customer: CheckoutCustomerPayload,
  cart: CartItem[]
) {
  const payload = {
    customer,
    items: cart.map((item) => ({
      productId: item.productId,
      presentationId: item.presentationId,
      color: item.colorName ?? item.colorValue ?? null,
      quantity: item.quantity,
    })),
  };

  const res = await axiosClientPublic.post("/checkout/wompi", payload);

  return res.data as {
    ok: boolean;
    data: {
      orderId: string;
      reference: string;
      paymentUrl: string;
    };
  };
}