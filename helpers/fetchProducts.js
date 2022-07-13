const fetchProducts = async (item) => {
  try {
    if (item === undefined) {
      throw new Error('You must provide an url');
    }
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${item}`;
    const request = await fetch(url);
    const json = await request.json();
    return json;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
