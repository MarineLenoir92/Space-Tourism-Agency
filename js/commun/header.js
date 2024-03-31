function displayHeader() {
    const template = document.createElement('template');

    template.innerHTML=`
    <header class="header">
    <div class="logo">
        <a href="./index.html" aria-label="Go to Home Page">
            <span class="sr-only">Home Page Space Tourism Agency</span>
            <img class="logo-agency" src="./assets/images/home/logo.svg" alt="Logo Space Tourism Agency" tabindex="1">
        </a>
    </div>
    <nav id="menu">
        <button type="button" id="closeHamburgerBtn" aria-label="Close Toggle Menu">
            <img class="hamburger-menu" src="./assets/images/home/icon-close.svg"  alt="Close Toggle Menu" aria-hidden="true">
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
            <img class="hamburger-menu" src="./assets/images/home/icon-hamburger.svg"  alt="Open Toggle Menu" aria-hidden="true">
        </button>     
    </div>
    </header>
    `
    document.body.insertAdjacentHTML('afterbegin', template.innerHTML);

    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = './css/commun/header.css'; 
    document.head.appendChild(linkElement);
};

function manageToggleMenu() {
    const sidenav = document.getElementById("menu");
    const openBtn = document.getElementById("openHamburgerBtn");
    const closeBtn = document.getElementById("closeHamburgerBtn");
    const menuItems = document.querySelectorAll('#menu a');

    openBtn.onclick = openNav;
    closeBtn.onclick = closeNav;
    sidenav.setAttribute('aria-expanded', 'false');

    function openNav() {
        sidenav.classList.add("active");
        sidenav.setAttribute('aria-expanded', 'true');
        const firstMenuItem = menuItems[0];
        if (firstMenuItem) {
            firstMenuItem.focus();
        }
    }

    function closeNav() {
        sidenav.classList.remove("active");
        sidenav.setAttribute('aria-expanded', 'false');
    }

    function handleOpenBtnFocus() {
        openNav();
    }

    openBtn.addEventListener('focus', handleOpenBtnFocus);

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Tab') {
            const lastMenuItem = menuItems[menuItems.length - 1];
            if (document.activeElement === lastMenuItem) {
                closeNav();
            }
        }
    });
}

displayHeader();
manageToggleMenu();