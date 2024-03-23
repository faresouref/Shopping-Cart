// Selectors
const cartCount = document.querySelector('.cart-count');
const asideBar = document.querySelector('aside');
const closeIcon = document.querySelector('.fa-x');
const parentBoxs = document.querySelector('.parent-boxs');
const parentCartBoxs = document.querySelector('tbody');

// Event listeners
cartCount.addEventListener('click', toggleAsideBar);
closeIcon.addEventListener('click', toggleAsideBar);
parentBoxs.addEventListener('click', addToCart);

// State variables
let cartItems = [];

// Array of items
const items = [
  { id: 0, title: "Bag 1", price: 15, img: "img/main7.jpg", amount: 1 },
  { id: 1, title: "Bag 2", price: 25, img: "img/main8.jpg", amount: 1 },
  { id: 2, title: "Bag 3", price: 10, img: "img/main9.jpg", amount: 1 },
  { id: 3, title: "Bag 4", price: 30, img: "img/main10.jpg", amount: 1 },
  { id: 4, title: "Bag 5", price: 100, img: "img/main11.jpg", amount: 1 },
  { id: 5, title: "Bag 6", price: 55, img: "img/main12.jpg", amount: 1 },
  { id: 6, title: "Bag 6", price: 55, img: "img/main12.jpg", amount: 1 },
  { id: 7, title: "Bag 5", price: 100, img: "img/main11.jpg", amount: 1 },
  { id: 8, title: "Bag 1", price: 15, img: "img/main7.jpg", amount: 1 },
  { id: 9, title: "Bag 2", price: 25, img: "img/main8.jpg", amount: 1 },
  { id: 10, title: "Bag 3", price: 10, img: "img/main9.jpg", amount: 1 },
  { id: 11, title: "Bag 4", price: 30, img: "img/main10.jpg", amount: 1 }
];

// Functions
function toggleAsideBar() {
  asideBar.classList.toggle('open');
}

function renderItems() {
  const itemsHTML = items.map(item => `
    <div class="box">
      <img src="${item.img}">
      <h4 class="product">${item.title}</h4>
      <h5 class="price">${item.price}.00</h5>
      <div class="cart" data-id="${item.id}">
        <a href="#"><i class="fa-solid fa-cart-shopping"></i></a>
      </div>
    </div>
  `).join('');
  parentBoxs.innerHTML = itemsHTML;
}

function renderCartItems() {
  const cartItemsHTML = cartItems.map(item => `
    <tr>
      <td>${item.id}</td>
      <td><img src="${item.img}" alt="${item.title}"></td>
      <td>${item.title}</td>
      <td>
        <span class="btn" onclick="updateCartItem('increase','${item.id}')">+</span>
        <span class="amount">${item.amount}</span>
        <span class="btn" onclick="updateCartItem('decrease','${item.id}')">-</span>
      </td>
      <td>${item.price}.00$</td>
      <td class="all-price">${item.price * item.amount }.00$</td>
      <td> <button onclick="deleteCartItem(${item.id})">Delete</button> </td>
    </tr>
  `).join('');
  parentCartBoxs.innerHTML = cartItemsHTML;
  cartCount.textContent = cartItems.length;
}

function addToCart(event) {
  const cartBtn = event.target.closest('.cart');
  if (!cartBtn) return;

  const id = parseInt(cartBtn.dataset.id);
  const itemToAdd = items.find(item => item.id === id);
  if (!itemToAdd) return;

  if (cartItems.some(item => item.id === id)) {
    alert('Product already exists in the cart.');
  } else {
    cartItems.push({...itemToAdd});
  }

  renderCartItems();
}

function updateCartItem(action, id) {
  const itemToUpdate = cartItems.find(item => item.id === parseInt(id));
  if (!itemToUpdate) return;

  if (action === 'increase') {
    itemToUpdate.amount++;
  } else {
    if (itemToUpdate.amount > 1) {
      itemToUpdate.amount--;
    } else {
      alert("Amount must be 1 or more.");
    }
  }

  renderCartItems();
}

function deleteCartItem(id) {
  cartItems = cartItems.filter(item => item.id !== id);
  renderCartItems();
}

// Initial rendering
renderItems();
renderCartItems();