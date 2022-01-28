import * as React from 'react';
import { BlogContentType, BlogPage } from '../components/BlogPage';

interface HomeProps {}

function Home(props: HomeProps) {
  return (
    <BlogPage
      contentItems={[
        {
          type: BlogContentType.Text,
          content: {
            text: 'Part 2 lorem ipsumorem ipsumorem ipsumorem ipsumorem ipsumorem ipsumorem ipsumorem ipsumorem ipsumorem ipsumorem ipsumorem ipsumorem ipsumorem ipsumorem ipsumorem ipsumorem ipsum',
          },
        },
        {
          type: BlogContentType.URL,
          content: { text: 'Part 3', targetURL: 'http://google.com' },
        },
        {
          type: BlogContentType.Image,
          content: {
            filePath: '../kelogo.png',
            altText: 'the team',
            captionText: 'this is a caption',
          },
        },
      ]}
    />
  );
}

export default Home;
