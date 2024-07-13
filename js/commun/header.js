const isAboveTablet = window.matchMedia('(min-width: 767px)').matches;

function createHeader(templateHTML, cssPath) {
    const template = document.createElement('template');
    template.innerHTML = templateHTML;
    document.body.insertAdjacentHTML('afterbegin', template.innerHTML);

    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = cssPath;
    document.head.appendChild(linkElement);
}

function displayHeader() {
    const desktopTemplate = `
    <header class="header">
        <div class="logo">
            <a href="./index.html" aria-label="Go to Home Page">
                <span class="sr-only">Home Page Space Tourism Agency</span>
                <img class="logo-agency" src="./assets/images/home/logo.svg" alt="Logo Space Tourism Agency" tabindex="1">
            </a>
        </div>
        <nav id="menu-md" role="navigation" aria-label="Main Navigation">
            <ul>
                <li class="listMenu-md" data-page='index'><a href="./index.html" class="navSubMenu"><span class="number">00</span>Home</a></li>
                <li class="listMenu-md" data-page='destinations'><a href="./destinations.html" class="navSubMenu"><span class="number">01</span>Destination</a></li>
                <li class="listMenu-md" data-page='crews'><a href="./crews.html" class="navSubMenu"><span class="number">02</span>Crew</a></li>
                <li class="listMenu-md" data-page='technology'><a href="./technology.html" class="navSubMenu"><span class="number">03</span>Technology</a></li>
            </ul>
        </nav>
    </header>`;
    createHeader(desktopTemplate, './css/commun/header.css');
    
    const currentPath = window.location.pathname.split('/').pop().split('.').shift();
    const navLinks = document.querySelectorAll('.listMenu-md');
    navLinks.forEach(link => {
        if (link.getAttribute('data-page') === currentPath) {
            link.classList.add('active');
        }
    });
}

function displayMobileHeader() {
    const mobileTemplate = `
    <header class="header">
        <div class="logo">
            <a href="./index.html" aria-label="Go to Home Page">
                <span class="sr-only">Home Page Space Tourism Agency</span>
                <img class="logo-agency" src="./assets/images/home/logo.svg" alt="Logo Space Tourism Agency" tabindex="1">
            </a>
        </div>
        <nav id="menu" role="navigation" aria-label="Mobile Navigation">
            <button type="button" id="closeHamburgerBtn" aria-label="Close Toggle Menu">
                <img class="hamburger-menu" src="./assets/images/home/icon-close.svg" alt="Close Toggle Menu" aria-hidden="true">
            </button>
            <ul>
                <li class="listMenu"><span class="navNumber">00&emsp;</span><a href="./index.html" class="navSubMenu">Home</a></li>
                <li class="listMenu"><span class="navNumber">01&emsp;</span><a href="./destinations.html" class="navSubMenu">Destination</a></li>
                <li class="listMenu"><span class="navNumber">02&emsp;</span><a href="./crews.html" class="navSubMenu">Crew</a></li>
                <li class="listMenu"><span class="navNumber">03&emsp;</span><a href="./technology.html" class="navSubMenu">Technology</a></li>
            </ul>
        </nav>
        <div class="menu">
            <button type="button" id="openHamburgerBtn" aria-label="Open Toggle Menu" tabindex="2">
                <img class="hamburger-menu" src="./assets/images/home/icon-hamburger.svg" alt="Open Toggle Menu" aria-hidden="true">
            </button>
        </div>
    </header>`;
    createHeader(mobileTemplate, './css/commun/header.css');
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

if (isAboveTablet) {
    displayHeader();
} else {
    displayMobileHeader();
    manageToggleMenu();
}
