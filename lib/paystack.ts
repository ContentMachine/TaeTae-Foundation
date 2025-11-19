const PAYSTACK_API_KEY = process.env.PAYSTACK_SECRET_KEY || ""
const PAYSTACK_BASE_URL = "https://api.paystack.co"

export interface PaystackTransactionData {
  amount: number // in kobo/cents (multiply by 100)
  email: string
  metadata: {
    type: "donation" | "sponsorship"
    program?: string
    donorName?: string
    itemId?: string
  }
}

export async function initializePaystackTransaction(data: PaystackTransactionData) {
  try {
    const response = await fetch(`${PAYSTACK_BASE_URL}/transaction/initialize`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${PAYSTACK_API_KEY}`,
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`Paystack API error: ${response.statusText}`)
    }

    const result = await response.json()
    console.log(" Paystack transaction initialized:", result)
    return result
  } catch (error) {
    console.error(" Error initializing Paystack transaction:", error)
    throw error
  }
}

export async function verifyPaystackTransaction(reference: string) {
  try {
    const response = await fetch(`${PAYSTACK_BASE_URL}/transaction/verify/${reference}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${PAYSTACK_API_KEY}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Paystack API error: ${response.statusText}`)
    }

    const result = await response.json()
    console.log(" Paystack transaction verified:", result)
    return result
  } catch (error) {
    console.error(" Error verifying Paystack transaction:", error)
    throw error
  }
}
