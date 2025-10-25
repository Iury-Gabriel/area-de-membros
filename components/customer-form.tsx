"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User } from "lucide-react"

interface CustomerFormProps {
  formData: {
    nome: string
    email: string
    cpf: string
    numero: string
  }
  onFormDataChange: (data: any) => void
}

export function CustomerForm({ formData, onFormDataChange }: CustomerFormProps) {
  const handleChange = (field: string, value: string) => {
    onFormDataChange({ ...formData, [field]: value })
  }

  return (
    <div className="border-b border-gray-200 px-4 py-6 md:px-6">
      <div className="mb-4 flex items-center gap-2">
        <div className="rounded-md bg-[#1e3a5f] p-1.5">
          <User className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-lg font-bold text-gray-900">Identificação</h2>
      </div>

      <div className="space-y-3">
        <div>
          <Input
            id="name"
            placeholder="Nome completo"
            value={formData.nome}
            onChange={(e) => handleChange("nome", e.target.value)}
            className="h-11 border-gray-300 text-sm placeholder:text-gray-500"
          />
        </div>

        <div>
          <Label htmlFor="whatsapp" className="mb-1 block text-xs text-gray-600">
            Whatsapp
          </Label>
          <div className="flex gap-2">
            <div className="flex h-11 w-16 items-center justify-center rounded-md border border-gray-300 bg-white">
              <span className="text-lg">🇧🇷</span>
              <span className="ml-0.5 text-xs text-gray-500">▼</span>
            </div>
            <Input
              id="whatsapp"
              placeholder="+55"
              value={formData.numero}
              onChange={(e) => handleChange("numero", e.target.value)}
              className="h-11 flex-1 border-gray-300 text-sm"
            />
          </div>
        </div>

        <div>
          <Input
            id="cpf"
            placeholder="CPF"
            value={formData.cpf}
            onChange={(e) => handleChange("cpf", e.target.value)}
            className="h-11 border-gray-300 text-sm placeholder:text-gray-500"
          />
        </div>

        <div>
          <Input
            id="email"
            type="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="h-11 border-gray-300 text-sm placeholder:text-gray-500"
          />
          <p className="mt-1.5 text-xs text-gray-600">
            Preencha seu Email corretamente{" "}
            <span className="font-semibold underline">para receber o material do seu pedido.</span>
          </p>
        </div>
      </div>
    </div>
  )
}
