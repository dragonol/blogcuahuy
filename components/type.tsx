import { MDXRemoteSerializeResult } from "next-mdx-remote";

export interface Article extends ArticleMetadata {
  content: string;
  mdxSource: MDXRemoteSerializeResult;
}

export interface ArticleMetadata {
  title: string;
  createdAt: number;
  fileName: string;
}
