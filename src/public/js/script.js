// public/js/script.js
const toggle  = document.getElementById('menu-toggle');
const navList = document.getElementById('nav-list');

if (toggle && navList) {
  toggle.addEventListener('click', () => {
    navList.classList.toggle('open');
  });
}
