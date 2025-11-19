import Link from "next/link"

export default function SuccessPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="text-6xl mb-4">✅</div>
      <h1 className="text-4xl font-bold text-primary mb-3">Thank You!</h1>
      <p className="text-lg text-foreground mb-8">
        Your contribution has been received and will make a real difference in boys' lives.
      </p>
      <Link
        href="/"
        className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition"
      >
        Back to Home
      </Link>
    </div>
  )
}
