"use client"

import Link from "next/link"
import { ArrowLeft, BookOpen, Award, Users, TrendingUp } from "lucide-react"

export default function EducationPage() {
  const benefits = [
    { icon: BookOpen, title: "Core Subjects", description: "Literacy, numeracy, and critical thinking" },
    { icon: Award, title: "Leadership Skills", description: "Personal development and life skills training" },
    { icon: Users, title: "Mentorship", description: "One-on-one guidance from educators and professionals" },
    { icon: TrendingUp, title: "Academic Growth", description: "Measurable improvements in performance" },
  ]

  const outcomes = [
    { metric: "92%", label: "Pass Rate" },
    { metric: "85%", label: "Grade Improvement" },
    { metric: "300+", label: "Boys Mentored" },
    { metric: "99%", label: "Confidence Growth" },
  ]

  return (
    <main className="bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center gap-2 hover:underline mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back Home
        </Link>


        <h1 className="lg:text-5xl text-2xl font-bold text-foreground mb-6">Education Program</h1>
        <div className="bg-linear-to-br from-primary/10 via-accent/10 to-background rounded-lg overflow-hidden mb-12 border border-border h-96 flex items-center justify-center">
          <img
            src={"/students-in-classroom-learning-and-mentoring.jpg"}
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
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              The Education program provides mentorship and classroom initiatives that help boys build strong academic
              foundations and develop leadership skills.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 bg-secondary dark:bg-gray-800 p-8 rounded-lg border border-border">
              {outcomes.map((item) => (
                <div key={item.metric} className="text-center">
                  <p className="text-3xl font-bold text-primary mb-2">{item.metric}</p>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>

            <h2 className="lg:text-5xl text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              What Boys Receive
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {benefits.map((benefit) => {
                const Icon = benefit.icon
                return (
                  <div
                    key={benefit.title}
                    className="dark:bg-gray-800  border border-border p-6 rounded-lg hover:border-primary transition"
                  >
                    <div className="flex gap-4 items-center">
                    <Icon className="w-5 h-5 text-primary mb-3" />
                    <h3 className="text-xl font-bold text-foreground mb-2">{benefit.title}</h3>
                    </div>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                )
              })}
            </div>

            <h2 className="lg:text-5xl text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Award className="w-8 h-8 text-primary" />
              Impact
            </h2>
            <div className="bg-secondary dark:bg-gray-800 border border-border p-8 rounded-lg">
              <p className="text-foreground leading-relaxed">
                We believe every boy deserves quality education and mentorship. Through our programs, academic
                performance improves, confidence grows, and boys start seeing education as a gateway to unlimited
                opportunities.
              </p>
            </div>
          </div>

          <div>
            <div className="bg-secondary dark:bg-gray-800 border border-border p-8 rounded-lg sticky top-24">
              <h3 className="text-2xl font-bold  mb-4">Support This Program</h3>
              <p className="text-foreground text-sm mb-6">Invest in boys' education and future.</p>
              <div className="space-y-3">
                <Link
                  href="/support/donate?program=education"
                  className="block w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg text-center font-semibold hover:bg-primary/90 transition"
                >
                  Donate
                </Link>
                <Link
                  href="/support/sponsor?program=education"
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
    </main>
  )
}
