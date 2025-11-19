"use client"

import Link from "next/link"
import { ArrowLeft, Hammer, Code, Palette, Wrench, TrendingUp } from "lucide-react"

export default function SkillsPage() {
  const skills = [
    { name: "Carpentry", icon: Hammer, description: "Learn woodworking fundamentals and build practical projects" },
    { name: "Mechanics", icon: Wrench, description: "Automotive basics and hands-on engine training" },
    { name: "Digital Skills", icon: Code, description: "Modern tech training and creative digital projects" },
    { name: "Art & Design", icon: Palette, description: "Express creativity through art and design mediums" },
  ]

  const impact = [
    { metric: "95%", label: "Completion Rate" },
    { metric: "87%", label: "Employment Success" },
    { metric: "150+", label: "Skills Taught" },
    { metric: "500+", label: "Boys Trained" },
  ]

  return (
    <main className="bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-2 hover:underline mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back Home
        </Link>

        {/* Hero Image */}
        <h1 className="lg:text-5xl text-2xl font-bold text-foreground mb-6">Skills Program</h1>
        <div className="bg-linear-to-br from-primary/10 via-accent/10 to-background rounded-lg overflow-hidden mb-12 border border-border h-96 flex items-center justify-center">
          <img
            src={"/boys-learning-carpentry-and-vocational-skills.jpg"}
            alt={""}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
          {/* <div className="text-center">
            <Hammer className="w-24 h-24 text-primary/30 mx-auto mb-4" />
            <p className="text-muted-foreground">Skills Training Program</p>
          </div> */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* <h1 className="text-5xl font-bold text-foreground mb-6">Skills Program</h1> */}

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              The Skills program focuses on vocational and creative development, empowering boys with practical
              abilities they can use to build futures. Through hands-on training and mentorship, we help participants
              discover their talents and develop marketable skills.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 bg-secondary dark:bg-gray-800 p-8 rounded-lg border border-border">
              {impact.map((item) => (
                <div key={item.metric} className="text-center">
                  <p className="text-3xl font-bold text-primary mb-2">{item.metric}</p>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>

            <h2 className="lg:text-5xl text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              What Boys Learn
            </h2>
            <div className="grid grid-cols-1  md:grid-cols-2 gap-6 mb-12">
              {skills.map((skill) => {
                const Icon = skill.icon
                return (
                  <div
                    key={skill.name}
                    className="dark:bg-gray-800  border border-border p-6 rounded-lg hover:border-primary transition"
                  >
                    <div className="flex gap-4 items-center">
                    <Icon className="w-5 h-5 text-primary mb-3" />
                    <h3 className="text-xl font-bold text-foreground mb-2">{skill.name}</h3>
                    </div>
                    <p className="text-muted-foreground">{skill.description}</p>
                  </div>
                )
              })}
            </div>

            <h2 className="lg:text-5xl text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-primary" />
              Impact & Outcomes
            </h2>
            <div className="bg-secondary dark:bg-gray-800 border border-border p-8 rounded-lg">
              <p className="text-foreground leading-relaxed">
                Through these programs, boys gain confidence, marketable skills, and a pathway to employment or
                entrepreneurship. They discover their talents, build portfolios, and learn that they can create value
                for themselves and their communities. Our graduates have gone on to start their own businesses, secure
                professional employment, and mentor others.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="bg-secondary dark:bg-gray-800 border border-border p-8 rounded-lg sticky top-24">
              <h3 className="text-2xl font-bold  mb-4">Support This Program</h3>
              <p className="text-foreground text-sm mb-6">
                Help us equip boys with practical skills that change lives.
              </p>
              <div className="space-y-3">
                <Link
                  href="/support/donate?program=skills"
                  className="block w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg text-center font-semibold hover:bg-primary/90 transition"
                >
                  Donate Now
                </Link>
                <Link
                  href="/support/sponsor?program=skills"
                  className="block w-full px-4 py-3 border-2 border-primary text-primary rounded-lg text-center font-semibold hover:bg-primary/5 transition"
                >
                  Become a Sponsor
                </Link>
                <Link
                  href="/support/volunteer"
                  className="block w-full px-4 py-3 border-2 border-accent text-accent rounded-lg text-center font-semibold hover:bg-accent/5 transition"
                >
                  Volunteer
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
