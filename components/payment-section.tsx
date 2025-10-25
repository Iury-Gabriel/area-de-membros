"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreditCard, Clock, Shield, QrCode } from "lucide-react"
import { useMemo } from "react"

interface PaymentSectionProps {
  paymentMethod: "pix" | "credit"
  onPaymentMethodChange: (method: "pix" | "credit") => void
  installments: number
  onInstallmentsChange: (installments: number) => void
  cardData: {
    number: string
    cvv: string
    month: string
    year: string
    name: string
  }
  onCardDataChange: (data: any) => void
  selectedOffers: string[]
}

export function PaymentSection({
  paymentMethod,
  onPaymentMethodChange,
  installments,
  onInstallmentsChange,
  cardData,
  onCardDataChange,
  selectedOffers,
}: PaymentSectionProps) {
  const handleCardChange = (field: string, value: string) => {
    onCardDataChange({ ...cardData, [field]: value })
  }

  const totalPrice = useMemo(() => {
    const mainProductPrice = 6.9
    const offerPrices: Record<string, number> = {
      "comunidade-vip": 7.9,
      "upgrade-vitalicio": 12.9,
      "pack-camisetas": 14.9,
      "artes-squeeze": 9.9,
      "artes-almofadas": 12.9,
    }
    const offersPriceTotal = selectedOffers.reduce((sum, id) => sum + (offerPrices[id] || 0), 0)
    return mainProductPrice + offersPriceTotal
  }, [selectedOffers])

  const maxInstallments = useMemo(() => {
    const max = Math.floor(totalPrice / 5)
    return Math.min(Math.max(1, max), 12)
  }, [totalPrice])

  const installmentOptions = useMemo(() => {
    const options = []
    for (let i = 1; i <= maxInstallments; i++) {
      options.push(i)
    }
    return options
  }, [maxInstallments])

  const calculateInstallmentPrice = (installments: number) => {
    return (totalPrice / installments).toFixed(2)
  }

  return (
    <div className="px-4 py-6 md:px-6">
      <div className="mb-4 flex items-center gap-2">
        <div className="rounded-md bg-[#1e3a5f] p-1.5">
          <CreditCard className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-lg font-bold text-gray-900">Pagamento</h2>
      </div>

      <div className="space-y-3">
        {/* PIX Option */}
        <div
          className={`rounded-lg border-2 transition-colors ${
            paymentMethod === "pix" ? "border-[#0891b2]" : "border-gray-300"
          }`}
        >
          <button onClick={() => onPaymentMethodChange("pix")} className="w-full p-4 text-left">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative h-5 w-5">
                  {paymentMethod === "pix" ? (
                    <svg className="h-5 w-5 text-[#0891b2]" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-gray-300 bg-white" />
                  )}
                </div>
                <span className="text-base font-semibold text-gray-900">PIX</span>
              </div>
              <span className="text-2xl">💠</span>
            </div>
          </button>

          {paymentMethod === "pix" && (
            <div className="space-y-4 border-t border-gray-200 p-4">
              <p className="text-sm leading-relaxed text-gray-700">
                Clique no botão <span className="font-bold">FINALIZAR COMPRA</span> para confirmar seu pedido e pagar
                com pix na próxima tela.
              </p>

              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <Clock className="h-5 w-5 text-[#0891b2]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">APROVAÇÃO IMEDIATA</h4>
                    <p className="text-sm text-gray-600">O pagamento com Pix é aprovado instantaneamente</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <Shield className="h-5 w-5 text-[#0891b2]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">TRANSAÇÃO SEGURA</h4>
                    <p className="text-sm text-gray-600">
                      O Pix foi desenvolvido pelo Banco Central para facilitar suas compras, garantindo a proteção dos
                      seus dados
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <QrCode className="h-5 w-5 text-[#0891b2]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">FINALIZE SUA COMPRA COM FACILIDADE</h4>
                    <p className="text-sm text-gray-600">
                      É só acessar a área Pix no aplicativo do seu banco e escanear o QR code ou digitar o código
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Credit Card Option */}
        <div
          className={`rounded-lg border-2 transition-colors ${
            paymentMethod === "credit" ? "border-[#0891b2]" : "border-gray-300"
          }`}
        >
          <button onClick={() => onPaymentMethodChange("credit")} className="w-full p-4 text-left">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative h-5 w-5">
                  {paymentMethod === "credit" ? (
                    <svg className="h-5 w-5 text-[#0891b2]" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-gray-300 bg-white" />
                  )}
                </div>
                <span className="text-base font-semibold text-gray-900">Cartão de Crédito</span>
              </div>
              <span className="text-2xl">💳</span>
            </div>
          </button>

          {paymentMethod === "credit" && (
            <div className="space-y-3 border-t border-gray-200 p-4">
              <div>
                <Input
                  id="card-name"
                  placeholder="Nome do Titular"
                  value={cardData.name}
                  onChange={(e) => handleCardChange("name", e.target.value)}
                  className="h-11 border-gray-300 text-sm placeholder:text-gray-500"
                />
              </div>

              <div>
                <Input
                  id="card-number"
                  placeholder="Número do Cartão"
                  value={cardData.number}
                  onChange={(e) => handleCardChange("number", e.target.value)}
                  className="h-11 border-gray-300 text-sm placeholder:text-gray-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Input
                  id="expiry"
                  placeholder="Validade (MM/AA)"
                  value={cardData.month && cardData.year ? `${cardData.month}/${cardData.year}` : ""}
                  onChange={(e) => {
                    const [month, year] = e.target.value.split("/")
                    onCardDataChange({ ...cardData, month: month || "", year: year || "" })
                  }}
                  className="h-11 border-gray-300 text-sm placeholder:text-gray-500"
                />
                <Input
                  id="cvv"
                  placeholder="CVV"
                  value={cardData.cvv}
                  onChange={(e) => handleCardChange("cvv", e.target.value)}
                  className="h-11 border-gray-300 text-sm placeholder:text-gray-500"
                />
              </div>

              <div>
                <Label htmlFor="installments" className="mb-1 block text-xs text-gray-600">
                  Parcelas
                </Label>
                <select
                  id="installments"
                  value={installments}
                  onChange={(e) => onInstallmentsChange(Number(e.target.value))}
                  className="h-11 w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900"
                >
                  {installmentOptions.map((num) => (
                    <option key={num} value={num}>
                      {num}x de R$ {calculateInstallmentPrice(num)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
