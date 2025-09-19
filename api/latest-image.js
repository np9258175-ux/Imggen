import { latestImages } from "./mh-webhook";

export default function handler(req, res) {
  const prompt = req.query.prompt;
  if (prompt && latestImages[prompt]) {
    res.status(200).json({ url: latestImages[prompt] });
  } else {
    res.status(404).json({ url: null });
  }
}
