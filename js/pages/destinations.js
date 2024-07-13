const dataURL = 'data.json';
let destinationsData;
const navItems = document.querySelectorAll('.destination-list');
const infoImage = document.querySelector('.destination-image');
const infoName = document.querySelector('.destination-name');
const infoDescription = document.querySelector('.destination-description');
const infoDistance = document.querySelector('.distance-info');
const infoTime = document.querySelector('.time-info');

document.addEventListener('DOMContentLoaded', () => {
    fetchData(dataURL)
        .then(data => {
            destinationsData = data.destinations;
            initializeNavItems();
            updateDestinationInfo(0);
            setupNavEventListeners();
        })
        .catch(error => console.error('An error occurred during data recovery:', error));
});

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
}

function initializeNavItems() {
    destinationsData.forEach((destination, index) => {
        navItems[index].textContent = destination.name;
        if (index === 0) {
            navItems[index].classList.add('active');
            navItems[index].setAttribute('aria-selected', 'true');
        }
    });
}

function setupNavEventListeners() {
    navItems.forEach((item, index) => {
        item.addEventListener('click', () => handleDestinationClick(index));
        item.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') {
                handleDestinationClick(index);
            }
        });
    });
}

function handleDestinationClick(index) {
    navItems.forEach((item, i) => {
        item.classList.toggle('active', i === index);
        item.setAttribute('aria-selected', i === index);
    });
    updateDestinationInfo(index);
}

function updateDestinationInfo(index) {
    const { images, name, description, distance, travel } = destinationsData[index];
    infoImage.src = images.webp;
    infoImage.alt = `Photo of destination: ${name}`;
    infoName.innerHTML = name;
    infoDescription.innerHTML = description;
    infoDistance.innerHTML = distance;
    infoTime.innerHTML = travel;
}
