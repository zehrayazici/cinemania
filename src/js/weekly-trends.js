import { getWeeklyTrending, getMovieGenres } from './api/movies-api.js';

const movieGrid = document.getElementById('movie-grid');

let cachedMovies = [];
let genreMap = {}; // Tür ID'lerini isimlere dönüştürmek için sözlük

function getVisibleCount() {
  return window.matchMedia('(min-width: 768px)').matches ? 3 : 1;
}

// Tür ID'lerinden metin oluşturan yardımcı fonksiyon
function getGenreNames(genreIds) {
  if (!genreIds || genreIds.length === 0) return 'Other';

  return genreIds
    .slice(0, 2) // Tasarımı bozmamak için en fazla 2 tür gösteriyoruz
    .map(id => genreMap[id] || 'Other')
    .join(', ');
}

function renderMovies() {
  if (!movieGrid) return;
  const count = getVisibleCount();
  displayMovies(cachedMovies.slice(0, count));
}

export async function initWeeklyTrends() {
  if (!movieGrid) return;

  try {
    // Türleri ve Trendleri aynı anda çekiyoruz
    const [genres, movies] = await Promise.all([
      getMovieGenres(),
      getWeeklyTrending(),
    ]);

    // Türleri hızlıca bulabilmek için map'liyoruz: { 28: "Action", 12: "Adventure" }
    genres.forEach(genre => {
      genreMap[genre.id] = genre.name;
    });

    cachedMovies = movies;

    if (cachedMovies && cachedMovies.length > 0) {
      renderMovies();
      window.addEventListener('resize', renderMovies);
    }
  } catch (error) {
    console.error('Trend verileri yüklenirken hata oluştu:', error);
  }
}

function displayMovies(movies) {
  movieGrid.innerHTML = movies
    .map(movie => {
      const releaseYear = movie.release_date
        ? movie.release_date.split('-')[0]
        : '2023';

      const stars = renderStars(movie.vote_average);
      const genreNames = getGenreNames(movie.genre_ids);

      return `
        <div class="weekly-trends__item" data-movie-id="${movie.id}">
            <div class="weekly-trends__card">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" loading="lazy">
                
                <div class="weekly-trends__info">
                    <div class="weekly-trends__text">
                        <div class="weekly-trends__movie-title">${movie.title}</div>
                        <div class="weekly-trends__movie-meta">${genreNames} | ${releaseYear}</div>
                    </div>
                    <div class="weekly-trends__stars" aria-label="Rating ${movie.vote_average?.toFixed ? movie.vote_average.toFixed(1) : 'N/A'}">${stars}</div>
                </div>
            </div>
        </div>
    `;
    })
    .join('');
}

function renderStars(rating) {
  const value = Number(rating);
  if (!Number.isFinite(value)) return '';

  const starCount = value / 2;
  const fullStars = Math.floor(starCount);
  const hasHalfStar = starCount % 1 >= 0.3;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  let starsHTML = '';
  for (let i = 0; i < fullStars; i++) {
    starsHTML += '<span class="star-item star-filled"></span>';
  }
  if (hasHalfStar) {
    starsHTML += '<span class="star-item star-half"></span>';
  }
  for (let i = 0; i < emptyStars; i++) {
    starsHTML += '<span class="star-item star-empty"></span>';
  }

  return starsHTML;
}

initWeeklyTrends();

if (movieGrid) {
  movieGrid.addEventListener('click', e => {
    const card = e.target.closest('.weekly-trends__item');
    if (!card) return;

    const movieId = card.dataset.movieId;
    openPopupSafe(movieId);
  });
}

function openPopupSafe(movieId) {
  if (!movieId) return false;
  if (typeof window.openMoviePopup === 'function') {
    window.openMoviePopup(movieId);
    return true;
  }
  console.warn('openMoviePopup bulunamadı.');
  return false;
}
