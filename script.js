// --- Intersection Observer for Scroll Animations ---
document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target); // Animate only once
      }
    });
  }, observerOptions);

  document.querySelectorAll(".fade-in-up").forEach((el) => {
    observer.observe(el);
  });

  // --- Vanilla JS Carousel ---
  const track = document.getElementById("testimonial-track");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  let currentIndex = 0;
  const totalCards = document.querySelectorAll(".testimonial-card").length;
  let autoPlayInterval;

  function getVisibleCards() {
    if (window.innerWidth >= 1200) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  }

  function updateCarousel() {
    const visibleCards = getVisibleCards();
    const maxIndex = totalCards - visibleCards;

    // Boundaries
    if (currentIndex > maxIndex) currentIndex = 0;
    if (currentIndex < 0) currentIndex = maxIndex;

    const percentage = currentIndex * (100 / visibleCards);
    track.style.transform = `translateX(-${percentage}%)`;
  }

  function nextSlide() {
    currentIndex++;
    updateCarousel();
    resetInterval();
  }

  function prevSlide() {
    currentIndex--;
    updateCarousel();
    resetInterval();
  }

  function startInterval() {
    autoPlayInterval = setInterval(nextSlide, 4000); // 4 seconds auto-advance
  }

  function resetInterval() {
    clearInterval(autoPlayInterval);
    startInterval();
  }

  // Event Listeners
  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);
  window.addEventListener("resize", updateCarousel);

  // Init Carousel
  updateCarousel();
  startInterval();
});

// --- Mobile Menu Toggle ---
const menuToggle = document.getElementById("menu-toggle");
const navContent = document.getElementById("nav-content");
const navLinksAnchors = document.querySelectorAll(".nav-links a");

// Apri/Chiudi il menu cliccando sull'hamburger
menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  navContent.classList.toggle("active");
});

// Chiudi il menu automaticamente quando si clicca su un link
navLinksAnchors.forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("active");
    navContent.classList.remove("active");
  });
});
