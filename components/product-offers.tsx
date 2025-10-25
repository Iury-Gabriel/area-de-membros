"use client"

import { Card } from "@/components/ui/card"
import { Check } from "lucide-react"

interface ProductOffersProps {
  selectedOffers: string[]
  onToggleOffer: (offerId: string) => void
}

const offers = [
  {
    id: "comunidade-vip",
    title: "Acesso à Comunidade VIP no WhatsApp",
    description:
      "Participar de um grupo com empreendedores reais que também trabalham com personalizados. Tirar dúvidas, trocar experiências e aprender novas técnicas de sublimação.",
    originalPrice: 59.9,
    price: 7.9,
    image: "/OrderbumpZap.webp",
  },
  {
    id: "upgrade-vitalicio",
    title: "Upgrade Vitalício — Tenha acesso para sempre!",
    description:
      "Adicione o acesso vitalício e garanta que suas artes fiquem disponíveis pra sempre, sem precisar renovar ou pagar novamente no futuro.",
    originalPrice: 79.9,
    price: 12.9,
    image: "/OrderbumpAcesso-vitalicio.webp",
  },
  {
    id: "pack-camisetas",
    title: "Pack 40.000 Artes para Estampar Camisetas",
    description:
      "Transforme camisetas comuns em produtos personalizados de alto valor com o maior pacote de artes para estamparia do Brasil!",
    originalPrice: 99.9,
    price: 14.9,
    image: "/OrderbumpArtes-para-camisetas.webp",
  },
  {
    id: "artes-squeeze",
    title: "Artes para Squeeze Personalizadas",
    description:
      "Temas Variados e Exclusivos, Crie squeezes incríveis e personalizados com o maior pacote de artes para squeezes do Brasil!",
    originalPrice: 59.0,
    price: 9.9,
    image: "/OrderbumpArtes-para-Squeezes.webp",
  },
  {
    id: "artes-almofadas",
    title: "Pacote Artes para Almofadas Personalizadas",
    description: "Encante seus clientes com almofadas criativas e cheias de estilo!",
    originalPrice: 79.9,
    price: 12.9,
    image: "/OrderbumpArtes-para-almofadas.webp",
  },
]

export function ProductOffers({ selectedOffers, onToggleOffer }: ProductOffersProps) {
  return (
    <div className="space-y-4">
      {offers.map((offer) => {
        const isAdded = selectedOffers.includes(offer.id)

        return (
          <Card
            key={offer.id}
            className={`overflow-hidden border-4 border-dashed bg-white p-0 transition-colors ${
              isAdded ? "border-[#0891b2]" : "border-[#fbbf24]"
            }`}
          >
            <div className="bg-[#dc2626] px-4 py-2 text-center">
              <p className="text-sm font-bold text-white md:text-base">⚠️ PROMOÇÃO POR TEMPO LIMITADO!! ⚠️</p>
            </div>

            <div className="p-4">
              <div className="flex flex-col gap-4 md:flex-row md:items-start">
                <img
                  src={offer.image || "/placeholder.svg"}
                  alt={offer.title}
                  className="h-32 w-32 flex-shrink-0 rounded-lg object-cover md:h-40 md:w-40"
                />

                <div className="flex-1 space-y-2">
                  <h3 className="text-lg font-bold text-gray-900 md:text-xl">{offer.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-700">{offer.description}</p>

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 line-through">R$ {offer.originalPrice.toFixed(2)}</span>
                    <span className="text-xs text-gray-600">por</span>
                    <span className="text-2xl font-bold text-[#dc2626] md:text-3xl">R$ {offer.price.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                className={`mt-4 flex w-full items-center justify-between gap-2 rounded-md py-4 px-4 text-base font-bold transition-colors md:text-lg ${
                  isAdded
                    ? "bg-[#1e293b] text-white hover:bg-[#334155]"
                    : "bg-[#fbbf24] text-gray-900 hover:bg-[#f59e0b]"
                }`}
                onClick={() => onToggleOffer(offer.id)}
              >
                <span className="flex-1 text-left">{isAdded ? "PROMOÇÃO ADICIONADA" : "ADICIONAR AO CARRINHO"}</span>
                <div
                  className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded ${
                    isAdded ? "bg-white" : "border-2 border-gray-900 bg-white"
                  }`}
                >
                  {isAdded && <Check className="h-5 w-5 text-[#1e293b]" />}
                </div>
              </button>
            </div>
          </Card>
        )
      })}
    </div>
  )
}

export { offers }
