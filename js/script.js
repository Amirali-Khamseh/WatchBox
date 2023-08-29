/* Object holding the state of an application */
const state = {
  currentPage: window.location.pathname,
}


/*Highlighting the active link corresponding the current page */
function linkHighlight() {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    if (link.getAttribute('href') === state.currentPage) {
      link.classList.add('active');
    }
  })
}



/*Fetching data from  API */
async function fetchData(endPoint) {
  /*For this project iam not going to use .env files to hide the API key , because i wanna use github pages */
  APIKey = 'd926d39bce6b60805d4101875ebcfac8';
  APIURL = 'https://api.themoviedb.org/3/';

  const result = await fetch(`${APIURL}${endPoint}?api_key=${APIKey}&language=en-US`);
  showSpinner();
  data = result.json();
  hideSpinner();
  return data;
}
/*Showing the spineer while fetching the data*/
function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

/*Hiding the spineer after fetching the data*/
function hideSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

/*Popular movies*/
async function displayPopularMovie() {
  const { results } = await fetchData('movie/popular');
  results.forEach(movie => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `    
        <a href="movie-details.html?id=${movie.id}">
        ${movie.poster_path ? `<img
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
            class="card-img-top"
            alt="${movie.title}"
          />` : `<img
          src="images/no-image.jpg"
          class="card-img-top"
          alt="${movie.title}"
        />`}
        </a>
        <div class="card-body">
          <h5 class="card-title">${movie.title}</h5>
          <p class="card-text">
            <small class="text-muted">⭐${movie.vote_average.toFixed(1)}/10</small>
          </p>
        </div>
     `
    //  <small class="text-muted"> ⭐${movie.vote_average.toFixed(1)}/10 </small>
    //  document.querySelector('#popular-movies').
    document.querySelector('#popular-movies').appendChild(div)
  })
}
/*Adding commas to the values of budget  & revenue*/
function addCommasToNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/*Display backdrop for either movie or show   */
function displayBackDrop(type, path) {
  const overlayDiv = document.createElement('div');
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${path})`;
  overlayDiv.style.backgroundSize = 'cover';
  overlayDiv.style.backgroundPosition = 'center';
  overlayDiv.style.backgroundRepeat = 'no-repeat';
  overlayDiv.style.height = '100vh';
  overlayDiv.style.width = '100vw';
  overlayDiv.style.position = 'absolute';
  overlayDiv.style.top = '0';
  overlayDiv.style.left = '0';
  overlayDiv.style.zIndex = '-1';
  overlayDiv.style.opacity = '0.1';

  if (type === 'movie') {
    document.querySelector('#movie-details').appendChild(overlayDiv);
  } else {
    document.querySelector('#show-details').appendChild(overlayDiv);
  }
}

/*Movie details*/
async function movieDetails() {
  const id = window.location.search.split('=')[1];
  const movie = await fetchData(`movie/${id}`);
  displayBackDrop('movie', movie.backdrop_path);
  const div = document.createElement('div');
  div.innerHTML = `  
    <div class="details-top">
    <div>
    ${movie.poster_path ? `<img
    src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
    class="card-img-top"
    alt="${movie.title}"
    />` : `<img
    src="images/no-image.jpg"
    class="card-img-top"
    alt="${movie.title}"
    />`}
    </div>
    <div>
      <h2>${movie.title}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${movie.vote_average.toFixed(1)}/10
      </p>
      <p class="text-muted">Release Date: ${movie.release_date}</p>
      <p>
      ${movie.overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
      ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
      </ul>
      <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Movie Info</h2>
    <ul>
      <li><span class="text-secondary">Budget:</span>  ${movie.budget === 0 ? 'Not specified' : addCommasToNumber(movie.budget) + '$'}</li>
      <li><span class="text-secondary">Revenue:</span>  ${movie.revenue === 0 ? 'Not specified' : addCommasToNumber(movie.revenue) + '$'}</li>
      <li><span class="text-secondary">Runtime:</span> ${movie.runtime} m</li>
      <li><span class="text-secondary">Status:</span> ${movie.status} </li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">
    ${movie.production_companies.map((company) => `<li>${company.name}</li>`).join('')}
  </div>`;
  document.querySelector('#movie-details').appendChild(div);
}
/*Popular TV shows*/
async function displayPopularShow() {

  const { results } = await fetchData('tv/popular');
  results.forEach(show => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `    
        <a href="tv-details.html?id=${show.id}">
        ${show.poster_path ? `<img
            src="https://image.tmdb.org/t/p/w500${show.poster_path}"
            class="card-img-top"
            alt="${show.name}"
          />` : `<img
          src="images/no-image.jpg"
          class="card-img-top"
          alt="${show.name}"
        />`}
        </a>
        <div class="card-body">
          <h5 class="card-title">${show.name}</h5>
          <p class="card-text">
          <small class="text-muted">⭐${show.vote_average.toFixed(1)}/10</small>
          </p>
        </div>
     `
    document.querySelector('#popular-shows').appendChild(div)
  })
}

/*show details*/
async function showDetails() {
  const id = window.location.search.split('=')[1];
  const show = await fetchData(`tv/${id}`);
  console.log(show)
  displayBackDrop('show', show.backdrop_path);
  const div = document.createElement('div');
  div.innerHTML = `  
    <div class="details-top">
    <div>
    ${show.poster_path ? `<img
    src="https://image.tmdb.org/t/p/w500${show.poster_path}"
    class="card-img-top"
    alt="${show.name}"
    />` : `<img
    src="images/no-image.jpg"
    class="card-img-top"
    alt="${show.name}"
    />`}
    </div>
    <div>
      <h2>${show.name}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${show.vote_average.toFixed(1)}/10
      </p>
      <p class="text-muted">Release Date: ${show.first_air_date
    }</p >
      <p>
      ${show.overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
      ${show.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
      </ul>
      <a href="${show.homepage}" target="_blank" class="btn">Visit Show Homepage</a>
    </div >
  </div >
  <div class="details-bottom">
    <h2>Show Info</h2>
    <ul>
      <li><span class="text-secondary">Number of episodes :</span>  ${show.number_of_episodes}</li>
      <li><span class="text-secondary">Last episode to air :</span>  ${show.last_episode_to_air.air_date}</li>
      <li><span class="text-secondary">Status:</span> ${show.status} </li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">
      ${show.production_companies.map((company) => `<li>${company.name}</li>`).join('')}
    </div>`;
  document.querySelector('#show-details').appendChild(div);
}

/*Display slider*/
async function displaySlider() {
  const { results } = await fetchData('movie/now_playing')
  results.forEach(movie => {
    const div = document.createElement('div');
    div.classList.add('swiper-slide');
    div.innerHTML = `
    <a href="movie-details.html?id=${movie.id}">
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
    </a>
    <h4 class="swiper-rating">
      <i class="fas fa-star text-secondary"></i> ${movie.vote_average.toFixed(1)} / 10
    </h4>
 `;
    document.querySelector('.swiper-wrapper').appendChild(div);

    initSwiper();
  })
}

function initSwiper() {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: false,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
}
/*Initializing the App*/
function initialize() {
  switch (state.currentPage) {
    case '/':
    case '/index.html':
      console.log(state.currentPage);
      displaySlider();
      displayPopularMovie();
      break;
    case '/shows.html':
      displayPopularShow();
      console.log(state.currentPage);
      break;
    case '/movie-details.html':
      movieDetails();
      console.log(state.currentPage);
      break;
    case '/tv-details.html':
      showDetails();
      console.log(state.currentPage);
      break;
    case '/search.html':
      console.log(state.currentPage);
      break;

  }
  linkHighlight();
}


document.addEventListener('DOMContentLoaded', initialize);