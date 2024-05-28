export const fetchItems = async (page) => {
    const response = await fetch(
      `https://phpstack-709751-4576550.cloudwaysapps.com/api/listing?page=${page}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch items');
    }
    return response.json();
};