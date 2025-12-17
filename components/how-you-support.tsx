import Link from "next/link"
import { Heart, Gift, Users, ArrowRight } from "lucide-react"
import IconRenderer from "./icon-renderer"


export default function HowYouSupport() {
  const ways = [
  {
    title: "Donate",
    description: "Direct financial support to fund programs and operations.",
    icon: "https://res.cloudinary.com/dzn1k1z8r/image/upload/v1764617660/Donate_enmtx9.svg",
    href: "/support/donate",
  },
  {
    title: "Sponsor",
    description: "Provide specific items boys need — tools, uniforms, books, sports kits.",
    icon: "https://res.cloudinary.com/dzn1k1z8r/image/upload/v1764617667/Sponsor_1_goyphq.svg",
    href: "/support/sponsor",
  },
  {
    title: "Volunteer",
    description: "Share your time, skills, and passion to mentor and guide boys.",
    icon: "https://res.cloudinary.com/dzn1k1z8r/image/upload/v1764617618/Volunteer_izlode.svg",
    href: "/support/volunteer",
  },
]

  return (
    <section className="bg-secondary dark:bg-gray-800 py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 text-center">How You Can Support</h2>
        <p className="text-center text-foreground mb-12 max-w-2xl mx-auto">
          Choose the way that works best for you and make a real difference in boys' lives.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {ways.map((way, idx) => {
            return (
              <div
                key={idx}
                className="bg-white dark:bg-gray-900 p-8 rounded-[100px] shadow-sm border border-border hover:border-primary transition-all text-center group"
              >
                <div className="w-16 h-16 bg-primary/10 dark:bg-primary/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition">
                  <IconRenderer icon={way.icon} size={32} className="text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">{way.title}</h3>
                <p className="text-muted-foreground mb-6">{way.description}</p>
                <Link
                  href={way.href}
                  className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )
          })}
        </div>

        <div className="bg-linear-to-br from-primary to-[#173510] dark:from-[#0a1421] dark:to-[#0a1421] text-white p-8 md:p-12 rounded-[100px] text-center">
          <h3 className="text-xl md:text-4xl font-bold mb-3">Your Impact Matters</h3>
          <p className="text-lg mb-8 opacity-90">Every contribution — big or small — changes a boy's trajectory.</p>
          <div className="grid grid-cols-3 gap-6 md:gap-12">
            <div>
              <div className="text-2xl md:text-5xl font-bold mb-2">100+</div>
              <div className="text-sm md:text-base">Boys Supported</div>
            </div>
            <div>
              <div className="text-2xl md:text-5xl font-bold mb-2">3</div>
              <div className="text-sm md:text-base">Core Programs</div>
            </div>
            <div>
              <div className="text-2xl md:text-5xl font-bold mb-2">∞</div>
              <div className="text-sm md:text-base">Possibilities</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
