"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { usePathname } from "next/navigation"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/#programs", label: "Our Programs" },
    { href: "/support", label: "Support" },
    // { href: "/volunteers", label: "Volunteers" },
    // { href: "/news", label: "News" },
    // { href: "/contact", label: "Contact" },
  ]

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
     <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex p-1 rounded-full bg-green-950 dark:bg-gray-800 items-center gap-2">
              <img
                src="/Tae-Tae-logo.png"
                alt="Tae tae Foundation Logo"
                className="md:h-10 h-8 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-[#8bc97f] transition-colors font-medium relative py-2",
                    isActive(link.href) &&
                      "text-primary dark:text-[#8bc97f] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary dark:after:bg-[#8bc97f]",
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <ThemeToggle />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-gray-700 dark:text-gray-300"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="lg:hidden py-4 border-t border-gray-200 dark:border-gray-800">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-[#8bc97f] transition-colors font-medium py-2",
                      isActive(link.href) && "text-primary dark:text-[#8bc97f] font-bold",
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}
