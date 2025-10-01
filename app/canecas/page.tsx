"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Component from "../../members-area-canecas"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

interface UserData {
  id: number
  name: string
  email: string
  produto1: boolean
  produto2: boolean
  produto3: boolean
}

export default function Page() {
  const [isVerified, setIsVerified] = useState(false)
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isCheckingSession, setIsCheckingSession] = useState(true)
  const [userData, setUserData] = useState<UserData | null>(null)

  useEffect(() => {
    const verifiedEmail = localStorage.getItem("verifiedEmail")
    const storedUserData = localStorage.getItem("userData")
    const timestamp = localStorage.getItem("userDataTimestamp")
    const now = new Date().getTime()
    const sevenDays = 7 * 24 * 60 * 60 * 1000

    if (verifiedEmail && storedUserData && timestamp && now - parseInt(timestamp) <= sevenDays) {
      setIsVerified(true)
      setEmail(verifiedEmail)
      setUserData(JSON.parse(storedUserData))
    }
    setIsCheckingSession(false)
  }, [])

  const handleVerifyEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const verifyResponse = await fetch("https://area-de-membros-backend.g8hlwx.easypanel.host/canecas/verificaremail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const isValid = await verifyResponse.json()

      if (isValid === true) {
        const userDataResponse = await fetch(
          `https://area-de-membros-backend.g8hlwx.easypanel.host/canecas/buscardados/${encodeURIComponent(email)}`,
        )
        const fetchedUserData: UserData = await userDataResponse.json()

        const now = new Date().getTime()
        localStorage.setItem("verifiedEmail", email)
        localStorage.setItem("userData", JSON.stringify(fetchedUserData))
        localStorage.setItem("userDataTimestamp", now.toString())

        setUserData(fetchedUserData)
        setIsVerified(true)
      } else {
        setError("Email não encontrado. Por favor, use o email da sua compra.")
      }
    } catch (err) {
      setError("Erro ao verificar email. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isCheckingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    )
  }

  if (!isVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Área de Membros</CardTitle>
            <CardDescription>Digite o email usado na compra para acessar</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerifyEmail} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verificando...
                  </>
                ) : (
                  "Acessar"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <Component userEmail={email} userData={userData} />
}
