"use client"

import Link from "next/link"
import { ChevronRight, } from "lucide-react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function SupportPage() {
  const options = [
    {
      title: "Donate",
      description: "Make a direct financial contribution to support our programs.",
      href: "/support/donate",
      icon: "💰",
    },
    {
      title: "Sponsor",
      description: "Provide specific items our boys need to succeed.",
      href: "/support/sponsor",
      icon: "🛠️",
    },
    {
      title: "Volunteer",
      description: "Share your time and expertise to mentor boys directly.",
      href: "/support/volunteer",
      icon: "🙋",
    },
  ]

  return (
    <>
    <Navigation />
    <div className=" lg:pt-20 pt-12 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold  mb-4">How You Can <span className="text-[#76b569] dark:text-[#8bc97f]">Support</span></h1>
        <p className="text-foreground mb-12">Choose the way that works best for you.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {options.map((option, idx) => (
            <Link key={idx} href={option.href}>
              <div className="bg-whight dark:bg-gray-900 p-8 rounded-lg shadow-sm border border-border hover:border-primary transition cursor-pointer h-full">
                <div className="text-5xl mb-4">{option.icon}</div>
                <h2 className="text-2xl font-bold text-primary mb-2">{option.title}</h2>
                <p className="text-foreground mb-6">{option.description}</p>
                <div className="flex items-center text-primary font-semibold">
                  Get Started <ChevronRight size={20} className="ml-2" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
    <Footer />
    </>
  )
}
