"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface OrderSummaryProps {
  selectedOffers: string[]
  paymentMethod: "pix" | "credit"
  installments: number
  formData: {
    nome: string
    email: string
    cpf: string
    numero: string
  }
  cardData: {
    number: string
    cvv: string
    month: string
    year: string
    name: string
  }
  utmParams: {
    utm_source: string
    utm_campaign: string
    utm_medium: string
    utm_content: string
    utm_term: string
  }
}

export function OrderSummary({
  selectedOffers,
  paymentMethod,
  installments,
  formData,
  cardData,
  utmParams,
}: OrderSummaryProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const mainProductOriginal = 99.0
  const mainProductPrice = 6.9

  const offerPrices: Record<string, { original: number; price: number }> = {
    "comunidade-vip": { original: 59.9, price: 7.9 },
    "upgrade-vitalicio": { original: 79.9, price: 12.9 },
    "pack-camisetas": { original: 99.9, price: 14.9 },
    "artes-squeeze": { original: 59.0, price: 9.9 },
    "artes-almofadas": { original: 79.9, price: 12.9 },
  }

  const offersOriginalTotal = selectedOffers.reduce((sum, id) => sum + (offerPrices[id]?.original || 0), 0)
  const offersPriceTotal = selectedOffers.reduce((sum, id) => sum + (offerPrices[id]?.price || 0), 0)

  const totalOriginal = mainProductOriginal + offersOriginalTotal
  const totalPrice = mainProductPrice + offersPriceTotal
  const totalSavings = totalOriginal - totalPrice

  const installmentValue = (totalPrice / installments).toFixed(2)

  const handleFinalizarPedido = async () => {
    if (!formData.nome || !formData.email || !formData.cpf || !formData.numero) {
      alert("Por favor, preencha todos os campos de identificação")
      return
    }

    if (paymentMethod === "credit") {
      if (!cardData.name || !cardData.number || !cardData.cvv || !cardData.month || !cardData.year) {
        alert("Por favor, preencha todos os dados do cartão")
        return
      }
    }

    setIsLoading(true)

    try {
      const orderData: any = {
        nome: formData.nome,
        email: formData.email,
        cpf: formData.cpf,
        numero: formData.numero,
        metodo_pagamento: paymentMethod,
        orderbump1: selectedOffers.includes("comunidade-vip"),
        orderbump2: selectedOffers.includes("upgrade-vitalicio"),
        orderbump3: selectedOffers.includes("pack-camisetas"),
        orderbump4: selectedOffers.includes("artes-squeeze"),
        orderbump5: selectedOffers.includes("artes-almofadas"),
        utm_source: utmParams.utm_source,
        utm_campaign: utmParams.utm_campaign,
        utm_medium: utmParams.utm_medium,
        utm_content: utmParams.utm_content,
        utm_term: utmParams.utm_term,
      }

      if (paymentMethod === "credit") {
        orderData.metodo_pagamento = "credito"
        orderData.cartao = {
          number: cardData.number,
          cvv: cardData.cvv,
          month: Number.parseInt(cardData.month),
          year: Number.parseInt(cardData.year),
          name: cardData.name,
          installments: installments,
        }
      }

      console.log("[v0] Sending order data:", orderData)

      const response = await fetch("https://area-de-membros-backend.g8hlwx.easypanel.host/criar-pedido", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })

      const data = await response.json()
      console.log("[v0] Order response:", data)

      if (!response.ok) {
        throw new Error(data.message || "Erro ao criar pedido")
      }

      if (paymentMethod === "pix" && data.pagamento) {
        sessionStorage.setItem(
          "pixData",
          JSON.stringify({
            codigo: data.pagamento,
            base64: data.base64,
          }),
        )
        sessionStorage.setItem("orderId", data.order_id)
        router.push("/pix")
      } else {
        alert("Pedido criado com sucesso!")
      }
    } catch (error: any) {
      console.error("[v0] Error creating order:", error)
      alert(error.message || "Erro ao processar pedido. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="bg-white p-6">
      <div className="space-y-4">
        <div className="space-y-2 border-b border-gray-200 pb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-700">Pacote com 15.000 Artes para Sublimação de Canecas:</span>
            <div className="text-right">
              <span className="text-gray-500 line-through">R$ {mainProductOriginal.toFixed(2)}</span>
              <span className="ml-2 font-bold text-gray-900">R$ {mainProductPrice.toFixed(2)}</span>
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-700">Ofertas:</span>
            <div className="text-right">
              <span className="text-gray-500 line-through">R$ {offersOriginalTotal.toFixed(2)}</span>
              <span className="ml-2 font-bold text-gray-900">R$ {offersPriceTotal.toFixed(2)}</span>
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-700">Você economizou:</span>
            <span className="font-bold text-[#dc2626]">R$ {totalSavings.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between py-2">
          <span className="text-xl font-bold text-gray-900 md:text-2xl">Total:</span>
          <span className="text-2xl font-bold text-gray-900 md:text-3xl">
            {paymentMethod === "pix" ? `R$ ${totalPrice.toFixed(2)}` : `${installments}x de R$ ${installmentValue}`}
          </span>
        </div>

        <Button
          onClick={handleFinalizarPedido}
          disabled={isLoading}
          className="w-full bg-[#1e293b] py-6 text-lg font-bold text-[#0891b2] hover:bg-[#334155] disabled:opacity-50"
        >
          {isLoading ? "PROCESSANDO..." : paymentMethod === "pix" ? "COPIAR CODIGO PIX" : "FINALIZAR PEDIDO"}
        </Button>
      </div>
    </Card>
  )
}
