
export function StatusBadgeInvoice({ status }: { status: OrderStatus }) {
    const config: Record<OrderStatus, { label: string; className: string; emoji: string }> = {
        PAID:      { label: "Pago aprobado",    className: "bg-green-100 text-green-700",   emoji: "✅" },
        PENDING_PAYMENT:     { label: "Error en el pago", className: "bg-red-100 text-red-700",       emoji: "⚠️" },
        CANCELLED: { label: "Pago cancelado",   className: "bg-gray-100 text-gray-600",     emoji: "🚫" },
        REFUNDED:  { label: "Pago reembolsado", className: "bg-blue-100 text-blue-700",     emoji: "↩️" },
        DRAFT:   { label: "Pago expirado",    className: "bg-gray-100 text-gray-700", emoji: "⏰" },
    };

    const { label, className, emoji } = config[status] ?? {
        label: "Estado desconocido",
        className: "bg-gray-100 text-gray-500",
        emoji: "❓",
    };

    return (
        <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${className}`}>
            {emoji} {label}
        </span>
    );
}