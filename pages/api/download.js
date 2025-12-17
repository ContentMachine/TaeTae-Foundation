export const config = {
  runtime: "nodejs",
};

import ytdl from "ytdl-core";
import { Readable } from "stream";

export default async function handler(req, res) {
  const { url, name } = req.query;

  console.log("⬇️ DOWNLOAD REQUEST:", url);
  console.log("RUNTIME =", process.env.NEXT_RUNTIME);

  if (!url) {
    return res.status(400).send("Missing URL");
  }

  // -------------------------------
  //  YOUTUBE DOWNLOAD
  // -------------------------------
  if (ytdl.validateURL(url)) {
    try {
      const info = await ytdl.getInfo(url);
      const videoTitle =
        name || info.videoDetails.title.replace(/[^\w\d\s]/g, "_") || "video";

      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${videoTitle}.mp4"`
      );
      res.setHeader("Content-Type", "video/mp4");

      return ytdl(url, {
        quality: "highest",
        filter: "audioandvideo",
      }).pipe(res);

    } catch (err) {
      console.error("❌ YOUTUBE ERROR:", err);
      return res.status(500).send("YouTube download failed");
    }
  }

  // -------------------------------
  //  NORMAL FILE DOWNLOAD
  // -------------------------------
  try {
    const response = await fetch(url);

    if (!response.ok) {
      return res.status(400).send("Remote file not available");
    }

    const contentType =
      response.headers.get("content-type") || "application/octet-stream";

    let ext = "";
    if (contentType.includes("mp4")) ext = ".mp4";
    else if (contentType.includes("quicktime")) ext = ".mov";
    else if (contentType.includes("webm")) ext = ".webm";
    else if (contentType.includes("pdf")) ext = ".pdf";
    else if (contentType.includes("png")) ext = ".png";
    else if (contentType.includes("jpeg")) ext = ".jpg";

    let fileName =
      name ||
      url.split("/").pop().split("?")[0] ||
      "download";

    if (!fileName.includes(".") && ext) {
      fileName = fileName + ext;
    }

    res.setHeader("Content-Type", contentType);
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${fileName}"`
    );

    const nodeStream = Readable.fromWeb(response.body);
    nodeStream.pipe(res);

  } catch (error) {
    console.log("❌ GENERAL ERROR:", error);
    return res.status(500).send("Server failed to download file");
  }
}
