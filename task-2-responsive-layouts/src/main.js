
import './style.css'

// Import the movie posters from the project's assets folder.
// These images will be copied into src/assets in the next step.
import rogerRabbitPoster from './assets/who-framed-roger-rabbit.jpg'
import palmSpringsPoster from './assets/palm-springs.jpg'
import laLaLandPoster from './assets/la-la-land.jpg'
import hookPoster from './assets/hook.jpg'
import hiddenFiguresPoster from './assets/hidden-figures.jpg'
import barbiePoster from './assets/barbie.jpg'

// Store the movie information in one array.
// This makes it easier to create consistent movie cards.
const movies = [
  {
    title: 'Who Framed Roger Rabbit',
    poster: rogerRabbitPoster,
    description:
      'A detective investigates a mysterious case in a world where cartoon characters and humans live together.',
  },
  {
    title: 'Palm Springs',
    poster: palmSpringsPoster,
    description:
      'Two wedding guests find themselves trapped in a time loop and discover an unexpected connection.',
  },
  {
    title: 'La La Land',
    poster: laLaLandPoster,
    description:
      'An aspiring actress and a jazz musician pursue their dreams while navigating a romantic relationship.',
  },
  {
    title: 'Hook',
    poster: hookPoster,
    description:
      'A grown-up Peter Pan returns to Neverland to rediscover his childhood and rescue his children.',
  },
  {
    title: 'Hidden Figures',
    poster: hiddenFiguresPoster,
    description:
      'Three brilliant mathematicians play a vital role in the early years of the American space programme.',
  },
  {
    title: 'Barbie',
    poster: barbiePoster,
    description:
      'Barbie leaves her familiar world and embarks on a journey of self-discovery.',
  },
]

// Create the HTML for one movie card.
// Every card contains a poster, description, and watch button.
function createMovieCard(movie, index) {
  return `
    <article class="movie-card ${index === 0 ? 'featured-movie' : ''}">
      <img
        class="movie-poster"
        src="${movie.poster}"
        alt="${movie.title} movie poster"
      />

      <div class="movie-details">
        <h2>${movie.title}</h2>
        <p>${movie.description}</p>
        <button class="watch-button" type="button">
          WATCH NOW
        </button>
      </div>
    </article>
  `
}

// Build the complete watch.it page.
// The CSS will control how the cards look on different screen sizes.
document.querySelector('#app').innerHTML = `
  <header class="site-header">
    <div class="header-content">
      <a class="site-logo" href="#" aria-label="watch.it home">
        watch.it
      </a>

      <nav class="main-navigation" aria-label="Main navigation">
        <a href="#movies">Action</a>
        <a href="#movies">Comedy</a>
        <a href="#movies">Romance</a>
        <a href="#movies">Drama</a>
      </nav>

      <button class="search-button" type="button">
        SEARCH
      </button>
    </div>
  </header>

  <main id="movies" class="movie-container">
    <section class="movie-grid" aria-label="Available movies">
      ${movies.map(createMovieCard).join('')}
    </section>
  </main>
`
