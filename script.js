/* ════════════════════════════════════════
   PORTFOLIO — SCRIPT.JS
   ════════════════════════════════════════ */

// ── SCROLL REVEAL ──────────────────────
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
      const idx = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = (idx * 80) + 'ms';
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

// ── SKILL BAR ANIMATION ────────────────
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      skillObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.skill-card').forEach(card => skillObserver.observe(card));

// ── NAV SHRINK ON SCROLL ───────────────
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.style.padding = window.scrollY > 60 ? '14px 6vw' : '20px 6vw';
});

// ── FORM SUBMIT FEEDBACK ───────────────
function handleSubmit(btn) {
  const name = document.getElementById('contactName')?.value.trim() || 'Visitor';
  const email = document.getElementById('contactEmail')?.value.trim() || 'No email provided';
  const subject = document.getElementById('contactSubject')?.value.trim() || 'No subject';
  const message = document.getElementById('contactMessage')?.value.trim() || 'No message provided.';
  const phoneNumber = '201550469016';
  const whatsappText = `Hello! I received a message from your portfolio website.

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}`;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappText)}`;

  window.open(whatsappUrl, '_blank');

  btn.textContent = 'Sending...';
  btn.style.opacity = '0.7';
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = '✓ Message Sent!';
    btn.style.opacity = '1';
    btn.style.background = 'linear-gradient(135deg, #c8b89a, #a89070)';

    setTimeout(() => {
      btn.textContent = 'Send Message ✈️';
      btn.style.background = '';
      btn.style.opacity = '';
      btn.disabled = false;
    }, 3000);
  }, 1400);
}

// ── CURSOR GLOW ────────────────────────
const glow = document.createElement('div');
glow.id = 'cursor-glow';
glow.style.cssText = `
  position: fixed;
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0,80,70,0.18) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
  transform: translate(-50%, -50%);
  top: 0;
  left: 0;
  transition: left .12s ease, top .12s ease;
`;
document.body.appendChild(glow);

document.addEventListener('mousemove', e => {
  glow.style.left = e.clientX + 'px';
  glow.style.top  = e.clientY + 'px';
});

// ── ACTIVE NAV LINK HIGHLIGHT ──────────
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = 'var(--accent)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ── PROJECT PREVIEW CLICK
const previewOverlays = document.querySelectorAll('.preview-overlay');
previewOverlays.forEach(overlay => {
  overlay.addEventListener('click', () => {
    const previewImg = overlay.closest('.project-preview')?.querySelector('.project-preview-img');
    if (previewImg?.src) {
      window.open(previewImg.src, '_blank');
    }
  });
});
