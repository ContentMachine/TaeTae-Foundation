"use client"

import Link from "next/link"
import { ArrowLeft, Trophy, Users, Heart, TrendingUp } from "lucide-react"

export default function SportsPage() {
  const activities = [
    { icon: Trophy, title: "Football Training", description: "Team skills and competitive spirit development" },
    { icon: TrendingUp, title: "Track & Field", description: "Individual achievement and personal records" },
    { icon: Users, title: "Teamwork Drills", description: "Collaboration and communication skills" },
    { icon: Heart, title: "Healthy Living", description: "Fitness, discipline, and wellness habits" },
  ]

  const achievements = [
    { metric: "98%", label: "Team Retention" },
    { metric: "120+", label: "Athletes Trained" },
    { metric: "45", label: "Championships Won" },
    { metric: "100%", label: "Leadership Growth" },
  ]

  return (
    <main className="bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back Home
        </Link>

        <h1 className="lg:text-5xl text-2xl font-bold text-foreground mb-6">Sports Program</h1>
        <div className="bg-linear-to-br from-primary/10 via-accent/10 to-background rounded-lg overflow-hidden mb-12 border border-border h-96 flex items-center justify-center">
          <img
            src={"/boys-playing-football-and-sports-teamwork.jpg"}
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
              The Sports program develops boys physically and mentally through athletics, teaching discipline, teamwork,
              and the value of perseverance.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 bg-secondary dark:bg-gray-800 p-8 rounded-lg border border-border">
              {achievements.map((item) => (
                <div key={item.metric} className="text-center">
                  <p className="text-3xl font-bold text-primary mb-2">{item.metric}</p>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>

            <h2 className="lg:text-5xl text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              What Boys Experience
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {activities.map((activity) => {
                const Icon = activity.icon
                return (
                  <div
                    key={activity.title}
                    className="dark:bg-gray-800 border border-border p-6 rounded-lg hover:border-primary transition"
                  >
                    <div className="flex gap-4 items-center">
                    <Icon className="w-5 h-5 text-primary mb-3" />
                    <h3 className="text-xl font-bold text-foreground mb-2">{activity.title}</h3>
                    </div>
                    <p className="text-muted-foreground">{activity.description}</p>
                  </div>
                )
              })}
            </div>

            <h2 className="lg:text-5xl text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Heart className="w-6 h-6 text-primary" />
              Impact
            </h2>
            <div className="bg-secondary dark:bg-gray-800 border border-border p-8 rounded-lg">
              <p className="text-foreground leading-relaxed">
                Sports teach valuable life lessons, hard work pays off, teamwork achieves more, and setbacks lead to
                comebacks. Boys develop resilience, friendship, and a sense of belonging that extends far beyond the
                field.
              </p>
            </div>
          </div>

          <div>
            <div className="bg-secondary dark:bg-gray-800 border border-border p-8 rounded-lg sticky top-24">
              <h3 className="text-2xl font-bold mb-4">Support This Program</h3>
              <p className="text-foreground text-sm mb-6">Help boys develop through sports.</p>
              <div className="space-y-3">
                <Link
                  href="/support/donate?program=sports"
                  className="block w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg text-center font-semibold hover:bg-primary/90 transition"
                >
                  Donate
                </Link>
                <Link
                  href="/support/sponsor?program=sports"
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
