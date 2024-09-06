window.addEventListener('scroll', function() {
    var nav = document.querySelector('nav');
    if (window.scrollY > 0) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

const sideMenu = document.getElementById('sidemenu');
const overlay = document.getElementById('overlay');
const body = document.body;
const navLinks = document.querySelectorAll('#sidemenu a');

function openmenu() {
    sideMenu.style.right = "0";
    overlay.style.display = "block";
    body.classList.add('no-scroll');
}

function closemenu() {
    sideMenu.style.right = "-300px";
    overlay.style.display = "none";
    body.classList.remove('no-scroll');
    body.style.filter = "none";
}

overlay.addEventListener('click', closemenu);

navLinks.forEach(link => {
    link.addEventListener('click', closemenu);
});



let bookCar = {
    car: '',
    pickUp: '',
    dropOff: '',
    pickUpDate: '',
    dropOffDate: ''
};

renderBooking();

function renderBooking() {
    const { car, pickUp, dropOff, pickUpDate, dropOffDate } = bookCar;
    const bookCarHTML = car && pickUp && dropOff && pickUpDate && dropOffDate 
        ? `<p>Car type: ${car}</p>
           <p>Your pick-up location: ${pickUp}</p>
           <p>Your drop-off location: ${dropOff}</p>
           <p>Pick-up date: ${pickUpDate}</p>
           <p>Drop-off date: ${dropOffDate}</p>` 
        : '<p>No schedule set.</p>';
    document.querySelector('.js-booking').innerHTML = bookCarHTML;
}

function addBooking(event) {
    const selectElement = document.querySelector('.js-select-car');
    const car = selectElement.value;

    const pickUpInputElement = document.querySelector('.js-pick-up-input');
    const pickUp = pickUpInputElement.value;

    const dropOffInputElement = document.querySelector('.js-drop-off-input');
    const dropOff = dropOffInputElement.value;

    const pickUpDateInputElement = document.querySelector('.js-pick-up-date-input');
    const pickUpDate = pickUpDateInputElement.value;

    const dropOffDateInputElement = document.querySelector('.js-drop-off-date-input');
    const dropOffDate = dropOffDateInputElement.value;

    // Validation: Check if any field is empty
    if (!car || !pickUp || !dropOff || !pickUpDate || !dropOffDate) {
        alert('Please fill in all the fields.');
        return; // Stop further execution
    }

    // Check if the pick-up date is a weekend (Saturday or Sunday)
    const pickUpDateObj = new Date(pickUpDate);
    const dropOffDateObj = new Date(dropOffDate);
    const day = pickUpDateObj.getDay();

    if (day === 0 || day === 7) {
        alert('Please select from (Monday to Satuday) for pick-up.');
        event.preventDefault();
        return;
    }

    // Check if the drop-off date is not earlier than the pick-up date
    if (dropOffDateObj < pickUpDateObj) {
        alert('Drop-off date cannot be earlier than the pick-up date.');
        return; // Stop further execution
    }

    // If all fields are filled and valid, update the booking details
    bookCar = { car, pickUp, dropOff, pickUpDate, dropOffDate };
    
    // Render the booking details and open the modal
    renderBooking();
    openModal(document.querySelector('#modal'));

    // Reset form fields
    selectElement.value = '';
    pickUpInputElement.value = '';
    dropOffInputElement.value = '';
    pickUpDateInputElement.value = '';
    dropOffDateInputElement.value = '';
}


const bookButton = document.querySelector('.js-book-button');
const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay2 = document.getElementById('overlay-2');

bookButton.addEventListener('click', (event) => {
    event.preventDefault();
    addBooking(event);
});

overlay2.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active');
    modals.forEach(modal => {
        closeModal(modal);
    });
});

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        closeModal(modal);
    });
});

function openModal(modal) {
    if (modal == null) return;
    modal.classList.add('active');
    overlay2.classList.add('active');
    document.body.classList.add('no-scroll');
}

function closeModal(modal) {
    if (modal == null) return;
    modal.classList.remove('active');
    overlay2.classList.remove('active');
    document.body.classList.remove('no-scroll');
};


