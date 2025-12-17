// app/api/auth/me/route.ts
import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"

export async function GET(req: Request) {
  const cookie = req.headers.get("cookie") || ""
  const parts = cookie.split("auth_token=")

  if (parts.length < 2) {
    return NextResponse.json({ user: null })
  }

  const token = parts[1].split(";")[0]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!)
    return NextResponse.json({ user: decoded })
  } catch {
    return NextResponse.json({ user: null })
  }
}
