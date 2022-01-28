import * as React from 'react';
import { BlogPage } from '../components/BlogPage';

interface HomeProps {}

function Home(props: HomeProps) {
  return <BlogPage contents={['Part 2']} />;
}

export default Home;
