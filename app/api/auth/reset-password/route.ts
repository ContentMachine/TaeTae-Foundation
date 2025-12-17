// app/api/auth/reset-password/route.ts
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { updatePassword, verifyOTP } from "@/lib/auth"

export async function POST(req: Request) {
  const { email, otp, newPassword } = await req.json()

  // double-check OTP is valid before reset (extra safety)
  const validUser = await verifyOTP(email, otp)
  if (!validUser) {
    return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 })
  }

  const hashed = bcrypt.hashSync(newPassword, 10)
  await updatePassword(email, hashed)

  return NextResponse.json({ success: true })
}
