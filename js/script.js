const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn?.addEventListener("click", () => {
  nav.classList.toggle("open");
  menuBtn.textContent = nav.classList.contains("open") ? "✕" : "☰";
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuBtn.textContent = "☰";
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const reviews = [
  {
    text: "“Excellent service and genuine pricing. My BMW was repaired perfectly and delivered on time.”",
    name: "Rahul Shah",
    car: "BMW Owner"
  },
  {
    text: "“Best multibrand workshop in Ahmedabad. Professional staff and transparent billing.”",
    name: "Priya Patel",
    car: "Hyundai Creta"
  },
  {
    text: "“Amazing detailing service. My car looks brand new again. Highly recommended.”",
    name: "Vivek Mehta",
    car: "Honda City"
  }
];

let reviewIndex = 0;
const reviewText = document.getElementById("reviewText");
const reviewName = document.getElementById("reviewName");
const reviewCar = document.getElementById("reviewCar");
const reviewCard = document.getElementById("reviewCard");

function showReview(index) {
  reviewCard.style.opacity = "0";
  reviewCard.style.transform = "translateY(8px)";
  setTimeout(() => {
    const review = reviews[index];
    reviewText.textContent = review.text;
    reviewName.textContent = review.name;
    reviewCar.textContent = review.car;
    reviewCard.style.opacity = "1";
    reviewCard.style.transform = "translateY(0)";
  }, 150);
}

document.getElementById("prevReview")?.addEventListener("click", () => {
  reviewIndex = (reviewIndex - 1 + reviews.length) % reviews.length;
  showReview(reviewIndex);
});

document.getElementById("nextReview")?.addEventListener("click", () => {
  reviewIndex = (reviewIndex + 1) % reviews.length;
  showReview(reviewIndex);
});

setInterval(() => {
  reviewIndex = (reviewIndex + 1) % reviews.length;
  showReview(reviewIndex);
}, 6000);

const form = document.getElementById("appointmentForm");
const formMessage = document.getElementById("formMessage");

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const name = data.get("name");
  const phone = data.get("phone");
  const service = data.get("service");
  const date = data.get("date");

  const message =
    `Hello Rudolf Auto Care,%0A%0A` +
    `I would like to book an appointment.%0A` +
    `Name: ${encodeURIComponent(name)}%0A` +
    `Phone: ${encodeURIComponent(phone)}%0A` +
    `Service: ${encodeURIComponent(service)}%0A` +
    `Preferred Date: ${encodeURIComponent(date)}%0A`;

  formMessage.textContent = "Opening WhatsApp with your appointment details...";
  window.open(`https://wa.me/919825880187?text=${message}`, "_blank");
  form.reset();
});

document.getElementById("year").textContent = new Date().getFullYear();
