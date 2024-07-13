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

document.addEventListener('DOMContentLoaded', () => {
    const dataURL = 'data.json';
    let crewsData;

    const navItemsCrew = document.querySelectorAll('.crew-list');
    const infoImageCrew = document.querySelector('.crew-image');
    const infoRoleCrew = document.querySelector('.crew-fonction');
    const infoNameCrew = document.querySelector('.crew-name');
    const infoDescriptionCrew = document.querySelector('.crew-description');

    // Fetch data from JSON
    fetch(dataURL)
        .then(response => response.json())
        .then(data => {
            crewsData = data.crew;

            // Initialize first crew member display
            setActiveCrew(0);

            // Attach event listeners to crew navigation items
            navItemsCrew.forEach((item, index) => {
                item.addEventListener('click', () => setActiveCrew(index));
                item.addEventListener('keydown', event => {
                    if (event.key === 'Enter' || event.key === ' ') {
                        setActiveCrew(index);
                    }
                });
            });
        })
        .catch(error => console.error('An error occurred during data recovery:', error));

    // Function to update the active crew member display
    function setActiveCrew(index) {
        const selectedCrew = crewsData[index];

        // Update active state and aria attributes
        navItemsCrew.forEach((item, idx) => {
            if (idx === index) {
                item.classList.add('active');
                item.setAttribute('aria-selected', 'true');
            } else {
                item.classList.remove('active');
                item.setAttribute('aria-selected', 'false');
            }
        });

        // Update crew information
        infoImageCrew.src = selectedCrew.images.webp;
        infoImageCrew.alt = `Photo of crew: ${selectedCrew.name}`;
        infoRoleCrew.textContent = selectedCrew.role;
        infoNameCrew.textContent = selectedCrew.name;
        infoDescriptionCrew.textContent = selectedCrew.bio;
    }
});

