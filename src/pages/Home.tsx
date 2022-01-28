import * as React from 'react';
import { BlogContentType, BlogPage } from '../components/BlogPage';

interface HomeProps {}

function Home(props: HomeProps) {
  return (
    <BlogPage
      contents={[
        { type: BlogContentType.Text, content: { text: 'Part 2' } },
        {
          type: BlogContentType.URL,
          content: { text: 'Part 3', targetURL: 'http://google.com' },
        },
      ]}
    />
  );
}

export default Home;
