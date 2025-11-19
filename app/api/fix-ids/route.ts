import { NextResponse } from "next/server"
import { getCollection } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET() {
  try {
    const col = await getCollection("boys")
    const boys = await col.find({}).toArray()

    if (boys.length === 0) {
      return NextResponse.json({ message: "No records found" })
    }

    let fixedCount = 0

    for (const boy of boys) {
      if (typeof boy._id === "string") {
        const oldId = boy._id
        const newId = new ObjectId(oldId)

        // duplicate and replace
        boy._id = newId
        boy.id = newId.toString()

        await col.insertOne(boy)
        await col.deleteOne({ _id: oldId })
        fixedCount++
      }
    }

    return NextResponse.json({
      message: `✅ Fixed ${fixedCount} record(s) successfully.`,
    })
  } catch (error) {
    console.error("❌ Error fixing IDs:", error)
    return NextResponse.json({ error: "Failed to fix IDs" }, { status: 500 })
  }
}
