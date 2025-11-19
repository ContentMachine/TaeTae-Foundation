
import Footer from "@/components/footer"
import { NewsHero } from "@/components/news/news-hero"
import { NewsList } from "@/components/news/news-list"
import { NewsletterSignup } from "@/components/news/newsletter-signup"

export const metadata = {
  title: "Latest News - Tae tae Foundation",
  description: "Stay updated with our latest stories, events, and impact in the community.",
}

export default function NewsPage() {
  return (
    <main className="min-h-screen">
      
      <NewsHero />
      <NewsList />
      <NewsletterSignup />
      <Footer />
    </main>
  )
}
