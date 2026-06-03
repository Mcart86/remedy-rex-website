// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger?.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  const [s1, s2, s3] = hamburger.querySelectorAll('span');
  s1.style.transform = open ? 'rotate(45deg) translate(6px,6px)' : '';
  s2.style.opacity  = open ? '0' : '1';
  s3.style.transform = open ? 'rotate(-45deg) translate(6px,-6px)' : '';
});

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
  .forEach(el => revealObserver.observe(el));

// ===== STAGGERED CARD REVEALS =====
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const cards = entry.target.querySelectorAll('.rental-card, .strip-item, .testi-card, .value-card, .why-list li, .gallery-item');
      cards.forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${i * 0.08}s, transform 0.6s cubic-bezier(0.34,1.2,0.64,1) ${i * 0.08}s`;
        requestAnimationFrame(() => {
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        });
      });
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.cards-grid, .strip-scroll, .testi-grid, .values-grid, .why-list, .gallery-masonry, .inventory-grid')
  .forEach(el => cardObserver.observe(el));

// ===== COUNTER ANIMATION =====
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.prefix || '';
  const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
  const duration = 2000;
  const start = performance.now();
  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = eased * target;
    el.textContent = prefix + value.toFixed(decimals) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('[data-target]').forEach(animateCounter);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stats-grid').forEach(el => counterObserver.observe(el));

// ===== HERO PARTICLES =====
function createParticles() {
  const container = document.querySelector('.hero-particles');
  if (!container) return;
  const colors = ['#FF6B2B','#FFD600','#FF3FA4','#00ADEF','#00C97A'];
  const emojis = ['🎈','⭐','✨','🎉','🎊'];
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 8 + 4;
    const useEmoji = Math.random() > 0.7;
    if (useEmoji) {
      p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      p.style.cssText = `
        left: ${Math.random() * 100}%;
        font-size: ${Math.random() * 16 + 10}px;
        animation-duration: ${Math.random() * 12 + 10}s;
        animation-delay: ${Math.random() * 10}s;
        opacity: 0.4;
      `;
    } else {
      p.style.cssText = `
        left: ${Math.random() * 100}%;
        width: ${size}px; height: ${size}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        opacity: ${Math.random() * 0.3 + 0.1};
        animation-duration: ${Math.random() * 15 + 10}s;
        animation-delay: ${Math.random() * 10}s;
      `;
    }
    container.appendChild(p);
  }
}
createParticles();

// ===== GALLERY LIGHTBOX =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
document.querySelectorAll('.gallery-item img').forEach(img => {
  img.addEventListener('click', () => {
    if (lightbox && lightboxImg) {
      lightboxImg.src = img.src;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  });
});
document.getElementById('lightboxClose')?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
function closeLightbox() {
  lightbox?.classList.remove('open');
  document.body.style.overflow = '';
}

// ===== CONTACT FORM =====
document.getElementById('quoteForm')?.addEventListener('submit', e => {
  e.preventDefault();
  const success = document.getElementById('formSuccess');
  if (success) {
    success.style.display = 'block';
    e.target.reset();
    success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => success.style.display = 'none', 6000);
  }
});

// ===== SMOOTH HOVER TILT on cards =====
document.querySelectorAll('.rental-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `translateY(-10px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
