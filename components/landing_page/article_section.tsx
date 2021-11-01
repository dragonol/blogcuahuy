import * as Components from "./..";

interface ArticleSectionProps {
  articleMetadatas: Components.Type.ArticleMetadata[];
}

export const ArticleSection: React.FC<ArticleSectionProps> = (
  props: ArticleSectionProps
): JSX.Element => {
  return (
    <div>
      {props.articleMetadatas.map((articleMetadata) => {
        return <div>{articleMetadata.title}</div>;
      })}
    </div>
  );
};
