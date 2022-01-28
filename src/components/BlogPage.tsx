import * as React from 'react';

const blogPageClassName = 'BlogPage';
const blogTextClassName = 'BlogText';
const blogURLClassName = 'BlogURL';
const blogImageClassName = 'BlogImage';
const blogImageCaptionClassName = 'BlogImage';

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

type BlogContentItem =
  | {
      type: BlogContentType.Text;
      content: BlogText;
    }
  | {
      type: BlogContentType.URL;
      content: BlogURL;
    }
  | {
      type: BlogContentType.Image;
      content: BlogImage;
    };

interface BlogPageProps {
  contents: BlogContentItem[];
}

function _blogTextJSX(content: BlogText, key: number): JSX.Element {
  return (
    <div className={blogTextClassName} key={key}>
      {content.text}
    </div>
  );
}

function _blogURLJSX(content: BlogURL, key: number): JSX.Element {
  return (
    <div className={blogURLClassName} key={key}>
      <a href={content.targetURL}>{content.text}</a>
    </div>
  );
}

function _blogImageJSX(content: BlogImage, key: number): JSX.Element {
  return (
    <div className={blogImageClassName} key={key}>
      <img src={content.filePath} alt={content.altText} />
      content.caption ?{' '}
      <div className={blogImageCaptionClassName}>
        {content.captionText}
      </div> : <></>
    </div>
  );
}

function BlogPage(props: BlogPageProps): JSX.Element {
  return <div className={blogPageClassName}>Part 1</div>;
}

export { BlogPage, BlogPageProps, BlogContentType };
