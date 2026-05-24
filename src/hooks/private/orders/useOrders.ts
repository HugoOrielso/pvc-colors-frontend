import {
  fetchOrderByOrderNumber,
  fetchOrders,
} from "@/services/private/orders/orders.service";
import { useQuery } from "@tanstack/react-query";

export const useOrders = () => {
  return useQuery<OrderListItem[], Error>({
    queryKey: ["orders"],
    queryFn: fetchOrders,
    staleTime: 1000 * 60 * 2,
  });
};

export const useOrderByOrderNumber = (orderNumber: string) => {
  return useQuery<OrderDetail, Error>({
    queryKey: ["order-detail", orderNumber],
    queryFn: () => fetchOrderByOrderNumber(orderNumber),
    enabled: Boolean(orderNumber),
    staleTime: 1000 * 60 * 5,
  });
};