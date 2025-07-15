document.addEventListener('DOMContentLoaded', () => {
    const logoutLinks = document.querySelectorAll('a[href*="logout"]');
    logoutLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            fetch('/admin-logout')
                .then(() => window.location.href = '/admin-login');
        });
    });
});
fetch('/api/products.php')
    .then(response => response.json())
    .then(products => updateCatalog(products));

function updateCatalog(products) {
    if (window.location.pathname === '/catalog') {
    initCatalogPage();
    }
}