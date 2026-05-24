import axiosClient from "@/lib/axios";

export const fetchOrders = async () => {
  const res = await axiosClient.get("/orders");
  return res.data.data as OrderListItem[];
};

export const fetchOrderByOrderNumber = async (orderNumber: string) => {
  const res = await axiosClient.get(`/orders/${orderNumber}`);
  return res.data.data as OrderDetail;
};