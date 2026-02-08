import { getWeeklyTrending } from './movie-api.js'; 

const movieGrid = document.getElementById('movie-grid');

export async function initWeeklyTrends() {
    if (!movieGrid) return;

    try {
        // Fonksiyon adını movie-api.js'deki gibi güncelledik
        const movies = await getWeeklyTrending(); 
        
        if (movies && movies.length > 0) {
            displayMovies(movies.slice(0, 3)); 
        }
    } catch (error) {
        console.error("Trend verileri yüklenirken hata oluştu:", error);
    }
}

function displayMovies(movies) {
    movieGrid.innerHTML = movies.map(movie => {
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

initWeeklyTrends();