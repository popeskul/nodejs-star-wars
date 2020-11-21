const express = require('express');
const axios = require('axios');
const { throwError, forkJoin } = require('rxjs');
const { catchError } = require('rxjs/operators');
const router = express.Router();

router.get('/', function (req, res, next) {
  const result = axios(`https://swapi.dev/api/films/`);

  result.then(({ data }) => {
    res.render('index', {
      filmList: data.results,
      film: false,
      currentValue: Number(req.params.id)
    });
  });
});

router.get('/:id?', function (req, res, next) {
  const results = forkJoin({
    film: axios(`https://swapi.dev/api/films/${req.params.id}`),
    filmList: axios(`https://swapi.dev/api/films/`)
  });

  results.pipe(catchError((error) => throwError('Bad url', error.config.url)));
  results.subscribe(
    ({ filmList, film }) => {
      console.log(film.data);
      res.render('index', {
        filmList: filmList.data.results,
        film: film.data,
        currentValue: Number(req.params.id) + 1
      });
    },
    (error) => res.render('error', { error })
  );
});

module.exports = router;
