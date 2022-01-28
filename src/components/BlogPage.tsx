import * as React from 'react';

const blogPageClassName = 'BlogPage';

interface BlogText {
  text: string;
}

interface BlogURL {
  text: string;
  targetURL: string;
}

interface BlogImage {
  filePath: string;
  captionText?: string;
  altText?: string;
}

enum BlogContentType {
  Text,
  URL,
  Image,
}

type BlogContentItem = {
  type: BlogContentType;
  content: BlogText | BlogURL | BlogImage;
};

interface BlogPageProps {
  contents: BlogContentItem[];
}

function BlogPage(props: BlogPageProps) {
  return <div className={blogPageClassName}>Part 1</div>;
}

export { BlogPage, BlogPageProps, BlogContentType };
