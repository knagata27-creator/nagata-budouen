// モバイルメニュー開閉
const nav = document.getElementById('primaryNav');
const toggle = document.getElementById('navToggle');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    document.body.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  });
  // メニュー内リンクを押したら閉じる
  nav.addEventListener('click', e => {
    if (e.target.tagName === 'A') {
      nav.classList.remove('open');
      document.body.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// スクロール時ヘッダー透明化
const header = document.querySelector('.site-header');
const onScroll = () => {
  if (window.scrollY > 8) header.classList.add('is-scrolled');
  else header.classList.remove('is-scrolled');
};
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// セクションのフェードイン
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
  // フォールバック
  revealEls.forEach(el => el.classList.add('in'));
}
