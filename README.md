# 🛍️ E-Commerce Platform Premium

Plateforme e-commerce moderne avec panier, wishlist et filtres avancés — Prototype premium par [Intello](https://intello.sn).

---

## ✨ Fonctionnalités

- **🛒 Panier fonctionnel** : Ajouter/retirer produits, gestion quantités, calcul total
- **❤️ Wishlist** : Système de favoris avec toggle interactif
- **🔍 Recherche live** : Filtrage instantané par nom de produit
- **🎯 Filtres avancés** : Multi-catégories, budget, stock disponible
- **📊 Tri intelligent** : Prix croissant/décroissant, nouveautés, mis en avant
- **🎨 Design glassmorphism** : Gradients fluides, animations subtiles
- **📱 Responsive** : Optimisé mobile/tablette/desktop
- **🔔 Notifications toast** : Retours visuels sur chaque action

---

## 🛠️ Stack technique

- HTML5 + CSS3 (variables, gradients, animations)
- JavaScript ES6+ vanilla (state management)
- 20 produits fictifs avec descriptions
- Modals accessibles (Escape to close)

---

## 🚀 Installation

### Ouvrir directement
Double-cliquez sur `index.html`

### Avec serveur local

```bash
# Cloner le repo
git clone https://github.com/intello-agence/ecommerce-platform-prototype.git
cd ecommerce-platform-prototype

# Lancer serveur (choisir une méthode)
python -m http.server 8000
# OU
npx http-server -p 8000
# OU utiliser l'extension "Live Server" de VS Code
Puis ouvrir http://localhost:8000

📦 Structure
text

ecommerce-platform-prototype/
├── index.html          # Structure HTML
├── styles.css          # Styles (glassmorphism, animations)
├── app.js              # Logique panier + filtres
├── screenshots/        # Captures d'écran
│   ├── interface e-commerce.png
│   └── produits.png
└── README.md           # Documentation

🎮 Utilisation
Fonctionnalités principales
Filtres catégories : Mode / Tech / Maison / Sport (multi-sélection)
Budget : Tranches de prix 0-20k, 20-50k, 50-100k, 100k+
Stock : Afficher uniquement produits disponibles
Tri : Mis en avant, prix croissant/décroissant, nouveautés
Recherche : Filtrage instantané par nom
Actions utilisateur
❤️ Wishlist : Cliquer sur l'icône cœur
🛒 Panier : Ajouter produits, ajuster quantités (+/−)
👁️ Détails : Modal avec description complète
💳 Checkout : Validation panier (simulé)
🎨 Personnalisation
Les produits sont définis dans app.js (tableau PRODUCTS). Pour connecter une API :

JavaScript

// Remplacer PRODUCTS par :
async function fetchProducts() {
  const res = await fetch('/api/products');
  return res.json();
}
📄 Licence
MIT License

👤 Auteur
Intello — Agence digitale Dakar 🇸🇳

🌐 intello.sn
📧 contact@intello.sn
📱 +221 77 553 28 04
⭐ Support
Si ce prototype vous a été utile :

⭐ Star le repo
🐦 Partager sur LinkedIn/Twitter
📧 Nous contacter pour un projet sur mesure
Fait par Intello