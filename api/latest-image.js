import { latestImage } from "./mh-webhook";

export default function handler(req, res) {
  if (req.method === "GET") {
    if (latestImage) {
      res.status(200).json({ url: latestImage });
    } else {
      res.status(200).json({ url: null });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
