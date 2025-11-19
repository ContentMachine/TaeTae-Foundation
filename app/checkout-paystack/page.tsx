"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import { startPaystackTransaction } from "@/app/actions/paystack"

export default function CheckoutPaystackPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const program = searchParams.get("program")
  const amount = searchParams.get("amount")
  const donor = searchParams.get("donor")
  const email = searchParams.get("email")
  const mode = searchParams.get("mode")

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handlePaystackPayment = async () => {
    try {
      setIsLoading(true)
      if (!program || !amount || !email) {
        setError("Missing required information")
        return
      }

      const authorizationUrl = await startPaystackTransaction(Number.parseFloat(amount), email, "donation", {
        program,
        donorName: donor,
      })

      // Redirect to Paystack payment page
      window.location.href = authorizationUrl
    } catch (err) {
      console.error(" Error initializing Paystack payment:", err)
      setError("Failed to initialize payment. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-2xl mx-auto px-4">
        <Link href="/support/donate" className="text-primary hover:underline mb-6 inline-block">
          ← Back to Donation
        </Link>

        <h1 className="text-4xl font-bold text-primary mb-2">Complete Your Donation</h1>
        <p className="text-foreground mb-8">Secure payment powered by Paystack</p>

        <div className="bg-card border border-border rounded-lg p-8 space-y-6">
          <div className="space-y-4">
            <h2 className="font-semibold text-foreground">Donation Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Program:</span>
                <span className="font-semibold">
                  {program?.charAt(0).toUpperCase()}
                  {program?.slice(1)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Amount:</span>
                <span className="font-semibold">₦{amount}</span>
              </div>
              <div className="flex justify-between">
                <span>Donor:</span>
                <span className="font-semibold">{donor || "Anonymous"}</span>
              </div>
            </div>
          </div>

          {error && <div className="p-4 bg-destructive/10 text-destructive rounded-lg">{error}</div>}

          <button
            onClick={handlePaystackPayment}
            disabled={isLoading}
            className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition disabled:opacity-50"
          >
            {isLoading ? "Initializing Payment..." : "Pay with Paystack"}
          </button>

          <p className="text-xs text-muted-foreground text-center">
            You will be redirected to Paystack to complete your payment securely
          </p>
        </div>
      </div>
    </div>
  )
}
