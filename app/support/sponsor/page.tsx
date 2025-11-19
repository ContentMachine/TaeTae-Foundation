"use client"

import type React from "react"
import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

function SponsorContent() {
  const searchParams = useSearchParams()
  const program = searchParams.get("program")

  const [paymentMethod, setPaymentMethod] = useState("stripe")
  const [exchangeRate, setExchangeRate] = useState<number | null>(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const sponsorItems = [
    { id: "tools", name: "Vocational Tools Set", description: "Carpentry & mechanics tools", amount: 150 },
    { id: "uniforms", name: "Sports Uniforms", description: "Full set for 5 boys", amount: 100 },
    { id: "books", name: "Educational Books", description: "Set of 20 books for classroom", amount: 75 },
    { id: "kit", name: "Sports Equipment Kit", description: "Footballs, cones, training gear", amount: 200 },
    { id: "tech", name: "Learning Technology", description: "Laptops or tablets", amount: 500 },
    { id: "meals", name: "Monthly Meal Program", description: "Nutritious meals for 30 boys", amount: 300 },
  ]

  // Store per-item selection state
  const [selectedItems, setSelectedItems] = useState<Record<string, { selected: boolean; quantity: number }>>({})

  // Fetch live USD→NGN exchange rate once
  useEffect(() => {
    async function fetchRate() {
      try {
        const res = await fetch("https://api.exchangerate.host/latest?base=USD&symbols=NGN")
        const data = await res.json()
        if (data?.rates?.NGN) {
          setExchangeRate(data.rates.NGN)
        } else {
          setExchangeRate(1400) // fallback value
        }
      } catch (error) {
        console.error("Error fetching exchange rate:", error)
        setExchangeRate(1400) // fallback value
      }
    }
    fetchRate()
  }, [])

  const handleToggle = (id: string) => {
    setSelectedItems((prev) => ({
      ...prev,
      [id]: prev[id]
        ? { ...prev[id], selected: !prev[id].selected }
        : { selected: true, quantity: 1 },
    }))
  }

  const handleQuantityChange = (id: string, value: number) => {
    setSelectedItems((prev) => ({
      ...prev,
      [id]: { ...prev[id], quantity: value },
    }))
  }

  // Calculate total (converted if Paystack)
  const totalAmountUSD = Object.entries(selectedItems).reduce((sum, [id, item]) => {
    if (!item.selected) return sum
    const product = sponsorItems.find((i) => i.id === id)
    return sum + (product ? product.amount * item.quantity : 0)
  }, 0)

  const totalAmountNGN = exchangeRate ? totalAmountUSD * exchangeRate : 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const chosenItems = Object.entries(selectedItems)
      .filter(([_, item]) => item.selected)
      .map(([id, item]) => ({
        id,
        quantity: item.quantity,
      }))

    const total = paymentMethod === "paystack" ? totalAmountNGN : totalAmountUSD
    const currency = paymentMethod === "paystack" ? "NGN" : "USD"

    try {
      const res = await fetch("/api/sponsorships", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          program: program || "general",
          items: chosenItems,
          totalAmount: total,
          paymentMethod,
          currency,
          rateUsed: exchangeRate,
        }),
      })

      if (res.ok) {
        if (paymentMethod === "stripe") {
          window.location.href = `/checkout?program=${program || "general"}&amount=${total.toFixed(
            2
          )}&donor=${name}`
        } else {
          window.location.href = `/checkout-paystack?program=${program || "general"}&amount=${total.toFixed(
            2
          )}&donor=${name}&email=${email}`
        }
      } else {
        alert("Error initiating payment.")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Error processing sponsorship")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto dark:bg-gray-900 px-4 py-12">
      <Link href="/support" className="text-primary hover:underline mb-4 inline-block">
        ← Back to Support
      </Link>

      <h1 className="text-4xl font-bold text-primary mb-2">Sponsor an Item</h1>
      <p className="text-foreground mb-8">
        Choose specific items to sponsor and make a tangible impact.
      </p>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Item Selection */}
        <div>
          <h2 className="text-2xl font-bold text-primary mb-4">Select Items</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sponsorItems.map((item) => {
              const state = selectedItems[item.id]
              const isSelected = state?.selected || false
              const convertedAmount =
                paymentMethod === "paystack" && exchangeRate
                  ? item.amount * exchangeRate
                  : item.amount

              return (
                <div key={item.id} className="p-4 border border-border rounded-lg">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleToggle(item.id)}
                      className="w-4 h-4 mt-1"
                    />
                    <div className="flex-1">
                      <div className="font-bold text-primary">{item.name}</div>
                      <div className="text-sm text-muted-foreground">{item.description}</div>
                      <div className="text-sm font-semibold text-primary mt-1">
                        {paymentMethod === "paystack"
                          ? `₦${convertedAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
                          : `$${item.amount}`}
                      </div>
                    </div>
                  </label>

                  {isSelected && (
                    <div className="mt-3 flex items-center justify-between">
                      <label className="text-sm text-foreground font-medium">Quantity:</label>
                      <input
                        type="number"
                        min="1"
                        value={state.quantity}
                        onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                        className="w-20 px-2 py-1 border border-border rounded-md text-center"
                      />
                      <span className="text-sm text-primary font-semibold">
                        {paymentMethod === "paystack" && exchangeRate
                          ? `₦${(convertedAmount * state.quantity).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
                          : `$${(item.amount * state.quantity).toLocaleString()}`}
                      </span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Donor Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-foreground font-semibold mb-2">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div>
            <label className="block text-foreground font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary"
              required
            />
          </div>
        </div>

        {/* Payment Method */}
        <div>
          <h2 className="text-2xl font-bold text-primary mb-4">Select Payment Method</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setPaymentMethod("stripe")}
              className={`p-6 rounded-lg border-2 transition text-center ${
                paymentMethod === "stripe" ? "border-primary bg-primary/5" : "border-border hover:border-primary"
              }`}
            >
              <div className="font-bold text-lg text-primary mb-2">Stripe</div>
              <div className="text-sm text-foreground">Credit/Debit Card (USD)</div>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod("paystack")}
              className={`p-6 rounded-lg border-2 transition text-center ${
                paymentMethod === "paystack" ? "border-primary bg-primary/5" : "border-border hover:border-primary"
              }`}
            >
              <div className="font-bold text-lg text-primary mb-2">Paystack</div>
              <div className="text-sm text-foreground">Card/Bank Transfer (NGN)</div>
            </button>
          </div>

          {paymentMethod === "paystack" && exchangeRate && (
            <p className="text-sm text-muted-foreground mt-2">
              💱 Current rate: 1 USD = ₦{exchangeRate.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </p>
          )}
        </div>

        {/* Total */}
        <div className="text-right font-semibold text-lg text-primary">
          Total:{" "}
          {paymentMethod === "paystack"
            ? `₦${totalAmountNGN.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
            : `$${totalAmountUSD.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={totalAmountUSD === 0 || isSubmitting}
          className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition disabled:opacity-50"
        >
          {isSubmitting ? "Processing..." : "Proceed to Payment"}
        </button>
      </form>
    </div>
  )
}

export default function SponsorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SponsorContent />
    </Suspense>
  )
}
