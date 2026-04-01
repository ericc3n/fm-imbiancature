// ─── NAVBAR SCROLL ───
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 30);
});

// ─── HAMBURGER MENU ───
function toggleMenu() {
  const links = document.querySelector(".nav-links");
  links.style.display = links.style.display === "flex" ? "none" : "flex";
  if (links.style.display === "flex") {
    Object.assign(links.style, {
      flexDirection: "column",
      position: "absolute",
      top: "72px",
      left: 0,
      right: 0,
      background: "#fff",
      padding: "1.5rem 5vw",
      gap: "1.2rem",
      borderBottom: "1px solid #e8e8e8",
      zIndex: 99,
    });
  }
}

// ─── INTERSECTION OBSERVER ───
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Counter animation
        if (entry.target.id === "counterNum") {
          animateCounter(entry.target, 1324, 1800);
          entry.target.classList.add("visible-num");
        }
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 },
);

document
  .querySelectorAll(".fade-up, #counterNum")
  .forEach((el) => observer.observe(el));

// ─── COUNTER ANIMATION ───
function animateCounter(el, target, duration) {
  const start = performance.now();
  const update = (time) => {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target).toLocaleString("it-IT");
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

// ─── CAROUSEL ───
const track = document.getElementById("carouselTrack");
const cards = track.querySelectorAll(".testi-card");
let currentIndex = 0;
let autoAdvance;
let startX = 0;

function getVisible() {
  if (window.innerWidth <= 768) return 1;
  if (window.innerWidth <= 1200) return 2;
  return 3;
}

function updateCarousel(animate = true) {
  const visible = getVisible();
  const total = cards.length;
  const maxIndex = total - visible;
  currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));
  const cardWidth = cards[0].offsetWidth + 24; // gap
  track.style.transition = animate
    ? "transform 0.5s cubic-bezier(0.4,0,0.2,1)"
    : "none";
  track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}

document.getElementById("prevBtn").addEventListener("click", () => {
  currentIndex = Math.max(0, currentIndex - 1);
  updateCarousel();
  resetAuto();
});

document.getElementById("nextBtn").addEventListener("click", () => {
  const visible = getVisible();
  currentIndex = (currentIndex + 1) % (cards.length - visible + 1);
  updateCarousel();
  resetAuto();
});

// Touch support
track.addEventListener(
  "touchstart",
  (e) => {
    startX = e.touches[0].clientX;
  },
  { passive: true },
);
track.addEventListener("touchend", (e) => {
  const diff = startX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 40) {
    if (diff > 0) {
      currentIndex = Math.min(currentIndex + 1, cards.length - getVisible());
    } else {
      currentIndex = Math.max(0, currentIndex - 1);
    }
    updateCarousel();
    resetAuto();
  }
});

function resetAuto() {
  clearInterval(autoAdvance);
  autoAdvance = setInterval(() => {
    const visible = getVisible();
    currentIndex = (currentIndex + 1) % (cards.length - visible + 1);
    updateCarousel();
  }, 4000);
}

window.addEventListener("resize", () => updateCarousel(false));
resetAuto();

// ─── SMOOTH SCROLL ───
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const target = document.querySelector(a.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      // Close mobile menu
      const links = document.querySelector(".nav-links");
      if (window.innerWidth <= 768) links.style.display = "none";
    }
  });
});
