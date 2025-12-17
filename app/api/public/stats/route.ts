import { getPublicStats } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const stats = await getPublicStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error("Public stats error:", error);
    return NextResponse.json({ error: "Failed to load stats" }, { status: 500 });
  }
}
