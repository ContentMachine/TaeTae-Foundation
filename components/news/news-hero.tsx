"use client"

import { motion } from "framer-motion"
import { Calendar, TrendingUp, BookOpen } from "lucide-react"

export function NewsHero() {
  return (
    <section className="relative min-h-[70vh] flex items-center bg-gradient-to-b from-[#e8f5e6] to-[#e8f5e6] dark:from-gray-900 dark:to-gray-800 overflow-hidden pt-20">
      <div className="container mx-auto px-4 lg:py-20 py-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-block px-4 py-2 bg-[#76b569]/10 dark:bg-[#76b569]/20 rounded-full mb-6">
              <span className="text-[#76b569] dark:text-[#8bc97f] font-semibold">Stay Updated</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 text-balance">
              Latest News & Stories
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed text-pretty max-w-3xl mx-auto">
              Stay updated with our latest stories, events, and the impact we're making in the lives of young boys.
            </p>
          </motion.div>

          {/* Feature Highlights */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Calendar, label: "Weekly Updates", desc: "Fresh content every week" },
              { icon: TrendingUp, label: "Impact Stories", desc: "Real results from our programs" },
              { icon: BookOpen, label: "Resources", desc: "Educational materials & guides" },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
              >
                <item.icon className="text-[#76b569] dark:text-[#8bc97f] mb-3" size={32} />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.label}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
