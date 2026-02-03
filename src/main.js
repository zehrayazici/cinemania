import './css/styles.css';
import './css/header.css';
import './css/my-library-hero.css';

import { initHeader } from './js/header.js';
import { initCatalog } from './js/catalog.js';
import { startHeroApp } from './js/hero.js';
import { initMyLibrary } from './js/my-library.js';
import { initializeMyLibraryHero } from './js/my-library-hero.js';


// my library hero sadece library page de yüklenecek
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  
  // sayfa kontrolü
  const isLibraryPage = document.querySelector('.library-section') !== null;
  
  if (isLibraryPage) {
    // eğer My Library 
    initializeMyLibraryHero();
    initMyLibrary();
  } else {
    // diğer sayfalar 
    initCatalog();
    startHeroApp();
  }
});