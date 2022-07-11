require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  test('fetchProducts é uma função', () => {
    expect(typeof(fetchProducts)).toEqual('function')
  })
  test('fetchProducts chama a função fetch em algum momento', async () => {
    expect.assertions(1);
    await fetchProducts('computador')
    expect(fetch).toBeCalledTimes(1);
  })
  test('fetchProducts executa o fetch no endpoint correto', async () => {
    expect.assertions(1);
    await fetchProducts('computador')
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador'
    expect(fetch).toBeCalledWith(url);
  })
  test('fetchProducts retorna o mesmo que computadorSearch', async () => {
    expect.assertions(1);
    expect(await fetchProducts('computador')).toEqual(computadorSearch)
  })
  test("fetchProducts quando chamada sem argumento, retorna uma mensagem de erro", async () => {
    expect.assertions(1);
    try {
      await fetchProducts();
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'));
    }
})})