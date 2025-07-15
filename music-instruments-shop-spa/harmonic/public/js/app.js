document.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]));
  }
  updateCartCounter();
});

function updateCartCounter() {
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const counter = document.getElementById('cart-counter');
  if (counter) {
    counter.textContent = totalItems;
    counter.style.display = totalItems > 0 ? 'inline-block' : 'none';
  }
}

function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function updateCart(newCart) {
  localStorage.setItem('cart', JSON.stringify(newCart));
  updateCartCounter();
  if (location.pathname === '/cart') {
    renderCartPage();
  }
}

function addToCart(product) {
  const cart = getCart();
  const existingItem = cart.find(item => item.id === product.id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url || '/img/placeholder.jpg',
      quantity: 1
    });
  }
  updateCart(cart);
}

async function initCatalogPage() {
  const app = document.getElementById('app');
  app.innerHTML = '<div class="loader"></div>';
  try {
    const response = await fetch('/api/products');
    if (!response.ok) throw new Error('Ошибка загрузки');
    const products = await response.json();
    console.log('Получены товары:', products);
    let html = `
      <section>
        <h2 style="text-align: center;">Наш каталог</h2>
        <div class="cards">
    `;
    products.forEach(product => {
      html += `
        <div class="card" data-id="${product.id}">
          <img src="${product.image_url}" alt="${product.name}" loading="lazy">
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <p class="price">$${product.price}</p>
          <button>В корзину</button>
        </div>
      `;
    });
    html += `</div></section>`;
    app.innerHTML = html;
    
    document.querySelectorAll('.card button').forEach(button => {
      button.addEventListener('click', function(e) {
        const card = e.target.closest('.card');
        const productId = parseInt(card.dataset.id);
        const product = products.find(p => p.id === productId);
        
        if (!product) {
          console.error('Товар не найден:', productId);
          return;
        }
        
        e.target.disabled = true;
        e.target.textContent = 'Добавляем...';
        
        setTimeout(() => {
          addToCart(product);
          e.target.textContent = 'Добавлено!';
          setTimeout(() => {
            e.target.textContent = 'В корзину';
            e.target.disabled = false;
          }, 1000);
        }, 300);
      });
    });
  } catch (error) {
    console.error('Ошибка:', error);
    app.innerHTML = `
      <section class="error-page">
        <h2>Ошибка</h2>
        <p>${error.message}</p>
        <a href="/catalog" data-link>Попробовать снова</a>
      </section>
    `;
  }
}

function renderCartPage() {
  const cart = getCart();
  console.log('Содержимое корзины:', cart);
  const app = document.getElementById('app');
  
  if (cart.length === 0) {
    app.innerHTML = `
      <section>
        <h2>Ваша корзина</h2>
        <p class="cart-empty">Ваша корзина пуста</p>
        <a href="/catalog" data-link class="card-button" style="display: inline-block; margin-top: 1rem;">Перейти в каталог</a>
      </section>
    `;
    return;
  }
  
  let total = 0;
  let cartHtml = `
    <section>
      <h2>Ваша корзина</h2>
      <div class="cart-items">
  `;
  
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    
    const imageUrl = item.image_url || '/img/placeholder.jpg';
    
    cartHtml += `
      <div class="cart-item">
        <img src="${imageUrl}" alt="${item.name}" 
          onerror="this.src='/img/placeholder.jpg';this.onerror=null;" 
          loading="lazy">
        <div class="cart-item-info">
          <h3>${item.name}</h3>
          <p>Цена: $${item.price}</p>
        </div>
        <div class="cart-item-actions">
          <button class="quantity-btn" data-id="${item.id}" data-action="decrease">−</button>
          <span class="quantity">${item.quantity}</span>
          <button class="quantity-btn" data-id="${item.id}" data-action="increase">+</button>
          <button class="remove-btn" data-id="${item.id}">×</button>
        </div>
        <div class="item-total">
          $${itemTotal.toFixed(2)}
        </div>
      </div>
    `;
  });
  
  cartHtml += `
      </div>
      <div class="cart-summary">
        <p class="cart-total">Итого: <strong>$${total.toFixed(2)}</strong></p>
        <button id="checkout-btn" class="checkout-btn">Оформить заказ</button>
      </div>
    </section>
  `;
  
  app.innerHTML = cartHtml;
  
  document.querySelectorAll('.quantity-btn').forEach(btn => {
    btn.addEventListener('click', handleQuantityChange);
  });

  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', handleRemoveItem);
  });

  document.getElementById('checkout-btn')?.addEventListener('click', handleCheckout);
}

function handleQuantityChange(e) {
  const id = parseInt(e.target.dataset.id);
  const action = e.target.dataset.action;
  const cart = getCart();
  
  const newCart = cart.map(item => {
    if (item.id === id) {
      const newQuantity = action === 'increase' 
        ? item.quantity + 1 
        : Math.max(1, item.quantity - 1);
      return { ...item, quantity: newQuantity };
    }
    return item;
  });
  
  updateCart(newCart);
}

function handleRemoveItem(e) {
  const id = parseInt(e.target.dataset.id);
  const cart = getCart().filter(item => item.id !== id);
  updateCart(cart);
}

function handleCheckout() {
  alert('Заказ успешно оформлен! Спасибо за покупку!');
  updateCart([]);
}

function initHomePage() {
  const slides = document.querySelectorAll('.slide');
  if (!slides.length) return;
  
  let currentIndex = 0;
  const totalSlides = slides.length;
  
  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  }
  
  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    showSlide(currentIndex);
  }
  
  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    showSlide(currentIndex);
  }
  
  document.querySelector('.next')?.addEventListener('click', nextSlide);
  document.querySelector('.prev')?.addEventListener('click', prevSlide);
  
  let interval = setInterval(nextSlide, 5000);
  const carousel = document.querySelector('.carousel');
  if (carousel) {
    carousel.addEventListener('mouseenter', () => clearInterval(interval));
    carousel.addEventListener('mouseleave', () => interval = setInterval(nextSlide, 5000));
  }
  
  showSlide(currentIndex);
}

function initAdminPage() {
  const form = document.getElementById('admin-form');
  if (!form) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = form.elements.username.value;
    const password = form.elements.password.value;
    
    if (username === 'admin' && password === 'admin123') {
      alert('Вход выполнен успешно!');
    } else {
      alert('Неверные учетные данные!');
    }
  });
}

window.initHomePage = initHomePage;
window.initCatalogPage = initCatalogPage;
window.renderCartPage = renderCartPage;
window.initAdminPage = initAdminPage;