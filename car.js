// ================================
// AVAILABLE CARS DATA
// ================================
const carAvailable = {
  toyota: {
    image: "images/car1.jpeg",
    category: "Economy",
    model: "Toyota",
    ratings: "4.5",
    about: "Reliable and fuel-efficient sedan perfect for city driving",
    seats: "5 Seats",
    transmission: "Auto",
    fuel: "Petrol",
    price: "$45/day",
  },
  honda: {
    image: "images/car4.jpeg",
    category: "SUV",
    model: "Honda",
    ratings: "4.6",
    about: "Comfortable SUV for family trips",
    seats: "5 Seats",
    transmission: "Auto",
    fuel: "Gasoline",
    price: "$60/day",
  },
  rangeRover: {
    image: "images/car2.jpeg",
    category: "SUV",
    model: "Range Rover",
    ratings: "4.8",
    about: "Luxury SUV with powerful performance",
    seats: "5 Seats",
    transmission: "Auto",
    fuel: "Diesel",
    price: "$120/day",
  },
  bmw: {
    image: "images/car3.jpeg",
    category: "Luxury",
    model: "BMW",
    ratings: "4.7",
    about: "High-end luxury car with cutting-edge technology",
    seats: "5 Seats",
    transmission: "Auto",
    fuel: "Petrol",
    price: "$100/day",
  },
  kia: {
    image: "images/car5.jpeg",
    category: "Sports",
    model: "Kia Stinger",
    ratings: "4.5",
    about: "Sporty design with impressive speed and control",
    seats: "4 Seats",
    transmission: "Manual",
    fuel: "Petrol",
    price: "$80/day",
  },
  mazda: {
    image: "images/car6.jpeg",
    category: "Economy",
    model: "Mazda",
    ratings: "4.9",
    about: "Affordable sedan with great mileage",
    seats: "5 Seats",
    transmission: "Auto",
    fuel: "Petrol",
    price: "$50/day",
  },
};

// ================================
// HELPER FUNCTION
// ================================
function getCarByModel(modelName) {
  return Object.values(carAvailable).find(
    (car) => car.model.toLowerCase() === modelName.toLowerCase()
  );
}

// ================================
// EMAILJS + TOAST SETUP
// ================================
function sendEmail(templateId, booking) {
  const params = {
    email: booking.email,
    name: booking.fullName,
    vehicle: booking.vehicle,
    category: booking.category,
    pickup: booking.pickup,
    return: booking.return,
    location: booking.location,
    total: booking.total,
    phone: booking.phone,
  };

  emailjs
    .send("service_w2ifqf8", templateId, params)
    .then(() => showToast("Email sent successfully!"))
    .catch((error) => {
      console.error("Email failed:", error);
      showToast("Email failed to send", "error");
    });
}

function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 100);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

// ================================
// GENERATE CAR CARDS
// ================================
const carsGrid = document.querySelector(".cars-grid");

function displayCars(filterCategory = "All") {
  carsGrid.innerHTML = "";

  Object.values(carAvailable).forEach((car) => {
    if (
      filterCategory === "All" ||
      car.category.toLowerCase() === filterCategory.toLowerCase()
    ) {
      const carCard = document.createElement("div");
      carCard.classList.add("cars-card");
      carCard.innerHTML = `
        <img src="${car.image}" alt="${car.model}">
        <span class="label">${car.category}</span>
        <div class="car-details">
          <div class="car-name">
            <h1>${car.model}</h1>
            <span><i class="fa-solid fa-star"></i> <span>${car.ratings}</span></span>
          </div>
          <p>${car.about}</p>
          <div class="car-features">
            <div class="features"><i class="fa-light fa-user-group"></i><span>${car.seats}</span></div>
            <div class="features"><i class="fa-light fa-gear"></i><span>${car.transmission}</span></div>
            <div class="features"><i class="fa-light fa-gas-pump"></i><span>${car.fuel}</span></div>
          </div>
          <div class="price-book">
            <h2>${car.price}</h2>
            <button class="book-now-btn" data-model="${car.model}">Book Now</button>
          </div>
        </div>
      `;
      carsGrid.appendChild(carCard);
    }
  });

  attachBookingListeners();
}

