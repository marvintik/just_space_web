// Мобільне меню
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  menuToggle.classList.toggle('active');
});

// Форма контактів
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const formData = new FormData(this);
  const data = Object.fromEntries(formData);

  // Надіслати форму через Mailgun (замініть на ваш API)
  fetch('https://api.mailgun.net/v3/YOUR_DOMAIN/messages', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + btoa('api:' + 'YOUR_API_KEY'),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `from=${data.email}&to=afjustspace@gmail.com&subject=Запит на консультацію&text=${encodeURIComponent(data.message)}`
  })
  .then(response => {
    if (response.ok) {
      alert('Дякуємо! Ваше повідомлення надіслано.');
      this.reset();
    } else {
      alert('Помилка. Спробуйте ще раз.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Помилка. Спробуйте ще раз.');
  });
});