import * as Components from "../index";
import { MDXRemote } from "next-mdx-remote";

interface ArticleBodyProps {
  article: Components.Type.Article;
}

export const ArticleBody: React.FC<ArticleBodyProps> = (
  props: ArticleBodyProps
): JSX.Element => {
  return (
    <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto">
      <MDXRemote {...props.article.mdxSource} />
    </div>
  );
};
