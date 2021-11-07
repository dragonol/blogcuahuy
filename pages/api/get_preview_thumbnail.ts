// NodeJS Core
import fs from "fs";
import path from "path";
import * as Utilities from "./../../utilities";
import type { NextApiRequest, NextApiResponse } from "next";
import { join } from "path";
import * as Components from "./../../components";
import chromium from "chrome-aws-lambda";
import { time } from "console";

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
    const screenShotBuffer = await CreateThumbnail(articleMetadata);
    res.writeHead(200, {
      "Content-Type": "image/png",
      "Content-Length": Buffer.byteLength(screenShotBuffer),
    });
    res.end(screenShotBuffer);
  }
};

const cwd = process.cwd();

async function CreateThumbnail(
  articleMetadata: Components.Type.ArticleMetadata
) {
  // Posts without images

  const articleTypeSrc = GetArticleIconSrc(articleMetadata.type);
  const imageArticleType = fs.readFileSync(
    path.resolve(cwd, "./public/images/thought.png")
  );
  const base64ImageArticleType =
    Buffer.from(imageArticleType).toString("base64");
  const dataURIArticleType = "data:image/jpeg;base64," + base64ImageArticleType;

  const imageAvatar = fs.readFileSync(join(cwd, "/public/images/Huy.png"));
  const base64ImageAvatar = Buffer.from(imageAvatar).toString("base64");
  const dataURIAvatar = "data:image/jpeg;base64," + base64ImageAvatar;

  const originalDate = new Date(articleMetadata.createdAt * 1000);
  const formattedDate = `${originalDate.getDate()}/${(
    "0" +
    (originalDate.getMonth() + 1)
  ).slice(-2)}/${originalDate.getFullYear()}`;

  const browser = await chromium.puppeteer.launch({
    args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: true,
    ignoreHTTPSErrors: true,
  });

  const page = await browser.newPage();
  page.setViewport({ width: 1128, height: 600 });
  page.setContent(`<html>
              <body>
                  <div class="social-image-content">
                      <div>
                          <img id="article-type" src="${dataURIArticleType}"/>
                          <h1>
                              ${articleMetadata.title}
                          </h1>
                      </div>
                      <div class="social-image-footer">
                          <div class="social-image-footer-left">
                              <img src="${dataURIAvatar}" />
                              <span>blogcuahuy</span>
                          </div>
                      </div>
                  </div>
              </body>
              <style>
                  html, body {
                      height : 100%;
                  }
                  body {
                      align-items : center;
                      display : flex;
                      height : 600px;
                      justify-content : center;
                      margin: 0;
                      width : 1128px;
                      background-color: #e2e2e2;
                  }
                  .social-image-content {
                      border : 2px solid black;
                      border-radius : 5px;
                      box-sizing: border-box;
                      display : flex;
                      flex-direction : column;
                      height : calc(100% - 80px);
                      margin : 40px;
                      padding : 30px;
                      width : calc(100% - 80px);
                      position: relative;
                      background-color: white;
                  }
                  
                  .social-image-content h1 {
                      font-size: 72px;
                      margin-top: 10px;
                  }
                  .social-image-content #article-type {
                      width: 6rem;
                      margin-top: 80px;
                  }
                  .social-image-footer {
                      display : flex;
                      flex-direction : row;
                      margin-top : auto;
                  }
                  .social-image-footer-left {
                      align-items: center;
                      display: flex;
                      flex-direction: row;
                      font-size : 28px;
                      font-weight : 600;
                      justify-content: center;
                      line-height: 40px;
                  }
                  .social-image-footer-left img {
                      border : 2px solid black;
                      border-radius : 50%;
                      height : 40px;
                      margin-right : 10px;
                      width : 40px;
                  }
                  .social-image-footer-right {
                      align-items: center;
                      display: flex;
                      flex-direction: row;
                      height : 40px;
                      justify-content: center;
                      margin-left : auto;
                      font-size : 28px;
                  }
                  * {
                      font-family: "Kollektif", "Be Vietnam Pro";
                      font-weight : 600;
                  }
              </style>
          </html>`);

  const screenShotBuffer = await page.screenshot();
  return screenShotBuffer;
}

function GetArticleIconSrc(articleType: Components.Type.ArticleType) {
  let iconSrc = "/images/";
  switch (articleType) {
    case Components.Type.ArticleType_Thought:
      iconSrc += "thought.png";
      break;
    case Components.Type.ArticleType_Tech:
      iconSrc += "tech.png";
      break;
    case Components.Type.ArticleType_Music:
      iconSrc += "music.png";
      break;
    default:
      break;
  }
  return iconSrc;
}
