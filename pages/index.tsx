import type { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import Head from "next/head";

import * as Utilities from "./../utilities";
import * as Components from "./../components";

interface LandingPageProps {
  articleMetadatas: Components.Type.ArticleMetadata[];
}

const Landing: NextPage<LandingPageProps> = (props: LandingPageProps) => {
  return (
    <div className="">
      <Head>
        <title>blogcuahuy</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/images/Huy.png" />
      </Head>

      {/* <Components.LandingPage.NavigationBar /> */}

      <div className="prose sm:prose-sm md:prose lg:prose-lg xl:prose-lg mx-auto">
        <div className="w-11/12 mx-auto space-y-40">
          <Components.LandingPage.PersonalSection />
          <Components.LandingPage.ArticleSection
            articleMetadatas={props.articleMetadatas}
          />
          <Components.LandingPage.ContactSection />
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const articleMetadatas = await Utilities.LoadAllArticleMetadatas();

  return {
    props: {
      articleMetadatas,
    },
  };
};

export default Landing;
