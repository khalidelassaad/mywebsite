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
        console.log(props.importedMarkdownObject);
        return result.text();
      })
      .then((markdownSourceFileContents) => {
        setMarkdownSourceCode(markdownSourceFileContents);
      });
  }, []);

  return (
    <div className={blogPageClassName}>
      <ReactMarkdown {...{ children: markdownSourceCode }} />
    </div>
  );
}

export { BlogPage, BlogPageProps };
