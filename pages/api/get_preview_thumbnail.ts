// NodeJS Core
import fs from "fs";
import path from "path";
import * as Utilities from "./../../utilities";
import type { NextApiRequest, NextApiResponse } from "next";

type GetPreviewThumbnailReq = {
  nameOnURL: string;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const reqMessage = req.query as GetPreviewThumbnailReq;
  const articleMetadata = await Utilities.LoadArticleMetadata(
    reqMessage.nameOnURL
  );

  if (articleMetadata == null) {
    return;
  }

  if (articleMetadata.image != null) {
    // Posts with images
    const filePath = path.resolve(
      "./public/images/article_images/",
      articleMetadata.image
    );
    const imageBuffer = fs.readFileSync(filePath);

    res.setHeader("Content-Type", "image/jpg");
    res.send(imageBuffer);
  } else {
    const screenShotBuffer = await Utilities.CreateThumbnail(articleMetadata);
    res.writeHead(200, {
      "Content-Type": "image/png",
      "Content-Length": Buffer.byteLength(screenShotBuffer),
    });
    res.end(screenShotBuffer);
  }
};
