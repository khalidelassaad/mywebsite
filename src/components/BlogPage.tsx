import * as React from 'react';
import ReactMarkdown from 'react-markdown';

const blogPageClassName = 'BlogPage';

interface BlogPageProps {
  markdownSource: string;
}

function BlogPage(props: BlogPageProps): JSX.Element {
  const source = props.markdownSource;
  return (
    <div className={blogPageClassName}>
      <ReactMarkdown {...{ children: source }} />
    </div>
  );
}

export { BlogPage, BlogPageProps };
