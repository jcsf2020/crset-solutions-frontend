"use client"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function HoloButton({ className, children, ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button
      className={cn(
        "relative overflow-hidden border border-cyan-500/30 bg-cyan-500/10 shadow-neon",
        "hover:bg-cyan-500/20 active:translate-y-px",
        "before:absolute before:inset-0 before:animate-scan before:bg-gradient-to-b before:from-transparent before:via-white/5 before:to-transparent",
        "backdrop-blur-md",
        className
      )}
      {...props}
    >
      <span className="[text-shadow:_0_0_8px_rgba(34,211,238,0.8)]">{children}</span>
    </Button>
  )
}
