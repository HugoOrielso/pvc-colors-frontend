import OrdersDashboardPage from "@/components/orders/datatable-orders";

export const metadata = {
    title: "Órdenes | Dashboard",
    description: "Lista de todas las órdenes registradas",
};

export default function Page() {
    return <OrdersDashboardPage />;
}