import './style.css'

// DOM Elements
const menuBtn = document.getElementById('menuBtn');
const closeBtn = document.getElementById('closeBtn');
const sideMenu = document.getElementById('sideMenu');
const menuOverlay = document.getElementById('menuOverlay');
const headerTitle = document.getElementById('headerTitle');
const menuLinks = document.querySelectorAll('.menu-list a');
const pages = document.querySelectorAll('.page-content');

// --- Side Menu Logic ---
function toggleMenu() {
  const isActive = sideMenu.classList.contains('active');
  if (isActive) {
    sideMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = ''; // Enable scroll
  } else {
    sideMenu.classList.add('active');
    menuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Disable scroll
  }
}

menuBtn.addEventListener('click', toggleMenu);
closeBtn.addEventListener('click', toggleMenu);
menuOverlay.addEventListener('click', toggleMenu);

// --- SPA Routing & Title Logic ---
const pageTitles = {
  'home': 'HAEJWO',
  'rentcar': '렌트카',
  'accom': '숙박',
  'visa': '비자'
};

menuLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('data-page');

    // 1. Update Menu Active State
    menuLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');

    // 2. Change Header Title
    headerTitle.style.opacity = '0';
    setTimeout(() => {
      headerTitle.innerText = pageTitles[targetId] || 'HAEJWO';
      headerTitle.style.opacity = '1';
    }, 200);

    // 3. Switch Page Content
    pages.forEach(page => {
      page.classList.remove('active');
      if (page.id === `page-${targetId}`) {
        // Scroll to top when switching pages
        window.scrollTo(0, 0);
        setTimeout(() => {
          page.classList.add('active');
        }, 50); // slight delay for animation
      }
    });

    // 4. Close Menu
    toggleMenu();
  });
});

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
  // Ensure Home is active
  document.getElementById('page-home').classList.add('active');
});

// Header Scroll Effect (Modified)
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
animatedElements.forEach(el => observer.observe(el));

// Smooth Scroll for Anchor Links (Backup just in case CSS smooth-scroll fails)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Form Handling Logic Removed per User Request
