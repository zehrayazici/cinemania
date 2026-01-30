import { API_KEY, BASE_URL } from './api/movies-api.js';

export function initCatalog() {
  // ------------ STATE ------------
  let selectedYearValue = '';
  let currentQuery = '';
  let hasSearched = false;
  let genreMap = {};

  let currentMode = 'trending';
  // ------------ STATE ------------

  // ------------ DOM ------------

  const moviesContainer = document.getElementById('moviesContainer');
  const emptyMessage = document.getElementById('emptyMessage');

  const filmInput = document.querySelector('.search-input');
  const clearBtn = document.getElementById('clearSearch');
  const searchBtn = document.querySelector('.search-btn');

  const yearBtn = document.getElementById('yearBtn');
  const yearDropdown = document.getElementById('yearDropdown');
  const selectedYear = document.getElementById('selectedYear');

  // ------------ DOM ------------

  // Film arama kısmında text girerken close ikonunu göster/kapat
  const input = document.querySelector('.search-input');
  const parent = input.parentElement;

  const clearInputBtn = input.parentElement.querySelector('.search-clear-btn');
  clearInputBtn.style.display = 'none';

  parent.addEventListener('click', e => {
    const btn = e.target.closest('.search-clear-btn');
    if (!btn) return;

    input.value = '';
    input.focus();
  });

  parent.addEventListener('input', e => {
    if (e.target !== input) return;

    const btn = parent.querySelector('.search-clear-btn');
    if (btn) {
      btn.style.display = input.value ? 'block' : 'none';
    }
  });

  // ------------ yearDropdown ------------

  if (yearBtn && yearDropdown) {
    yearBtn.addEventListener('click', e => {
      e.stopPropagation();

      const isOpen = yearDropdown.classList.toggle('open');
      yearBtn.classList.toggle('open', isOpen);
    });

    yearDropdown.addEventListener('click', e => {
      e.stopPropagation();
      if (e.target.tagName === 'LI') {
        selectedYearValue = e.target.dataset.year || '';
        selectedYear.textContent = e.target.textContent;

        yearDropdown.classList.remove('open');
        yearBtn.classList.remove('open');
      }
    });
  }

  // dış tıklama işlemiyle oku resetle
  document.addEventListener('click', e => {
    if (!yearDropdown.classList.contains('open')) return;

    if (!yearDropdown.contains(e.target) && !yearBtn.contains(e.target)) {
      yearDropdown.classList.remove('open');
      yearBtn.classList.remove('open');
    }
  });

  // ------------ yearDropdown ------------

  // ------------ SEARCH ------------
  searchBtn.addEventListener('click', () => {
    currentQuery = filmInput.value.trim();
    hasSearched = true;

    if (!currentQuery && !selectedYearValue) {
      hasSearched = false;
    }
  });

  // ------------ SEARCH ------------

  // ------------ CLEAR ------------
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      filmInput.value = '';
    });

    selectedYear.textContent = 'Year';

    currentQuery = '';
    selectedYearValue = '';
    hasSearched = false;
  }
  // ------------ CLEAR ------------

  // ------------ TRENDING ------------
  fetchTrending(1);

  function fetchTrending(page = 1) {
    emptyMessage.style.display = 'none';
    currentMode = 'trending';
    fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=${page}`)
      .then(render => render.json())
      .then(data => {
        renderMovies(data.results || []);
      });
  }
  // ------------ TRENDING ------------

  // ------------ RENDER ------------
  function renderMovies(movies) {
    moviesContainer.innerHTML = '';

    if (!movies.length) {
      emptyMessage.style.display = hasSearched ? 'block' : 'none';
      return;
    }

    emptyMessage.style.display = 'none';

    movies.slice(0, 20).forEach(movie => {
      const card = document.createElement('a');
      card.className = 'movie-card';
      card.setAttribute('data-id', movie.id);
      // href özelliğiyle kartın bağlantısını ekleyeceğim

      // poster adında değişken kullanarak filmin resmini ekleyeceğim

      const year = movie.release_date?.slice(0, 4);
      const genres =
        movie.genre_ids
          ?.map(id => genreMap[id])
          .filter(Boolean)
          .slice(0, 2)
          .join(', ') || 'Unknown';

      card.innerHTML = `
      <img src="${poster}">
        <div class="movie-card-overlay">
          <div class="movie-card-text">
            <h3>${movie.title}</h3>
              <div class="movie-meta">
                <span class="movie-genre">${genres}</span>
                <span class="movie-year">| ${year}</span>
              </div>
            </div>
          <div class="movie-rating-stars"></div>
        </div>
      `;

      moviesContainer.appendChild(card);
    });
  }
  // ------------ RENDER ------------
}
