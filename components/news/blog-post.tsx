"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react"
import type { BlogPost as BlogPostType } from "@/lib/types"

interface BlogPostProps {
  blog: BlogPostType
}

export function BlogPost({ blog }: BlogPostProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <article className="pt-24">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-end bg-gray-900">
        <Image src={blog.image || "/placeholder.svg"} alt={blog.title} fill className="object-cover opacity-60" />
        <div className="container mx-auto px-4 py-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <Link href="/news">
              <Button variant="ghost" className="text-white hover:text-white/80 mb-6 -ml-4">
                <ArrowLeft className="mr-2" />
                Back to News
              </Button>
            </Link>
            <div className="flex items-center gap-4 mb-4">
              <span className="px-4 py-2 bg-[#4A90E2] text-white rounded-full text-sm font-semibold">
                {blog.category}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-balance">{blog.title}</h1>
            <div className="flex items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <User size={18} />
                <span>{blog.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>{formatDate(blog.date)}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-600 leading-relaxed mb-8">{blog.excerpt}</p>
              <div className="text-gray-700 leading-relaxed space-y-6">
                <p>{blog.content}</p>
                <p>
                  At Tae tae Foundation, we believe that volunteering is not just about giving time—it's about building
                  connections, fostering growth, and creating lasting change in our communities. Through our volunteer
                  programs, we've seen firsthand how dedicated individuals can transform the lives of young boys.
                </p>
                <p>
                  Our volunteers come from all walks of life, bringing diverse skills and experiences that enrich our
                  programs. Whether they're coaching sports, tutoring students, leading skills workshops, or simply
                  being a positive role model, each volunteer plays a crucial role in our mission.
                </p>
                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">The Impact of Volunteering</h2>
                <p>
                  Research shows that mentorship and positive adult relationships are critical factors in youth
                  development. Our volunteers provide that crucial support, helping boys develop confidence, resilience,
                  and the skills they need to succeed.
                </p>
                <p>
                  Through structured programs and genuine relationships, we're not just preparing boys for the
                  future—we're empowering them to shape it. Every hour volunteered, every skill shared, and every word
                  of encouragement contributes to building stronger, more capable young men.
                </p>
                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Join Our Mission</h2>
                <p>
                  If you're inspired to make a difference, we invite you to join our volunteer team. Whether you can
                  commit a few hours a week or participate in special events, your contribution matters. Together, we
                  can continue to build a brighter future for the boys in our community.
                </p>
              </div>
            </div>

            {/* Share */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 font-medium">Share this article:</span>
                <Button variant="outline" className="border-[#4A90E2] text-[#4A90E2] hover:bg-primary bg-transparent">
                  <Share2 size={18} className="mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </article>
  )
}
