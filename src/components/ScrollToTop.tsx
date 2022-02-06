import * as React from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { blogPageClassName } from './BlogPage';

const ScrollToTop = (props: { children: any }) => {
  const location = useLocation();
  useEffect(() => {
    const blogPage = document.getElementsByClassName(blogPageClassName)[0];
    if (blogPage != undefined) {
      blogPage.scrollTo(0, 0);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return <>{props.children}</>;
};

export default ScrollToTop;
