"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { CountdownTimer } from "./countdown-timer"
import { CustomerForm } from "./customer-form"
import { PaymentSection } from "./payment-section"
import { MainProduct } from "./main-product"
import { ProductOffers } from "./product-offers"
import { SpecialPromotion } from "./special-promotion"
import { OrderSummary } from "./order-summary"
import { SecurityBadges } from "./security-badges"

export function CheckoutPage() {
  const searchParams = useSearchParams()

  const [utmParams, setUtmParams] = useState({
    utm_source: "",
    utm_campaign: "",
    utm_medium: "",
    utm_content: "",
    utm_term: "",
  })

  const [selectedOffers, setSelectedOffers] = useState<string[]>([])
  const [specialPromotionActive, setSpecialPromotionActive] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "credit">("pix")
  const [installments, setInstallments] = useState(1)

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    cpf: "",
    numero: "",
  })

  const [cardData, setCardData] = useState({
    number: "",
    cvv: "",
    month: "",
    year: "",
    name: "",
  })

  useEffect(() => {
    setUtmParams({
      utm_source: searchParams.get("utm_source") || "",
      utm_campaign: searchParams.get("utm_campaign") || "",
      utm_medium: searchParams.get("utm_medium") || "",
      utm_content: searchParams.get("utm_content") || "",
      utm_term: searchParams.get("utm_term") || "",
    })
  }, []) // Empty dependency array - only run once on mount

  const handleToggleOffer = (offerId: string) => {
    setSelectedOffers((prev) => (prev.includes(offerId) ? prev.filter((id) => id !== offerId) : [...prev, offerId]))
  }

  const handleToggleSpecialPromotion = () => {
    const allOfferIds = ["comunidade-vip", "upgrade-vitalicio", "pack-camisetas", "artes-squeeze", "artes-almofadas"]

    if (!specialPromotionActive) {
      setSelectedOffers(allOfferIds)
      setSpecialPromotionActive(true)
    } else {
      setSelectedOffers([])
      setSpecialPromotionActive(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CountdownTimer />

      <div className="mx-auto max-w-2xl bg-white">
        <MainProduct />

        <CustomerForm formData={formData} onFormDataChange={setFormData} />

        <PaymentSection
          paymentMethod={paymentMethod}
          onPaymentMethodChange={setPaymentMethod}
          installments={installments}
          onInstallmentsChange={setInstallments}
          cardData={cardData}
          onCardDataChange={setCardData}
          selectedOffers={selectedOffers}
        />
      </div>

      <div className="mx-auto max-w-2xl px-4 py-6">
        <ProductOffers selectedOffers={selectedOffers} onToggleOffer={handleToggleOffer} />
      </div>

      <div className="mx-auto max-w-2xl px-4">
        <SpecialPromotion isActive={specialPromotionActive} onToggle={handleToggleSpecialPromotion} />

        <div className="mt-6">
          <OrderSummary
            selectedOffers={selectedOffers}
            paymentMethod={paymentMethod}
            installments={installments}
            formData={formData}
            cardData={cardData}
            utmParams={utmParams}
          />
        </div>

        <SecurityBadges />
      </div>
    </div>
  )
}
