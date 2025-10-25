"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { CountdownTimer } from "@/components/countdown-timer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Copy, Check, QrCode } from "lucide-react"

export default function PixPage() {
  const router = useRouter()
  const [pixCode, setPixCode] = useState("")
  const [qrCodeBase64, setQrCodeBase64] = useState("")
  const [orderId, setOrderId] = useState("")
  const [copied, setCopied] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<"pending" | "approved" | "failed">("pending")

  useEffect(() => {
    const pixData = sessionStorage.getItem("pixData")
    const orderIdData = sessionStorage.getItem("orderId")

    if (!pixData || !orderIdData) {
      router.push("/")
      return
    }

    const parsedPixData = JSON.parse(pixData)
    setPixCode(parsedPixData.codigo || "")
    setQrCodeBase64(parsedPixData.base64 || "")
    setOrderId(orderIdData)

    const interval = setInterval(() => {
      checkPaymentStatus(orderIdData)
    }, 5000)

    return () => clearInterval(interval)
  }, [router])

  const checkPaymentStatus = async (orderId: string) => {
    try {
      const response = await fetch(
        `https://admin.appmax.com.br/api/v3/order/${orderId}?access-token=E88CFF84-F81ACF6A-985DEB1C-007B9CCA`,
      )
      const data = await response.json()

      if (data.data?.status === "aprovado" || data.status === "aprovado") {
        setPaymentStatus("approved")
        setTimeout(() => {
          alert("Pagamento aprovado! Você receberá o material por email.")
        }, 1000)
      }
    } catch (error) {
      console.error("Error checking payment status:", error)
    }
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(pixCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CountdownTimer />

      <div className="mx-auto max-w-2xl px-4 py-8">
        <Card className="bg-white p-6 md:p-8">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#0891b2]">
              <QrCode className="h-8 w-8 text-white" />
            </div>

            <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">Pagamento via PIX</h1>
            <p className="mb-6 text-gray-600">
              Escaneie o QR Code ou copie o código abaixo para finalizar seu pagamento
            </p>

            {paymentStatus === "approved" ? (
              <div className="rounded-lg bg-green-50 p-6">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500">
                  <Check className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-xl font-bold text-green-700">Pagamento Aprovado!</h2>
                <p className="mt-2 text-green-600">Você receberá o material por email em instantes.</p>
              </div>
            ) : (
              <>
                <div className="mb-6 rounded-lg bg-gray-100 p-6">
                  {qrCodeBase64 ? (
                    <div className="mx-auto mb-4 w-64 rounded-lg bg-white p-4">
                      <img src={`data:image/png;base64,${qrCodeBase64}`} alt="QR Code PIX" className="h-full w-full" />
                    </div>
                  ) : (
                    <div className="mx-auto mb-4 h-64 w-64 rounded-lg bg-white p-4">
                      <div className="flex h-full items-center justify-center text-gray-400">
                        <QrCode className="h-32 w-32" />
                      </div>
                    </div>
                  )}
                  <p className="text-sm text-gray-600">Escaneie este QR Code com o app do seu banco</p>
                </div>

                <div className="mb-6">
                  <p className="mb-2 text-sm font-semibold text-gray-700">Ou copie o código PIX:</p>
                  <div className="flex gap-2">
                    <div className="flex-1 overflow-hidden rounded-lg border border-gray-300 bg-gray-50 p-3">
                      <p className="truncate text-sm text-gray-700">{pixCode}</p>
                    </div>
                    <Button onClick={handleCopyCode} className="bg-[#0891b2] px-6 hover:bg-[#0e7490]">
                      {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg bg-blue-50 p-4">
                  <p className="text-sm text-blue-800">
                    ⏱️ Aguardando pagamento... Assim que confirmarmos o pagamento, você receberá o material por email.
                  </p>
                </div>
              </>
            )}
          </div>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">Pedido #{orderId}</p>
        </div>
      </div>
    </div>
  )
}
