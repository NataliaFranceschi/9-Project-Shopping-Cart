const fetchProducts = async (item) => {
  if (item === undefined) {
    throw new Error('You must provide an url');
  }
  try {
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${item}`;
    const request = await fetch(url);
    const json = await request.json();
    return json;
  } catch (error) {
    return error.message; 
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
