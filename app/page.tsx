"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Page() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 p-6">
      <h1 className="text-3xl font-bold text-purple-700 mb-8">🎉 Bem-vindo aos Pacotes Premium</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        
        {/* Opção Resinas */}
        <Card className="overflow-hidden shadow-lg">
          <img src="/images/escola-resina.png" alt="Resinas" className="w-full h-48 object-cover" />
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-center">Pacote Resinas</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button onClick={() => router.push("/resinas")}>Acessar Resinas</Button>
          </CardContent>
        </Card>

        {/* Opção Canecas */}
        <Card className="overflow-hidden shadow-lg">
          <img src="/images/45milartes.png" alt="Canecas" className="w-full h-48 object-cover" />
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-center">Pacote Canecas</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button onClick={() => router.push("/canecas")}>Acessar Canecas</Button>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
