import Image from "next/image"

export function MainProduct() {
  return (
    <div className="border-b border-gray-200 px-4 py-6 md:px-6">
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <Image
            src="/Principal Pacote 15.000 Artes Canecas.webp"
            alt="Pacote com 15.000 Artes para Sublimação de Canecas"
            width={100}
            height={100}
            className="rounded-lg"
          />
        </div>

        <div className="flex-1">
          <h2 className="text-base font-semibold text-gray-900 md:text-lg">
            Pacote com 15.000 Artes para Sublimação de Canecas
          </h2>
          <p className="mt-1 text-xs text-gray-600 md:text-sm">
            São 15.000 arquivos em alta qualidade (PNG) organizados por temas e datas comemorativas, prontos para
            imprimir e lucrar!
          </p>
          <p className="mt-2 text-xs text-gray-600 md:text-sm">
            de <span className="line-through">R$ 99.00</span> por apenas
          </p>
          <div className="mt-1">
            <span className="text-2xl font-bold text-[#0891b2] md:text-3xl">6x de R$ 1,15</span>
          </div>
          <p className="mt-1 text-xs text-gray-600 md:text-sm">ou R$ 6.90 à vista</p>
        </div>
      </div>
    </div>
  )
}
