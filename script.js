// ==============================
// NAV SCROLL EFFECT
// ==============================
window.addEventListener('scroll', function () {
    const nav = document.querySelector('nav');
    if (window.scrollY > 0) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// ==============================
// SIDEMENU TOGGLE
// ==============================
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

if (overlay) overlay.addEventListener('click', closemenu);
navLinks.forEach(link => link.addEventListener('click', closemenu));


// ==============================
// CAR DETAILS
// ==============================
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

    const setActiveModel = (modelKey) => {
        const car = carDetails[modelKey];
        carImage.src = car.image;
        carPrice.innerHTML = `<span class="amount">${car.price}</span>`;
        modelElement.textContent = car.model;
        markElement.textContent = car.mark;
        yearElement.textContent = car.year;
        doorsElement.textContent = car.doors;
        acElement.textContent = car.ac;
        transmissionElement.textContent = car.transmission;
        fuelElement.textContent = car.fuel;
    };

    setActiveModel('toyota');

    carModelElements.forEach(element => {
        element.addEventListener('click', () => {
            carModelElements.forEach(el => el.classList.remove('active'));
            element.classList.add('active');
            const modelKey = element.getAttribute('data-model');
            setActiveModel(modelKey);
        });
    });
});

// ==============================
// TESTIMONIAL SLIDER
// ==============================
const left = document.querySelector(".left");
const right = document.querySelector(".right");
const slider = document.querySelector(".slider");
const box = document.querySelectorAll(".testi-box");
const bottom = document.querySelector(".bottom");

let slideNumber = 0;
const length = box.length;

for (let i = 0; i < length; i++) {
    const div = document.createElement("div");
    div.className = "button";
    bottom.appendChild(div);
}

const buttons = document.querySelectorAll(".button");
if (buttons[0]) buttons[0].style.backgroundColor = "black";

const resetBg = () => {
    buttons.forEach(button => button.style.backgroundColor = "transparent");
};

buttons.forEach((button, i) => {
    button.addEventListener("click", () => {
        resetBg();
        slider.style.transform = `translateX(-${i * 350}px)`;
        slideNumber = i;
        button.style.backgroundColor = "black";
    });
});

const nextSlide = () => {
    if (slideNumber < length - 1) {
        slideNumber++;
        slider.style.transform = `translateX(-${slideNumber * 350}px)`;
    } else {
        getFirstSlide();
    }
    resetBg();
    buttons[slideNumber].style.backgroundColor = "black";
};

const prevSlide = () => {
    if (slideNumber > 0) {
        slideNumber--;
        slider.style.transform = `translateX(-${slideNumber * 350}px)`;
    } else {
        getLastSlide();
    }
    resetBg();
    buttons[slideNumber].style.backgroundColor = "black";
};

function getFirstSlide() {
    slider.style.transform = `translateX(0px)`;
    slideNumber = 0;
}

function getLastSlide() {
    slideNumber = length - 1;
    slider.style.transform = `translateX(-${slideNumber * 350}px)`;
}

if (right) right.addEventListener("click", nextSlide);
if (left) left.addEventListener("click", prevSlide);

// ==============================
// FAQ ACCORDION
// ==============================
const faqs = document.querySelectorAll(".faq");
faqs.forEach(faq => {
    faq.addEventListener('click', () => {
        faqs.forEach(item => {
            if (item !== faq) item.classList.remove('active');
        });
        faq.classList.toggle('active');
    });
});

// ==============================
// SCROLL-UP BUTTON
// ==============================
const scrollUp = () => {
    const scrollUp = document.getElementById('scroll-up');
    if (!scrollUp) return;
    window.scrollY >= 350
        ? scrollUp.classList.add('show-scroll')
        : scrollUp.classList.remove('show-scroll');
};
window.addEventListener('scroll', scrollUp);
