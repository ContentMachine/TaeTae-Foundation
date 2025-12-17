import { NextResponse } from "next/server"
import { findUserByEmail, setResetOTP } from "@/lib/auth"
import { sendResetEmail } from "@/lib/email"

export async function POST(req: Request) {
  const { email } = await req.json()

  const user = await findUserByEmail(email)
  if (!user) {
    // don't leak which emails exist
    return NextResponse.json({ success: true })
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString()
  await setResetOTP(email, otp)
  await sendResetEmail(email, otp)

  return NextResponse.json({ success: true })
}