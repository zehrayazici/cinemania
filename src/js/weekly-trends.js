import { getTrending } from './movie-api.js'; 

const movieGrid = document.getElementById('movie-grid');

/**
 * Haftalık trendleri başlatan ana fonksiyon.
 * Arkadaşın muhtemelen bunu ana (main.js) dosyada çağıracaktır.
 */
export async function initWeeklyTrends() {
    if (!movieGrid) return; // Sayfada element yoksa çalışma

    try {
        // Kendi fetch'imiz yerine ortak API fonksiyonunu kullanıyoruz
        const data = await getTrending(); 
        
        if (data && data.results) {
            displayMovies(data.results.slice(0, 3)); // İlk 3 filmi göster
        }
    } catch (error) {
        console.error("Trend verileri yüklenirken hata oluştu:", error);
    }
}

/**
 * Gelen film verilerini HTML yapısına döker
 */
function displayMovies(movies) {
    movieGrid.innerHTML = movies.map(movie => {
        // Çıkış yılı ve türler için güvenli kontrol
        const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : 'N/A';
        
        return `
        <div class="movie-card">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" loading="lazy">
            <div class="movie-info">
                <div class="movie-title">${movie.title}</div>
                <div class="movie-meta">Movie | ${releaseYear}</div>
                <div class="stars">★★★★★</div>
            </div>
        </div>
    `}).join('');
}

// Sayfa yüklendiğinde otomatik çalışması için:
initWeeklyTrends();