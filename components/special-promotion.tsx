"use client"

import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

interface SpecialPromotionProps {
  isActive: boolean
  onToggle: () => void
}

export function SpecialPromotion({ isActive, onToggle }: SpecialPromotionProps) {
  const allOffersOriginalPrice = 377.6 // Sum of all original prices
  const allOffersDiscountPrice = 58.5 // Sum of all discounted prices

  return (
    <Card className="mt-6 border-4 border-dashed border-[#22c55e] bg-white p-0">
      <div className="bg-white px-4 py-3">
        <h2 className="text-xl font-bold text-[#dc2626] md:text-2xl">PROMOÇÃO ESPECIAL</h2>
      </div>

      <button
        onClick={onToggle}
        className="w-full bg-[#22c55e] px-4 py-4 text-left transition-opacity hover:opacity-90"
      >
        <div className="flex items-center justify-between gap-4">
          <p className="flex-1 text-sm font-bold text-white md:text-base">
            Todas ofertas acima de R$ {allOffersOriginalPrice.toFixed(2)} por R$ {allOffersDiscountPrice.toFixed(2)}
          </p>
          <Checkbox
            checked={isActive}
            className="h-8 w-8 flex-shrink-0 border-2 border-white bg-white data-[state=checked]:bg-white data-[state=checked]:text-[#22c55e]"
          />
        </div>
      </button>
    </Card>
  )
}
