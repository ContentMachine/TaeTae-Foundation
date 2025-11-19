"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Heart, Target } from "lucide-react"
import { Button } from "./ui/button"
import { motion } from "framer-motion"
import { useCallback } from "react"

export default function Hero() {
  // Refactor scroll function with useCallback for performance
  const scrollToPrograms = useCallback(() => {
    document.getElementById("programs")?.scrollIntoView({ behavior: "smooth" })
  }, [])

  return (
    <section className="relative flex items-center overflow-hidden bg-linear-to-br from-[#76b569]/10 via-white to-[#76b569]/10 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <video autoPlay loop muted playsInline className="absolute w-full h-full object-cover">
        <source src="https://res.cloudinary.com/dgo6onisg/video/upload/v1762632280/5416571_Coll_wavebreak_People_1280x720_zg90gf.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/60 z-0" />
      <div className="container mx-auto px-4 lg:pt-28 lg:pb-10 pt-20 pb-8 relative z-10">
        <div className="grid overflow-hidden lg:overflow-visible lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            {/* <div className="inline-block px-4 py-2 bg-[#76b569]/10 dark:bg-[#76b569]/20 rounded-full mb-6">
              <span className="text-[#76b569] dark:text-[#8bc97f] font-semibold">Empowering Young Boys</span>
            </div> */}

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Building Tomorrow's{" "}
              <span className="text-[#76b569] dark:text-[#8bc97f] relative">
                Leaders
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  height="12"
                  viewBox="0 0 200 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 10C50 5 100 2 198 8"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="text-[#76b569] dark:text-[#8bc97f]"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-sm text-gray-300 mb-8 leading-relaxed">
              Through sports, education, skill acquisition, and mentorship, we develop boys into responsible men who
              will shape our future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-1 lg:mb-16">
              <Button
                size="lg"
                onClick={() => (window.location.href = "/support")}
                className="bg-[#76b569] hover:bg-[#5a8d4f] dark:bg-[#8bc97f] dark:hover:bg-[#76b569] text-white px-8 py-6 text-lg group"
              >
                Make a Difference
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={scrollToPrograms}
                className="border-[#76b569] text-[#76b569] dark:border-[#8bc97f] dark:text-[#8bc97f] hover:bg-[#e8f5e6] dark:hover:bg-gray-800 px-8 py-6 text-lg bg-transparent"
              >
                Our Programs
              </Button>
            </div>
          </motion.div>

          {/* Right Content - Image with floating cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative hidden lg:block"
          >
            {/* <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/young-boys-learning-and-playing-sports.jpg"
                alt="Boys playing sports and learning together"
                width={600}
                height={700}
                className="w-full h-[600px] object-cover"
                layout="responsive"
              />
            </div> */}

            {/* Floating Feature Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl max-w-[200px]"
            >
              <Heart className="text-[#76b569] dark:text-[#8bc97f] mb-2" size={32} />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">1000+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Lives Touched</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute -top-6 -right-6 bg-[#76b569] dark:bg-[#8bc97f] p-6 rounded-xl shadow-xl max-w-[200px]"
            >
              <Target className="text-white mb-2" size={32} />
              <div className="text-2xl font-bold text-white">95%</div>
              <div className="text-sm text-white/90">Success Rate</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

