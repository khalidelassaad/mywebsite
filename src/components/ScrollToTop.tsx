import * as React from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = (props: { children: any }) => {
  const location = useLocation();
  useEffect(() => {
    console.log('scroll to top');
    window.scrollTo(0, 0);
  }, [location]);

  return <>{props.children}</>;
};

export default ScrollToTop;
