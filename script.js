const movieSearchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');

// load movies from API
async function loadMovies(searchTerm) {
    const URL = `https://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=ce0e4ca5`;
    try {
        const res = await fetch(URL);
        const data = await res.json();
        if (data.Response == "True") displayMovieList(data.Search);
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

function findMovies() {
    let searchTerm = movieSearchBox.value.trim();
    if (searchTerm.length > 0) {
        searchList.classList.remove('hide-search-list');
        loadMovies(searchTerm);
    } else {
        searchList.classList.add('hide-search-list');
    }
}

function displayMovieList(movies) {
    searchList.innerHTML = "";
    for (let idx = 0; idx < movies.length; idx++) {
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = movies[idx].imdbID;
        movieListItem.classList.add('search-list-item');
        let moviePoster = (movies[idx].Poster != "N/A") ? movies[idx].Poster : "image_not_found.png";

        movieListItem.innerHTML = `
        <div class="search-item-thumbnail">
            <img src="${moviePoster}">
        </div>
        <div class="search-item-info">
            <h3>${movies[idx].Title}</h3>
            <p>${movies[idx].Year}</p>
        </div>
        `;
        searchList.appendChild(movieListItem);

        // Add click event listener to each movie item
        movieListItem.addEventListener('click', async () => {
            searchList.classList.add('hide-search-list');
            movieSearchBox.value = "";
            const movieID = movies[idx].imdbID;
            try {
                const result = await fetch(`https://www.omdbapi.com/?i=${movieID}&apikey=ce0e4ca5`);
                const movieDetails = await result.json();
                displayMovieDetails(movieDetails);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        });
    }
}

function displayMovieDetails(details) {
    resultGrid.innerHTML = `
    <div class="movie-poster">
        <img src="${(details.Poster != "N/A") ? details.Poster : "image_not_found.png"}" alt="movie poster">
    </div>
    <div class="movie-info">
        <h3 class="movie-title">${details.Title}</h3>
        <ul class="movie-misc-info">
            <li class="year">Year: ${details.Year}</li>
            <li class="rated">Ratings: ${details.Rated}</li>
            <li class="released">Released: ${details.Released}</li>
        </ul>
        <p class="genre"><b>Genre:</b> ${details.Genre}</p>
        <p class="writer"><b>Writer:</b> ${details.Writer}</p>
        <p class="actors"><b>Actors: </b>${details.Actors}</p>
        <p class="plot"><b>Plot:</b> ${details.Plot}</p>
        <p class="language"><b>Language:</b> ${details.Language}</p>
        <p class="awards"><b><i class="fas fa-award"></i></b> ${details.Awards}</p>
    </div>
    `;
}

window.addEventListener('click', (event) => {
    if (event.target.className != "form-control") {
        searchList.classList.add('hide-search-list');
    }
});





document.addEventListener("DOMContentLoaded", function() {
    const stars = document.querySelectorAll(".star");
    const ratingValue = document.querySelector(".rating-value");
    const reviewForm = document.getElementById("review-form");
    const reviewText = document.getElementById("review-text");
    const reviewsList = document.getElementById("reviews-list");

    let currentRating = 0;

// Event listeners for rating stars
stars.forEach(star => {
    star.addEventListener("mouseover", function() {
        highlightStars(parseInt(star.getAttribute("data-value")));
    });

    star.addEventListener("click", function() {
        currentRating = parseInt(star.getAttribute("data-value"));
        ratingValue.textContent = currentRating;
        highlightStars(currentRating);
    });

    star.addEventListener("mouseout", function() {
        highlightStars(currentRating);
    });
});


    // Highlight stars on mouseover
    function highlightStars(index) {
        stars.forEach((star, i) => {
            if (i < index) {
                star.classList.add("filled");
            } else {
                star.classList.remove("filled");
            }
        });
    }

    // Remove highlight from stars
    function removeHighlight() {
        stars.forEach(star => {
            star.classList.remove("filled");
        });
        highlightStars(currentRating);
    }

    // Submit review form
    reviewForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const reviewContent = reviewText.value.trim();
        if (reviewContent && currentRating > 0) {
            const reviewItem = document.createElement("li");
            reviewItem.textContent = `Rating: ${currentRating}, Review: ${reviewContent}`;
            reviewsList.appendChild(reviewItem);
            // Clear the form
            reviewText.value = "";
            currentRating = 0;
            removeHighlight();
            ratingValue.textContent = currentRating;
        } else {
            alert("Please provide both rating and review content.");
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    displayWatchlist();
});

// Function to add a movie to the watchlist
function addToWatchlist() {
    // Get the title of the movie displayed
    const movieTitle = document.querySelector('.movie-title').textContent.trim();
    let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    watchlist.push(movieTitle);
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    displayWatchlist(); // Update watchlist display
}

// Function to remove a movie from the watchlist
function removeFromWatchlist(movieTitle) {
    let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    watchlist = watchlist.filter(title => title !== movieTitle);
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    displayWatchlist(); // Update watchlist display
}

// Function to display the watchlist
function displayWatchlist() {
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    const watchlistElement = document.getElementById('watchlist');
    watchlistElement.innerHTML = '';

    if (watchlist.length === 0) {
        watchlistElement.innerHTML = '<p>No movies in your watchlist.</p>';
    } else {
        watchlist.forEach(movieTitle => {
            const li = document.createElement('li');
            li.textContent = movieTitle;

            // Add remove button
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.classList.add('remove-from-watchlist');
            removeButton.onclick = function() {
                removeFromWatchlist(movieTitle);
            };
            li.appendChild(removeButton);

            watchlistElement.appendChild(li);
        });
    }
}
