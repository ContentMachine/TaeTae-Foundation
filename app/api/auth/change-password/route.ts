// app/api/auth/change-password/route.ts
import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { getCollection } from "@/lib/mongodb"

export async function POST(req: Request) {
  const cookie = req.headers.get("cookie") || ""
  const parts = cookie.split("auth_token=")
  if (parts.length < 2) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
  }

  const token = parts[1].split(";")[0]

  let payload: any
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET!)
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 })
  }

  const { currentPassword, newPassword } = await req.json()

  const users = await getCollection("users")
  const user = await users.findOne({ id: payload.id })

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  const valid = bcrypt.compareSync(currentPassword, user.password)
  if (!valid) {
    return NextResponse.json({ error: "Incorrect current password" }, { status: 400 })
  }

  const hashed = bcrypt.hashSync(newPassword, 10)

  await users.updateOne(
    { id: payload.id },
    { $set: { password: hashed } }
  )

  return NextResponse.json({ success: true })
}
