"use client"

import Link from "next/link"
import { ArrowLeft, Hammer, Code, Palette, Wrench, TrendingUp, Cog, Lightbulb, } from "lucide-react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import IconRenderer from "@/components/icon-renderer"

export default function SkillsPage() {
  const skills = [
    { name: "Coding", icon: "https://res.cloudinary.com/dzn1k1z8r/image/upload/v1764617658/Coding_xjwkrq.svg", description: "Foundational programming skills to build digital solutions." },
    { name: "Mechanics", icon: "https://res.cloudinary.com/dzn1k1z8r/image/upload/v1764617663/Mechanics_tn0fsu.svg", description: "Automotive and machinery repair skills learned through hands-on experience." },
    { name: "Carpentry", icon: "https://res.cloudinary.com/dzn1k1z8r/image/upload/v1764617613/Carpentry_xlivwz.svg", description: "Woodworking fundamentals and practical construction projects." },
    { name: "Electrical Engineering", icon: "https://res.cloudinary.com/dzn1k1z8r/image/upload/v1764617631/Lightbulb_with_gear_wzfwcm.svg", description: "Understanding circuits, wiring, and basic electrical systems." },
  ]

  const impact = [
    { metric: "95%", label: "Completion Rate" },
    { metric: "87%", label: "Employment Success" },
    { metric: "150+", label: "Skills Taught" },
    { metric: "500+", label: "Boys Trained" },
  ]

  return (
    <main className="bg-white dark:bg-gray-900">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-2 hover:underline mb-8">
          {/* <ArrowLeft className="w-4 h-4" />
          Back Home */}
        </Link>

        {/* Page Title */}
        <h1 className="lg:text-5xl text-2xl font-bold text-foreground mb-6">Skills Program</h1>

        {/* Hero Image */}
        <div className="bg-linear-to-br from-primary/10 via-accent/10 to-background rounded-lg overflow-hidden mb-12 border border-border h-96 flex items-center justify-center">
          <img
            src={"https://res.cloudinary.com/dzn1k1z8r/image/upload/v1764570539/freepik__young-black-boy-learning-robotics-in-a-bright-mode__14061_dr8cnf.jpg"}
            alt={"Boys learning vocational skills from mentors"}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Intro Section */}
            <p className="lg:text-lg text-sm text-muted-foreground mb-8 leading-relaxed">
              <strong>Building pathways to jobs through vocational training.</strong> Our Skills Program empowers boys with hands-on
              experience in trades such as coding, mechanics, carpentry, plumbing, and sewing, preparing them for a
              productive and sustainable future. Through mentorship and structured learning, participants gain real-world
              skills they can use to uplift themselves and their communities.
            </p>

            {/* Impact Stats */}
            <div className="grid grid-cols-4 md:grid-cols-4 gap-4 mb-12 bg-secondary dark:bg-gray-800 lg:p-8 p-2 rounded-lg border border-border">
              {impact.map((item) => (
                <div key={item.metric} className="text-center">
                  <p className="lg:text-3xl text-xl font-bold text-primary ">{item.metric}</p>
                  <p className="text-[10px] text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>

            {/* Skills Section */}
            <div className="hidden md:block">
              <h2 className="lg:text-5xl text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                What Boys Learn
              </h2>
              <div className="grid grid-cols-1   md:grid-cols-2 gap-6 mb-12">
                {skills.map((skill) => {
                  const Icon = skill.icon
                  return (
                    <div
                      key={skill.name}
                      className="dark:bg-gray-800 border border-border p-6 rounded-lg hover:border-primary transition"
                    >
                      <div className="flex gap-4 items-center mb-3">
                        <IconRenderer icon={Icon} size={32} className="text-primary" />
                        <h3 className="text-xl font-bold text-foreground">{skill.name}</h3>
                      </div>
                      <p className="text-muted-foreground">{skill.description}</p>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="max-w-7xl mx-auto pb-4 block md:hidden sm:px-6 lg:px-8">
              <div>
                <h2 className="lg:text-5xl text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                  What Boys Learn
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3">

                  {skills.map((value, index) => {
                    const Icon = value.icon;

                    return (
                      <div
                        key={index}
                        className={`
                          group py-6 sm:py-8 transition-all duration-300

                          /* MOBILE — horizontal separators between items */
                          ${index !== 0 ? "border-t border-border sm:border-t-0" : ""}

                          /* DESKTOP — vertical separators between columns */
                          ${index !== 0 ? "sm:border-l sm:border-border" : ""}
                        `}
                      >
                        <div className="text-lg items-center flex gap-3 sm:text-2xl font-bold">
                        <div className="mb-4 p-1 rounded-lg bg-primary/10 w-fit">
                          <IconRenderer icon={Icon} size={32} className="text-primary" />
                        </div>

                        <h4 className="text-lg sm:text-2xl font-bold text-foreground mb-3">
                          {value.name}
                        </h4>
                        </div>

                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    );
                  })}

                </div>
              </div>
            </div>

            {/* Impact & Outcomes */}
            <h2 className="lg:text-5xl text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-primary" />
              Impact & Outcomes
            </h2>
            <div className="bg-secondary dark:bg-gray-800 border border-border p-8 rounded-lg">
              <p className="text-foreground leading-relaxed">
                Through hands-on training, boys gain confidence, employable skills, and opportunities for
                entrepreneurship. Many graduates have gone on to secure jobs, start their own businesses, and mentor
                younger trainees. The program fosters growth, creativity, and real-world readiness.
              </p>
            </div>
          </div>

          {/* Sidebar CTA */}
          <div>
            <div className="bg-secondary dark:bg-gray-800 border border-border p-8 rounded-lg sticky top-24">
              <h3 className="text-2xl font-bold mb-4">Support This Program</h3>
              <p className="text-foreground text-sm mb-6">
                Help us equip boys with practical skills that change lives.
              </p>
              <div className="space-y-3">
                <Link
                  href="/support/donate?program=skills"
                  className="block w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg text-center font-semibold hover:bg-primary/90 transition"
                >
                  Donate
                </Link>
                <Link
                  href="/support/sponsor?program=skills"
                  className="block w-full px-4 py-3 border-2 border-primary text-primary rounded-lg text-center font-semibold hover:bg-primary/5 transition"
                >
                  Sponsor
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
      <Footer />
    </main>
  )
}