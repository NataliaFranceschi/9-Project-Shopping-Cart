const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  test('saveCartItems chama o método localStorage.setItem', () => {
    const parametro = '<ol><li>Item</li></ol>'
    saveCartItems(parametro);
    expect(localStorage.setItem).toBeCalled();
  })
  test('saveCartItems(argumento) chama o método localStorage.setItem("cartItems", parametro)', () => {
    const parametro = '<ol><li>Item</li></ol>'
    saveCartItems(parametro);
    expect(localStorage.setItem).toHaveBeenCalledWith("cartItems", parametro);
  })
});
