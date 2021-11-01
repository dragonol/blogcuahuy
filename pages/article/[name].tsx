import type { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import Head from "next/head";
import * as Utilities from "./../../utilities";
import * as Components from "./../../components";

interface ArticlePageProps {
  article: Components.Type.Article;
}

interface IParams extends ParsedUrlQuery {
  name: string;
}

const ArticlePage: NextPage<ArticlePageProps> = (props: ArticlePageProps) => {
  return (
    <div>
      <Head>
        <title>blogcuahuy</title>
        <link rel="icon" href="/icon.png" />
      </Head>

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
