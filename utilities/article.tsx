import fs from "fs";
import { join } from "path";
import { serialize } from "next-mdx-remote/serialize";
import * as Components from "./../components";

const articlesDirectory = join(process.cwd(), "_articles");

export async function LoadArticle(
  nameOnURL: string
): Promise<Components.Type.Article | null> {
  const trimmedNameOnURL = nameOnURL.trim();

  let selectedArticleName = "";

  fs.readdirSync(articlesDirectory).every((articleFileName) => {
    const articleName = articleFileName.replace(/\.md$/, "");
    const transformedArticleFileName = RemoveVietnameseTones(
      articleName.replace(/ /g, "-")
    );

    if (trimmedNameOnURL == transformedArticleFileName) {
      selectedArticleName = articleName;
      return false;
    }

    return true;
  });

  if (selectedArticleName == "") {
    return null;
  }

  const fullPath = join(articlesDirectory, selectedArticleName + ".md");
  const articleContent = fs.readFileSync(fullPath, "utf8");

  const mdxSource = await serialize(articleContent);
  return {
    title: selectedArticleName,
    content: articleContent,
    mdxSource: mdxSource,
  };
}

export async function LoadAllArticleMetadatas(): Promise<
  Components.Type.ArticleMetadata[]
> {
  return fs.readdirSync(articlesDirectory).map((articleFileName) => {
    const articleName = articleFileName.replace(/\.md$/, "");
    return {
      title: articleName,
    };
  });
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
