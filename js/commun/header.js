const isAboveTablet = window.matchMedia('(min-width: 767px)').matches;

document.addEventListener('DOMContentLoaded', function() {
    function includeHTML(url) {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                document.getElementById('header-placeholder').innerHTML = data;
                if (isAboveTablet) {
                    manageDesktopMenu();
                } else {
                    manageToggleMenu();
                }
            })
            .catch(error => {
                console.error(`Impossible d'inclure ${url} dans la page:`, error);
            });
    }

    includeHTML('header.html', 'header-placeholder');

});


function manageDesktopMenu() {
    const currentPath = window.location.pathname.split('/').pop().split('.').shift();
    const navLinks = document.querySelectorAll('.listMenu-md');
    navLinks.forEach(link => {
        if (link.getAttribute('data-page') === currentPath) {
            link.classList.add('active');
        }
    });
}

function manageToggleMenu() {
    const sidenav = document.getElementById("menu");
    const openBtn = document.getElementById("openHamburgerBtn");
    const closeBtn = document.getElementById("closeHamburgerBtn");
    const menuItems = document.querySelectorAll('#menu a');

    const openNav = () => {
        sidenav.classList.add("active");
        sidenav.setAttribute('aria-expanded', 'true');
        menuItems[0]?.focus();
    };

    const closeNav = () => {
        sidenav.classList.remove("active");
        sidenav.setAttribute('aria-expanded', 'false');
    };

    openBtn.onclick = openNav;
    closeBtn.onclick = closeNav;

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Tab' && document.activeElement === menuItems[menuItems.length - 1]) {
            closeNav();
        }
    });
}