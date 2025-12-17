import { type NextRequest, NextResponse } from "next/server"
import { uploadToCloudinary } from "@/lib/cloudinary"
import { addRecord } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null
    const boyId = formData.get("boyId") as string
    const uploadType = formData.get("uploadType") as string
    const uploadedBy = formData.get("uploadedBy") as string
    const description = formData.get("description") as string
    const fileTitle = formData.get("fileTitle") as string
    const url = formData.get("url") as string | null  // <-- Added URL support

    // -------------------------------------------------------
    // ✅ CASE 1: USER PROVIDED A URL INSTEAD OF A FILE
    // -------------------------------------------------------
    if (!file && url) {
      // Basic URL validation
      const isYouTube = url.includes("youtube.com") || url.includes("youtu.be")
      const isCloudinary = url.includes("res.cloudinary.com")
      const isVideo = url.match(/\.(mp4|mov|webm)$/i)

      if (!isYouTube && !isCloudinary && !isVideo) {
        return NextResponse.json({ error: "Invalid or unsupported media URL" }, { status: 400 })
      }

      const mediaId = `MED-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

      const media = await addRecord("media", {
        id: mediaId,
        publicId: null,
        secureUrl: url,
        resourceType: isYouTube ? "youtube" : isVideo ? "video" : "url",
        format: null,
        width: null,
        fileTitle: fileTitle || null,
        height: null,
        duration: null,
        bytes: null,
        boyId: boyId || null,
        uploadType,
        uploadedBy,
        description: description || null,
        createdAt: new Date().toISOString(),
      })

      console.log("🔗 URL accepted:", url)

      return NextResponse.json({
        success: true,
        media,
        url,
      })
    }

    // -------------------------------------------------------
    // ❌ ERROR: No file and no URL
    // -------------------------------------------------------
    if (!file) {
      return NextResponse.json({ error: "No file or URL provided" }, { status: 400 })
    }

    // -------------------------------------------------------
    // ✅ CASE 2: HANDLE REAL FILE UPLOAD (same as before)
    // -------------------------------------------------------
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "video/mp4",
      "video/quicktime",
      "application/pdf",
    ]

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = `data:${file.type};base64,${buffer.toString('base64')}`

    const folder = `taetae/${uploadType}/${boyId || "general"}`
    const result = await uploadToCloudinary(base64, {
      folder,
      tags: [uploadType, boyId, uploadedBy].filter(Boolean),
    })

    const mediaId = `MED-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    const media = await addRecord("media", {
      id: mediaId,
      publicId: result.public_id,
      secureUrl: result.secure_url,
      resourceType: result.resource_type,
      format: result.format,
      width: result.width,
      fileTitle: fileTitle,
      height: result.height,
      duration: result.duration,
      bytes: result.bytes,
      boyId: boyId || null,
      uploadType,
      uploadedBy,
      description: description || null,
      createdAt: new Date().toISOString(),
    })

    console.log("📤 File uploaded:", mediaId)

    return NextResponse.json({
      success: true,
      media,
      url: result.secure_url,
    })
  } catch (error) {
    console.error("❌ Upload error:", error)
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}
