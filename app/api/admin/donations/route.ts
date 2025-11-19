import { type NextRequest, NextResponse } from "next/server"
import { getRecords, deleteRecord } from "@/lib/db"

export async function GET() {
  try {
    const donations = await getRecords("donations")
    return NextResponse.json({ donations })
  } catch (error) {
    console.error(" Error fetching donations:", error)
    return NextResponse.json({ error: "Failed to fetch donations" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Missing donation ID" }, { status: 400 })
    }

    await deleteRecord("donations", id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(" Error deleting donation:", error)
    return NextResponse.json({ error: "Failed to delete donation" }, { status: 500 })
  }
}
