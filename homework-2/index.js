const movies = [
  {
    adult: false,
    genre: ["Animation", "Family", "Comedy", "Action"],
    id: 519182,
    poster_path:
      "https://image.tmdb.org/t/p/w500/wWba3TaojhK7NdycRhoQpsG0FaH.jpg",
    title: "Despicable Me 4",
    vote_average: 7.352,
  },
  {
    adult: false,
    genre: ["Drama", "Romance"],
    id: 1079091,
    poster_path:
      "https://image.tmdb.org/t/p/w500/tJSbiu7S5pqDnzH9weTW82bYbWu.jpg",
    title: "It Ends with Us",
    vote_average: 7.194,
  },
  {
    adult: true,
    genre: ["Action", "Thriller", "Drama", "Crime"],
    id: 1160018,
    poster_path:
      "https://image.tmdb.org/t/p/w500/m2zXTuNPkywdYLyWlVyJZW2QOJH.jpg",
    title: "Kill",
    vote_average: 7.315,
  },
  {
    adult: true,
    genre: ["Science Fiction", "Horror", "Thriller"],
    id: 945961,
    poster_path:
      "https://image.tmdb.org/t/p/w500/b33nnKl1GSFbao4l3fZDDqsMx0F.jpg",
    title: "Alien: Romulus",
    vote_average: 7.3,
  },
  {
    adult: true,
    genre: ["Horror", "Crime", "Mystery"],
    id: 1023922,
    poster_path:
      "https://image.tmdb.org/t/p/w500/ArvoFK6nlouZRxYmtIOUzKIrg90.jpg",
    title: "MaXXXine",
    vote_average: 6.308,
  },
  {
    adult: false,
    genre: ["Action", "Comedy", "Adventure"],
    id: 1051891,
    poster_path:
      "https://image.tmdb.org/t/p/w500/rUcuageYgv9SsJoWuc0seRWG6JC.jpg",
    title: "Thelma",
    vote_average: 7,
  },
  {
    adult: false,
    genre: ["Animation", "Action", "Drama"],
    id: 1104844,
    poster_path:
      "https://image.tmdb.org/t/p/w500/ae434jM5NG2kKX1rRkG5giMhpPI.jpg",
    title: "BLUE LOCK THE MOVIE -EPISODE NAGI-",
    vote_average: 8.3,
  },
  {
    adult: true,
    genre: ["Horror", "Thriller"],
    id: 646683,
    poster_path:
      "https://image.tmdb.org/t/p/w500/ar2h87jlTfMlrDZefR3VFz1SfgH.jpg",
    title: "The Exorcism",
    vote_average: 4.57,
  },
];

let favorites = [];

// render function
function renderMovies() {
  const container = document.getElementById("movie-container");
  container.innerHTML = "";

  movies.forEach((movie) => {
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");

    movieElement.innerHTML = `
              <h2>${movie.title}</h2>
              <img src="${movie.poster_path}" alt="${movie.title}">
              <p>Genres: ${movie.genre.join(", ")}</p>
              <p>Rating: ${movie.vote_average}</p>
              <button onclick="addToFavorites(${
                movie.id
              })">Add to Favorites</button>`;

    container.appendChild(movieElement);
  });
}

// render for favorite
function renderFavorites() {
  const container = document.getElementById("favorites-container");
  container.innerHTML = "";

  favorites.forEach((movie) => {
    const favoriteElement = document.createElement("div");
    favoriteElement.classList.add("favorite");

    favoriteElement.innerHTML = `
              <h2>${movie.title}</h2>
              <img src="${movie.poster_path}" alt="${movie.title}">
              <button onclick="removeFromFavorites(${movie.id})">Remove from Favorites</button>
          `;

    container.appendChild(favoriteElement);
  });
}

// function to add to favorite
function addToFavorites(id) {
  const movie = movies.find((m) => m.id === id);
  if (movie && !favorites.includes(movie)) {
    favorites.push(movie);
    renderFavorites(); //
  }
}

// function for deleete from favorite
function removeFromFavorites(id) {
  favorites = favorites.filter((m) => m.id !== id);
  renderFavorites();
}

renderMovies();
renderFavorites();
