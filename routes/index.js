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
      currentValue: Number(req.params.id),
      names: [],
      movieTitle: false
    });
  });
});

router.get('/:id', function (req, res, next) {
  // fetch data for options and we fetch film by params.id
  const results = forkJoin({
    film: axios(`https://swapi.dev/api/films/${req.params.id}`),
    filmList: axios(`https://swapi.dev/api/films/`)
  });

  // handle errors
  results.pipe(catchError((error) => throwError('Bad url', error.config.url)));

  results.subscribe(
    ({ filmList, film }) => {
      // now we need to fetch a lot of persons
      const peopleResults = forkJoin({
        ...film.data.characters.map((char) => axios.get(char))
      });

      peopleResults.pipe(catchError((error) => res.render('error')));

      peopleResults.subscribe((i) => {
        // then we need to take just names
        const names = Object.values(i).map((a) => a.data?.name);

        // final render
        res.render('index', {
          filmList: filmList.data.results,
          currentValue: Number(req.params.id) + 1,
          movieTitle: film.data.title,
          names
        });
      });
    },
    (error) => res.render('error', { error })
  );
});

module.exports = router;
