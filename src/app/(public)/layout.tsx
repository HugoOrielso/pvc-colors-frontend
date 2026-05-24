import { FloatingCart } from "@/components/cart/FloatingCart"
import { FloatingContactForm } from "@/components/contact/FloatingContactForm"

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <FloatingCart />
      <FloatingContactForm />
      {children}
    </div>
  )
}
