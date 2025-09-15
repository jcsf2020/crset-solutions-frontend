"use client"
import { useEffect, useState } from "react"

type Telemetry = { cpu: number; ram: number; net: number }

export function useTelemetry(pollMs = 1200) {
  const [t, setT] = useState<Telemetry>({ cpu: 68, ram: 42, net: 12 })

  useEffect(() => {
    const id = setInterval(() => {
      setT(prev => ({
        cpu: clamp(jitter(prev.cpu, 8), 3, 97),
        ram: clamp(jitter(prev.ram, 6), 8, 92),
        net: clamp(jitter(prev.net, 10), 1, 85),
      }))
    }, pollMs)
    return () => clearInterval(id)
  }, [pollMs])

  return t
}

function jitter(value: number, amplitude: number) {
  const delta = (Math.random() - 0.5) * 2 * amplitude
  return Math.round(value + delta)
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}
