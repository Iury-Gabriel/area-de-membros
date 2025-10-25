import { Suspense } from "react"
import { CheckoutPage } from "@/components/checkout-page"

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <CheckoutPage />
    </Suspense>
  )
}
