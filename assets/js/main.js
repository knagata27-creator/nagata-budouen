// モバイルナビ開閉
const navToggle = document.getElementById('navToggle');
const primaryNav = document.getElementById('primaryNav');
navToggle?.addEventListener('click', () => {
  const open = primaryNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});
// メニュークリックで自動クローズ（モバイル）
primaryNav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  if (window.matchMedia('(max-width: 900px)').matches) {
    primaryNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
}));
