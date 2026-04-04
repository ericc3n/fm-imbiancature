document.addEventListener("DOMContentLoaded", () => {
  // --- Scroll Animations ---
  const scrollObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { root: null, rootMargin: "0px", threshold: 0.1 },
  );

  document.querySelectorAll(".fade-in-up, .gallery-item").forEach((el) => {
    scrollObserver.observe(el);
  });

  // --- Carousel ---
  const track = document.getElementById("testimonial-track");
  const carouselPrev = document.getElementById("prev-btn");
  const carouselNext = document.getElementById("next-btn");

  if (track && carouselPrev && carouselNext) {
    let carouselIndex = 0;
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
      if (carouselIndex > maxIndex) carouselIndex = 0;
      if (carouselIndex < 0) carouselIndex = maxIndex;
      track.style.transform = `translateX(-${carouselIndex * (100 / visibleCards)}%)`;
    }

    function nextSlide() {
      carouselIndex++;
      updateCarousel();
      resetInterval();
    }
    function prevSlide() {
      carouselIndex--;
      updateCarousel();
      resetInterval();
    }
    function startInterval() {
      autoPlayInterval = setInterval(nextSlide, 4000);
    }
    function resetInterval() {
      clearInterval(autoPlayInterval);
      startInterval();
    }

    carouselNext.addEventListener("click", nextSlide);
    carouselPrev.addEventListener("click", prevSlide);
    window.addEventListener("resize", updateCarousel);
    updateCarousel();
    startInterval();
  }

  // --- Mobile Menu ---
  const menuToggle = document.getElementById("menu-toggle");
  const navContent = document.getElementById("nav-content");

  if (menuToggle && navContent) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active");
      navContent.classList.toggle("active");
    });

    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("active");
        navContent.classList.remove("active");
      });
    });
  }

  // --- Lightbox ---
  const galleryImgs = Array.from(
    document.querySelectorAll(".gallery-item img"),
  );
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.getElementById("lightbox-close");
  const lightboxPrev = document.getElementById("lightbox-prev");
  const lightboxNext = document.getElementById("lightbox-next");

  if (lightbox && galleryImgs.length > 0) {
    let lightboxIndex = 0;

    function openLightbox(index) {
      lightboxIndex = index;
      lightboxImg.src = galleryImgs[index].src;
      lightboxImg.alt = galleryImgs[index].alt;
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
      lightbox.classList.remove("active");
      document.body.style.overflow = "";
    }

    function showPrev() {
      lightboxIndex =
        (lightboxIndex - 1 + galleryImgs.length) % galleryImgs.length;
      lightboxImg.src = galleryImgs[lightboxIndex].src;
    }

    function showNext() {
      lightboxIndex = (lightboxIndex + 1) % galleryImgs.length;
      lightboxImg.src = galleryImgs[lightboxIndex].src;
    }

    galleryImgs.forEach((img, i) => {
      img.parentElement.addEventListener("click", () => openLightbox(i));
    });

    lightboxClose.addEventListener("click", closeLightbox);
    lightboxPrev.addEventListener("click", showPrev);
    lightboxNext.addEventListener("click", showNext);

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("active")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    });
  }
});
