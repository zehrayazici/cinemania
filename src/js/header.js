// src/js/header.js
export function initHeader() {
  // --- 1. MOBİL MENÜ MANTIĞI (Popcorn İkonu ile) ---
  // DÜZELTME: Seçiciyi (selector) kontrol et, popcorn ikonu .header-logo içindeyse bu kalabilir.
  const logoBtn = document.querySelector('.header-logo'); 
  const mobileMenu = document.querySelector('.mobile-menu');

  if (logoBtn && mobileMenu) {
    logoBtn.addEventListener('click', (e) => {
      if (window.innerWidth < 768) {
        e.preventDefault(); 
        mobileMenu.classList.toggle('is-open'); // Menüyü aç/kapat
      }
    });

    mobileMenu.addEventListener('click', (e) => {
      if (e.target.classList.contains('mobile-menu-link') || e.target === mobileMenu) {
        mobileMenu.classList.remove('is-open');
      }
    });
  }

  // --- 2. TEMA YÖNETİMİ (Dark/Light Mode) ---
  const themeToggle = document.querySelector('.theme-toggle');
  
  // DÜZELTME: Tema değişiminde ikonun da değişmesi için görseli seçiyoruz.
  // HTML tarafında bu img etiketine id="theme-icon" eklediğinden emin ol.
  const themeIcon = document.querySelector('#theme-icon'); 

  // YENİ: Temayı ve ikonları güncelleyen yardımcı fonksiyon
  const updateThemeUI = (theme) => {
    document.body.className = `${theme}-theme`;
    
    // DÜZELTME: Senin yenilediğin dosya isimlerini (sun.svg, moon.svg) burada kullanıyoruz.
    // Vite kullandığın için path'i /assets/... şeklinde (public klasörünü baz alarak) yazıyoruz.
    if (themeIcon) {
      themeIcon.src = theme === 'light' ? '/assets/moon.svg' : '/assets/sun.svg';
    }
  };

  // Sayfa yüklendiğinde hafızadaki temayı uygula
  const savedTheme = localStorage.getItem('theme') || 'dark'; // Varsayılan dark
  updateThemeUI(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = document.body.classList.contains('light-theme');
      const newTheme = isLight ? 'dark' : 'light'; // Mevcut temanın tersini seç

      updateThemeUI(newTheme);
      localStorage.setItem('theme', newTheme); // Tercihi kaydet
    });
  }
}