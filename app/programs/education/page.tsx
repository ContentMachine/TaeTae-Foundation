"use client"

import Link from "next/link"
import { ArrowLeft, BookOpen, Award, Users, TrendingUp, Code, Camera, Sigma, Atom } from "lucide-react"
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import IconRenderer from "@/components/icon-renderer";
import BackButton from "@/components/backButton";

export default function EducationPage() {
  const benefits = [
  {
    icon: "https://res.cloudinary.com/dzn1k1z8r/image/upload/v1764617611/Computer_Science_fdcsmf.svg",
    title: "Media",
    description: "Digital media creation, editing, and storytelling",
  },
  {
    icon: "https://res.cloudinary.com/dzn1k1z8r/image/upload/v1764617708/Math_csmhst.svg",
    title: "Math",
    description: "Numeracy, logic, and analytical problem-solving",
  },
  {
    icon: "https://res.cloudinary.com/dzn1k1z8r/image/upload/v1764617569/Science_u6pqus.svg",
    title: "Science",
    description: "Hands-on experiments and scientific exploration",
  },
  {
    icon: "https://res.cloudinary.com/dzn1k1z8r/image/upload/v1764617614/Communication_2_wllcto.svg",
    title: "Communication",
    description: "Communication, comprehension, and multilingual learning",
  },
];


  const outcomes = [
    { metric: "92%", label: "Pass Rate" },
    { metric: "85%", label: "Grade Improvement" },
    { metric: "300+", label: "Boys Mentored" },
    { metric: "99%", label: "Confidence Growth" },
  ]

  return (
    <main className="bg-white dark:bg-gray-900">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <BackButton label="Back"/>


        <h1 className="lg:text-5xl text-2xl font-bold text-foreground mb-6">Education Program</h1>
        <div className="bg-linear-to-br from-primary/10 via-accent/10 to-background rounded-lg overflow-hidden mb-12 border border-border h-96 flex items-center justify-center">
          <img
            src={"https://res.cloudinary.com/dzn1k1z8r/image/upload/v1764570531/Education_3_y4l5kp.jpg"}
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
              Supporting and supplementing formal education through programs that focus on Science, Mathematics, Language, and Technology. We help boys build confidence in learning and creativity.
            </p>

            <div className="grid grid-cols-4 md:grid-cols-4 gap-4 mb-12 bg-secondary dark:bg-gray-800 lg:p-8 p-2 rounded-lg border border-border">
              {outcomes.map((item) => (
                <div key={item.metric} className="text-center">
                  <p className="lg:text-3xl text-xl font-bold text-primary ">{item.metric}</p>
                  <p className="text-[10px] text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>
            <div className="hidden md:block">
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
                      <IconRenderer icon={Icon} size={32} className="text-primary" />
                    <h3 className="text-xl font-bold text-foreground">{benefit.title}</h3>
                    </div>
                    <p className="text-muted-foreground">{benefit.description}</p>
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

                  {benefits.map((value, index) => {
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
              <Award className="w-8 h-8 text-primary" />
              Impact
            </h2>
            <div className="bg-secondary dark:bg-gray-800 border border-border p-8 rounded-lg">
              <p className="text-foreground text-sm lg:text-base leading-relaxed">
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
      <Footer />
    </main>
  )
}
