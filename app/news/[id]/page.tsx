import { BlogPost } from "@/components/news/blog-post"
import { blogs } from "@/data/blogs"
import { notFound } from "next/navigation"

export async function generateStaticParams() {
  return blogs.map((blog) => ({
    id: blog.id,
  }))
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const blog = blogs.find((b) => b.id === params.id)

  if (!blog) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: `${blog.title} - TaeTae Foundation`,
    description: blog.excerpt,
  }
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const blog = blogs.find((b) => b.id === params.id)

  if (!blog) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <BlogPost blog={blog} />
    </main>
  )
}
