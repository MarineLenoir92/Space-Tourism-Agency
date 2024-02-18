const dataURL = 'data.json';

document.addEventListener('DOMContentLoaded', function() {
    const infoImage = document.getElementsByClassName('destination-image')[0];
    const infoName = document.getElementsByClassName('destination-name')[0];
    const infoDescription = document.getElementsByClassName('destination-description')[0];
    const infoDistance = document.getElementsByClassName('distance-info')[0];
    const infoTime = document.getElementsByClassName('time-info')[0];

    const navItems = document.querySelectorAll('.destination-list');

    fetch('data.json')
        .then(response => response.json())
        .then(data => {

            let destinationsData = data.destinations;

            destinationsData.forEach((destination, index) => {
                navItems[index].textContent = destination.name;
                if(index === 0) {
                    navItems[index].classList.add('active');
                }
            });
            
            const destinationData = data.destinations[0]; 
            const destinationImg =  destinationData.images.webp;
            const destinationName = destinationData.name;
            const destinationDescription = destinationData.description;
            const destinationDistance = destinationData.distance;
            const destinationTimeTravel = destinationData.travel;

            infoImage.src = destinationImg;
            infoImage.alt = 'Photo of destination: ' +  destinationName;
            infoName.innerHTML = destinationName;
            infoDescription.innerHTML = destinationDescription;
            infoDistance.innerHTML = destinationDistance;
            infoTime.innerHTML = destinationTimeTravel;

            navItems.forEach((item, index) => {
                item.addEventListener('click', () => {
                    item.classList.add('active');
                    
                    navItems.forEach((otherItem, otherIndex) => {
                        if (otherIndex !== index) {
                            otherItem.classList.remove('active');
                        }
                    });
            
                    const selectedDestination = destinationsData[index];
                    
                    infoImage.src = selectedDestination.images.webp;
                    infoImage.alt = 'Photo of destination: ' +  selectedDestination.name;
                    infoName.innerHTML = selectedDestination.name;
                    infoDescription.innerHTML = selectedDestination.description;
                    infoDistance.innerHTML = selectedDestination.distance;
                    infoTime.innerHTML = selectedDestination.travel;
                });
            });
        })
        .catch(error => {
            console.error('An error occurred during data recovery:', error);
        });

});