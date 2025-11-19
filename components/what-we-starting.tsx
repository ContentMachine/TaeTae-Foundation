import Link from "next/link"
import { ArrowRight, Hammer, BookOpen, Trophy } from "lucide-react"

export default function WhatWeStarting() {
  const programs = [
    {
      title: "Skills",
      description: "Vocational and creative development — Boys learning carpentry, mechanics, art, and design.",
      image: "/boys-learning-carpentry-and-vocational-skills.jpg",
      href: "/programs/skills",
      icon: Hammer,
    },
    {
      title: "Education",
      description: "Mentorship and classroom initiatives — Basic literacy, after-school tutoring, leadership programs.",
      image: "/students-in-classroom-learning-and-mentoring.jpg",
      href: "/programs/education",
      icon: BookOpen,
    },
    {
      title: "Sports",
      description: "Physical and teamwork growth — Football, athletics, teamwork, and discipline.",
      image: "/boys-playing-football-and-sports-teamwork.jpg",
      href: "/programs/sports",
      icon: Trophy,
    },
  ]

  return (
    <section id="programs" className="bg-background dark:bg-gray-900 py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold  mb-4 text-center">What We're Starting With</h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          Our pilot programs are active in Lagos and within school clubs, impacting lives daily.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs.map((program, idx) => {
            const Icon = program.icon
            return (
              <div
                key={idx}
                className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-border hover:border-primary transition-all hover:shadow-lg"
              >
                <div className="relative h-64 bg-linear-to-br from-primary/10 to-secondary overflow-hidden">
                  <img
                    src={program.image || "/placeholder.svg?height=256&width=400"}
                    alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition"></div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon className="w-4 h-4 text-primary" />
                    <h3 className="text-xl font-bold text-foreground">{program.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm mb-6">{program.description}</p>
                  <Link
                    href={program.href}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
