let latestImageUrl = null;

export default async function handler(req, res) {
  if (req.method === "POST") {
    const body = req.body;

    // Try to extract image URL from downloads array
    const url = body.payload?.downloads?.[0]?.[0]?.url;

    if (url) {
      latestImageUrl = url;
      console.log("Received new image URL:", latestImageUrl);
    } else {
      console.log("Webhook received but no image URL:", body);
    }

    return res.status(200).json({ received: true });
  } else if (req.method === "GET") {
    return res.status(200).json({ url: latestImageUrl });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
