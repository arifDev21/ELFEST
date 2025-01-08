document.addEventListener("DOMContentLoaded", function () {
    loadComponent("navbar", "navbar.html", () => {
        setupNavbarFunctionality();
    });
    loadComponent("footer", "footer.html");
});

function loadComponent(id, url, callback) {
    const element = document.getElementById(id);
    fetch(url)
        .then(response => response.text())
        .then(data => {
            element.innerHTML = data;
            if (callback) callback(); // Panggil callback setelah konten dimuat
        })
        .catch(error => console.error(`Error loading ${url}:`, error));
}

function setupNavbarFunctionality() {
    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");

    if (menuToggle && menu) {
        menuToggle.addEventListener("click", () => {
            menu.classList.toggle("hidden");
        });
    }
}


function handleTickInit(tick) {
    const targetDate = new Date('2025-04-26T00:00:00');
    Tick.helper.interval(function () {
        var now = new Date();
        var timeDiff = targetDate - now;

        var days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        var hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        tick.value = {
            sep: ':',
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        };
    });
}






