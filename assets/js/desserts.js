let products = [];
let basket = [];

function createItemHtml(product) {
  return `<div class="dessert-item">
    <img src="${product.image.desktop}" alt="${product.name}">
    <button data-id="${product.id}">Add to cart</button>
    <h6>${product.category}</h6>
    <h4>${product.name}</h4>
    <h5>$${product.price}</h5>
  </div>`;
}

function handleAddBtnClick() {
  addToBasket(Number(this.dataset.id));
}

function addToBasket(productId) {
  const basketItem = basket.find(x => x.productId === productId);

  if(basketItem) {
    basketItem.quantity++;
  } else {
    const product = products.find(x => x.id === productId);
    basket.push(
      {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1
      }
    );
  }
  
  renderBasket();
}

function renderBasket() {
  basketList.innerHTML = basket.map(x => `<li>${x.name} <br>${x.quantity}x $${x.price} <strong>$${x.quantity * x.price}</strong> <span data-productid="${x.productId}" class="deleteFromBasket">❌</span></li>`).join('');

  document.querySelectorAll('.deleteFromBasket').forEach(x => x.addEventListener('click', handleDeleteBtn));

  totalValue.innerHTML = '$' + basket.reduce((currentValue, item) => currentValue + (item.quantity * item.price), 0);

  cartTotal.innerHTML = '(' + basket.reduce(function(currentValue, item) {
    return currentValue + item.quantity;
  }, 0) + ')';
}

function handleDeleteBtn() {
  basket = basket.filter(x => x.productId !== Number(this.dataset.productid));
  renderBasket();
}

fetch('https://dummyjson.czaylabs.com.tr/api/products')
  .then(res => res.json())
  .then(res => {
    products = res.data;
    dessertList.innerHTML = products.map(product => createItemHtml(product)).join('');
    document.querySelectorAll('.dessert-item button').forEach(x => x.addEventListener('click', handleAddBtnClick));
  });