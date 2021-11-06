import Image from "next/image";
import Link from "next/link";
import * as Components from "./../index";
import * as Utilities from "./../../utilities";

export const ArticleTitle: React.FC<Components.Type.ArticleTitleProps> = (
  props: Components.Type.ArticleTitleProps
): JSX.Element => {
  const createdTimeText = Utilities.TimestampToText(
    props.articleMetadata.createdAt
  );
  const iconSrc = Utilities.GetArticleIconSrc(props.articleMetadata.type);

  return (
    <Link href={`article/${props.articleMetadata.urlTitle}`}>
      <div className="flex space-x-6 cursor-pointer">
        <div className="lg:w-16 w-12 mt-1 flex-none">
          <Image src={iconSrc} height="1000" width="1000"></Image>
        </div>
        <div className="flex flex-col justify-start">
          <p className="m-0">{createdTimeText}</p>
          <h2 className="m-0">{props.articleMetadata.title}</h2>
        </div>
      </div>
    </Link>
  );
};
