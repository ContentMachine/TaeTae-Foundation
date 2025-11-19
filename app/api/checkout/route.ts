import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const amount = searchParams.get("amount")

  // In production, integrate with Stripe
  // For now, just redirect to a success page
  return NextResponse.redirect(new URL("/success", request.url))
}
