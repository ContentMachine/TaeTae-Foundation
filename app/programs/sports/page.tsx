"use client"

import Link from "next/link"
import { ArrowLeft, Trophy, Users, Heart, TrendingUp } from "lucide-react"
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import IconRenderer from "@/components/icon-renderer";

export default function SportsPage() {
  const activities = [
    { icon: "https://res.cloudinary.com/dzn1k1z8r/image/upload/v1764617696/Football_Training_kzedoq.svg", title: "Football Training", description: "Team skills and competitive spirit development" },
    { icon: 'https://res.cloudinary.com/dzn1k1z8r/image/upload/v1764617699/Track_and_Field_clhlfx.svg', title: "Athletics", description: "Individual achievement and personal records" },
    { icon: 'https://res.cloudinary.com/dzn1k1z8r/image/upload/v1764617656/Combat_Sports_wdixm7.svg', title: "Combat Sport", description: "Collaboration and communication skills" },
    { icon: 'https://res.cloudinary.com/dzn1k1z8r/image/upload/v1764617617/Healthy_Living_ckvcrs.svg', title: "Healthy Living", description: "Fitness, discipline, and wellness habits" },
  ]

  const achievements = [
    { metric: "98%", label: "Team Retention" },
    { metric: "120+", label: "Athletes Trained" },
    { metric: "45", label: "Championships Won" },
    { metric: "100%", label: "Leadership Growth" },
  ]

  return (
    <main className="bg-white dark:bg-gray-900">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
          {/* <ArrowLeft className="w-4 h-4" />
          Back Home */}
        </Link>

        <h1 className="lg:text-5xl text-2xl font-bold text-foreground mb-6">Sports Program</h1>
        <div className="bg-linear-to-br from-primary/10 via-accent/10 to-background rounded-lg overflow-hidden mb-12 border border-border h-96 flex items-center justify-center">
          <img
            src={"https://res.cloudinary.com/dzn1k1z8r/image/upload/v1764570544/freepik__realistic-image-of-young-african-boys-playing-foot__14050_safojl.jpg"}
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
            <p className="lg:text-lg text-sm text-muted-foreground mb-8 leading-relaxed">
              Encouraging optimum health, teamwork, and camaraderie. The TaeTae Foundation’s sports programs inspire boys to embrace discipline, resilience, and unity.
            </p>

            <div className="grid grid-cols-4 md:grid-cols-4 gap-4 mb-12 bg-secondary dark:bg-gray-800 lg:p-8 p-2 rounded-lg border border-border">
              {achievements.map((item) => (
                <div key={item.metric} className="text-center">
                  <p className="lg:text-3xl text-xl font-bold text-primary ">{item.metric}</p>
                  <p className="text-[10px] text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>
            <div  className="hidden md:block">
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
                      <IconRenderer icon={activity.icon} size={32} className="text-primary" />
                      <h3 className="text-xl font-bold text-foreground ">{activity.title}</h3>
                      </div>
                      <p className="text-muted-foreground">{activity.description}</p>
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

                  {activities.map((value, index) => {
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
                          <IconRenderer icon={Icon} size={22} className="text-primary" />
                        </div>

                        <h4 className="text-lg sm:text-2xl font-bold text-foreground mb-3">
                          {value.title}
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

            <h2 className="lg:text-5xl text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Heart className="w-6 h-6 text-primary" />
              Impact
            </h2>
            <div className="bg-secondary dark:bg-gray-800 border border-border p-8 rounded-lg">
              <p className="text-foreground text-sm lg:text-base leading-relaxed">
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
      <Footer />
    </main>
  )
}
