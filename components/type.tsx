import { MDXRemoteSerializeResult } from "next-mdx-remote";

export interface Article extends ArticleMetadata {
  content: string;
  mdxSource?: MDXRemoteSerializeResult;
}

export interface ArticleMetadata {
  title: string;
  urlTitle: string;
  type: ArticleType;
  createdAt: number;
  fileName: string;
  image?: string;
}

export interface NavigationButtonOnclickProps {
  sectionType: LandingPageSectionType;
}

export interface NavigationButtonProps {
  sectionType: LandingPageSectionType;
  currentSectionType: LandingPageSectionType;
  iconSrc: string;
  onclickCallback: (props: NavigationButtonOnclickProps) => void;
}

export interface ArticleTitleProps {
  articleMetadata: ArticleMetadata;
}

export type LandingPageSectionType = string;
export const LandingPageSectionType_Personal: LandingPageSectionType =
  "personal_section";
export const LandingPageSectionType_Article: LandingPageSectionType =
  "article_section";
export const LandingPageSectionType_Contact: LandingPageSectionType =
  "contact_section";

export type ArticleType = string;
export const ArticleType_Thought: ArticleType = "thought";
export const ArticleType_Tech: ArticleType = "tech";
export const ArticleType_Music: ArticleType = "music";
