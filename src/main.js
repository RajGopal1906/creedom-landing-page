// ── FAQ Data from creedom.ai ──
const faqData = [
  {
    q: "Is there a free trial available?",
    a: "Yes. Every new creator can start with a free plan and explore the core features of Creedom AI. You can try the audit, feedback, and content tools before deciding to upgrade."
  },
  {
    q: "Who is Creedom.ai for?",
    a: "Creedom.ai is built for content creators who want to grow with clarity and consistency. It's especially useful for talk-based or educational creators, solo creators building personal brands, social commerce creators who want to turn content into sales, creators stuck at a growth plateau, and anyone who wants feedback, ideas, and scripts in one place."
  },
  {
    q: "What does Creedom.ai actually do?",
    a: "Creedom.ai acts as your creator companion across your workflow. It helps you analyse your profile and posts, get feedback on your videos and scripts, generate better content ideas, build scripts faster, understand what to post next, reply to comments intelligently, send DMs on your behalf, keep an eye on trends in your niche, and see what your competitors are doing. Instead of guessing, you get clear actions."
  },
  {
    q: "Do I have to connect my social media accounts?",
    a: "No, it's optional. You can use idea generation, scripts, and other tools without connecting your accounts. But connecting your Instagram or YouTube helps Creedom give you personalised feedback and insights."
  },
  {
    q: "Is it safe to connect my account?",
    a: "Yes, you can connect your account safely. Creedom is an official partner with Meta and YouTube."
  },
  {
    q: "How is this different from other AI tools?",
    a: "Most AI tools are built for single tasks like writing captions or editing videos. Creedom is different — it's a companion across your entire content workflow: feedback on what you already posted, ideas for what to post next, scripts to execute faster, and insights to improve over time. It focuses on clarity and growth, not just content generation."
  },
  {
    q: "Will this help me grow faster?",
    a: "Creedom doesn't promise virality. Creedom helps you across your entire content workflow. As your content improves step by step, your growth follows naturally. You grow along with Creedom."
  }
];

// ── Render FAQs ──
function renderFAQs() {
  const list = document.getElementById('faq-list');
  if (!list) return;
  list.innerHTML = faqData.map((item, i) => `
    <div class="faq__item" data-animate="fade-up" data-delay="${i * 80}" id="faq-item-${i}">
      <div class="faq__header">
        <div class="faq__q">${item.q}</div>
        <div class="faq__chev">+</div>
      </div>
      <div class="faq__answer">
        <div class="faq__answer-inner">${item.a}</div>
      </div>
    </div>
  `).join('');

  // Accordion behavior
  list.querySelectorAll('.faq__item').forEach(item => {
    item.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      list.querySelectorAll('.faq__item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });
}

// ── Scroll animations (IntersectionObserver) ──
function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay || '0');
        setTimeout(() => entry.target.classList.add('visible'), delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
}

// ── Navbar scroll effect ──
function initNavbar() {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  // Hamburger menu
  const hamburger = document.getElementById('hamburger');
  const navlinks = document.getElementById('navlinks');
  if (hamburger && navlinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navlinks.classList.toggle('open');
    });
    navlinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navlinks.classList.remove('open');
      });
    });
  }
}

// ── Draw radial connector lines ──
function drawLines() {
  const diagram = document.getElementById('radial-diagram');
  const svg = document.getElementById('radial-lines');
  if (!diagram || !svg) return;

  const dRect = diagram.getBoundingClientRect();
  svg.setAttribute('viewBox', `0 0 ${dRect.width} ${dRect.height}`);
  svg.innerHTML = '';

  const hub = diagram.querySelector('.radial__hub');
  if (!hub) return;
  const hubRect = hub.getBoundingClientRect();
  const cx = hubRect.left + hubRect.width / 2 - dRect.left;
  const cy = hubRect.top + hubRect.height / 2 - dRect.top;
  const hubR = Math.max(hubRect.width, hubRect.height) / 2 + 24;

  // Hide lines on mobile
  if (window.innerWidth <= 1024) { svg.innerHTML = ''; return; }

  diagram.querySelectorAll('.spoke').forEach(sp => {
    const r = sp.getBoundingClientRect();
    const sx = r.left - dRect.left;
    const sy = r.top - dRect.top;
    const sw = r.width;
    const sh = r.height;
    const sCx = sx + sw / 2;
    const sCy = sy + sh / 2;
    const dx = sCx - cx;
    const dy = sCy - cy;
    const ang = Math.atan2(dy, dx);
    const x1 = cx + Math.cos(ang) * hubR;
    const y1 = cy + Math.sin(ang) * hubR;
    const halfW = sw / 2;
    const halfH = sh / 2;
    const tx = halfW / Math.abs(Math.cos(ang) || 0.0001);
    const ty = halfH / Math.abs(Math.sin(ang) || 0.0001);
    const t = Math.min(tx, ty);
    const x2 = sCx - Math.cos(ang) * t;
    const y2 = sCy - Math.sin(ang) * t;

    const ns = 'http://www.w3.org/2000/svg';
    const line = document.createElementNS(ns, 'line');
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    line.setAttribute('stroke', '#ff2da8');
    line.setAttribute('stroke-width', '1.5');
    line.setAttribute('stroke-dasharray', '5 6');
    line.setAttribute('stroke-linecap', 'round');
    line.setAttribute('opacity', '0.55');
    svg.appendChild(line);
  });
}

// ── Smooth scroll for anchor links ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── Init ──
renderFAQs();
initAnimations();
initNavbar();
window.addEventListener('load', drawLines);
window.addEventListener('resize', drawLines);
