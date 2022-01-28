import * as React from 'react';
import { BlogPage } from '../components/BlogPage';
import HomeMarkdown from './markdown/Home.md';

interface HomeProps {}

function Home(props: HomeProps) {
  const [markdownSource, setMarkdownSource] = React.useState('');

  React.useEffect(() => {
    fetch(HomeMarkdown)
      .then((res) => res.text())
      .then((text) => {
        setMarkdownSource(text);
      });
  }, []);
  return <BlogPage markdownSource={markdownSource} />;
}

export default Home;
