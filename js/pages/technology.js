const dataURL = 'data.json';
let technologiesData;
const isDesktop = window.matchMedia('(min-width: 63rem) and (max-height: 85rem)').matches;
const navTechnologyItems = document.querySelectorAll('.technology-list');
const infoTechnologyImage = document.querySelector('.technology-image');
const infoTechnologyName = document.querySelector('.technology-name');
const infoTechnologyDescription = document.querySelector('.technology-description');

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const data = await fetchData(dataURL);
        technologiesData = data.technology;

        updateTechnologyInfo(0);
        navTechnologyItems[0].classList.add('active');
        navTechnologyItems[0].setAttribute('aria-selected', 'true');

        navTechnologyItems.forEach((item, index) => {
            item.addEventListener('click', () => handleTechnologyClick(index));
            item.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    handleTechnologyClick(index);
                }
            });
        });
    } catch (error) {
        console.error('An error occurred during data recovery:', error);
    }
});

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
}

function updateTechnologyInfo(index) {
    const { images, name, description } = technologiesData[index];
    const technologyImg = isDesktop ? images.portrait : images.mobile;

    infoTechnologyImage.src = technologyImg;
    infoTechnologyImage.alt = `Photo of technology: ${name}`;
    infoTechnologyName.innerHTML = name;
    infoTechnologyDescription.innerHTML = description;
}

function handleTechnologyClick(index) {
    navTechnologyItems.forEach((item, idx) => {
        item.classList.toggle('active', idx === index);
        item.setAttribute('aria-selected', idx === index);
    });

    updateTechnologyInfo(index);
}
