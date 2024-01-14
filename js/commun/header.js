function displayHeader() {
    const template = document.createElement('template');

    template.innerHTML=`
    <header class="header">
    <div class="logo">
        <a href="./index.html" aria-label="Go to Home Page">
            <span class="sr-only">Home Page Space Tourism Agency</span>
            <img class="logo-agency" src="./assets/images/home/logo.svg" alt="Logo Space Tourism Agency">
        </a>
    </div>
    <div class="menu">
        <nav>
            <img class="hamburger-menu" src="./assets/images/home/icon-hamburger.svg">
        </nav>
    </div>
    </header>
    `
    
    document.body.insertAdjacentHTML('afterbegin', template.innerHTML);
};

displayHeader();




