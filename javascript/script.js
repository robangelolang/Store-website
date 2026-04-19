function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
  const cart = getCart();
  let totalQuantity = 0;
  let totalPrice = 0;

  for (let i = 0; i < cart.length; i++) {
    totalQuantity += cart[i].quantity;
    totalPrice += cart[i].quantity * cart[i].price;
  }

  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cart-total");

  if (cartCount) {
    cartCount.textContent = totalQuantity;
  }

  if (cartTotal) {
    cartTotal.textContent = totalPrice;
  }
}

function addToCart(productName, price, quantityInputId) {
  const quantityInput = document.getElementById(quantityInputId);
  const quantity = parseInt(quantityInput.value);

  if (isNaN(quantity) || quantity < 1) {
    alert("Please enter a valid quantity.");
    return;
  }

  const cart = getCart();
  const existingProduct = cart.find(item => item.name === productName);

  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cart.push({
      name: productName,
      price: price,
      quantity: quantity
    });
  }

  saveCart(cart);
  updateCartCount();
  alert(productName + " added to cart.");
}

function loadReservationPage() {
  const cart = getCart();
  const cartItems = document.getElementById("cart-items");
  const orderList = document.getElementById("order-list");
  const totalQuantityInput = document.getElementById("total-quantity");
  const totalQuantityText = document.getElementById("total-quantity-text");
  const totalPriceInput = document.getElementById("total-price");
  const totalPriceText = document.getElementById("total-price-text");

  if (!cartItems || !orderList || !totalQuantityInput || !totalQuantityText) {
    return;
  }

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>No products added yet.</p>";
    orderList.value = "";
    totalQuantityInput.value = "0";
    totalQuantityText.textContent = "0";

    if (totalPriceText) {
      totalPriceText.textContent = "0";
    }

    if (totalPriceInput) {
      totalPriceInput.value = "0";
    }

    return;
  }

  let summaryText = "";
  let summaryHtml = "";
  let totalQuantity = 0;
  let totalPrice = 0;

  for (let i = 0; i < cart.length; i++) {
    summaryText += cart[i].name + " - " + cart[i].quantity + "\n";
    summaryHtml += "<p>" + cart[i].name + " - " + cart[i].quantity + "</p>";
    totalQuantity += cart[i].quantity;
    totalPrice += cart[i].quantity * cart[i].price;
  }

  cartItems.innerHTML = summaryHtml;
  orderList.value = summaryText.trim();
  totalQuantityInput.value = totalQuantity;
  totalQuantityText.textContent = totalQuantity;

  if (totalPriceText) {
    totalPriceText.textContent = totalPrice;
  }

  if (totalPriceInput) {
    totalPriceInput.value = totalPrice;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  updateCartCount();
  loadReservationPage();

  const form = document.getElementById("reservation-form");
  const successMessage = document.getElementById("success-message");

  if (form) {
    form.addEventListener("submit", function () {
      setTimeout(function () {
        form.reset();
        localStorage.removeItem("cart");

        const cartItems = document.getElementById("cart-items");
        const orderList = document.getElementById("order-list");
        const totalQuantityInput = document.getElementById("total-quantity");
        const totalQuantityText = document.getElementById("total-quantity-text");
        const totalPriceInput = document.getElementById("total-price");
        const totalPriceText = document.getElementById("total-price-text");

        if (cartItems) {
          cartItems.innerHTML = "<p>No products added yet.</p>";
        }

        if (orderList) {
          orderList.value = "";
        }

        if (totalQuantityInput) {
          totalQuantityInput.value = "0";
        }

        if (totalQuantityText) {
          totalQuantityText.textContent = "0";
        }

        if (totalPriceInput) {
          totalPriceInput.value = "0";
        }

        if (totalPriceText) {
          totalPriceText.textContent = "0";
        }

        if (successMessage) {
          successMessage.style.display = "block";
        }

        updateCartCount();
      }, 1000);
    });
  }
});