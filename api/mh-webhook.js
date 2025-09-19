let latestImage = null;

export default async function handler(req, res) {
  if (req.method === "POST") {
    const event = req.body;

    if (event.type === "image.completed") {
      latestImage = event.payload.downloads[0].url;
      console.log("Stored image URL:", latestImage);
    }

    res.status(200).json({ success: true });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

export { latestImage };
