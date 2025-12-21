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
            const anchor = link.querySelector('a');
            if (anchor) {
                anchor.setAttribute('aria-current', 'page');
            } else {
                link.setAttribute('aria-current', 'page');
            }
        }
    });
}

function manageToggleMenu() {
    const sidenav = document.getElementById("menu");
    const openBtn = document.getElementById("openHamburgerBtn");
    const closeBtn = document.getElementById("closeHamburgerBtn");
    const menuItems = document.querySelectorAll('#menu a');

    const currentPath = window.location.pathname.split('/').pop().split('.').shift();
    menuItems.forEach(a => {
        a.removeAttribute('aria-current');
        const pageAttr = a.getAttribute('data-page');
        const href = a.getAttribute('href') || '';
        const hrefPage = href.split('/').pop().split('.').shift();
        if (pageAttr === currentPath || hrefPage === currentPath) {
            a.setAttribute('aria-current', 'page');
            const parent = a.closest('.listMenu-md');
            if (parent) parent.classList.add('active');
        } else {
            const parent = a.closest('.listMenu-md');
            if (parent) parent.classList.remove('active');
        }
    });

    const openNav = () => {
        sidenav.classList.add("active");
        sidenav.setAttribute('aria-expanded', 'true');
        openBtn.focus();
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