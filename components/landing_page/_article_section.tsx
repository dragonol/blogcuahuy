import * as Components from "..";

interface ArticleSectionProps {
  articleMetadatas: Components.Type.ArticleMetadata[];
}

export const ArticleSection: React.FC<ArticleSectionProps> = (
  props: ArticleSectionProps
): JSX.Element => {
  return (
    <div id={Components.Type.LandingPageSectionType_Article} className="">
      <div className="flex justify-between items-end">
        <h1 className="mb-0">
          Các bài <br />
          gần đây của mình
        </h1>
        {/* <Image src="/icons/filter-icon.svg" height="30" width="30" /> */}
      </div>

      <hr className="border rounded-lg border-black mt-6" />
      <div className="space-y-3 lg:space-y-6 max-h-article-section overflow-y-auto">
        {props.articleMetadatas.map((articleMetadata) => {
          return (
            <Components.LandingPage.ArticleTitle
              key={articleMetadata.urlTitle}
              articleMetadata={articleMetadata}
            />
          );
        })}
      </div>
    </div>
  );
};
