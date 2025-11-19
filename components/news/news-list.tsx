"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Calendar, User, ArrowRight, Tag } from "lucide-react"
import { blogs } from "@/data/blogs"

export function NewsList() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", ...Array.from(new Set(blogs.map((blog) => blog.category)))]

  const filteredBlogs = selectedCategory === "All" ? blogs : blogs.filter((blog) => blog.category === selectedCategory)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <section ref={ref} className="py-24 dark:bg-gray-900 bg-white">
      <div className="container mx-auto px-4">
        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? "default" : "outline"}
              className={
                selectedCategory === category
                  ? "bg-[#76b569] hover:bg-[#78ae6e] text-white"
                  : "border-[#76b569] text-[#76b569] hover:bg-[#76b569]"
              }
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Featured Post */}
        {filteredBlogs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <Card className="overflow-hidden dark:bg-gray-800 bg-white hover:shadow-2xl transition-shadow duration-300 border-none">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative h-96 lg:h-auto">
                  <Image
                    src={filteredBlogs[0].image || "/placeholder.svg"}
                    alt={filteredBlogs[0].title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-4 py-2 bg-[#76b569] text-white rounded-full text-sm font-semibold">
                      Featured
                    </span>
                    <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold">
                      {filteredBlogs[0].category}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold dark:text-white text-gray-900 mb-4">{filteredBlogs[0].title}</h2>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">{filteredBlogs[0].excerpt}</p>
                  <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                    <div className="flex items-center gap-2">
                      <User size={16} />
                      <span>{filteredBlogs[0].author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>{formatDate(filteredBlogs[0].date)}</span>
                    </div>
                  </div>
                  <Link href={`/news/${filteredBlogs[0].id}`}>
                    <Button className="bg-[#76b569] hover:bg-[#8ab482] text-white group">
                      Read Full Article
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.slice(1).map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            >
              <Card className="h-full hover:shadow-xl transition-shadow duration-300 overflow-hidden group dark:bg-gray-800 bg-white border-none">
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={blog.image || "/placeholder.svg"}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-[#76b569] text-white rounded-full text-xs font-semibold flex items-center gap-1">
                      <Tag size={12} />
                      {blog.category}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Calendar size={12} />
                      <span>{formatDate(blog.date)}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold dark:text-white text-gray-900 mb-3 line-clamp-2">{blog.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 text-sm">{blog.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <User size={14} />
                      <span>{blog.author}</span>
                    </div>
                    <Link href={`/news/${blog.id}`}>
                      <Button variant="ghost" className="text-[#76b569] hover:text-[#84b37b] p-0 group/btn">
                        Read More
                        <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
