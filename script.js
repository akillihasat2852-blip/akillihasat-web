/* ── SCROLL ANIMATIONS ───────────────────────────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } }),
  { threshold: 0.12 }
);
revealEls.forEach(el => revealObserver.observe(el));

/* ── NAVBAR SCROLL ───────────────────────────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

/* ── COUNTER ANIMATION ───────────────────────────────────────────────────── */
function animateCounter(el, target, duration = 1800) {
  let start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const statVals = document.querySelectorAll('.stat-val');
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const target = parseInt(e.target.dataset.target);
        animateCounter(e.target, target);
        statsObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.5 }
);
statVals.forEach(el => statsObserver.observe(el));

/* ── PARTICLE SYSTEM ─────────────────────────────────────────────────────── */
(function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const count = 30;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    const size = Math.random() * 3 + 1;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const dur = Math.random() * 15 + 10;
    const delay = Math.random() * 10;
    p.style.cssText = `
      position: absolute;
      left: ${x}%; top: ${y}%;
      width: ${size}px; height: ${size}px;
      border-radius: 50%;
      background: rgba(34,211,238,${Math.random() * 0.5 + 0.1});
      animation: floatParticle ${dur}s ${delay}s ease-in-out infinite;
    `;
    container.appendChild(p);
  }

  const style = document.createElement('style');
  style.textContent = `
    @keyframes floatParticle {
      0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
      33% { transform: translateY(-${Math.random() * 40 + 20}px) translateX(${Math.random() * 20 - 10}px); opacity: 0.8; }
      66% { transform: translateY(${Math.random() * 20 + 10}px) translateX(${Math.random() * 20 - 10}px); opacity: 0.5; }
    }
  `;
  document.head.appendChild(style);
})();

/* ── MOBILE MENU ─────────────────────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
const navCta = document.querySelector('.nav-cta');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.style.display === 'flex';
  if (isOpen) {
    navLinks.style.display = '';
    navCta.style.display = '';
  } else {
    navLinks.style.cssText = `
      display: flex !important;
      flex-direction: column;
      position: fixed;
      top: 70px; left: 0; right: 0;
      background: rgba(13,18,32,0.98);
      backdrop-filter: blur(20px);
      padding: 1.5rem;
      border-bottom: 1px solid rgba(255,255,255,.07);
      gap: 0.5rem;
      z-index: 999;
    `;
    navCta.style.cssText = `
      display: block !important;
      margin: 1rem 1.5rem;
      position: fixed;
      top: calc(70px + 220px); left: 0; right: 0;
      z-index: 999;
      text-align: center;
    `;
  }
});

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.style.display = '';
    navCta.style.display = '';
  });
});

/* ── ACTIVE NAV LINK ─────────────────────────────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    if (window.scrollY >= top) current = sec.id;
  });
  navLinkEls.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--accent)' : '';
  });
}, { passive: true });

/* ── CONTACT FORM ────────────────────────────────────────────────────────── */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  btn.style.opacity = '.7';
  btn.style.pointerEvents = 'none';

  // Simulate send
  setTimeout(() => {
    contactForm.style.display = 'none';
    formSuccess.style.display = 'block';
  }, 1200);
});

/* ── HERO IMAGE FALLBACK ─────────────────────────────────────────────────── */
const heroImg = document.getElementById('heroImg');
if (heroImg) {
  heroImg.addEventListener('error', () => {
    heroImg.closest('.hero-img-wrapper').style.background = 'linear-gradient(135deg, #0d1220, #1e293b)';
    heroImg.style.display = 'none';
  });
}

/* ── SMOOTH SCROLL OFFSET ────────────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const id = anchor.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
