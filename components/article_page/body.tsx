import * as Components from "../index";
import Image from "next/image";
import * as Utilities from "./../../utilities";
import { MDXRemote } from "next-mdx-remote";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import Link from "next/link";

interface ArticleBodyProps {
  article: Components.Type.Article;
}

interface CustomImageProps {
  src: string
  caption: string
}

const CustomImage: React.FC<CustomImageProps> = (
  props: CustomImageProps
): JSX.Element => (
  <div className="flex justify-center w-full">
    <figure className="text-center w-9/12">
      <div className="aspect-w-1 aspect-h-1 bg-gray-100 relative">
        <Image
          alt={props.caption}
          layout="fill" src={props.src}
          objectFit={'contain'}
          sizes="(max-width: 768px) 100vw, 30vw"
        ></Image>
      </div>
      <figcaption><p className="font-title m-0">{props.caption}</p></figcaption>
    </figure>
  </div>
)

const components = {
  CustomImage: CustomImage
}

export const ArticleBody: React.FC<ArticleBodyProps> = (
  props: ArticleBodyProps
): JSX.Element => {
  const createdTimeText = Utilities.TimestampToText(props.article.createdAt);
  const iconSrc = Utilities.GetArticleIconSrc(props.article.type);
  return (
    <div className="w-11/12 md:w-full py-10 lg:py-36 mx-auto">
      <div className="flex flex-col space-y-6">
        <Link href="/">
          <div className="flex items-center md:space-x-3 space-x-2 cursor-pointer">
            <div className="md:w-5 w-3 flex items-center">
              <Image
                src="/icons/back-icon.svg"
                height="1000"
                width="1000"
              ></Image>
            </div>
            <p className="m-0 font-title text-xs md:text-base">Quay về</p>
          </div>
        </Link>

        <div className="flex flex-col">
          <div className="inline-block">
            <div className="xl:w-20 lg:w-16 md:w-14 w-14 mt-1 flex-none">
              <Image src={iconSrc} height="1000" width="1000"></Image>
            </div>
          </div>{" "}
          <p className="m-0 text-gray-400">{createdTimeText}</p>

          <h1 className="mt-0">
            {props.article.title}
          </h1>
        </div>
      </div>
      <MDXRemote {...(props.article.mdxSource as MDXRemoteSerializeResult)} components={components} />
    </div>
  );
};
