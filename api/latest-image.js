import { latestImage } from "./mh-webhook";

export default function handler(req, res) {
  res.status(200).json({ url: latestImage });
}
