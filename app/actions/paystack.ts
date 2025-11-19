"use server"

import { initializePaystackTransaction } from "@/lib/paystack"

export async function startPaystackTransaction(
  amount: number,
  email: string,
  type: "donation" | "sponsorship",
  metadata: {
    program?: string
    donorName?: string
    itemId?: string
  },
) {
  try {
    const result = await initializePaystackTransaction({
      amount: Math.round(amount * 100), // Convert to kobo/cents
      email,
      metadata: {
        type,
        ...metadata,
      },
    })

    if (!result.status) {
      throw new Error(result.message || "Failed to initialize transaction")
    }

    return result.data.authorization_url
  } catch (error) {
    console.error(" Error in startPaystackTransaction:", error)
    throw error
  }
}
