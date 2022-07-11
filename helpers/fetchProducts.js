const fetchProducts = async (item) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${item}`;
  const request = await fetch(url);
  const json = await request.json();
  return json.results;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
