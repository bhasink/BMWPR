import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const InfiniteScroll = ({ filtersLoadMoreData, hasMore }) => {

//     const { ref, inView } = useInView();
//     const [hasBeenInView, setHasBeenInView] = useState(false);
  

//   useEffect(() => {
//     console.log('inView changed:', inView);
//     if (inView) {
//       // Your logic here
//     }
//   }, [inView]);


//   useEffect(() => {
//     if (inView && !hasBeenInView) {
//       setHasBeenInView(true);
//       filtersLoadMoreData();
//     }
//   }, [inView, hasBeenInView]);


//   return <div ref={ref} />;


const { ref, inView } = useInView({ triggerOnce: true });
  const [isUserInteracted, setIsUserInteracted] = useState(false);

  const handleUserScroll = () => {
    setIsUserInteracted(true);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleUserScroll);

    return () => {
      window.removeEventListener('scroll', handleUserScroll);
    };
  }, []);

  useEffect(() => {
    if (isUserInteracted && inView && hasMore) {
      // Perform actions that should happen when the element is in view
      console.log('Element is in view');

      filtersLoadMoreData();

    }
  }, [inView, isUserInteracted]);

  return <div ref={isUserInteracted ? ref : null}>.</div>;

};
export default InfiniteScroll;

