"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HowWeOperate from "@/components/how-we-operate";
import WhatWeStarting from "@/components/what-we-starting";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import IconRenderer from "@/components/icon-renderer";

export default function AboutFoundationPage() {
  
  const pillars = [
    {
      title: "Mission",
      icon: "https://res.cloudinary.com/dzn1k1z8r/image/upload/v1764617603/Our_Mission_akg8w9.svg",
      description: "Global compassion and outreach, shaping boys into men who uplift their communities.",
    },
    {
      title: "Vision",
      icon: "https://res.cloudinary.com/dzn1k1z8r/image/upload/v1764757163/Our_Vision_oey5gf.svg",
      description: "Clarity of purpose and direction, guiding boys to become responsible leaders.",
    },
    {
      title: "Values",
      icon: "https://res.cloudinary.com/dzn1k1z8r/image/upload/v1764617622/Values_julkif.svg",
      description: "Integrity, growth, and excellence, principles that shape character and purpose.",
    },
    {
      title: "5-Year Plan",
      icon: "https://res.cloudinary.com/dzn1k1z8r/image/upload/v1764617610/5_Year_Plan_hpdcjt.svg",
      description: "Long-term strategic development for mentorship, education, sports, and skill centers.",
    },
    {
      title: "Get Involved",
      icon: "https://res.cloudinary.com/dzn1k1z8r/image/upload/v1764617578/Support_hb7jin.svg",
      description: "Partnership and collaboration, empowering communities to shape future men.",
      href: "/support",
    },
    {
      title: "Donate",
      icon: "https://res.cloudinary.com/dzn1k1z8r/image/upload/v1764617709/Donate_1_bwz3lo.svg",
      description: "Compassion and giving, help transform boys’ lives today.",
      href: "/support",
    },
  ]
  return (
    <main className="bg-white dark:bg-gray-900 overflow-hidden">
      <Navigation />
      {/* ---------------------------------------- */}
      {/* SECTION 1 — ABOUT THE FOUNDATION */}
      {/* ---------------------------------------- */}
      <section className="container mx-auto px-4 pt-24 lg:pb-12  pb-2">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-2xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
              Building Boys of{" "}
              <span className="text-primary">Character, Competence,</span>{" "}
              and Confidence
            </h1>

            <p className="lg:text-lg text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              The TaeTae Foundation is committed to nurturing the boy-child
              through comprehensive development programs designed to instill
              discipline, curiosity, and self-belief. We create safe spaces and
              structured mentorship that guide boys toward becoming responsible,
              confident young men prepared to make a difference in their
              communities.
            </p>

            {/* <Link
              href="/#programs"
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#5a8d4f] transition"
            >
              Learn More <ArrowRight className="w-4 h-4" />
            </Link> */}
          </motion.div>

          {/* RIGHT — IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl overflow-hidden lg:block hidden shadow-xl"
          >
            <img
              src="https://res.cloudinary.com/dzn1k1z8r/image/upload/v1764570529/freepik__a-black-teenage-boy-in-a-modern-classroom-assembli__14053_tqfmsn.jpg"
              className="w-full h-[420px] object-cover"
              alt="About the Foundation"
            />
          </motion.div>
        </div>
      </section>

      
      {/* MAIN CONTENT */}
      <section className="container mx-auto px-4 py-2">
        {/* ABOUT SECTION */}
        <section className="container mx-auto px-4 py-10">
            <h2 className="lg:text-4xl text-xl font-bold text-gray-900 dark:text-white mb-12 text-center">
                Our Approach
            </h2>

            <div className="grid lg:grid-cols-2 gap-12 items-center">

                {/* LEFT — IMAGE + BADGE */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="hidden lg:block"
                >
                  <div className=" p-3 ">
                    <h3 className="text-3xl text-primary font-bold mb-4">Our Commitment</h3>
                    <p className="text-lg leading-relaxed">
                      We mentor and equip boys ages 10 to 14 through sports, leadership training,
                      education, and skills development, laying the foundation for lifelong purpose.
                    </p>
                    <p className="lg:text-lg text-sm text-gray-700 dark:text-gray-300 leading-relaxed ">
                      We equip boys to take ownership of their development through hands-on learning,
                      guidance, and structured support.
                    </p>
                  </div>
                </motion.div>

                {/* RIGHT — CONTENT */}
                <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
                >
                {/* Paragraph 1 */}
                
                

                {/* Highlighted Box */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-md border border-gray-200 dark:border-gray-700">
                    <p className="lg:text-lg text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                        Through sports, mentorship, and learning opportunities, we nurture qualities like
                        discipline, empathy, leadership, and confidence — teaching boys that manhood is
                        built on responsibility, not strength alone.
                    </p>

                    <p className="lg:text-lg text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    With collaborators across schools, families, and community organizations, we
                    guide boys aged 10–14 — a defining stage where values, identity, and purpose
                    begin to form.
                    </p>
                </div>
                </motion.div>

            </div>
        </section>


        {/* APPROACH */}

        {/* FIVE-YEAR PLAN */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-10 shadow-md border  border-gray-200 dark:border-gray-700 mb-20"
        >
          <h2 className="lg:text-4xl text-xl font-bold text-gray-900 dark:text-white mb-6">Our 5-Year Plan</h2>
          <ul className="space-y-4 text-gray-700 dark:text-gray-300 lg:text-lg text-sm leading-relaxed">
            <li>• Establish mentorship & leadership development programs.</li>
            <li>• Promote holistic education through school partnerships.</li>
            <li>• Build sports & skill centers combining play, learning, and guidance.</li>
            <li>• Support community-driven initiatives that uplift families and neighborhoods.</li>
          </ul>
        </motion.div>

        {/* PILLARS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon

            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-xl transition relative"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-full bg-primary/15 dark:bg-[#76b569]/20 flex items-center justify-center mb-4">
                  <IconRenderer icon={Icon} size={32} className="text-primary" />
                </div>

                {/* Title */}
                <h3 className="lg:text-2xl text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 lg:text-base text-sm leading-relaxed mb-6">
                  {pillar.description}
                </p>

                {/* Arrow CTA — only if link exists */}
                {pillar.href && (
                  <Link
                    href={pillar.href}
                    className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:underline"
                  >
                    Learn More
                    <ArrowRight
                      className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                )}
              </motion.div>
            )
          })}
        </div>

        

        {/* CTA BUTTONS */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link
            href="/get-involved"
            className="px-6 py-3 bg-[#76b569] text-white rounded-lg font-semibold flex items-center gap-2 hover:bg-[#5a8d4f] transition"
          >
            Get Involved <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/partner"
            className="px-6 py-3 border-2 border-[#76b569] text-[#76b569] dark:text-[#8bc97f] rounded-lg font-semibold flex items-center gap-2 hover:bg-[#76b569]/10 transition"
          >
            Partner With Us <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/donate"
            className="px-6 py-3 border-2 border-[#5a8d4f] text-[#5a8d4f] dark:text-[#8bc97f] rounded-lg font-semibold flex items-center gap-2 hover:bg-[#5a8d4f]/10 transition"
          >
            Donate <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div> */}
        
      </section>
       <Footer />
    </main>
  );
}
