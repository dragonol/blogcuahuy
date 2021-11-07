import fs from "fs";
import { join } from "path";
import * as Components from "./../components";
import chromium from "chrome-aws-lambda";

const articlesDirectory = join(process.cwd(), "_articles");
const articleImagesDirectory = join(
  process.cwd(),
  "public/images/article_images"
);

export async function CreateThumbnail(
  articleMetadata: Components.Type.ArticleMetadata
) {
  // Posts without images
  const imageAvatar = fs.readFileSync(
    join(process.cwd(), "/public/images/Huy.png")
  );
  const base64ImageAvatar = Buffer.from(imageAvatar).toString("base64");
  const dataURIAvatar = "data:image/jpeg;base64," + base64ImageAvatar;

  const originalDate = new Date(articleMetadata.createdAt * 1000);
  const formattedDate = `${originalDate.getDate()}/${(
    "0" +
    (originalDate.getMonth() + 1)
  ).slice(-2)}/${originalDate.getFullYear()}`;

  const imageArticleType = fs.readFileSync(
    join(process.cwd(), `./public${GetArticleIconSrc(articleMetadata.type)}`)
  );
  const base64ImageArticleType =
    Buffer.from(imageArticleType).toString("base64");
  const dataURIArticleType = "data:image/jpeg;base64," + base64ImageArticleType;

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
                        <img id="article-type" src="${dataURIArticleType}" />
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

export function GetArticleIconSrc(articleType: Components.Type.ArticleType) {
  let iconSrc = "/images/";
  switch (articleType) {
    case Components.Type.ArticleType_Thought:
      iconSrc += "thought-icon.png";
      break;
    case Components.Type.ArticleType_Tech:
      iconSrc += "tech-icon.png";
      break;
    case Components.Type.ArticleType_Music:
      iconSrc += "music-icon.png";
      break;
    default:
      break;
  }
  return iconSrc;
}

export function TimestampToText(timestamp: number) {
  const createdTime = new Date(timestamp * 1000);

  const createdTimeText = `ngày ${createdTime.getDate()} tháng ${
    createdTime.getMonth() + 1
  } năm ${createdTime.getFullYear()}`;

  return createdTimeText;
}

export async function LoadArticle(
  nameOnURL: string
): Promise<Components.Type.Article | null> {
  const trimmedNameOnURL = nameOnURL.trim();

  let selectedArticleMetadata: Components.Type.ArticleMetadata | null = null;

  fs.readdirSync(articlesDirectory).every((articleFileName) => {
    const articleMetadata = ParseArticleFileName(articleFileName);

    if (articleMetadata == null) {
      return true;
    }

    if (trimmedNameOnURL == articleMetadata.urlTitle) {
      selectedArticleMetadata = articleMetadata;
      return false;
    }

    return true;
  });

  if (selectedArticleMetadata == null) {
    return null;
  }

  selectedArticleMetadata =
    selectedArticleMetadata as Components.Type.ArticleMetadata;

  const fullPath = join(articlesDirectory, selectedArticleMetadata.fileName);
  const articleContent = fs.readFileSync(fullPath, "utf8");

  return {
    ...selectedArticleMetadata,
    content: articleContent,
  };
}

export async function LoadArticleMetadata(
  nameOnURL: string
): Promise<Components.Type.ArticleMetadata | null> {
  const trimmedNameOnURL = nameOnURL.trim();

  let selectedArticleMetadata: Components.Type.ArticleMetadata | null = null;

  fs.readdirSync(articlesDirectory).every((articleFileName) => {
    const articleMetadata = ParseArticleFileName(articleFileName);

    if (articleMetadata == null) {
      return true;
    }

    if (trimmedNameOnURL == articleMetadata.urlTitle) {
      selectedArticleMetadata = articleMetadata;
      return false;
    }

    return true;
  });

  if (selectedArticleMetadata == null) {
    return null;
  }

  selectedArticleMetadata =
    selectedArticleMetadata as Components.Type.ArticleMetadata;

  const fullPath = join(
    articleImagesDirectory,
    selectedArticleMetadata.title + ".png"
  );
  if (fs.existsSync(fullPath)) {
    selectedArticleMetadata.image = selectedArticleMetadata.title + ".png";
  }

  return selectedArticleMetadata;
}

export async function LoadAllArticleMetadatas(): Promise<
  Components.Type.ArticleMetadata[]
> {
  const articleFileNames = fs.readdirSync(articlesDirectory);
  const articleMetadatas: Components.Type.ArticleMetadata[] = [];

  for (let articleFileName of articleFileNames) {
    const articleMetadata = ParseArticleFileName(articleFileName);
    if (articleMetadata == null) {
      continue;
    }
    articleMetadatas.push(articleMetadata);
  }
  return articleMetadatas;
}

function ParseArticleFileName(
  articleFileName: string
): Components.Type.ArticleMetadata | null {
  const infos = articleFileName.replace(/\.md$/, "").split("_");
  if (infos.length != 3) {
    console.log("failed to parse article file name");
    return null;
  }
  return {
    title: infos[2],
    type: infos[1],
    createdAt: parseInt(infos[0]),
    fileName: articleFileName,
    urlTitle: RemoveVietnameseTones(infos[2]).replace(/ /g, "-"),
  };
}

function RemoveVietnameseTones(str: string): string {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư

  str = str.trim();

  return str;
}
