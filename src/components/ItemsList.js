import React, { useState, useEffect } from 'react';
import InfiniteScroll from './InfiniteScroll';
import { fetchItems } from '../services/itemService';
import LoadingSpinner from './LoadingSpinner'; // Import the LoadingSpinner component
const ItemsList = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null); // Add an error state
  const loadMore = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const data = await fetchItems(page);
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setItems([...items, ...data]);
        setPage(page + 1);
      }
    } catch (error) {
      setError(error); // Set the error state
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadMore();
  }, []);
  return (
    <div>
      <h1>Items List</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      {loading && <LoadingSpinner />} {/* Use the LoadingSpinner component */}
      {error && <p>Error: {error.message}</p>} {/* Display error message if there's an error */}
      {!loading && hasMore && <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />}
      {!loading && !hasMore && <p>No more items to load.</p>}
    </div>
  );
};
export default ItemsList;