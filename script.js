document.addEventListener('DOMContentLoaded', function () {
  loadComponent('navbar', 'navbar.html', () => {
    setupNavbarFunctionality();
  });
  loadComponent('footer', 'footer.html');
  setupHistoryNavigation();
});

function loadComponent(id, url, callback) {
  const element = document.getElementById(id);
  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      element.innerHTML = data;
      if (callback) callback(); // Panggil callback setelah konten dimuat
    })
    .catch((error) => console.error(`Error loading ${url}:`, error));
}

function setupNavbarFunctionality() {
  const menuToggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');

  if (menuToggle && menu) {
    menuToggle.addEventListener('click', () => {
      menu.classList.toggle('hidden');
    });
  }
}

function handleTickInit(tick) {
  const targetDate = new Date('2026-04-26T00:00:00');
  Tick.helper.interval(function () {
    var now = new Date();
    var timeDiff = targetDate - now;

    // If timeDiff is negative (past target date), set all values to 0
    if (timeDiff < 0) {
      tick.value = {
        sep: ':',
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
      return;
    }

    var days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    var minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    tick.value = {
      sep: ':',
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  });
}

function setupHistoryNavigation() {
  const btn2024 = document.getElementById('btn-2024');
  const btn2025 = document.getElementById('btn-2025');
  const history2024 = document.getElementById('history-2024');
  const history2025 = document.getElementById('history-2025');

  // Cek apakah elemen ada (hanya berjalan di history.html)
  if (!btn2024 || !btn2025 || !history2024 || !history2025) {
    return;
  }

  // Button 2025 click handler
  btn2025.addEventListener('click', function () {
    history2025.classList.remove('hidden');
    history2024.classList.add('hidden');

    // Visual feedback untuk button aktif
    btn2025.style.opacity = '1';
    btn2024.style.opacity = '0.5';
  });

  // Button 2024 click handler
  btn2024.addEventListener('click', function () {
    history2024.classList.remove('hidden');
    history2025.classList.add('hidden');

    // Visual feedback untuk button aktif
    btn2024.style.opacity = '1';
    btn2025.style.opacity = '0.5';
  });

  // Set initial state: 2025 visible, button 2025 aktif
  btn2025.style.opacity = '1';
  btn2024.style.opacity = '0.5';
}
