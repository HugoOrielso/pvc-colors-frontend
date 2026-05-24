import { useMutation } from "@tanstack/react-query";
import {
  createWompiCheckout,
  CheckoutCustomerPayload,
} from "@/services/public/checkout/checkout.service";
import { CartItem } from "@/store/cart-store";

export function useCreateWompiCheckout() {
  return useMutation({
    mutationFn: ({
      customer,
      cart,
    }: {
      customer: CheckoutCustomerPayload;
      cart: CartItem[];
    }) => createWompiCheckout(customer, cart),
  });
}