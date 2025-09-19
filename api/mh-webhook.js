let latestImage = null; // stores the most recent image URL

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const event = req.body;

      console.log("Webhook received:", event);

      if (event.type === "image.completed") {
        const imageUrl = event.payload.downloads[0].url;
        console.log("Generated image URL:", imageUrl);

        latestImage = imageUrl; // store it for frontend
      }

      res.status(200).json({ success: true });
    } catch (err) {
      console.error("Webhook error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

// export the latestImage for another endpoint
export { latestImage };
