import ytdl from "ytdl-core";

export default async function handler(req, res) {
  try {
    const { url } = req.query;

    if (!url || !ytdl.validateURL(url)) {
      res.status(400).send("Invalid YouTube URL");
      return;
    }

    const info = await ytdl.getInfo(url);
    const title = info.videoDetails.title.replace(/[^\w\d\s]/g, "_") || "video";

    res.setHeader("Content-Disposition", `attachment; filename="${title}.mp4"`);
    res.setHeader("Content-Type", "video/mp4");

    ytdl(url, {
      filter: "audioandvideo",
      quality: "highest",
    }).pipe(res);

  } catch (err) {
    console.error("YouTube Download Error:", err);
    res.status(500).send("Failed to download video");
  }
}
