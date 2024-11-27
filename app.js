const express = require('express');
const path = require('path');
const session = require('express-session');
const app = express();
const port = 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(session({
  secret: 'votre_clé_secrète',
  resave: false,
  saveUninitialized: true,
}));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/menu', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'menu.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

app.get('/book-table', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'book.html'));
});

// API routes pour le panier
app.post('/add-to-cart', (req, res) => {
  const item = req.body.item;
  if (!req.session.cart) {
    req.session.cart = [];
  }
  req.session.cart.push(item);
  res.json({ success: true, cart: req.session.cart });
});

app.get('/get-cart', (req, res) => {
  res.json(req.session.cart || []);
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Le serveur est en écoute sur http://localhost:${port}`);
});