
// Mobile menu
const nav = document.getElementById('primaryNav');
const toggle = document.getElementById('navToggle');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    document.body.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.addEventListener('click', e => {
    if (e.target.tagName === 'A') {
      nav.classList.remove('open');
      document.body.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// Scroll header state
const header = document.querySelector('.site-header');
const onScroll = () => {
  if (window.scrollY > 8) header.classList.add('is-scrolled');
  else header.classList.remove('is-scrolled');
};
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Reveal animation
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(ent => {
      if (ent.isIntersecting) {
        ent.target.classList.add('in');
        io.unobserve(ent.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in'));
}

// Status bar loading
(async () => {
  const modeEl = document.getElementById('statusMode');
  const msgEl  = document.getElementById('statusMsg');
  const linkEl = document.getElementById('statusLink');
  try {
    const res = await fetch('assets/data/status.json', { cache: 'no-store' });
    const data = await res.json();
    const map = { preorder: '予約受付前', inseason: '受付中', ended: '今季終了' };
    modeEl.textContent = map[data.mode] || '受付状況';
    msgEl.textContent = data.message || '';
    if (data.notice_url) linkEl.href = data.notice_url;
  } catch (e) {
    modeEl.textContent = 'お知らせ';
    msgEl.textContent = '最新状況の取得に失敗しました。';
  }
})();

// Utility: apply query params to links (for GAS product IDs)
function applyParams(selector, params) {
  document.querySelectorAll(selector).forEach(a => {
    const url = new URL(a.href, location.origin);
    Object.entries(params).forEach(([k,v]) => url.searchParams.set(k, v));
    a.href = url.toString();
  });
}
