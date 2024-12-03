const cart = [];
const cartButton = document.getElementById('cart-button');
const cartCount = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const closeCart = document.getElementById('close-cart');
const cartItems = document.getElementById('cart-items');

// Actualiza el contador del carrito
const updateCartCount = () => {
  cartCount.textContent = cart.length;
};

// Añade un producto al carrito
const addToCart = (id, name, price) => {
  const product = cart.find(item => item.id === id);
  if (product) {
    product.quantity++;
  } else {
    cart.push({ id, name, price, quantity: 1 });
  }
  updateCartCount();
  renderCart();
};

// Elimina un producto del carrito
const removeFromCart = (id) => {
  const index = cart.findIndex(item => item.id === id);
  if (index !== -1) {
    cart.splice(index, 1);
  }
  updateCartCount();
  renderCart();
};

// Renderiza los productos en el carrito
const renderCart = () => {
  cartItems.innerHTML = '';
  if (cart.length === 0) {
    cartItems.innerHTML = '<li class="text-center text-gray-500">El carrito está vacío.</li>';
    return;
  }
  cart.forEach(item => {
    const li = document.createElement('li');
    li.className = 'flex justify-between items-center';
    li.innerHTML = `
      <span>${item.name} x ${item.quantity}</span>
      <div class="flex items-center space-x-2">
        <span class="text-red-600 font-bold">$${(item.price * item.quantity).toFixed(2)}</span>
        <button class="remove-from-cart text-red-600 hover:text-red-800" data-id="${item.id}">
          <i class="bx bx-trash text-xl"></i>
        </button>
      </div>
    `;
    cartItems.appendChild(li);
  });

  // Configura los botones de eliminar
  document.querySelectorAll('.remove-from-cart').forEach(button => {
    button.addEventListener('click', () => {
      const id = parseInt(button.dataset.id);
      removeFromCart(id);
    });
  });
};

// Muestra el modal del carrito
cartButton.addEventListener('click', () => {
  cartModal.classList.remove('hidden');
});

// Cierra el modal del carrito
closeCart.addEventListener('click', () => {
  cartModal.classList.add('hidden');
});

// Configura los botones de añadir al carrito
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const id = parseInt(button.dataset.id);
    const name = button.dataset.name;
    const price = parseFloat(button.dataset.price);
    addToCart(id, name, price);
  });
});
