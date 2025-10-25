"use client"

import { useEffect, useState } from "react"
import { Clock } from "lucide-react"

export function CountdownTimer() {
  const [time, setTime] = useState({ minutes: 10, seconds: 0 })

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="sticky top-0 z-50 bg-[#ef4444] px-4 py-3 text-center text-white shadow-lg">
      <div className="flex items-center justify-center gap-2 text-sm md:text-base">
        <Clock className="h-5 w-5 md:h-6 md:w-6" />
        <span className="font-medium">Esta oferta termina em:</span>
        <div className="flex items-center gap-1 font-bold">
          <span className="text-xl md:text-2xl">00</span>
          <span>:</span>
          <span className="text-xl md:text-2xl">{String(time.minutes).padStart(2, "0")}</span>
          <span>:</span>
          <span className="text-xl md:text-2xl">{String(time.seconds).padStart(2, "0")}</span>
        </div>
      </div>
    </div>
  )
}
