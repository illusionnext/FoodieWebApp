import multer from "multer";
import nextConnect from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";

interface ExtendedNextApiRequest extends NextApiRequest {
  file?: Express.Multer.File;
}

const upload = multer({
  storage: multer.memoryStorage(),
});

const apiRoute = nextConnect<ExtendedNextApiRequest, NextApiResponse>({
  onError(err: unknown, req, res) {
    const error = err as Error;
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use((req: ExtendedNextApiRequest, res, next) => {
  upload.single("image")(req as any, res as any, next);
});

apiRoute.post((req: ExtendedNextApiRequest, res: NextApiResponse) => {
  if (!req.file) {
    return res.status(400).json({ error: "Image is not present" });
  }

  res.status(200).json({ url: req.file.buffer.toString("base64") });
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apiRoute;
