const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  test('getSavedCartItems chama o método localStorage.getItem', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toBeCalled();
  })
  test('getSavedCartItems chama o método localStorage.getItem("cartItems")', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalledWith("cartItems");
  })
});
