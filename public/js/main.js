const selectFilm = document.querySelector('.select-film');
const personageLoader = document.querySelector('.personage-loader');
const personageResults = document.querySelector('.personage-results');
if (selectFilm) {
  selectFilm.addEventListener('change', function (event) {
    personageLoader.style.display = 'block';
    personageResults.style.display = 'none';
    document.location.replace(`/${selectFilm.value}`);
  });
}
