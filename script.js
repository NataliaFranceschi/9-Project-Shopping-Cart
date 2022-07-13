const ol = document.querySelector('.cart__items');

function total() {
  const items = document.querySelectorAll('.cart__item');
  const p = document.getElementsByTagName('p')[0];
  if (items) {
    p.innerHTML = Array.from(items).reduce((acc, item) => {
      const arr = item.innerText.split('|');
      return acc + Number(arr[2].match(/\d+/g).join('.'));
    }, 0);
  } 
}

function deleteItems() {
  const li = document.getElementsByClassName('cart__item');
  while (li[0] !== undefined) {
    li[0].remove();
    total();
    saveCartItems(ol.innerHTML);
  }
}

document.querySelector('.empty-cart').addEventListener('click', deleteItems);

const cartItemClickListener = (event) => {
  event.target.remove();
  saveCartItems(ol.innerHTML);
  total();
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

async function cartList({ target }) {
  const data = await fetchItem(getSkuFromProductItem(target.parentElement));
  const { id, title, price } = data;
    const obj = {
      sku: id,
      name: title,
      salePrice: price,
    };
    const li = createCartItemElement(obj);
    ol.appendChild(li);
    saveCartItems(ol.innerHTML);
    total();
  }

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  if (element === 'button') {
  e.addEventListener('click', cartList);
}
  return e;
};

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  
  return section;
};

const loading = () => {
  document.querySelector('.loading').remove();
};

async function productList() {
  const data = await fetchProducts('computador');
  loading(); 
  data.results.forEach(({ id, title, thumbnail }) => {
    const obj = {
      sku: id,
      name: title,
      image: thumbnail,
    };
    const section = createProductItemElement(obj);
    document.querySelector('.items').appendChild(section);
  });
}

function getItem() {
  ol.innerHTML = getSavedCartItems();
  const items = document.querySelectorAll('.cart__item');
  if (items) {
    Array.from(items).forEach((item) => item.addEventListener('click', cartItemClickListener));
  } 
}

window.onload = () => { productList(); getItem(); total(); };