document.addEventListener('DOMContentLoaded', () => {
    const carDetails = {
        toyota: {
            image: 'images/toyota.webp',
            price: '$140 / per day',
            model: 'Toyota',
            mark: 'XLE',
            year: '2024',
            doors: '4',
            ac: 'Yes',
            transmission: 'Manual',
            fuel: 'Gasoline'
        },
        bmw: {
            image: 'images/bmw.jpeg',
            price: '$220 / per day',
            model: 'BMW',
            mark: 'X7',
            year: '2023',
            doors: '4',
            ac: 'Yes',
            transmission: 'Automatic',
            fuel: 'Diesel'
        },
        audi: {
            image: 'images/audii.jpeg',
            price: '$200 / per day',
            model: 'Audi',
            mark: 'Q6 Suv',
            year: '2022',
            doors: '4',
            ac: 'Yes',
            transmission: 'Automatic',
            fuel: 'Gasoline'
        },
        mercedes: {
            image: 'images/benz.jpeg',
            price: '$300 / per day',
            model: 'Mercedes',
            mark: 'Maybach SUV',
            year: '2023',
            doors: '4',
            ac: 'Yes',
            transmission: 'Manual',
            fuel: 'Diesel'
        },
        porsche: {
            image: 'images/porssche.jpg',
            price: '$150 / per day',
            model: 'porsche',
            mark: 'Panamera',
            year: '2019',
            doors: '4',
            ac: 'Yes',
            transmission: 'Automatic',
            fuel: 'Electric'
        }
    };

    const carModelElements = document.querySelectorAll('.car-model');
    const carPrice = document.getElementById('price');
    const carImage = document.getElementById('car-img');
    const modelElement = document.getElementById('model');
    const markElement = document.getElementById('mark');
    const yearElement = document.getElementById('year');
    const doorsElement = document.getElementById('doors');
    const acElement = document.getElementById('ac');
    const transmissionElement = document.getElementById('transmission');
    const fuelElement = document.getElementById('fuel');

    // Set Toyota as the active model by default
    const setActiveModel = (modelKey) => {
        const car = carDetails[modelKey];
        carImage.src = car.image;
        carPrice.innerHTML = `<span class="amount">${car.price}</span>`; // Add class here
        modelElement.textContent = car.model;
        markElement.textContent = car.mark;
        yearElement.textContent = car.year;
        doorsElement.textContent = car.doors;
        acElement.textContent = car.ac;
        transmissionElement.textContent = car.transmission;
        fuelElement.textContent = car.fuel;
    };

    setActiveModel('toyota'); // Set Toyota details as default

    carModelElements.forEach(element => {
        element.addEventListener('click', () => {
            // Remove active class from all h3 elements
            carModelElements.forEach(el => el.classList.remove('active'));

            // Add active class to the clicked h3 element
            element.classList.add('active');

            const modelKey = element.getAttribute('data-model');
            setActiveModel(modelKey);
        });
    });
});


const left = document.querySelector(".left");
const right = document.querySelector(".right");
const slider = document.querySelector(".slider");
const box = document.querySelectorAll(".testi-box");
const bottom = document.querySelector(".bottom")

let slideNumber = 0;  // Start at 0 (initial position)
const length = box.length;

for (let i = 0; i<length; i++) {
	const div = document.createElement("div");
	div.className = "button";
	bottom.appendChild(div);
}

const buttons = document.querySelectorAll(".button")
buttons[0].style.backgroundColor = "black";

const resetBg = () => {
	buttons.forEach((button) => {
		button.style.backgroundColor = "transparent";
	});

};

buttons.forEach((button ,i) => {
	button.addEventListener("click", () => {
		resetBg();
		slider.style.transform = `translateX(-${i * 350}px)`;
		slideNumber = i + 0;
		button.style.backgroundColor = "black";
	});
});


const nextSlide = () => {
    if (slideNumber < length - 1) {  // Ensure not to move beyond the last slide
        slideNumber += 1;  // Move by 2 slides
        slider.style.transform = `translateX(-${slideNumber * 350}px)`;
    } else {
        getFirstSlide();
         // Reset to the first if we are at the end
    }

    resetBg();
    buttons[slideNumber].style.backgroundColor = "black";
};

const prevSlide = () => {
    if (slideNumber > 0) {  // Ensure not to move before the first slide
        slideNumber -= 1;  // Move back by 2 slides
        slider.style.transform = `translateX(-${slideNumber * 350}px)`;

    } else {
        getLastSlide();
          // Reset to the last pair of slides if we are at the beginning
    }

    resetBg();
    buttons[slideNumber].style.backgroundColor = "black";
};

const getFirstSlide = () => {
    slider.style.transform = `translateX(0px)`;  // Reset to the first slide
    slideNumber = 0;
};

const getLastSlide = () => {
    slideNumber = length - 1;  // Move to the last pair of slides
    slider.style.transform = `translateX(-${slideNumber * 350}px)`;
};

right.addEventListener("click", () => {
    nextSlide();
    
});

left.addEventListener("click", () => {
    prevSlide();

});


const faqs = document.querySelectorAll(".faq");

faqs.forEach((faq) => {
    faq.addEventListener('click', () => {
        // Remove the 'active' class from all accordions
        faqs.forEach((item) => {
            if (item !== faq) {
                item.classList.remove('active');
            }
        });
        // Toggle the 'active' class on the clicked accordion
        faq.classList.toggle('active');
    });
});

const scrollUp = () => {
	const scrollUp = document.getElementById('scroll-up');
	this.scrollY >= 350 ? scrollUp.classList.add('show-scroll') : scrollUp.classList.remove('show-scroll')
};

window.addEventListener('scroll', scrollUp);