// Display all cars initially
displayCars();

// ================================
// FILTER FUNCTIONALITY + FADE
// ================================
const filterLinks = document.querySelectorAll(".cars-link a");
filterLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    filterLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");

    const selectedCategory = link.textContent.trim();
    carsGrid.classList.add("fade-out");

    setTimeout(() => {
      displayCars(selectedCategory);
      carsGrid.classList.remove("fade-out");
    }, 400);
  });
});

// ================================
// BOOKING POPUP FUNCTIONALITY
// ================================
const bookingSection = document.querySelector(".booking-sec");
const bookingOverlay = document.querySelector(".booking-overlay");
const closeBookingBtn = document.querySelector(".close-booking");

function openBookingPopup(car) {
  document.getElementById("booking-car-img").src = car.image;
  document.getElementById("booking-car-name").textContent = car.model;
  document.getElementById("booking-car-category").textContent = car.category;
  document.getElementById("booking-car-price").textContent = car.price;

  // ✅ Set min date to today for pickup and return
  const today = new Date().toISOString().split("T")[0];
  document.querySelector('input[name="pickup"]').setAttribute("min", today);
  document.querySelector('input[name="return"]').setAttribute("min", today);

  bookingSection.classList.add("active");
  bookingOverlay.classList.add("active");
}

function closeBookingPopup() {
  bookingSection.classList.remove("active");
  bookingOverlay.classList.remove("active");
}

if (bookingOverlay) bookingOverlay.addEventListener("click", closeBookingPopup);
if (closeBookingBtn) closeBookingBtn.addEventListener("click", closeBookingPopup);

function attachBookingListeners() {
  document.querySelectorAll(".book-now-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const model = btn.getAttribute("data-model");
      const car = getCarByModel(model);
      if (car) openBookingPopup(car);
    });
  });
}

// ================================
// CONFIRMATION POPUP + LOCAL STORAGE
// ================================
const confirmSection = document.querySelector(".confirm-booking-sec");
const confirmBtn = document.querySelector(".booking-sec button");

function updateConfirmSection(booking) {
  document.getElementById("confirm-vehicle").textContent = booking.vehicle;
  document.getElementById("confirm-pickup").textContent = `${booking.pickup} at ${booking.location}`;
  document.getElementById("confirm-return").textContent = booking.return;
  document.getElementById("confirm-total").textContent = booking.total;
  document.querySelector(".confirm-message").textContent = `Your reservation for the ${booking.vehicle} has been confirmed. A confirmation email has been sent to ${booking.email}.`;
}

// ✅ Refresh reservations dynamically
function refreshReservations() {
  const container = document.querySelector(".reservations-grid");
  if (!container) return;

  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

  if (bookings.length === 0) {
    container.innerHTML = `
      <div class="no-bookings">
        <i class="fa-solid fa-calendar-days"></i>
        <h2>No bookings yet</h2>
        <p>Start exploring our premium vehicle collection and make your first reservation today</p>
        <button onclick="window.location.href='index.html'">Browse Cars</button>
      </div>`;
    return;
  }

  container.innerHTML = bookings
    .map(
      (b, index) => `
      <div class="reservations-card fade-in">
        <div class="reservations-img">
          <img src="${b.image}">
          <span class="label2">${b.category}</span>
          <span class="confirmlabel"><i class="fa-light fa-check"></i> ${b.status}</span>
        </div>
        <div class="reservations-cont">
          <h3>${b.vehicle}</h3>
          <div class="reservations-details">
            <div class="reservations-info"><i class="fa-light fa-calendar"></i> <p>Pick-up: ${b.pickup}</p></div>
            <div class="reservations-info"><i class="fa-light fa-calendar"></i> <p>Return: ${b.return}</p></div>
            <div class="reservations-info"><i class="fa-light fa-location-dot"></i> <p>${b.location}</p></div>
          </div>
          <hr>
          <div class="reservations-x">
            <div class="reservations-price">
              <p>Total Price</p>
              <h1>${b.total}</h1>
            </div>
            <div class="cancel-btn" data-index="${index}">
              <i class="fa-light fa-circle-xmark"></i>
              <span>Cancel</span>
            </div>
          </div>
        </div>
      </div>`
    )
    .join("");

  attachCancelListeners();
}

