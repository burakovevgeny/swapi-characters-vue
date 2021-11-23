const getIdAndQuery = (url: string): { id: string; query: string } => {
  const [id, query] = url.split('/').filter(Boolean).reverse();
  return { id, query };
};

export { getIdAndQuery };
