export function SecurityBadges() {
  return (
    <div className="mt-8 space-y-4 pb-8">
      <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🔒</span>
          <span className="font-semibold">SITE 100% SEGURO</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl">🛡️</span>
          <span className="font-semibold">SECURED BY GeoTrust</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl">✓</span>
          <span className="font-semibold">SITE SEGURO by Google</span>
        </div>
      </div>

      <p className="text-center text-xs text-gray-500">Este site está protegido pelo Google reCAPTCHA.</p>

      <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
        <span className="text-xl">Ⓓ</span>
        <span>Tecnologia Dripay © 2025 - Todos os direitos reservados</span>
      </div>

      <div className="flex items-center justify-center gap-2">
        <span className="text-[#22c55e]">✓</span>
        <span className="text-sm font-semibold text-[#22c55e]">Compra 100% segura</span>
      </div>
    </div>
  )
}
