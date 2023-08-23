/* Object holding the state of an application */
const state = {
    currentPage :window.location.pathname,
}


/*Highlighting the active link corresponding the current page */
function linkHighlight(){
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if(link.getAttribute('href')===state.currentPage ){
            link.classList.add('active');
        }
    })
}



/*Fetching data from  API */
async function fetchData(endPoint){
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
function showSpinner(){
document.querySelector('.spinner').classList.add('show');
}

/*Hiding the spineer after fetching the data*/
function hideSpinner(){
    document.querySelector('.spinner').classList.remove('show');
}

/*Popular movies*/
async function displayPopularMovie(){
    const {results} =await fetchData('movie/popular');
    results.forEach(movie=>{
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `    
        <a href="movie-details.html?id=${movie.id}">
        ${ movie.poster_path ?   `<img
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
            class="card-img-top"
            alt="${movie.title}"
          />` :`<img
          src="images/no-image.jpg"
          class="card-img-top"
          alt="${movie.title}"
        />`}
        </a>
        <div class="card-body">
          <h5 class="card-title">${movie.title}</h5>
          <p class="card-text">
            <small class="text-muted">Release: ${movie.release_date}</small>
          </p>
        </div>
     `
    document.querySelector('#popular-movies').appendChild(div)
    })
}
/*Movie details*/

/*Popular TV shows*/
async function displayPopularShow(){

    const {results} =await fetchData('tv/popular');
    results.forEach(show=>{
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `    
        <a href="movie-details.html?id=${show.id}">
        ${ show.poster_path ?   `<img
            src="https://image.tmdb.org/t/p/w500${show.poster_path}"
            class="card-img-top"
            alt="${show.name}"
          />` :`<img
          src="images/no-image.jpg"
          class="card-img-top"
          alt="${show.name}"
        />`}
        </a>
        <div class="card-body">
          <h5 class="card-title">${show.name}</h5>
          <p class="card-text">
            <small class="text-muted">Release: ${show.first_air_date}</small>
          </p>
        </div>
     `
    document.querySelector('#popular-shows').appendChild(div)
    })
}


/*Initializing the App*/
function initialize(){
    switch(state.currentPage){
        case '/':
        case '/index.html':
        console.log(state.currentPage);
        displayPopularMovie();
        break;
        case '/shows.html':
        displayPopularShow();
        console.log(state.currentPage);
        break;
        case '/movie-details.html':
        console.log(state.currentPage);
        break;
        case '/tv-details.html':
        console.log(state.currentPage);
        break;
        case '/search.html':
        console.log(state.currentPage);
        break;
    
    }
    linkHighlight();
}


document.addEventListener('DOMContentLoaded',initialize);