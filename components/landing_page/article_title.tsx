import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import * as Components from "./../index";
import * as Utilities from "./../../utilities";

export const ArticleTitle: React.FC<Components.Type.ArticleTitleProps> = (
  props: Components.Type.ArticleTitleProps
): JSX.Element => {
  const createdTimeText = Utilities.TimestampToText(
    props.articleMetadata.createdAt
  );
  const iconSrc = Utilities.GetArticleIconSrc(props.articleMetadata.type);
  const [mouseOn, setMouseOn] = useState(false);

  return (
    <Link
      href={`article/${encodeURIComponent(props.articleMetadata.urlTitle)}`}
    >
      <div
        className="flex justify-between items-center"
        onMouseOver={() => setMouseOn(true)}
        onMouseLeave={() => setMouseOn(false)}
      >
        <div className="flex space-x-6 cursor-pointer flex-1">
          <div className="lg:w-16 w-12 mt-1 flex-none">
            <Image src={iconSrc} height="1000" width="1000"></Image>
          </div>
          <div className="flex flex-col justify-start">
            <p className="m-0">{createdTimeText}</p>
            <h2 className="m-0">{props.articleMetadata.title}</h2>
          </div>
        </div>
        {mouseOn && (
          <div className="sm:block hidden flex-none w-3 h-3 rounded-full bg-yellow-400"></div>
        )}
      </div>
    </Link>
  );
};
