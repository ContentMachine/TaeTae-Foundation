export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { getRecordById, updateRecord, deleteRecord } from "@/lib/db";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params; // ✅ unwrap params Promise

  try {
    console.log("🔎 API GET /boys/:id →", id);
    const boy = await getRecordById("boys", id);

    if (!boy) {
      console.warn(`⚠️ Boy not found for id ${id}`);
      return NextResponse.json({ error: "Boy not found" }, { status: 404 });
    }

    return NextResponse.json(boy);
  } catch (error) {
    console.error("❌ Error fetching boy:", error);
    return NextResponse.json({ error: "Failed to fetch boy" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params; // ✅ unwrap params Promise
  try {
    const data = await req.json();
    const updated = await updateRecord("boys", id, data);

    if (!updated) {
      return NextResponse.json({ error: "Boy not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("❌ Error updating boy:", error);
    return NextResponse.json({ error: "Failed to update boy" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params; // ✅ unwrap params Promise
  try {
    await deleteRecord("boys", id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Error deleting boy:", error);
    return NextResponse.json({ error: "Failed to delete boy" }, { status: 500 });
  }
}
