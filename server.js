
// Name: Christine May T. Dantes
// WD-303
// 6WCSERVER - Midterm Activity: Basic Express Routing Using GET
// Coffee Shop name: Syris Cafe

const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

 
app.use(express.static(path.join(__dirname, 'public'), { index: false }));


const menu = [
  {
    id: 1, name: 'Matcha Latte', category: 'special', price: 150,
    image: 'https://www.butteredsideupblog.com/wp-content/uploads/2022/07/Starbucks-Hot-Matcha-Green-Tea-Latte-Recipe-16-scaled-540x720.jpg',
    description: 'Ceremonial-grade matcha whisked until silky, then topped with chilled milk.'
  },
  {
    id: 2, name: 'Caffe Mocha', category: 'coffee', price: 140,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLR6J8ktFGGN2v5vFUTSlvHiJNexJDhrdsvtpdTx2MY4Fsq2ePQFvLpUNz&s=10',
    description: 'Espresso and dark chocolate, finished with a swirl of whipped cream.'
  },
  {
    id: 3, name: 'Espresso', category: 'coffee', price: 95,
    image: 'https://www.sharmispassions.com/wp-content/uploads/2012/07/espresso-coffee-recipe022.jpg',
    description: 'A small, strong shot with a golden crema. Straight and simple.'
  },
  {
    id: 4, name: 'Rose Latte', category: 'special', price: 165,
    image: 'https://healthmylifestyle.com/wp-content/uploads/2023/08/rose-latte.jpg',
    description: 'Our signature drink: espresso and steamed milk with a light rose syrup and petals on top.'
  },
  {
    id: 5, name: 'Matcha Mousse Cake', category: 'pastry', price: 185,
    image: 'https://thescranline.com/wp-content/uploads/2021/09/Matcha-Mousse-Cake-01.jpg',
    description: 'Airy matcha mousse layered over a soft sponge. Light, creamy and just sweet enough.'
  },
  {
    id: 6, name: 'Cinnamon Roll', category: 'pastry', price: 120,
    image: 'https://www.abakingjourney.com/wp-content/uploads/2022/11/Coffee-Cinnamon-Rolls-Feature1.jpg',
    description: 'Baked fresh every morning with cinnamon sugar and a cream cheese glaze.'
  }
];


const sendPage = (file) => (req, res) => {
  console.log(`Rendering ${file}`);
  res.sendFile(path.join(__dirname, 'public', file));
};

app.get('/', sendPage('index.html'));
app.get('/menu', sendPage('menu.html'));
app.get('/about', sendPage('about.html'));
app.get('/contact', sendPage('contact.html'));


app.get('/api/menu', (req, res) => {
  const { category } = req.query;
  const items = category
    ? menu.filter((i) => i.category === category.toLowerCase())
    : menu;
  res.json(items);
});


app.get('/api/menu/:id', (req, res) => {
  const item = menu.find((m) => m.id === Number(req.params.id));
  if (!item) return res.status(404).json({ error: 'Menu item not found' });
  res.json(item);
});

app.get('/favicon.ico', (req, res) => res.status(204).end());


app.use((req, res) => {
  console.log(`404 Not Found: ${req.originalUrl}`);
  res.status(404).send('<h1 style="font-family:sans-serif">404 - Page not found</h1><a href="/">Back to home</a>');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});