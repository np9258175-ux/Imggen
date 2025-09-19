// Store latest image per prompt
const latestImages = {};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const event = req.body;

    if (event.type === "image.completed") {
      const prompt = event.payload.name || "unknown";
      const url = event.payload.downloads[0].url;
      latestImages[prompt] = url;
      console.log(`Stored image for prompt "${prompt}":`, url);
    }

    res.status(200).json({ success: true });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

export { latestImages };
