import { type NextRequest, NextResponse } from "next/server"
import { verifyPaystackTransaction } from "@/lib/paystack"
import { updateRecord } from "@/lib/db"

/**
 * POST /api/paystack/verify
 * Verify a Paystack transaction and update donation status
 *
 * Body:
 * - reference: string (Paystack transaction reference)
 * - donationId: string (TaeTae donation ID to update)
 */
export async function POST(request: NextRequest) {
  try {
    const { reference, donationId } = await request.json()

    if (!reference) {
      return NextResponse.json({ error: "Missing reference" }, { status: 400 })
    }

    // Verify with Paystack
    const result = await verifyPaystackTransaction(reference)

    if (!result.status || result.data.status !== "success") {
      // Update donation status to failed
      if (donationId) {
        await updateRecord("donations", donationId, { status: "failed" })
      }
      return NextResponse.json({ success: false, message: "Payment verification failed" }, { status: 400 })
    }

    // Update donation record with transaction details
    if (donationId) {
      await updateRecord("donations", donationId, {
        status: "completed",
        transactionId: reference,
      })
    }

    return NextResponse.json({
      success: true,
      transaction: result.data,
    })
  } catch (error) {
    console.error(" Error verifying Paystack transaction:", error)
    return NextResponse.json({ error: "Failed to verify transaction" }, { status: 500 })
  }
}
