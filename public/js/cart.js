let cart = [];

function addToCart(item) {
  const existingItem = cart.find((cartItem) => cartItem.name === item.name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  updateCartDisplay();
}

function updateCartDisplay() {
  const cartContent = document.getElementById("cart-content");
  const cartTotalPrice = document.getElementById("cart-total-price");

  cartContent.innerHTML = "";
  let totalPrice = 0;

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    totalPrice += itemTotal;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-img">
      <div class="cart-item-details">
        <h3>${item.name}</h3>
        <p>$${item.price.toFixed(2)} x ${item.quantity} = $${itemTotal.toFixed(
      2
    )}</p>
        <div class="cart-item-quantity">
          <button class="quantity-btn minus" data-name="${item.name}">-</button>
          <span>${item.quantity}</span>
          <button class="quantity-btn plus" data-name="${item.name}">+</button>
        </div>
      </div>
      <button class="remove-btn" data-name="${item.name}">Remove</button>
    `;

    cartContent.appendChild(cartItem);
  });

  cartTotalPrice.textContent = `$${totalPrice.toFixed(2)}`;
}

function updateItemQuantity(itemName, change) {
  const item = cart.find((cartItem) => cartItem.name === itemName);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(itemName);
    } else {
      updateCartDisplay();
    }
  }
}

function removeFromCart(itemName) {
  cart = cart.filter((item) => item.name !== itemName);
  updateCartDisplay();
}

// Écouteur d'événements pour l'icône du panier
document.querySelector(".cart_link").addEventListener("click", function (e) {
  e.preventDefault();
  const item = {
    name: "Delicious Pizza", // Remplacez par le nom du produit que vous ajoutez
    price: 20, // Remplacez par le prix du produit
    image: "url_de_l_image", // Remplacez par l'URL de l'image réelle
  };
  addToCart(item);
});

// Écouteurs d'événements pour les boutons de quantité
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("quantity-btn")) {
    const itemName = e.target.getAttribute("data-name");
    const change = e.target.classList.contains("plus") ? 1 : -1;
    updateItemQuantity(itemName, change);
  } else if (e.target.classList.contains("remove-btn")) {
    const itemName = e.target.getAttribute("data-name");
    removeFromCart(itemName);
  }
});

// Toggle cart visibility
document.querySelector(".cart_link").addEventListener("click", function (e) {
  e.preventDefault();
  document.querySelector(".cart-container").classList.toggle("active");
});

document.getElementById("close-cart").addEventListener("click", function () {
  document.querySelector(".cart-container").classList.remove("active");
});

// Initialize cart display
updateCartDisplay();
