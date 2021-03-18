const products = document.getElementById("products");

const totalPrice = document.getElementById("totalPrice");
const totalProducts = document.getElementById("totalProducts");

const cartBtn = document.getElementById("cartBtn");
const cart = document.getElementById("cart");
const totalCartPrice = document.getElementById("total");

const modal = document.getElementById("myModal");
const modalExit = document.getElementsByClassName("close")[0];

const catsSel = document.getElementById("cats");
const priceSel = document.getElementById("price");

const cartList = [];

document.addEventListener("change", handleChange);
document.addEventListener("click", showCart);

function render(data) {
  products.innerHTML = data
    .map(
      (p) => `<div class="product-box__item">
      <h3 class="product-box__title">${p.name}</h3>
        <div class="product-box__img">
          <img class="img-fluid" src="i/${p.im}" />
        </div>
        <div class="product-box__meta">
          <p>Цена: ${p.price}</p> 
        <div class="qty">
          <input class="qty__item" type="number" min="1" id="${p.id}"/> Кол
        </div>
          <button onclick="addToCart(${p.id})" class="product-box__btn" id="btn"> Добавить </button>
        </div>
      </div>`
    )
    .join("");
}

render(defaultData.products);

function handleChange(e) {
  const { target } = e;
  if (target.id !== "cats" && target.id !== "price") {
    return;
  }
  const selectedCat = parseInt(catsSel.value);
  const selectedPrice = parseInt(priceSel.value);

  const data = defaultData.products.filter((item) => {
    return (
      (selectedCat === 0 || item.cid === selectedCat) &&
      (selectedPrice === 0 || item.price <= selectedPrice)
    );
  });
  render(data);
}

function addToCart(id) {
  const item = defaultData.products.find((el) => el.id === id);
  const value = +document.getElementById(id).value;
  const repeateItem = cartList.find((el) => el.id === id);

  if (repeateItem) {
    repeateItem.count += value;
  } else cartList.push({ count: value, ...item });

  getTotal();
}

function getTotal() {
  let totalP = 0;
  let totalC = 0;

  if (cartList.length) {
    for (const el of cartList) {
      totalP += el.price * el.count;
      totalC += el.count;
    }
  }
  totalPrice.innerText = totalP;
  totalProducts.innerText = totalC;
}

function showCart(e) {
  const { target } = e;
  if (target.id !== "cartBtn") {
    return;
  }

  renderCart(cartList);

  modal.style.display = "block";
  modalExit.onclick = function () {
    modal.style.display = "none";
  };
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

function renderCart() {
  if (cartList.length === 0) {
    cart.innerText = "Корзина пуста";
  } else {
    cart.innerHTML = cartList
      .map(
        (c) =>
          `<ul>
            <li class="list-item"> 
              <p class="item-title">${c.name}</p> 
              <p class="item-price">${c.count} шт x ${c.price} грн = ${
            c.count * c.price
          }грн</p>
              <button class='item-btn' onclick="deleteFromCart(${
                c.id
              })">X</button>      
            </li>
          </ul>`
      )
      .join("");
  }
}

function deleteFromCart(id) {
  const res = cartList.find((el) => el.id === id);
  cartList.splice(res, 1);

  renderCart();
  getTotal();
}

function validationForm() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();

  if (name == "") {
    alert("Необходимо ввести имя");
    return false;
  }
  if (email == "") {
    alert("Необходимо ввести email");
    return false;
  }
  if (name !== "" && email !== "") {
    alert("Спасибо за заказ");
  }
}
