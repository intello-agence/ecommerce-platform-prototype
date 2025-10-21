// public/prototypes/ecommerce-platform/app.js
// E-Commerce Platform Premium — Intello

(() => {
  'use strict';

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));

  /* ==================== STATE ==================== */
  const state = {
    products: [],
    filteredProducts: [],
    cart: [],
    wishlist: [],
    filters: {
      categories: [],
      priceRange: '',
      inStockOnly: false,
      search: '',
      sort: 'featured'
    }
  };

  /* ==================== DATA ==================== */
  const PRODUCTS = [
    { id: 1, name: 'Sneakers Premium Sport', category: 'mode', price: 45990, stock: 12, emoji: '👟', featured: true, new: false, desc: 'Baskets haute performance avec amorti supérieur. Parfaites pour le running et la marche quotidienne.' },
    { id: 2, name: 'Montre Connectée Elite', category: 'tech', price: 89990, stock: 8, emoji: '⌚', featured: true, new: true, desc: 'Montre intelligente avec suivi santé 24/7, GPS intégré et autonomie 7 jours.' },
    { id: 3, name: 'Sac à Dos Urban Pro', category: 'mode', price: 32990, stock: 15, emoji: '🎒', featured: false, new: false, desc: 'Sac ergonomique imperméable avec compartiment laptop 15" et port USB.' },
    { id: 4, name: 'Casque Bluetooth ANC', category: 'tech', price: 67990, stock: 5, emoji: '🎧', featured: true, new: false, desc: 'Réduction active du bruit, son Hi-Fi et 30h d\'autonomie. Confort premium.' },
    { id: 5, name: 'Lampe LED Design', category: 'maison', price: 18990, stock: 20, emoji: '💡', featured: false, new: false, desc: 'Lampe connectée RGB avec contrôle vocal et modes ambiance personnalisables.' },
    { id: 6, name: 'Bouteille Isotherme 1L', category: 'sport', price: 12990, stock: 30, emoji: '🍶', featured: false, new: false, desc: 'Garde le chaud 12h et le froid 24h. Acier inoxydable sans BPA.' },
    { id: 7, name: 'Lunettes Soleil Polarisées', category: 'mode', price: 28990, stock: 10, emoji: '🕶️', featured: false, new: true, desc: 'Protection UV400, verres polarisés anti-reflets. Monture légère et résistante.' },
    { id: 8, name: 'Clavier Mécanique RGB', category: 'tech', price: 54990, stock: 7, emoji: '⌨️', featured: true, new: false, desc: 'Switchs mécaniques silencieux, rétroéclairage RGB et repose-poignet.' },
    { id: 9, name: 'Tapis Yoga Premium', category: 'sport', price: 19990, stock: 18, emoji: '🧘', featured: false, new: false, desc: 'Épaisseur 6mm, surface antidérapante et matériaux écologiques.' },
    { id: 10, name: 'Enceinte Portable 360°', category: 'tech', price: 42990, stock: 12, emoji: '🔊', featured: false, new: true, desc: 'Son immersif 360°, résistante à l\'eau (IP67) et autonomie 20h.' },
    { id: 11, name: 'Coussin Déco Velours', category: 'maison', price: 8990, stock: 25, emoji: '🛋️', featured: false, new: false, desc: 'Coussin décoratif en velours premium 45x45cm. Plusieurs couleurs disponibles.' },
    { id: 12, name: 'Gourde Sport 750ml', category: 'sport', price: 9990, stock: 40, emoji: '💧', featured: false, new: false, desc: 'Gourde légère avec bec sport et système anti-fuite. Sans BPA.' },
    { id: 13, name: 'Veste Coupe-Vent Tech', category: 'mode', price: 78990, stock: 6, emoji: '🧥', featured: true, new: true, desc: 'Veste technique imperméable et respirante. Idéale pour le sport outdoor.' },
    { id: 14, name: 'Souris Gaming Pro', category: 'tech', price: 38990, stock: 14, emoji: '🖱️', featured: false, new: false, desc: 'Capteur optique 16000 DPI, 8 boutons programmables et RGB customisable.' },
    { id: 15, name: 'Diffuseur Huiles Essentielles', category: 'maison', price: 22990, stock: 16, emoji: '🌸', featured: false, new: false, desc: 'Diffuseur ultrasonique silencieux avec LED ambiance et arrêt automatique.' },
    { id: 16, name: 'Bracelet Fitness Tracker', category: 'sport', price: 24990, stock: 22, emoji: '⌚', featured: false, new: true, desc: 'Suivi activité, sommeil et fréquence cardiaque. Étanche 5ATM.' },
    { id: 17, name: 'Portefeuille Cuir RFID', category: 'mode', price: 16990, stock: 11, emoji: '👛', featured: false, new: false, desc: 'Cuir véritable avec protection RFID anti-piratage. Compact et élégant.' },
    { id: 18, name: 'Webcam 4K Ultra HD', category: 'tech', price: 95990, stock: 4, emoji: '📹', featured: true, new: true, desc: 'Webcam 4K avec autofocus, micro stéréo et correction lumière automatique.' },
    { id: 19, name: 'Plaid Polaire XXL', category: 'maison', price: 14990, stock: 28, emoji: '🛏️', featured: false, new: false, desc: 'Plaid ultra-doux 200x220cm. Chaleur et confort pour toute la famille.' },
    { id: 20, name: 'Corde à Sauter Pro', category: 'sport', price: 7990, stock: 35, emoji: '🪢', featured: false, new: false, desc: 'Corde ajustable avec roulements à billes et poignées ergonomiques.' }
  ];

  /* ==================== HELPERS ==================== */
  const formatPrice = (price) => `${price.toLocaleString('fr-FR')} FCFA`;

  const getCategoryLabel = (cat) => {
    const labels = { mode: 'Mode', tech: 'Tech', maison: 'Maison', sport: 'Sport' };
    return labels[cat] || cat;
  };

  function showToast(message, type = 'success') {
    const container = $('#toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }

  /* ==================== CART MANAGEMENT ==================== */
  function addToCart(productId) {
    const product = state.products.find(p => p.id === productId);
    if (!product || product.stock === 0) return;

    const existing = state.cart.find(item => item.id === productId);
    if (existing) {
      if (existing.qty < product.stock) {
        existing.qty++;
        showToast('Quantité mise à jour', 'success');
      } else {
        showToast('Stock limité atteint', 'error');
        return;
      }
    } else {
      state.cart.push({ ...product, qty: 1 });
      showToast(`${product.name} ajouté au panier`, 'success');
    }
    updateUI();
  }

  function removeFromCart(productId) {
    state.cart = state.cart.filter(item => item.id !== productId);
    updateUI();
    renderCart();
  }

  function updateCartQty(productId, delta) {
    const item = state.cart.find(i => i.id === productId);
    if (!item) return;

    const product = state.products.find(p => p.id === productId);
    const newQty = item.qty + delta;

    if (newQty <= 0) {
      removeFromCart(productId);
    } else if (newQty <= product.stock) {
      item.qty = newQty;
      updateUI();
      renderCart();
    } else {
      showToast('Stock insuffisant', 'error');
    }
  }

  function getCartTotal() {
    return state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  }

  /* ==================== WISHLIST ==================== */
  function toggleWishlist(productId) {
    const idx = state.wishlist.indexOf(productId);
    if (idx > -1) {
      state.wishlist.splice(idx, 1);
      showToast('Retiré des favoris', 'success');
    } else {
      state.wishlist.push(productId);
      showToast('Ajouté aux favoris ❤️', 'success');
    }
    updateUI();
    renderProducts();
  }

  /* ==================== UI UPDATES ==================== */
  function updateUI() {
    const cartCount = $('#cartCount');
    const wishlistCount = $('#wishlistCount');

    const totalItems = state.cart.reduce((sum, item) => sum + item.qty, 0);
    if (cartCount) cartCount.textContent = totalItems;
    if (wishlistCount) wishlistCount.textContent = state.wishlist.length;
  }

  /* ==================== FILTERS ==================== */
  function handleSearch(e) {
    state.filters.search = e.target.value.toLowerCase();
    applyFilters();
  }

  function handleCategoryFilter() {
    const checked = $$('#categoryFilters input[type="checkbox"]:checked');
    state.filters.categories = checked.map(cb => cb.value);
    applyFilters();
  }

  function handlePriceFilter(e) {
    state.filters.priceRange = e.target.value;
    applyFilters();
  }

  function handleStockFilter(e) {
    state.filters.inStockOnly = e.target.checked;
    applyFilters();
  }

  function handleSort(e) {
    state.filters.sort = e.target.value;
    applyFilters();
  }

  function resetFilters() {
    state.filters = { categories: [], priceRange: '', inStockOnly: false, search: '', sort: 'featured' };
    $$('#categoryFilters input[type="checkbox"]').forEach(cb => cb.checked = false);
    $('#priceFilter').value = '';
    $('#inStockOnly').checked = false;
    $('#sortSelect').value = 'featured';
    $('#searchInput').value = '';
    applyFilters();
  }

  function applyFilters() {
    let filtered = [...state.products];

    if (state.filters.search) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(state.filters.search));
    }

    if (state.filters.categories.length > 0) {
      filtered = filtered.filter(p => state.filters.categories.includes(p.category));
    }

    if (state.filters.priceRange) {
      const range = state.filters.priceRange;
      if (range.includes('-')) {
        const [min, max] = range.split('-').map(Number);
        filtered = filtered.filter(p => p.price >= min && p.price <= max);
      } else if (range.endsWith('+')) {
        const min = Number(range.replace('+', ''));
        filtered = filtered.filter(p => p.price >= min);
      }
    }

    if (state.filters.inStockOnly) {
      filtered = filtered.filter(p => p.stock > 0);
    }

    switch (state.filters.sort) {
      case 'price-asc': filtered.sort((a, b) => a.price - b.price); break;
      case 'price-desc': filtered.sort((a, b) => b.price - a.price); break;
      case 'newest': filtered.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0)); break;
      default: filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)); break;
    }

    state.filteredProducts = filtered;
    renderProducts();
  }

  /* ==================== RENDER PRODUCTS ==================== */
  function renderProducts() {
    const grid = $('#productsGrid');
    const resultsCount = $('#resultsCount');
    if (!grid) return;

    const count = state.filteredProducts.length;
    resultsCount.textContent = `${count} produit${count > 1 ? 's' : ''}`;

    if (count === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 48px; color: var(--muted);">
          <div style="font-size: 48px; margin-bottom: 16px;">😔</div>
          <div style="font-size: 18px; font-weight: 600;">Aucun produit trouvé</div>
          <button class="btn-text" onclick="document.getElementById('resetFilters').click()" style="margin-top: 12px;">
            Réinitialiser les filtres
          </button>
        </div>
      `;
      return;
    }

    grid.innerHTML = state.filteredProducts.map(product => {
      const inWishlist = state.wishlist.includes(product.id);
      const inStock = product.stock > 0;
      return `
        <div class="product-card">
          <div class="product-image">${product.emoji}</div>
          <div class="product-info">
            <div class="product-header">
              <h3 class="product-name">${product.name}</h3>
              <button class="wishlist-icon ${inWishlist ? 'active' : ''}" data-wishlist="${product.id}">
                <svg class="icon" fill="${inWishlist ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
              </button>
            </div>
            <span class="product-category">${getCategoryLabel(product.category)}</span>
            <div class="product-price">${formatPrice(product.price)}</div>
            <div class="product-stock ${inStock ? '' : 'out'}">
              ${inStock ? `✓ En stock (${product.stock})` : '✗ Rupture de stock'}
            </div>
            <div class="product-actions">
              <button class="btn-add-cart" data-cart="${product.id}" ${!inStock ? 'disabled' : ''}>🛒 Panier</button>
              <button class="btn-view" data-view="${product.id}">👁️ Voir</button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    $$('[data-wishlist]').forEach(btn => btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleWishlist(Number(btn.dataset.wishlist));
    }));

    $$('[data-cart]').forEach(btn => btn.addEventListener('click', (e) => {
      e.stopPropagation();
      addToCart(Number(btn.dataset.cart));
    }));

    $$('[data-view]').forEach(btn => btn.addEventListener('click', () => {
      openProductModal(Number(btn.dataset.view));
    }));
  }

  /* ==================== MODALS ==================== */
  function openProductModal(productId) {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;

    const modal = $('#productModal');
    const modalBody = $('#modalBody');
    const inStock = product.stock > 0;

    modalBody.innerHTML = `
      <div class="product-detail-image">${product.emoji}</div>
      <h2 class="product-detail-title">${product.name}</h2>
      <div class="product-detail-price">${formatPrice(product.price)}</div>
      <div style="margin-bottom: 16px;">
        <span class="product-category">${getCategoryLabel(product.category)}</span>
        <span class="product-stock ${inStock ? '' : 'out'}" style="margin-left: 12px;">
          ${inStock ? `✓ ${product.stock} en stock` : '✗ Rupture de stock'}
        </span>
      </div>
      <p class="product-detail-description">${product.desc}</p>
      <div class="product-detail-actions">
        <button class="btn-block btn-primary" id="modalAddCart" ${!inStock ? 'disabled' : ''}>
          🛒 Ajouter au panier
        </button>
      </div>
    `;

    modal.classList.add('active');

    $('#modalAddCart')?.addEventListener('click', () => {
      addToCart(product.id);
      closeProductModal();
    });
  }

  function closeProductModal() {
    $('#productModal')?.classList.remove('active');
  }

  function openCartModal() {
    $('#cartModal')?.classList.add('active');
    renderCart();
  }

  function closeCartModal() {
    $('#cartModal')?.classList.remove('active');
  }

  function renderCart() {
    const cartItems = $('#cartItems');
    const cartTotal = $('#cartTotal');

    if (state.cart.length === 0) {
      cartItems.innerHTML = `
        <div class="cart-empty">
          <div style="font-size: 48px; margin-bottom: 12px;">🛒</div>
          <div>Votre panier est vide</div>
        </div>
      `;
      cartTotal.textContent = '0 FCFA';
      return;
    }

    cartItems.innerHTML = state.cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-image">${item.emoji}</div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">${formatPrice(item.price)}</div>
          <div class="cart-item-controls">
            <button class="qty-btn" data-qty-minus="${item.id}">−</button>
            <span class="qty-value">${item.qty}</span>
            <button class="qty-btn" data-qty-plus="${item.id}">+</button>
            <button class="cart-item-remove" data-remove="${item.id}">Retirer</button>
          </div>
        </div>
      </div>
    `).join('');

    cartTotal.textContent = formatPrice(getCartTotal());

    $$('[data-qty-minus]').forEach(btn => btn.addEventListener('click', () => {
      updateCartQty(Number(btn.dataset.qtyMinus), -1);
    }));

    $$('[data-qty-plus]').forEach(btn => btn.addEventListener('click', () => {
      updateCartQty(Number(btn.dataset.qtyPlus), 1);
    }));

    $$('[data-remove]').forEach(btn => btn.addEventListener('click', () => {
      removeFromCart(Number(btn.dataset.remove));
    }));
  }

  /* ==================== EVENTS ==================== */
  function bindEvents() {
    window.addEventListener('scroll', () => {
      const header = $('#mainHeader');
      if (window.scrollY > 50) header?.classList.add('scrolled');
      else header?.classList.remove('scrolled');
    });

    $('#searchInput')?.addEventListener('input', handleSearch);
    $('#shopNowBtn')?.addEventListener('click', () => {
      document.querySelector('.shop-section')?.scrollIntoView({ behavior: 'smooth' });
    });
    $('#offersBtn')?.addEventListener('click', () => {
      state.filters.sort = 'price-asc';
      $('#sortSelect').value = 'price-asc';
      applyFilters();
    });

    $$('#categoryFilters input[type="checkbox"]').forEach(cb => {
      cb.addEventListener('change', handleCategoryFilter);
    });

    $('#priceFilter')?.addEventListener('change', handlePriceFilter);
    $('#inStockOnly')?.addEventListener('change', handleStockFilter);
    $('#sortSelect')?.addEventListener('change', handleSort);
    $('#resetFilters')?.addEventListener('click', resetFilters);

    $('#cartBtn')?.addEventListener('click', openCartModal);
    $('#wishlistBtn')?.addEventListener('click', () => {
      showToast(`Vous avez ${state.wishlist.length} favoris`, 'success');
    });

    $('#closeProductModal')?.addEventListener('click', closeProductModal);
    $('#closeCartModal')?.addEventListener('click', closeCartModal);

    $$('.modal').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
          modal.classList.remove('active');
        }
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeProductModal();
        closeCartModal();
      }
    });

    $('#checkoutBtn')?.addEventListener('click', () => {
      if (state.cart.length === 0) {
        showToast('Votre panier est vide', 'error');
        return;
      }
      showToast('Commande validée ! (Fonctionnalité future)', 'success');
      state.cart = [];
      updateUI();
      closeCartModal();
    });
  }

  /* ==================== INIT ==================== */
  function init() {
    state.products = [...PRODUCTS];
    state.filteredProducts = [...PRODUCTS];
    bindEvents();
    renderProducts();
    updateUI();
    console.log('%c🛍️ Intello Shop Premium', 'color: #06b6d4; font-size: 18px; font-weight: bold;');
  }

  document.addEventListener('DOMContentLoaded', init);
})();