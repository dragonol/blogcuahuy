import fs from "fs";
import { join } from "path";
import * as Components from "./../components";

const articlesDirectory = join(process.cwd(), "_articles");

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
