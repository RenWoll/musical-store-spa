const routes = {
  '/': 'home',
  '/catalog': 'catalog',
  '/cart': 'cart',
  '/404': '404'
};

const loadPage = async (route) => {
  if (route === '/admin' || route === '/admin-login') {
    window.location.href = route;
    return;
  }

  try {
    document.getElementById('app').innerHTML = '<div class="loader"></div>';
    
    const page = routes[route] || '404';
    const response = await fetch(`pages/${page}.html`);
    
    if (!response.ok) throw new Error('Страница не найдена');
    
    const html = await response.text();
    document.getElementById('app').innerHTML = html;
    
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
      if (img.complete) img.classList.add('loaded');
      else img.onload = () => img.classList.add('loaded');
    });
    
    updateCartCounter();
    
    if (page === 'home') initHomePage();
    if (page === 'catalog') initCatalogPage();
    if (page === 'cart') renderCartPage();
    
  } catch (error) {
    document.getElementById('app').innerHTML = `
      <section class="error-page">
        <h2>Ошибка</h2>
        <p>${error.message}</p>
        <a href="/" data-link>На главную</a>
      </section>
    `;
  }
};

function navigate(url) {
  history.pushState(null, null, url);
  loadPage(url);
}

window.addEventListener('popstate', () => {
  loadPage(location.pathname);
});

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', (e) => {
    if (e.target.matches('[data-link]')) {
      e.preventDefault();
      navigate(e.target.getAttribute('href'));
    }
  });

  loadPage(location.pathname);
});

function updateCartCounter() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const counter = document.getElementById('cart-counter');
  if (counter) {
    counter.textContent = totalItems;
    counter.style.display = totalItems > 0 ? 'inline-block' : 'none';
  }
}