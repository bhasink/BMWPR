import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const InfiniteScrollResponsive = ({ filtersLoadMoreDataFilter, hasMore }) => {
  const { ref, inView } = useInView({ triggerOnce: true });
  const [isHalfwayScrolled, setIsHalfwayScrolled] = useState(false);

  const handleScroll = () => {
    const halfwayScroll = window.scrollY + window.innerHeight / 1.5;
    const documentHeight = document.documentElement.scrollHeight;

    setIsHalfwayScrolled(halfwayScroll >= documentHeight / 2);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isHalfwayScrolled && hasMore) {
        filtersLoadMoreDataFilter();
    }
  }, [isHalfwayScrolled]);

  return <div ref={ref}>.</div>;
};

export default InfiniteScrollResponsive;