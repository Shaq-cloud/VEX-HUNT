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
chat.classList.add('active');
document.body.style.overflow = 'hidden';
};


chatClose.onclick = () => {
chat.classList.remove('active');
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

/* ===== Reviews carousel: horizontal sliding, controls & autoplay ===== */
(function() {
  const reviewsGrid = document.querySelector('.reviews-grid');
  const prevBtn = document.querySelector('.reviews-prev');
  const nextBtn = document.querySelector('.reviews-next');
  if (!reviewsGrid) return;

  const getGap = () => parseInt(getComputedStyle(reviewsGrid).gap) || 22;
  const getCardWidth = () => {
    const card = reviewsGrid.querySelector('.review-card');
    return ((card ? card.offsetWidth : Math.round(reviewsGrid.clientWidth * 0.8)) + getGap());
  };

  if (nextBtn) nextBtn.addEventListener('click', () => reviewsGrid.scrollBy({ left: getCardWidth(), behavior: 'smooth' }));
  if (prevBtn) prevBtn.addEventListener('click', () => reviewsGrid.scrollBy({ left: -getCardWidth(), behavior: 'smooth' }));

  // Autoplay
  let reviewsAuto;
  const startReviewsAuto = () => { reviewsAuto = setInterval(() => reviewsGrid.scrollBy({ left: getCardWidth(), behavior: 'smooth' }), 4000); };
  const stopReviewsAuto = () => { clearInterval(reviewsAuto); };
  startReviewsAuto();

  reviewsGrid.addEventListener('mouseenter', stopReviewsAuto);
  reviewsGrid.addEventListener('mouseleave', startReviewsAuto);

  // Pause autoplay on focus (accessibility)
  reviewsGrid.addEventListener('focusin', stopReviewsAuto);
  reviewsGrid.addEventListener('focusout', startReviewsAuto);

  // Keyboard navigation when focused
  reviewsGrid.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { nextBtn && nextBtn.click(); }
    if (e.key === 'ArrowLeft') { prevBtn && prevBtn.click(); }
  });
})();


  // Select all vendor cards
  const vendorCards = document.querySelectorAll('.vendor-card');

  // Define online hours
  const onlineStart = 8;      // 8 AM
  const onlineEndHour = 24;   // 9 PM
  const onlineEndMinute = 30; // 9:30 PM

  function updateVendorStatusByTime() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    // Check if current time is within online hours
    const isOnline = (currentHour > onlineStart || (currentHour === onlineStart && currentMinute >= 0)) &&
                     (currentHour < onlineEndHour || (currentHour === onlineEndHour && currentMinute <= onlineEndMinute));

    // Update all vendor cards
    vendorCards.forEach(card => {
      const badge = card.querySelector('.vendor-status');
      const metaStatus = card.querySelector('.active, .inactive');

      if (isOnline) {
        badge.textContent = "Open";
        badge.classList.remove('closed');
        badge.classList.add('open');

        if(metaStatus){
          metaStatus.textContent = "● Active now";
          metaStatus.classList.remove('inactive');
          metaStatus.classList.add('active');
        }
      } else {
        badge.textContent = "Closed";
        badge.classList.remove('open');
        badge.classList.add('closed');

        if(metaStatus){
          metaStatus.textContent = "● Offline";
          metaStatus.classList.remove('active');
          metaStatus.classList.add('inactive');
        }
      }
    });
  }

  // Run initially
  updateVendorStatusByTime();

  // Optional: Update every 1 minute in case user leaves page open
  setInterval(updateVendorStatusByTime, 60000);


// ================= HERO TYPING EFFECT =================
(function heroTyping() {
  const wrap = document.querySelector('.hero-typing');
  if (!wrap) return;
  const text = wrap.getAttribute('data-text') || '';
  const target = wrap.querySelector('#type-text');
  const cursor = wrap.querySelector('.cursor');
  const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduce) {
    if (target) target.textContent = text;
    if (cursor) cursor.style.display = 'none';
    return;
  }

  const speed = 30; // ms per character
  let i = 0;

  function type() {
    if (i <= text.length) {
      if (target) target.textContent = text.slice(0, i);
      i++;
      setTimeout(type, speed);
    }
  }

  // Start typing after small delay so layout settles
  setTimeout(type, 400);
})();



