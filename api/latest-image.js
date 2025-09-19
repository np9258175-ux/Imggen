// Store latest image URL in memory
let latestImageUrl = null;

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Magic Hour webhook posts here
    const body = req.body;

    // Make sure payload exists and has the image URL
    if (body.payload?.outputs?.[0]?.url) {
      latestImageUrl = body.payload.outputs[0].url;
      console.log("Received new image URL:", latestImageUrl);
    } else {
      console.log("Webhook received but no image URL:", body);
    }

    return res.status(200).json({ received: true });
  } else if (req.method === "GET") {
    // HTML page fetches the latest image
    return res.status(200).json({ url: latestImageUrl });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
