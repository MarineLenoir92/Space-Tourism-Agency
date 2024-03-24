const dataURL = 'data.json';
let crewsData;
const navItemsCrew = document.querySelectorAll('.crew-list');
const infoImageCrew = document.getElementsByClassName('crew-image')[0];
const infoRoleCrew = document.getElementsByClassName('crew-fonction')[0];
const infoNameCrew = document.getElementsByClassName('crew-name')[0];
const infoDescriptionCrew = document.getElementsByClassName('crew-description')[0];

document.addEventListener('DOMContentLoaded', function() { 

    fetch('data.json')
        .then(response => response.json())
        .then(data => {

            crewsData = data.crew;

            navItemsCrew[0].classList.add('active');
            navItemsCrew[0].setAttribute('aria-selected', 'true');
                
            const crewData = data.crew[0]; 
            const crewImg =  crewData.images.webp;
            const crewRole = crewData.role;
            const crewName = crewData.name;
            const crewDescription = crewData.bio;
        
            infoImageCrew.src = crewImg;
            infoImageCrew.alt = 'Photo of crew: ' +  crewName;
            infoRoleCrew.innerHTML = crewRole;
            infoNameCrew.innerHTML = crewName;
            infoDescriptionCrew.innerHTML = crewDescription;

            navItemsCrew.forEach((item, index) => {
                item.addEventListener('click', () => {
                    handleCrewClick(item, index);
            });
                item.addEventListener('keydown', function(event) {
                    if (event.key === 'Enter' || event.key === ' ') {
                        handleCrewClick(item, index);
                    }
                });
            });
        })
        .catch(error => {
            console.error('An error occurred during data recovery:', error);
        });

});

function handleCrewClick(item, index) {
    item.classList.add('active');
    item.setAttribute('aria-selected', 'true');
                    
    navItemsCrew.forEach((otherItem, otherIndex) => {
        if (otherIndex !== index) {
            otherItem.classList.remove('active');
            otherItem.setAttribute('aria-selected', 'false');
        }

        const selectedCrew = crewsData[index];
                    
        infoImageCrew.src = selectedCrew.images.webp;
        infoImageCrew.alt = 'Photo of crew: ' + selectedCrew.name;
        infoRoleCrew.innerHTML = selectedCrew.role;
        infoNameCrew.innerHTML = selectedCrew.name;
        infoDescriptionCrew.innerHTML = selectedCrew.bio;
    });
}
