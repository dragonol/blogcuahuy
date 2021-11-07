import type { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import Head from "next/head";
import { useEffect, useState } from "react";
import * as Utilities from "./../../utilities";
import * as Components from "./../../components";
import { serialize } from "next-mdx-remote/serialize";

interface ArticlePageProps {
  article: Components.Type.Article;
}

interface IParams extends ParsedUrlQuery {
  name: string;
}

const ArticlePage: NextPage<ArticlePageProps> = (props: ArticlePageProps) => {
  const [baseURL, setBaseURL] = useState("");
  useEffect(() => {
    console.log(window.location.hostname);
    setBaseURL(window.location.hostname);
  }, []);

  return (
    <div>
      <Components.Custom.CustomHead
        title={props.article.title}
        description={"Blog này của GenZ"}
        date={new Date(props.article.createdAt * 1000).toISOString()}
        image={
          baseURL +
          "/api/get_preview_thumbnail/?nameOnURL=" +
          props.article.urlTitle
        }
        type={"article"}
      />

      <Components.ArticlePage.ArticleBody article={props.article} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { name } = context.params as IParams;
  const article = await Utilities.LoadArticle(name as string);

  if (!article) {
    return {
      notFound: true,
    };
  }

  const mdxSource = await serialize(article.content);
  article.mdxSource = mdxSource;

  return {
    props: {
      article,
    }, // will be passed to the page component as props
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};

export default ArticlePage;
