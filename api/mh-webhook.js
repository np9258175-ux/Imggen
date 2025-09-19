export default async function handler(req, res) {
  if (req.method === "POST") {
    const event = req.body;
    console.log("Webhook received:", event);

    if (event.type === "image.completed") {
      const imageUrl = event.payload.downloads[0].url;
      console.log("Generated image URL:", imageUrl);
    }

    res.status(200).json({ success: true });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
