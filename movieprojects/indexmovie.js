const apiKey = "c5a5af82d198a4d436bfabfff4fce3c7";
// const apiKey = "api_key=c5a5af82d198a4d436bfabfff4fce3c7";
const newUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
const newSearch = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&page=1`;
const genreListUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US&page=1`;
const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchButton");
// const genreMap = {};

const favorites = JSON.parse(localStorage.getItem("favs")) || [];
const imagePrefix = "https://image.tmdb.org/t/p/w500/";
const videoPrefix = "https://www.youtube.com/embed/";

//

async function getGenres(query = "") {
  try {
    const {
      data: { genres },
    } = await axios.get(genreListUrl);
    const genreContainer = document.querySelector(".genres");
    genreContainer.innerHTML = "";
    genres.forEach((genre) => {
      const genreButton = `
      <button class = "genre-btn" data-genre-id = "${genre.id}">${genre.name}</button>
      `;
      genreContainer.insertAdjacentHTML("beforeend", genreButton);
    });
    const genreBtns = document.querySelectorAll(".genre-btn");
    genreBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const genreId = this.dataset.genreId;
        getMovies(genreId);
      });
    });
  } catch (error) {
    console.log(error);
  }
}

async function getMovies(query = "", genreId = "") {
  try {
    let url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
    if (genreId) {
      url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&with_genres=${genreId}`;
    } else if (query) {
      url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${encodeURIComponent(
        query
      )}`;
    }
    const {
      data: { results },
    } = await axios.get(url);
    console.log(results);

    const movieContainer = document.querySelector(".movies");
    movieContainer.innerHTML = ""; // Очистить контейнер перед добавлением новых фильмов

    results.forEach((movie) => {
      if (movie.title.toLowerCase().startsWith(query.toLowerCase())) {
        const movieItem = `
        
<div class="movie-item">
  <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${
          movie.title
        }" class="movie-poster" />
  <button id="${movie.id}" class="movieBtn">${movie.title}</button>
  <button class="favorite-btn" data-movie-id="${
    movie.id
  }">Add to favorite</button>
  <p>${movie.overview}</p>
  <p class="rating"> ${movie.vote_average.toFixed(1)}</p>
  
</div>

`;

        movieContainer.insertAdjacentHTML("beforeend", movieItem);
      }
    });

    const btns = document.querySelectorAll(".movieBtn");
    btns.forEach((btn) => {
      btn.addEventListener("click", function () {
        location.href = `moviePage.html?movieId=${this.id}`;
      });
    });
    const favBtns = document.querySelectorAll(".favorite-btn");
    favBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const foundMovie = results.find(
          (movie) => Number(movie.id) === Number(this.dataset.movieId)
        );
        if (
          foundMovie &&
          !favorites.some((movie) => movie.id === foundMovie.id)
        ) {
          favorites.push(foundMovie);
          localStorage.setItem("favs", JSON.stringify(favorites));
          // console.log(favorites);
          renderFavorites();
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
}
// favorite

//
function renderFavorites() {
  const allFavorites = JSON.parse(localStorage.getItem("favs"));
  const favoritesContainer = document.querySelector(".favorites");
  favoritesContainer.innerHTML = "";
  if (allFavorites && allFavorites.length > 0) {
    allFavorites.forEach((movie) => {
      const movieCard = `
      <div class="movie-item">
        <img src="${imagePrefix + movie.poster_path}" alt="${
        movie.title
      }" class="movie-poster" />
        <div>
          <button id="${movie.id}" class="movieBtn">${movie.title}</button>
          <button class="remove-favorite-btn" data-movie-id="${
            movie.id
          }">Remove from favorite</button>
        </div>
      </div>
    `;
      favoritesContainer.insertAdjacentHTML("beforeend", movieCard);
    });

    //  Add event listener for going to movie page button

    const movieBtns = document.querySelectorAll(".movieBtn");
    movieBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        location.href = `moviePage.html?movieId=${this.id}`;
      });
    });
    // Add event listeners for remove favorite buttons
    const removeFavBtns = document.querySelectorAll(".remove-favorite-btn");
    removeFavBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const movieId = Number(this.dataset.movieId);
        const index = favorites.findIndex((movie) => movie.id === movieId);
        if (index !== -1) {
          favorites.splice(index, 1);
          localStorage.setItem("favs", JSON.stringify(favorites));
          renderFavorites();
        }
      });
    });
  } else {
    favoritesContainer.innerHTML = "<p>No favorites yet.</p>";
  }
}

getMovies();
renderFavorites();

searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  getMovies(query);
});

async function showBegin() {
  await getGenres();
  await getMovies();
  renderFavorites();
}

showBegin();

// async function getMovies(query = "") {
//   const url = query
//     ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${encodeURIComponent(query)}`
//     : baseUrl;

//   try {
//     const {
//       data: { results },
//     } = await axios.get(url);
//     console.log(results);
