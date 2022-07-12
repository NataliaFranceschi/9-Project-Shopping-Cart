const cartItemClickListener = (event) => {
  //apagar
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

async function cartList(objId) {
  const data = await fetchItem(objId);
  const { id, title, price } = data;
    const obj = {
      sku: id,
      name: title,
      salePrice: price,
    };
    const li = createCartItemElement(obj);
    document.querySelector('.cart__items').appendChild(li);
  }

function getId({ target }) {
  const id = target.parentElement.firstChild.innerText;
  cartList(id);
}

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  if (element === 'button') {
  e.addEventListener('click', getId);
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

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

async function productList() {
  const data = await fetchProducts('computador');
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

window.onload = () => { productList(); };
