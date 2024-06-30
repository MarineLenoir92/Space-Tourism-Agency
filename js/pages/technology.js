const dataURL = 'data.json';
let technologiesData;
const isDesktop = window.matchMedia('(min-width: 63rem) and (max-height:85rem)').matches;
const navTechnologyItems = document.querySelectorAll('.technology-list');
const infoTechnologyImage = document.getElementsByClassName('technology-image')[0];
const infoTechnologyName = document.getElementsByClassName('technology-name')[0];
const infoTechnologyDescription = document.getElementsByClassName('technology-description')[0];

document.addEventListener('DOMContentLoaded', function() { 

    fetch('data.json')
        .then(response => response.json())
        .then(data => {

            technologiesData = data.technology;

            navTechnologyItems[0].classList.add('active');
            navTechnologyItems[0].setAttribute('aria-selected', 'true');
            
            const technologyData = data.technology[0]; 
            let technologyImg;
            const technologyName = technologyData.name;
            const technologyDescription = technologyData.description;

            if(!isDesktop) {
                technologyImg = technologyData.images.mobile;
            } else {
                technologyImg = technologyData.images.portrait;
            }

            infoTechnologyImage.src = technologyImg;
            infoTechnologyImage.alt = 'Photo of technology: ' +  technologyName;
            infoTechnologyName.innerHTML = technologyName;
            infoTechnologyDescription.innerHTML = technologyDescription;

            navTechnologyItems.forEach((item, index) => {
                item.addEventListener('click', () => {
                    handleTechnologyClick(item, index);
            });
                item.addEventListener('keydown', function(event) {
                    if (event.key === 'Enter' || event.key === ' ') {
                        handleTechnologyClick(item, index);
                    }
                });
            });
        })
        .catch(error => {
            console.error('An error occurred during data recovery:', error);
        });

});

function handleTechnologyClick(item, index) {
    item.classList.add('active');
    item.setAttribute('aria-selected', 'true');
                    
    navTechnologyItems.forEach((otherItem, otherIndex) => {
        if (otherIndex !== index) {
            otherItem.classList.remove('active');
            otherItem.setAttribute('aria-selected', 'false');
        }

        const selectedTechnology = technologiesData[index];
                    
        infoTechnologyImage.src = !isDesktop ? selectedTechnology.images.mobile : selectedTechnology.images.portrait;
        infoTechnologyImage.alt = 'Photo of technology: ' +  selectedTechnology.name;
        infoTechnologyName.innerHTML = selectedTechnology.name;
        infoTechnologyDescription.innerHTML = selectedTechnology.description;
    });
}