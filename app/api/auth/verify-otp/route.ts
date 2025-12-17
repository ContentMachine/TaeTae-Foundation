// app/api/auth/verify-otp/route.ts
import { NextResponse } from "next/server"
import { verifyOTP } from "@/lib/auth"

export async function POST(req: Request) {
  const { email, otp } = await req.json()

  const user = await verifyOTP(email, otp)
  return NextResponse.json({ valid: !!user })
}
