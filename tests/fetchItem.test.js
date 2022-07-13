require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  test('fetchItem é uma função', () => {
    expect(typeof(fetchItem)).toEqual('function');
  })
  test('fetchItem chama a função fetch em algum momento', async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527');
    expect(fetch).toBeCalledTimes(1);
  })
  test('fetchItem executa o fetch no endpoint correto', async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527');
    const url = 'https://api.mercadolibre.com/items/MLB1615760527'
    expect(fetch).toBeCalledWith(url);
  })
  test('fetchItem retorna o mesmo que item', async () => {
    expect.assertions(1);
    expect(await fetchItem('MLB1615760527')).toEqual(item);
  })
  test("fetchItem quando chamada sem argumento, retorna uma mensagem de erro", async () => {
    try {
      await fetchItem();
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'));
    }
  })
});
