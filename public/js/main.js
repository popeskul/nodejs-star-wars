var selectFilm = document.querySelector('.select-film');
if (selectFilm) {
  selectFilm.addEventListener('change', function (event) {
    document.location.replace(`/${selectFilm.value}`);
  });
}
