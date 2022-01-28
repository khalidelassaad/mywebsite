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

type BlogContentItem = BlogText | BlogURL | BlogImage;

interface BlogPageProps {
  contents: any[];
}

function BlogPage(props: BlogPageProps) {}

export { BlogPage, BlogPageProps };
