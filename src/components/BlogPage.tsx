import * as React from 'react';
import ReactMarkdown from 'react-markdown';

const blogPageClassName = 'BlogPage';

interface BlogPageProps {
  importedMarkdownObject: string;
}

function BlogPage(props: BlogPageProps): JSX.Element {
  const [markdownSourceCode, setMarkdownSourceCode] = React.useState('');

  React.useEffect(() => {
    fetch(props.importedMarkdownObject)
      .then((result) => {
        return result.text();
      })
      .then((markdownSourceFileContents) => {
        setMarkdownSourceCode(markdownSourceFileContents);
      });
  }, [props.importedMarkdownObject]);

  return (
    <div className={blogPageClassName}>
      <ReactMarkdown {...{ children: markdownSourceCode }} />
    </div>
  );
}

export { BlogPage, BlogPageProps, blogPageClassName };
