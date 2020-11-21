const selectFilm = document.querySelector('.select-film');
const movieTitle = document.querySelector('.movie-title');
const personageLoader = document.querySelector('.personage-loader');
const personageResults = document.querySelector('.personage-results');
if (selectFilm) {
  selectFilm.addEventListener('change', function (event) {
    this.disabled = true;
    personageLoader.style.display = 'block';
    movieTitle.style.display = 'none';
    personageResults.style.display = 'none';
    document.location.replace(`/${selectFilm.value}`);
  });
}
