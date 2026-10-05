document.getElementById('contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  document.getElementById('form-note').textContent = `Thank you, ${name}! Your message is on its way.`;
  e.target.reset();
});