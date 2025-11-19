"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { loadStripe } from "@stripe/stripe-js"
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js"
import { startCheckoutSession } from "@/app/actions/stripe"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "")

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const program = searchParams.get("program")
  const amount = searchParams.get("amount")
  const donor = searchParams.get("donor")
  const mode = searchParams.get("mode")

  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initializeCheckout = async () => {
      try {
        if (!program || !amount || !donor) {
          setError("Missing required information")
          return
        }

        const secret = await startCheckoutSession(`${program}-program`, donor, Number.parseFloat(amount))
        setClientSecret(secret)
      } catch (err) {
        console.error(" Error initializing checkout:", err)
        setError("Failed to initialize checkout")
      } finally {
        setIsLoading(false)
      }
    }

    initializeCheckout()
  }, [program, amount, donor])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Setting up payment...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <p className="text-destructive mb-4">{error}</p>
          <Link href="/support/donate" className="text-primary hover:underline">
            Back to Donation
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-2xl mx-auto px-4">
        <Link href="/support/donate" className="text-primary hover:underline mb-6 inline-block">
          ← Back to Donation
        </Link>

        <h1 className="text-4xl font-bold text-primary mb-2">Complete Your Donation</h1>
        <p className="text-foreground mb-8">Secure payment powered by Stripe</p>

        {clientSecret ? (
          <div id="checkout" className="bg-card border border-border rounded-lg p-6">
            <EmbeddedCheckoutProvider
              stripe={stripePromise}
              options={{
                clientSecret,
              }}
            >
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-muted-foreground">Initializing payment form...</p>
          </div>
        )}
      </div>
    </div>
  )
}
