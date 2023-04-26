const Movie = require('../models/movie');
const { CREATED } = require('../utils/httpStatusCodes');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм не найден');
      }
      return res.send(movie);
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => {
      res.status(CREATED).send(movie);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return next(
          new BadRequestError(
            'Переданы некорректные данные при создании фильма',
          ),
        );
      }
      return next(error);
    });
};
const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм не найден');
      }
      if (req.user._id !== movie.owner.toString()) {
        throw new ForbiddenError('Нет прав для удаления фильма');
      }
      movie
        .deleteOne()
        .then(() => res.status(200).send({ message: 'Фильм успешно удалён' }));
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return next(new BadRequestError('Ошибка при передачи данных о фильме'));
      }
      return next(error);
    });
};

module.exports = { getMovies, createMovie, deleteMovie };
