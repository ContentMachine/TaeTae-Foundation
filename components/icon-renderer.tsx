"use client"

import Image from "next/image"
import { Heart, Gift, Users } from "lucide-react"

type IconRendererProps = {
  icon: string        // string key or path
  size?: number
  className?: string
  alt?: string
}

// Map string keys to Lucide icons
const lucideMap: Record<string, any> = {
  heart: Heart,
  gift: Gift,
  users: Users,
}

export default function IconRenderer({
  icon,
  size = 24,
  className = "",
  alt = "icon",
}: IconRendererProps) {
  const lower = icon.toLowerCase()

  // CASE 1 — If "icon" matches a Lucide icon name
  if (lucideMap[lower]) {
    const LucideIcon = lucideMap[lower]
    return <LucideIcon size={size} className={className} />
  }

  // CASE 2 — If "icon" is a path to an SVG/PNG/JPG
  if (icon.endsWith(".svg") || icon.endsWith(".png") || icon.endsWith(".jpg") || icon.startsWith("/")) {
    return (
      <Image
        src={icon}
        alt={alt}
        width={size}
        height={size}
        className={className}
      />
    )
  }

  // CASE 3 — Fallback icon
  const Fallback = Heart
  return <Fallback size={size} className={className} />
}
