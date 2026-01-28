// ================= Our Process Scroll Animation =================
const steps = document.querySelectorAll(".timeline-step");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      if(entry.target.classList.contains("left")) {
        entry.target.classList.add("show-left");
      } else {
        entry.target.classList.add("show-right");
      }
    }
  });
}, {
  threshold: 0.3
});

steps.forEach(step => observer.observe(step));
const pricingCards = document.querySelectorAll(".reveal-on-scroll");

const pricingObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, { threshold: 0.2 });

pricingCards.forEach(card => pricingObserver.observe(card));




// ================= FADE-IN ON SCROLL =================
const faders = document.querySelectorAll(".fade-in");

const appearOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});
const menuBtn = document.getElementById('vhMenuBtn');
const closeMenu = document.getElementById('vhCloseMenu');
const mobileMenu = document.getElementById('vhMobileMenu');


menuBtn.onclick = () => mobileMenu.classList.add('active');
closeMenu.onclick = () => mobileMenu.classList.remove('active');


const chatBtn = document.getElementById('vhChatBtn');
const chat = document.getElementById('vhChat');
const chatClose = document.getElementById('vhChatClose');


chatBtn.onclick = () => {
  if (chat.classList.contains('active')) {
    chat.classList.remove('active');
    chatBtn.classList.remove('active');
    document.body.style.overflow = 'auto';
  } else {
    chat.classList.add('active');
    chatBtn.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};


chatClose.onclick = () => {
  chat.classList.remove('active');
  chatBtn.classList.remove('active');
  document.body.style.overflow = 'auto';
};
const slides = document.querySelectorAll('.slide');

let currentIndex = 0;
const intervalTime = 2000; // 2 seconds
let sliderInterval;

function updateSlides() {
  slides.forEach((slide, index) => {
    slide.classList.remove('active', 'left', 'right');

    if (index === currentIndex) {
      slide.classList.add('active');
    } else if (index === (currentIndex - 1 + slides.length) % slides.length) {
      slide.classList.add('left');
    } else if (index === (currentIndex + 1) % slides.length) {
      slide.classList.add('right');
    }
  });
}

function startAutoSlide() {
  sliderInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlides();
  }, intervalTime);
}

function stopAutoSlide() {
  clearInterval(sliderInterval);
}

/* Pause on hover (optional but classy) */
const slider = document.querySelector('.hero-slider');
slider.addEventListener('mouseenter', stopAutoSlide);
slider.addEventListener('mouseleave', startAutoSlide);

updateSlides();
startAutoSlide();
