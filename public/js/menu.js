const cards = document.getElementById('cards');
const filters = document.getElementById('filters');

async function loadMenu(category = '') {
  try {
    const url = category ? `/api/menu?category=${category}` : '/api/menu';
    const res = await fetch(url);
    if (!res.ok) throw new Error(res.status);
    const items = await res.json();

    cards.innerHTML = items.map((i) => `
      <article class="card">
        <img src="${i.image}" alt="${i.name}" loading="lazy">
        <div class="card-body">
          <h3>${i.name} <span class="price">&#8369;${i.price}</span></h3>
          <p>${i.description}</p>
        </div>
      </article>`).join('');
  } catch (err) {
    cards.innerHTML = '<p class="note">Could not load the menu. Please refresh the page.</p>';
  }
}

filters.addEventListener('click', (e) => {
  const chip = e.target.closest('.chip');
  if (!chip) return;
  filters.querySelectorAll('.chip').forEach((c) => c.classList.remove('active'));
  chip.classList.add('active');
  loadMenu(chip.dataset.cat);
});

loadMenu();