// ================================
// CANCEL RESERVATION HANDLER
// ================================
function attachCancelListeners() {
  document.querySelectorAll(".cancel-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = btn.getAttribute("data-index");
      let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
      const cancelledBooking = bookings[index];

      Swal.fire({
        title: "Cancel Reservation?",
        text: `Are you sure you want to cancel your ${cancelledBooking.vehicle} booking?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#2563EB",
        cancelButtonColor: "#6B7280",
        confirmButtonText: "Yes, Cancel It",
      }).then((result) => {
        if (result.isConfirmed) {
          sendEmail("template_xc0g7yx", cancelledBooking);
          bookings.splice(index, 1);
          localStorage.setItem("bookings", JSON.stringify(bookings));
          refreshReservations();
          showToast("Reservation cancelled", "success");
        }
      });
    });
  });
}

// ================================
// BOOKING CONFIRMATION
// ================================
if (confirmBtn) {
  confirmBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const form = document.getElementById("booking-form");
    const fullName = form.querySelector('input[name="fullName"]').value.trim();
    const email = form.querySelector('input[name="email"]').value.trim();
    const phone = form.querySelector('input[name="phone"]').value.trim();
    const location = form.querySelector('input[name="location"]').value.trim();
    const pickupDate = form.querySelector('input[name="pickup"]').value;
    const returnDate = form.querySelector('input[name="return"]').value;

    if (!fullName || !email || !phone || !location || !pickupDate || !returnDate) {
      showToast("Please fill in all fields!", "error");
      return;
    }

    // ✅ Prevent selecting yesterday or past dates
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const pickup = new Date(pickupDate);
    const ret = new Date(returnDate);

    if (pickup < today) {
      showToast("Pickup date cannot be in the past!", "error");
      return;
    }

    if (ret < pickup) {
      showToast("Return date cannot be before pickup date!", "error");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      showToast("Please enter a valid email!", "error");
      return;
    }

    const carName = document.getElementById("booking-car-name").textContent;
    const carData = getCarByModel(carName);
    const pricePerDay = Number(carData.price.replace(/[^0-9]/g, ""));
    const days = Math.max(
      1,
      (new Date(returnDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24)
    );
    const totalPrice = `$${pricePerDay * days}`;

    const bookingInfo = {
      fullName,
      email,
      phone,
      vehicle: carName,
      pickup: pickupDate,
      return: returnDate,
      location,
      total: totalPrice,
      image: carData?.image || "images/default-car.jpg",
      category: carData?.category || "General",
      status: "Confirmed",
    };

    const existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    existingBookings.push(bookingInfo);
    localStorage.setItem("bookings", JSON.stringify(existingBookings));

    sendEmail("template_l0xgcpi", bookingInfo);

    updateConfirmSection(bookingInfo);
    bookingSection.classList.remove("active");
    bookingOverlay.classList.remove("active");

    confirmSection.classList.remove("hidden");
    confirmSection.classList.add("visible");

    form.reset();
    refreshReservations();
    showToast("Reservation booked successfully!", "success");
  });
}

// ================================
// CLOSE CONFIRMATION
// ================================
function closeConfirmation() {
  confirmSection.classList.remove("visible");
  confirmSection.classList.add("hidden");
}
document.querySelectorAll("#close-confirm, .close-confirm").forEach((btn) => {
  if (btn) btn.addEventListener("click", closeConfirmation);
});

// ================================
// INITIAL RESERVATION LOAD
// ================================
document.addEventListener("DOMContentLoaded", refreshReservations);
